
export type PrivacyLevel = 'public' | 'hobby-only' | 'anonymous';

export type UserRole = 'free' | 'premium';

export interface UserLocation {
  lat: number;
  lng: number;
  lastUpdated?: Date;
  address?: string;
}

export interface UserReview {
  id: number;
  reviewerId: number;
  reviewerName: string;
  targetId: number;
  rating: number;
  comment: string;
  date: Date;
  anonymous: boolean;
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
  email?: string;
  phone?: string;
  following?: number[];
  followers?: number[];
  blockedUsers?: number[];
  reviews?: UserReview[];
  meetupsHosted?: number;
  meetupsJoined?: number;
  lastActive?: Date;
  notificationPreferences?: {
    email: boolean;
    push: boolean;
    meetupReminders: boolean;
    newMessages: boolean;
    newFollowers: boolean;
  };
}

export interface UserRelationship {
  userId: number;
  targetId: number;
  type: 'follow' | 'block' | 'report';
  createdAt: Date;
}

export interface UserReport {
  id: number;
  reporterId: number;
  reportedId: number;
  reason: string;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: Date;
}

export interface Meetup {
  id: number;
  title: string;
  description: string;
  hostId: number;
  hostName?: string;
  hostAvatar?: string;
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
  attendeeProfiles?: { id: number; name: string; avatar: string }[];
  privacy: 'public' | 'private' | 'invite-only';
  createdAt: Date;
  price?: number;
  isPremium?: boolean;
  reviews?: UserReview[];
  averageRating?: number;
}

export interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  receiverId?: number;
  roomId?: number;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: string[];
}

export interface ChatRoom {
  id: number;
  name: string;
  type: 'direct' | 'meetup' | 'group';
  participants: number[];
  meetupId?: number;
  lastMessage?: Message;
  createdAt: Date;
}

export interface Notification {
  id: number;
  userId: number;
  type: 'message' | 'follow' | 'meetup' | 'reminder' | 'system';
  title: string;
  message: string;
  relatedId?: number;
  isRead: boolean;
  createdAt: Date;
}
