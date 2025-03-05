
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, PrivacyLevel } from '@/types/user';

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
  joinDate: new Date()
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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
  };

  const updatePrivacy = (privacy: PrivacyLevel) => {
    setCurrentUser(prev => ({ ...prev, privacy }));
  };

  const upgradeUserRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  // Mock login function for demo purposes
  const login = async (credentials: any) => {
    // In a real app, this would call an API
    const mockUser: UserProfile = {
      id: 1,
      name: 'Demo User',
      avatar: 'https://i.pravatar.cc/150?img=11',
      bio: 'I love trying new hobbies and meeting interesting people!',
      location: { lat: 40.7128, lng: -74.006 },
      hobbies: ['Photography', 'Hiking', 'Painting'],
      privacy: 'public',
      active: false,
      role: 'free',
      joinDate: new Date()
    };
    
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setCurrentUser(INITIAL_USER);
    setIsAuthenticated(false);
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
    logout
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
