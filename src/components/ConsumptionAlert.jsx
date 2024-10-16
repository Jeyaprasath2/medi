import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ConsumptionAlert = ({ abnormalPatterns }) => {
  const { toast } = useToast();

  useEffect(() => {
    abnormalPatterns.forEach((pattern) => {
      toast({
        title: "Abnormal Consumption Pattern Detected",
        description: pattern.message,
        duration: 5000,
        variant: "destructive",
      });
    });
  }, [abnormalPatterns, toast]);

  return null; // This component doesn't render anything itself
};

export default ConsumptionAlert;