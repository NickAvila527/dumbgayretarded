import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';
import { UserProfile as UserProfileType, Meetup } from '@/types/user';
import { getMeetupsByLocation, getMeetupsByHobbies } from '@/services/meetupService';

// Import our new components
import MapMarker from './map/MapMarker';
import MeetupMarker from './map/MeetupMarker';
import MapControls from './map/MapControls';
import UserProfileModal from './map/UserProfileModal';
import LoadingOverlay from './map/LoadingOverlay';

// Mock data for users with hobbies
const MOCK_USERS = [
  {
    id: 1,
    name: 'Alex Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    location: { lat: 40.7128, lng: -74.006 },
    hobbies: ['Photography', 'Hiking', 'Painting'],
    active: true,
    premium: true
  },
  {
    id: 2,
    name: 'Jordan Taylor',
    avatar: 'https://i.pravatar.cc/150?img=2',
    location: { lat: 40.7148, lng: -74.012 },
    hobbies: ['Cooking', 'Reading', 'Gaming'],
    active: true,
    premium: false
  },
  {
    id: 3,
    name: 'Sam Rivera',
    avatar: 'https://i.pravatar.cc/150?img=3',
    location: { lat: 40.7168, lng: -74.002 },
    hobbies: ['Hiking', 'Yoga', 'Photography'],
    active: true,
    premium: false
  },
  {
    id: 4,
    name: 'Morgan Lee',
    avatar: 'https://i.pravatar.cc/150?img=4',
    location: { lat: 40.7108, lng: -74.009 },
    hobbies: ['Dancing', 'Music', 'Reading'],
    active: true,
    premium: true
  },
  {
    id: 5,
    name: 'Casey Kim',
    avatar: 'https://i.pravatar.cc/150?img=5',
    location: { lat: 40.7138, lng: -73.998 },
    hobbies: ['Gaming', 'Coding', 'Movies'],
    active: true,
    premium: false
  }
];

interface MapViewProps {
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({ className }) => {
  const { currentUser, toggleActiveStatus } = useUser();
  const { theme } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(null);
  const [filteredHobbies, setFilteredHobbies] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'people' | 'events'>('people');
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  
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
        }
      };
      
      fetchMeetups();
    }
  }, [isLoading, currentUser.location]);
  
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
    }
  };

  // Handle meetup click
  const handleMeetupClick = (meetup: Meetup) => {
    console.log('Meetup clicked:', meetup);
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
              onClick={setSelectedUser}
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
          />
        </>
      )}
    </div>
  );
};

export default MapView;
