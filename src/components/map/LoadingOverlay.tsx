
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/30 z-50">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <p className="text-foreground/70 animate-pulse">Loading map view...</p>
    </div>
  );
};

export default LoadingOverlay;
