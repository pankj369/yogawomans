/**
 * Google Sheets Integration Service
 */

/**
 * Retries an async function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} retries - Maximum number of retries
 * @param {number} delay - Initial delay in ms
 */
const retryAsync = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    console.warn(`[Google Sheets] Attempt failed. Retrying in ${delay}ms... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryAsync(fn, retries - 1, delay * 2);
  }
};

/**
 * Sends feedback data to a Google Apps Script Web App (Webhook)
 * Non-blocking, fails gracefully.
 * 
 * @param {Object} feedbackData - The complete feedback object including the generated ID
 */
export const sendFeedbackToGoogleSheet = async (feedbackData) => {
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log("[Google Sheets] VITE_GOOGLE_SHEET_WEBHOOK_URL not configured. Skipping sheets sync.");
    return;
  }

  // Define the fetch operation
  const pushToSheets = async () => {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // GAS Web Apps often prefer text/plain to avoid CORS preflight issues
      },
      // Pass the payload as a JSON string
      body: JSON.stringify({
        ...feedbackData,
        timestamp: feedbackData.createdAt ? new Date().toISOString() : new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.status === 'error') {
      throw new Error(result.message || 'Apps Script returned an error status.');
    }
    
    return result;
  };

  // Execute in the background (non-blocking) with retry logic
  retryAsync(pushToSheets, 3, 1000)
    .then(() => {
      console.log("[Google Sheets] Feedback successfully synced to spreadsheet.");
    })
    .catch((error) => {
      console.error("[Google Sheets] Failed to sync feedback after retries:", error);
      // Fails gracefully - does not crash the app or throw to the caller
    });
};
