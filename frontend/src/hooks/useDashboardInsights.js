import { useState, useEffect } from 'react';
import { getDashboardInsights } from '../services/dashboardService';

/**
 * useDashboardInsights Hook
 * 
 * Fetches dashboard insights asynchronously via the mock service.
 */
export const useDashboardInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const data = await getDashboardInsights();
        if (mounted) {
          setInsights(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard insights:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchInsights();
    
    return () => { mounted = false; };
  }, []); // Re-fetch could be triggered by passing a dependency if needed

  return {
    insights,
    loading
  };
};
