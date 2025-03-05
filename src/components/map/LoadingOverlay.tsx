
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
      <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
      <p className="text-foreground mt-4 font-medium">Loading map...</p>
    </div>
  );
};

export default LoadingOverlay;
