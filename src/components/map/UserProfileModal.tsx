
import React from 'react';
import AnimatedTransition from '../AnimatedTransition';
import UserProfile from '../UserProfile';

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
}

interface UserProfileModalProps {
  selectedUser: User | null;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ selectedUser, onClose }) => {
  if (!selectedUser) return null;
  
  return (
    <div 
      className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <AnimatedTransition animationType="scale">
          <UserProfile user={selectedUser} onClose={onClose} />
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default UserProfileModal;
