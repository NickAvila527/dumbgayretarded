
export type PrivacyLevel = 'public' | 'hobby-only' | 'anonymous';

export type UserRole = 'free' | 'premium';

export interface UserLocation {
  lat: number;
  lng: number;
  lastUpdated?: Date;
}

export interface UserProfile {
  id: number;
  name: string;
  avatar: string;
  bio?: string;
  location: UserLocation;
  hobbies: string[];
  privacy: PrivacyLevel;
  active: boolean;
  role: UserRole;
  joinDate: Date;
}

export interface Meetup {
  id: number;
  title: string;
  description: string;
  hostId: number;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  hobbies: string[];
  startTime: Date;
  endTime?: Date;
  isRealTime: boolean;
  maxAttendees?: number;
  attendees: number[];
  privacy: 'public' | 'private' | 'invite-only';
  createdAt: Date;
}
