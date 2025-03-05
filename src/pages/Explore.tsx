
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Sliders, MapPin, Clock, Users } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedTransition from '@/components/AnimatedTransition';

// Mock data for upcoming meetups
const UPCOMING_MEETUPS = [
  {
    id: 1,
    title: 'Photography Walk in Central Park',
    date: 'Tomorrow, 2:00 PM',
    location: 'Central Park, New York',
    hobbies: ['Photography', 'Hiking'],
    attendees: 8,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470'
  },
  {
    id: 2,
    title: 'Board Game Night',
    date: 'Thu, 7:00 PM',
    location: 'The Board Game Cafe, Manhattan',
    hobbies: ['Board Games', 'Gaming'],
    attendees: 12,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09'
  },
  {
    id: 3,
    title: 'Beginner Pottery Workshop',
    date: 'Sat, 10:00 AM',
    location: 'Clay Studio, Brooklyn',
    hobbies: ['Pottery & Ceramics', 'Crafting & DIY'],
    attendees: 6,
    image: 'https://images.unsplash.com/photo-1565560408000-6d95047b295e'
  },
];

// Mock data for hobby groups
const HOBBY_GROUPS = [
  {
    id: 1,
    name: 'NYC Photography Enthusiasts',
    members: 235,
    hobbies: ['Photography', 'Hiking', 'Urban Exploration'],
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e'
  },
  {
    id: 2,
    name: 'Brooklyn Board Game Collective',
    members: 147,
    hobbies: ['Board Games', 'Strategy Games', 'Card Games'],
    image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176'
  },
  {
    id: 3,
    name: 'Queens Cooking Club',
    members: 89,
    hobbies: ['Cooking', 'Baking', 'Food Tasting'],
    image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf'
  },
];

const Explore = () => {
  const [activeTab, setActiveTab] = useState('meetups');
  
  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container max-w-4xl pt-24 pb-20 px-4">
        <AnimatedTransition delay={100} animationType="slide-up">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Explore</h1>
            <p className="text-muted-foreground">
              Discover events, groups and people with similar interests
            </p>
          </header>
        </AnimatedTransition>
        
        <AnimatedTransition delay={200}>
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search events, groups or hobbies" 
              className="pl-10 py-6 text-lg rounded-xl bg-white"
            />
            <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Sliders className="h-5 w-5" />
            </Button>
          </div>
        </AnimatedTransition>
        
        <AnimatedTransition delay={300}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="meetups" className="py-3">
                Upcoming Meetups
              </TabsTrigger>
              <TabsTrigger value="groups" className="py-3">
                Hobby Groups
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </AnimatedTransition>
        
        {activeTab === 'meetups' ? (
          <div className="space-y-6">
            {UPCOMING_MEETUPS.map((meetup, i) => (
              <AnimatedTransition key={meetup.id} delay={400 + i * 100} animationType="slide-up">
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img 
                        src={meetup.image} 
                        alt={meetup.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {meetup.hobbies.map(hobby => (
                              <Badge key={hobby} variant="secondary" className="rounded-full">
                                {hobby}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{meetup.title}</h3>
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">{meetup.date}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground mb-4">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{meetup.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {meetup.attendees} attending
                            </span>
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </AnimatedTransition>
            ))}
            
            <Button variant="outline" className="w-full py-6">Load More</Button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {HOBBY_GROUPS.map((group, i) => (
              <AnimatedTransition key={group.id} delay={400 + i * 100} animationType="slide-up">
                <Card className="overflow-hidden h-full">
                  <div className="relative h-40">
                    <img 
                      src={group.image} 
                      alt={group.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white font-semibold text-lg">{group.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.hobbies.map(hobby => (
                        <Badge key={hobby} variant="outline" className="rounded-full">
                          {hobby}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-white">
                              <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Member" />
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          {group.members} members
                        </span>
                      </div>
                      <Button size="sm" variant="outline">Join</Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedTransition>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Explore;
