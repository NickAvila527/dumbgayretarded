
import { Meetup } from '@/types/user';

// Mock meetup data for development
const MOCK_MEETUPS: Meetup[] = [
  {
    id: 1,
    title: 'Photography Walk in Central Park',
    description: 'Join us for a casual photography session in Central Park. All skill levels welcome!',
    hostId: 1,
    location: {
      lat: 40.785091,
      lng: -73.968285,
      address: 'Central Park, New York, NY'
    },
    hobbies: ['Photography', 'Hiking'],
    startTime: new Date(Date.now() + 86400000), // Tomorrow
    isRealTime: false,
    maxAttendees: 10,
    attendees: [1, 2, 3],
    privacy: 'public',
    createdAt: new Date()
  },
  {
    id: 2,
    title: 'Board Game Night',
    description: 'Weekly board game meetup. We have various games but feel free to bring your own!',
    hostId: 2,
    location: {
      lat: 40.7112,
      lng: -74.013,
      address: 'The Board Room Cafe, 234 Main St, New York, NY'
    },
    hobbies: ['Board Games', 'Gaming'],
    startTime: new Date(Date.now() + 172800000), // Day after tomorrow
    isRealTime: false,
    maxAttendees: 15,
    attendees: [2, 4, 5],
    privacy: 'public',
    createdAt: new Date()
  },
  {
    id: 3,
    title: 'Painting in the Park',
    description: 'Drop-in painting session happening now! Bring your supplies and join us.',
    hostId: 3,
    location: {
      lat: 40.7135,
      lng: -73.9940,
      address: 'Washington Square Park, New York, NY'
    },
    hobbies: ['Painting', 'Drawing'],
    startTime: new Date(), // Now
    isRealTime: true,
    attendees: [3, 1],
    privacy: 'public',
    createdAt: new Date()
  }
];

export const getMeetupsByLocation = async (lat: number, lng: number, radiusKm: number = 10): Promise<Meetup[]> => {
  // In a real app, this would query an API with geospatial filtering
  // For now, we'll return all mock meetups
  return MOCK_MEETUPS;
};

export const getMeetupsByHobbies = async (hobbies: string[]): Promise<Meetup[]> => {
  if (!hobbies || hobbies.length === 0) {
    return MOCK_MEETUPS;
  }
  
  return MOCK_MEETUPS.filter(meetup => 
    meetup.hobbies.some(hobby => hobbies.includes(hobby))
  );
};

export const createMeetup = async (meetup: Omit<Meetup, 'id' | 'createdAt'>): Promise<Meetup> => {
  // In a real app, this would call an API to create the meetup
  const newMeetup: Meetup = {
    ...meetup,
    id: MOCK_MEETUPS.length + 1,
    createdAt: new Date()
  };
  
  // For now we'll just log it
  console.log('New meetup created:', newMeetup);
  
  return newMeetup;
};

export const rsvpToMeetup = async (meetupId: number, userId: number): Promise<boolean> => {
  // In a real app, this would call an API to add the user to the meetup
  console.log(`User ${userId} RSVP'd to meetup ${meetupId}`);
  return true;
};
