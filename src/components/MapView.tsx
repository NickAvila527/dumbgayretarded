import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MapPin, Loader2, Filter, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedTransition from './AnimatedTransition';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import UserProfile from './UserProfile';
import { useUser } from '@/contexts/UserContext';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { UserProfile as UserProfileType } from '@/types/user';
import { getMeetupsByLocation, getMeetupsByHobbies } from '@/services/meetupService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(null);
  const [filteredHobbies, setFilteredHobbies] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'people' | 'events'>('people');
  const [meetups, setMeetups] = useState([]);
  
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

  return (
    <div className={cn("relative w-full h-[calc(100vh-5rem)] rounded-2xl overflow-hidden", className)}>
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/30">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-foreground/70 animate-pulse">Loading map view...</p>
        </div>
      ) : (
        <>
          {/* Placeholder map background */}
          <div 
            ref={mapRef} 
            className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-74.006,40.7128,12,0/1200x800?access_token=pk.eyJ1IjoibG92YWJsZS1kZXYiLCJhIjoiY2xrNjlpZWZvMDMzbjNqbzE3OXNrOXU0OSJ9.HLO0UgQQ3M0SvRr_rxUCdQ')] bg-cover"
          />
          
          {/* Map overlay with glass effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          
          {/* View toggle control */}
          <div className="absolute top-4 left-4 z-20">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'people' | 'events')} className="glass backdrop-blur-md rounded-full p-1">
              <TabsList className="grid grid-cols-2 w-48">
                <TabsTrigger value="people">
                  <Users className="h-4 w-4 mr-2" />
                  People
                </TabsTrigger>
                <TabsTrigger value="events">
                  <MapPin className="h-4 w-4 mr-2" />
                  Events
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Active toggle switch */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 glass backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-3">
            <span className="text-sm">Show me on map</span>
            <Switch 
              checked={currentUser.active} 
              onCheckedChange={toggleActiveStatus} 
            />
            <Badge variant={currentUser.active ? "default" : "outline"} className="text-xs rounded-full">
              {currentUser.active ? "Active" : "Hidden"}
            </Badge>
          </div>
          
          {/* User markers - only show when in people view mode */}
          {viewMode === 'people' && filteredUsers.map((user, index) => (
            <AnimatedTransition 
              key={user.id}
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
                onClick={() => setSelectedUser(user)}
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
          ))}

          {/* Meetup markers - only show when in events view mode */}
          {viewMode === 'events' && meetups.map((meetup, index) => (
            <AnimatedTransition 
              key={meetup.id}
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
                onClick={() => console.log('Meetup clicked:', meetup)}
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
          ))}
          
          {/* Filter controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" className="rounded-full glass shadow-sm backdrop-blur-md hover:bg-background/80">
                  <Filter className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Filter by hobbies</h4>
                  <div className="flex flex-wrap gap-2">
                    {allHobbies.map(hobby => (
                      <Button
                        key={hobby}
                        variant={filteredHobbies.includes(hobby) ? "default" : "outline"}
                        size="sm"
                        className="rounded-full text-xs"
                        onClick={() => toggleHobbyFilter(hobby)}
                      >
                        {hobby}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button size="icon" className="rounded-full glass shadow-sm backdrop-blur-md hover:bg-background/80">
              <MapPin className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Current location indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass px-4 py-2 rounded-full shadow-sm backdrop-blur-md flex items-center space-x-2">
            <div className="h-2.5 w-2.5 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">New York City</span>
          </div>
          
          {/* User profile modal */}
          {selectedUser && (
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-6"
              onClick={() => setSelectedUser(null)}
            >
              <div 
                className="relative w-full max-w-md"
                onClick={e => e.stopPropagation()}
              >
                <AnimatedTransition animationType="scale">
                  <UserProfile user={selectedUser} onClose={() => setSelectedUser(null)} />
                </AnimatedTransition>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MapView;
