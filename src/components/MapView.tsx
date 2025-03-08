
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';
import { UserProfile as UserProfileType, Meetup } from '@/types/user';
import { getMeetupsByLocation, getMeetupsByHobbies } from '@/services/meetupService';
import { useToast } from '@/hooks/use-toast';

// Import our components
import MapMarker from './map/MapMarker';
import MeetupMarker from './map/MeetupMarker';
import MapControls from './map/MapControls';
import UserProfileModal from './map/UserProfileModal';
import LoadingOverlay from './map/LoadingOverlay';
import ReportModal from './modals/ReportModal';

// Mock data for users with hobbies
const MOCK_USERS = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    location: { lat: 40.7128, lng: -74.006 },
    hobbies: ['Photography', 'Hiking', 'Painting'],
    active: true,
    premium: true,
    bio: 'Photography enthusiast and hiking lover. Always looking for new trails to explore and scenes to capture!',
    privacy: 'public' as const,
    reviews: [
      {
        rating: 5,
        comment: 'Great hiking partner, very knowledgeable about trails!',
        reviewerName: 'Sarah J.',
        date: new Date(2023, 5, 15)
      },
      {
        rating: 4,
        comment: 'Fun to be around, shared some awesome photography tips.',
        reviewerName: 'Mike T.',
        date: new Date(2023, 6, 22)
      }
    ],
    meetupsHosted: 5,
    meetupsJoined: 12,
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    name: 'Jordan Taylor',
    avatar: 'https://i.pravatar.cc/150?img=2',
    location: { lat: 40.7148, lng: -74.012 },
    hobbies: ['Cooking', 'Reading', 'Gaming'],
    active: true,
    premium: false,
    bio: 'Foodie and book lover. I host monthly cookbook clubs where we cook recipes from the same book!',
    privacy: 'hobby-only' as const,
    meetupsHosted: 8,
    meetupsJoined: 3,
    lastActive: 'Just now'
  },
  {
    id: 3,
    name: 'Sam Rivera',
    avatar: 'https://i.pravatar.cc/150?img=3',
    location: { lat: 40.7168, lng: -74.002 },
    hobbies: ['Hiking', 'Yoga', 'Photography'],
    active: true,
    premium: false,
    privacy: 'public' as const
  },
  {
    id: 4,
    name: 'Morgan Lee',
    avatar: 'https://i.pravatar.cc/150?img=4',
    location: { lat: 40.7108, lng: -74.009 },
    hobbies: ['Dancing', 'Music', 'Reading'],
    active: true,
    premium: true,
    privacy: 'anonymous' as const
  },
  {
    id: 5,
    name: 'Casey Kim',
    avatar: 'https://i.pravatar.cc/150?img=5',
    location: { lat: 40.7138, lng: -73.998 },
    hobbies: ['Gaming', 'Coding', 'Movies'],
    active: true,
    premium: false,
    bio: 'Software developer by day, gamer by night. Always up for a coding challenge or gaming session!',
    privacy: 'public' as const,
    reviews: [
      {
        rating: 5,
        comment: 'Great coding partner, helped me debug a tricky issue!',
        reviewerName: 'Taylor R.',
        date: new Date(2023, 7, 10)
      }
    ],
    meetupsHosted: 2,
    meetupsJoined: 7,
    lastActive: '3 days ago'
  }
];

interface MapViewProps {
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({ className }) => {
  const { currentUser, toggleActiveStatus, updateUserHobbies } = useUser();
  const { theme } = useTheme();
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(null);
  const [filteredHobbies, setFilteredHobbies] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'people' | 'events'>('people');
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  
  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Load meetups when map is ready
  useEffect(() => {
    if (!isLoading) {
      const fetchMeetups = async () => {
        try {
          const data = await getMeetupsByLocation(
            currentUser.location.lat,
            currentUser.location.lng
          );
          setMeetups(data);
        } catch (error) {
          console.error('Error fetching meetups:', error);
          toast({
            title: "Error loading meetups",
            description: "We couldn't load meetups at this time. Please try again later.",
            variant: "destructive",
          });
        }
      };
      
      fetchMeetups();
    }
  }, [isLoading, currentUser.location, toast]);
  
  // Filter users based on selected hobbies
  const filteredUsers = MOCK_USERS.filter(user => {
    if (filteredHobbies.length === 0) return true;
    return user.hobbies.some(hobby => filteredHobbies.includes(hobby));
  });
  
  // List of all unique hobbies
  const allHobbies = Array.from(
    new Set(MOCK_USERS.flatMap(user => user.hobbies))
  );
  
  // Toggle hobby filter
  const toggleHobbyFilter = (hobby: string) => {
    if (filteredHobbies.includes(hobby)) {
      setFilteredHobbies(filteredHobbies.filter(h => h !== hobby));
    } else {
      setFilteredHobbies([...filteredHobbies, hobby]);
      
      // If the user doesn't have this hobby, suggest adding it
      if (!currentUser.hobbies.includes(hobby)) {
        // Show toast suggestion after a brief delay
        setTimeout(() => {
          toast({
            title: `Add "${hobby}" to your hobbies?`,
            description: "Add this to your profile to connect with more people",
            action: (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => updateUserHobbies([...currentUser.hobbies, hobby])}
              >
                Add hobby
              </Button>
            )
          });
        }, 1000);
      }
    }
  };

  // Handle meetup click
  const handleMeetupClick = (meetup: Meetup) => {
    toast({
      title: meetup.title,
      description: "Opening meetup details...",
    });
  };
  
  // Handle user selection
  const handleUserSelect = (user: typeof MOCK_USERS[0]) => {
    setSelectedUser(user);
  };
  
  // Handle report user
  const handleReportUser = () => {
    if (selectedUser) {
      setShowReportModal(true);
    }
  };

  // Get the appropriate map style URL based on theme
  const getMapStyleUrl = () => {
    const baseUrl = 'https://api.mapbox.com/styles/v1/mapbox';
    const style = theme === 'dark' ? 'dark-v11' : 'light-v11';
    const params = '/static/-74.006,40.7128,12,0/1200x800';
    const token = '?access_token=pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2xrNjlpZWZvMDMzbjNqbzE3OXNrOXU0OSJ9.HLO0UgQQ3M0SvRr_rxUCdQ';
    
    return `${baseUrl}/${style}${params}${token}`;
  };

  return (
    <div className={cn(
      "relative w-full h-[calc(100vh-5rem)] rounded-2xl overflow-hidden", 
      theme === 'dark' ? 'border border-gray-800' : '', 
      className
    )}>
      <LoadingOverlay isLoading={isLoading} />
      
      {!isLoading && (
        <>
          {/* Placeholder map background */}
          <div 
            ref={mapRef} 
            className="absolute inset-0 bg-cover"
            style={{ backgroundImage: `url('${getMapStyleUrl()}')` }}
          />
          
          {/* Map overlay with glass effect */}
          <div className={cn(
            "absolute inset-0 pointer-events-none",
            theme === 'dark' 
              ? 'bg-gradient-to-t from-gray-900/20 to-transparent' 
              : 'bg-gradient-to-t from-background/20 to-transparent'
          )} />
          
          {/* Map Controls */}
          <MapControls 
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            activeStatus={currentUser.active}
            onActiveStatusChange={toggleActiveStatus}
            allHobbies={allHobbies}
            filteredHobbies={filteredHobbies}
            onHobbyFilterToggle={toggleHobbyFilter}
          />
          
          {/* User markers */}
          {viewMode === 'people' && filteredUsers.map((user, index) => (
            <MapMarker 
              key={user.id}
              user={user}
              index={index}
              onClick={handleUserSelect}
            />
          ))}

          {/* Meetup markers */}
          {viewMode === 'events' && meetups.map((meetup, index) => (
            <MeetupMarker 
              key={meetup.id}
              meetup={meetup}
              index={index}
              onClick={handleMeetupClick}
            />
          ))}
          
          {/* User profile modal */}
          <UserProfileModal 
            selectedUser={selectedUser}
            onClose={() => setSelectedUser(null)}
            onReport={handleReportUser}
          />
          
          {/* Report modal */}
          {selectedUser && (
            <ReportModal
              isOpen={showReportModal}
              onClose={() => setShowReportModal(false)}
              userId={selectedUser.id}
              userName={selectedUser.name}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MapView;
