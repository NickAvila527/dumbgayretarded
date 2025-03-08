
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserRole, 
  PrivacyLevel, 
  UserRelationship,
  UserReport,
  Notification,
  Message
} from '@/types/user';
import { useToast } from '@/hooks/use-toast';

// Mock data for initial user
const INITIAL_USER: UserProfile = {
  id: 0,
  name: 'Guest User',
  avatar: 'https://i.pravatar.cc/150?img=0',
  location: { lat: 40.7128, lng: -74.006 },
  hobbies: [],
  privacy: 'public',
  active: false,
  role: 'free',
  joinDate: new Date(),
  following: [],
  followers: [],
  blockedUsers: [],
  meetupsHosted: 0,
  meetupsJoined: 0,
  notificationPreferences: {
    email: true,
    push: true,
    meetupReminders: true,
    newMessages: true,
    newFollowers: true,
  }
};

interface UserContextType {
  currentUser: UserProfile;
  isAuthenticated: boolean;
  setCurrentUser: (user: UserProfile) => void;
  updateUserHobbies: (hobbies: string[]) => void;
  toggleActiveStatus: () => void;
  updatePrivacy: (privacy: PrivacyLevel) => void;
  upgradeUserRole: (role: UserRole) => void;
  login: (credentials: any) => Promise<boolean>;
  logout: () => void;
  followUser: (userId: number) => void;
  unfollowUser: (userId: number) => void;
  blockUser: (userId: number) => void;
  unblockUser: (userId: number) => void;
  reportUser: (userId: number, reason: string, description: string) => void;
  updateProfile: (profileData: Partial<UserProfile>) => void;
  getNotifications: () => Notification[];
  markNotificationAsRead: (notificationId: number) => void;
  sendMessage: (receiverId: number, content: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  // Check for saved user on initial load (localStorage in this example)
  useEffect(() => {
    const savedUser = localStorage.getItem('hobbyMeetUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Error parsing saved user:', e);
      }
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('hobbyMeetUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('hobbyMeetUser');
    }
  }, [currentUser, isAuthenticated]);

  const updateUserHobbies = (hobbies: string[]) => {
    setCurrentUser(prev => ({ ...prev, hobbies }));
  };

  const toggleActiveStatus = () => {
    setCurrentUser(prev => ({ ...prev, active: !prev.active }));
    
    toast({
      title: currentUser.active ? "You're now inactive" : "You're now active",
      description: currentUser.active 
        ? "Other users can no longer see you on the map" 
        : "Other users can now see you on the map",
    });
  };

  const updatePrivacy = (privacy: PrivacyLevel) => {
    setCurrentUser(prev => ({ ...prev, privacy }));
    
    toast({
      title: "Privacy settings updated",
      description: `Your profile is now ${privacy === 'public' ? 'public' : privacy === 'hobby-only' ? 'visible only to hobby matches' : 'anonymous'}`,
    });
  };

  const upgradeUserRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
    
    if (role === 'premium') {
      toast({
        title: "Premium activated!",
        description: "You now have access to all premium features",
      });
    }
  };

  const followUser = (userId: number) => {
    if (!currentUser.following) {
      setCurrentUser(prev => ({ ...prev, following: [userId] }));
    } else if (!currentUser.following.includes(userId)) {
      setCurrentUser(prev => ({ 
        ...prev, 
        following: [...prev.following || [], userId] 
      }));
    }
    
    toast({
      title: "Following user",
      description: "You'll receive updates about their activities",
    });
  };
  
  const unfollowUser = (userId: number) => {
    if (currentUser.following?.includes(userId)) {
      setCurrentUser(prev => ({ 
        ...prev, 
        following: prev.following?.filter(id => id !== userId) 
      }));
      
      toast({
        title: "Unfollowed user",
        description: "You'll no longer receive their updates",
      });
    }
  };
  
  const blockUser = (userId: number) => {
    if (!currentUser.blockedUsers) {
      setCurrentUser(prev => ({ ...prev, blockedUsers: [userId] }));
    } else if (!currentUser.blockedUsers.includes(userId)) {
      setCurrentUser(prev => ({ 
        ...prev, 
        blockedUsers: [...prev.blockedUsers || [], userId] 
      }));
    }
    
    // If following, also unfollow
    unfollowUser(userId);
    
    toast({
      title: "User blocked",
      description: "You won't see their content anymore",
      variant: "destructive",
    });
  };
  
  const unblockUser = (userId: number) => {
    if (currentUser.blockedUsers?.includes(userId)) {
      setCurrentUser(prev => ({ 
        ...prev, 
        blockedUsers: prev.blockedUsers?.filter(id => id !== userId) 
      }));
      
      toast({
        title: "User unblocked",
        description: "You can now see their content",
      });
    }
  };
  
  const reportUser = (userId: number, reason: string, description: string) => {
    // In a real app, would send to API
    console.log(`Reported user ${userId} for ${reason}: ${description}`);
    
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe",
      variant: "destructive",
    });
  };
  
  const updateProfile = (profileData: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...profileData }));
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };
  
  const getNotifications = () => {
    // In a real app, would fetch from API
    return notifications;
  };
  
  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };
  
  const sendMessage = async (receiverId: number, content: string): Promise<boolean> => {
    // In a real app, would send to API
    console.log(`Sending message to user ${receiverId}: ${content}`);
    
    toast({
      title: "Message sent",
      description: "Your message has been delivered",
    });
    
    return true;
  };

  // Mock login function for demo purposes
  const login = async (credentials: any) => {
    // In a real app, this would call an API
    const mockUser: UserProfile = {
      id: 1,
      name: 'Demo User',
      avatar: 'https://i.pravatar.cc/150?img=11',
      email: 'demo@example.com',
      bio: 'I love trying new hobbies and meeting interesting people!',
      location: { 
        lat: 40.7128, 
        lng: -74.006,
        address: 'New York, NY'
      },
      hobbies: ['Photography', 'Hiking', 'Painting'],
      privacy: 'public',
      active: false,
      role: 'free',
      joinDate: new Date(),
      following: [],
      followers: [],
      blockedUsers: [],
      meetupsHosted: 3,
      meetupsJoined: 8,
      lastActive: new Date(),
      notificationPreferences: {
        email: true,
        push: true,
        meetupReminders: true,
        newMessages: true,
        newFollowers: true,
      }
    };
    
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    
    // Create some mock notifications
    setNotifications([
      {
        id: 1,
        userId: mockUser.id,
        type: 'meetup',
        title: 'New meetup nearby!',
        message: 'There\'s a new Photography meetup in your area',
        relatedId: 123,
        isRead: false,
        createdAt: new Date()
      },
      {
        id: 2,
        userId: mockUser.id,
        type: 'follow',
        title: 'New follower',
        message: 'Sarah started following you',
        relatedId: 456,
        isRead: false,
        createdAt: new Date(Date.now() - 86400000) // 1 day ago
      }
    ]);
    
    toast({
      title: "Login successful",
      description: "Welcome back to HobbyMeet!",
    });
    
    return true;
  };

  const logout = () => {
    setCurrentUser(INITIAL_USER);
    setIsAuthenticated(false);
    setNotifications([]);
    
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
  };

  const value = {
    currentUser,
    isAuthenticated,
    setCurrentUser,
    updateUserHobbies,
    toggleActiveStatus,
    updatePrivacy,
    upgradeUserRole,
    login,
    logout,
    followUser,
    unfollowUser,
    blockUser,
    unblockUser,
    reportUser,
    updateProfile,
    getNotifications,
    markNotificationAsRead,
    sendMessage
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
