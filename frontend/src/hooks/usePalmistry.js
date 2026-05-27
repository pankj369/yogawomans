import { useState, useCallback, useEffect } from "react";
import { palmistryService } from "../services/palmistryService";
import { useAuth } from "../context/AuthContext";

export function usePalmistry() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentReport, setCurrentReport] = useState(null);
  const [error, setError] = useState(null);

  // Load history when user changes
  useEffect(() => {
    if (user?.id) {
      palmistryService.getAnalysisHistory(user.id).then(setHistory).catch(console.error);
    }
  }, [user]);

  const processPalmImage = useCallback(async (file) => {
    if (!user) {
      setError("Please log in to analyze your palm.");
      return;
    }

    // 5MB size check
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    // Allowed image formats check (JPEG, PNG, WEBP)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Only JPEG, PNG, and WEBP images are supported.");
      return;
    }
    
    try {
      setError(null);
      
      // 1. Upload
      setIsUploading(true);
      const imageUrl = await palmistryService.uploadPalmImage(file);
      setCurrentImage(imageUrl);
      setIsUploading(false);

      // 2. Analyze
      setIsAnalyzing(true);
      const report = await palmistryService.analyzePalm(imageUrl);
      
      // 3. Save
      await palmistryService.saveAnalysis(user.id, report);
      
      setCurrentReport(report);
      setHistory(prev => [report, ...(Array.isArray(prev) ? prev : [])]);
    } catch (err) {
      console.error("Palmistry analysis failed:", err);
      setError("Failed to analyze palm. Please try again.");
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  }, [user]);

  const resetAnalysis = () => {
    setCurrentImage(null);
    setCurrentReport(null);
    setError(null);
  };

  return {
    history,
    isUploading,
    isAnalyzing,
    currentImage,
    currentReport,
    error,
    processPalmImage,
    resetAnalysis
  };
}
