
import React from 'react';
import AnimatedTransition from '../AnimatedTransition';
import UserProfile from '../UserProfile';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface User {
  id: number;
  name: string;
  avatar: string;
  location: { lat: number; lng: number };
  hobbies: string[];
  active: boolean;
  premium: boolean;
  bio?: string;
  privacy?: 'public' | 'hobby-only' | 'anonymous';
  reviews?: Array<{
    rating: number;
    comment: string;
    reviewerName: string;
    date: Date;
  }>;
  meetupsHosted?: number;
  meetupsJoined?: number;
  lastActive?: string;
}

interface UserProfileModalProps {
  selectedUser: User | null;
  onClose: () => void;
  onReport?: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ 
  selectedUser, 
  onClose,
  onReport 
}) => {
  if (!selectedUser) return null;
  
  return (
    <div 
      className="absolute inset-0 bg-black/10 flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      <div 
        className="absolute bottom-0 left-0 right-0 md:relative md:bottom-auto w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <AnimatedTransition animationType="slide-up">
          <div className="bg-white rounded-t-xl md:rounded-xl shadow-xl overflow-hidden">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-3 left-3 z-10 rounded-full bg-white/80 h-8 w-8 backdrop-blur-sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
              <UserProfile user={selectedUser} onClose={onClose} />
            </div>
          </div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default UserProfileModal;
