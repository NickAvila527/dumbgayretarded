
import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const { theme } = useTheme();
  
  if (!isLoading) return null;
  
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center z-50 ${
      theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'
    }`}>
      <div className={`h-16 w-16 rounded-full shadow-lg flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
      <p className={`mt-4 font-medium ${
        theme === 'dark' ? 'text-white' : 'text-foreground'
      }`}>Loading map...</p>
    </div>
  );
};

export default LoadingOverlay;
