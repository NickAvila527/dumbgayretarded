
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedTransition from '../AnimatedTransition';

interface User {
  id: number;
  name: string;
  avatar: string;
  location: { lat: number; lng: number };
  hobbies: string[];
  active: boolean;
  premium: boolean;
}

interface MapMarkerProps {
  user: User;
  index: number;
  onClick: (user: User) => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ user, index, onClick }) => {
  return (
    <AnimatedTransition 
      delay={index * 100}
      animationType="scale"
      className="absolute"
      style={{
        left: `calc(50% + ${(user.location.lng + 74.006) * 1000}px)`,
        top: `calc(50% - ${(user.location.lat - 40.7128) * 1000}px)`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <button
        className="group relative"
        onClick={() => onClick(user)}
      >
        <div className={cn(
          "w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden transition-all transform group-hover:scale-110",
          user.premium ? "ring-2 ring-primary ring-offset-2" : ""
        )}>
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full shadow-sm">
          {user.hobbies.length}
        </span>
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 glass px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {user.name}
        </span>
      </button>
    </AnimatedTransition>
  );
};

export default MapMarker;
