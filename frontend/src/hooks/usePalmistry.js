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
    if (user?.uid) {
      palmistryService.getAnalysisHistory(user.uid).then(setHistory).catch(console.error);
    }
  }, [user]);

  const processPalmImage = useCallback(async (file) => {
    if (!user) {
      setError("Please log in to analyze your palm.");
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
      const updatedHistory = await palmistryService.saveAnalysis(user.uid, report);
      
      setCurrentReport(report);
      setHistory(updatedHistory);
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
