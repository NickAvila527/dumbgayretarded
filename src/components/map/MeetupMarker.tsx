
import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Users } from 'lucide-react';
import AnimatedTransition from '../AnimatedTransition';
import { Meetup } from '@/types/user';

interface MeetupMarkerProps {
  meetup: Meetup;
  index: number;
  onClick: (meetup: Meetup) => void;
}

const MeetupMarker: React.FC<MeetupMarkerProps> = ({ meetup, index, onClick }) => {
  return (
    <AnimatedTransition 
      delay={index * 100}
      animationType="scale"
      className="absolute"
      style={{
        left: `calc(50% + ${(meetup.location.lng + 74.006) * 1000}px)`,
        top: `calc(50% - ${(meetup.location.lat - 40.7128) * 1000}px)`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <button
        className="group relative"
        onClick={() => onClick(meetup)}
      >
        <div className={cn(
          "w-12 h-12 rounded-full bg-primary/80 text-white flex items-center justify-center shadow-md transition-all transform group-hover:scale-110",
          meetup.isRealTime ? "ring-2 ring-accent ring-offset-2 animate-pulse" : ""
        )}>
          <MapPin className="h-6 w-6" />
        </div>
        <span className="absolute -bottom-1 right-0 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
          <Users className="w-3 h-3" />
          {meetup.attendees.length}
        </span>
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 glass px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {meetup.title}
        </span>
      </button>
    </AnimatedTransition>
  );
};

export default MeetupMarker;
