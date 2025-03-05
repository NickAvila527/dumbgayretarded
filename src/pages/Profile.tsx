
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Camera, Edit, MapPin, Save, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { useUser } from '@/contexts/UserContext';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Separator } from '@/components/ui/separator';
import { PrivacyLevel } from '@/types/user';
import HobbyFilter from '@/components/HobbyFilter';

const hobbyCategories = {
  creative: [
    'Painting & Drawing', 'Pottery & Ceramics', 'Crafting & DIY', 'Photography',
    'Theater & Acting', 'Music Jamming', 'Dancing'
  ],
  sports: [
    'Running', 'Yoga & Meditation', 'Cycling', 'Martial Arts',
    'Rock Climbing', 'Ultimate Frisbee', 'Soccer', 'Basketball'
  ],
  outdoor: [
    'Hiking', 'Camping', 'Birdwatching', 'Kayaking & Canoeing', 'Geocaching'
  ],
  gaming: [
    'Board Games', 'Dungeons & Dragons', 'Esports & Video Games', 'Chess'
  ],
  food: [
    'Cooking Clubs', 'Wine Tasting', 'Coffee Tasting', 'Baking', 'Community Gardening'
  ],
  writing: [
    'Book Clubs', 'Writing Groups', 'Philosophy & Debate', 'Foreign Language Meetups'
  ],
  collecting: [
    'Comic Con & Fan Conventions', 'Vintage & Antique Collecting', 'Coin Collecting', 'Stamp Collecting'
  ]
};

const Profile = () => {
  const { currentUser, setCurrentUser, updateUserHobbies, updatePrivacy } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [privacy, setPrivacy] = useState<PrivacyLevel>(currentUser.privacy);
  
  const toggleEditing = () => {
    if (isEditing) {
      // Save changes
      setCurrentUser({
        ...currentUser,
        name,
        bio,
        privacy
      });
    }
    setIsEditing(!isEditing);
  };

  const toggleHobby = (hobby: string) => {
    const updatedHobbies = currentUser.hobbies.includes(hobby)
      ? currentUser.hobbies.filter(h => h !== hobby)
      : [...currentUser.hobbies, hobby];
    
    updateUserHobbies(updatedHobbies);
  };

  const allHobbies = Object.values(hobbyCategories).flat();

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container max-w-3xl pt-24 pb-20 px-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Profile header with cover and avatar */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-primary/30 to-primary/10"></div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="pt-20 pb-8 px-6">
            <AnimatedTransition>
              <div className="flex justify-between items-center">
                {isEditing ? (
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="text-2xl font-bold h-auto py-1 px-2"
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={toggleEditing}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">New York City</span>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                {/* Bio */}
                <div>
                  <h2 className="text-lg font-medium mb-3">About</h2>
                  {isEditing ? (
                    <Textarea 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself and your interests..."
                      className="resize-none"
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      {currentUser.bio || "No bio yet. Click edit to add one!"}
                    </p>
                  )}
                </div>
                
                {/* Privacy settings */}
                <div>
                  <h2 className="text-lg font-medium mb-3">Privacy Settings</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show me on map</p>
                        <p className="text-sm text-muted-foreground">
                          Others can see your location when active
                        </p>
                      </div>
                      <Switch checked={currentUser.active} onCheckedChange={() => {}} />
                    </div>
                    
                    {isEditing && (
                      <div className="space-y-2">
                        <p className="font-medium">Profile visibility</p>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant={privacy === 'public' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPrivacy('public')}
                          >
                            Public
                          </Button>
                          <Button
                            variant={privacy === 'hobby-only' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPrivacy('hobby-only')}
                          >
                            Hobby matches only
                          </Button>
                          <Button
                            variant={privacy === 'anonymous' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPrivacy('anonymous')}
                          >
                            Anonymous
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Hobbies section */}
                <div>
                  <h2 className="text-lg font-medium mb-3">My Hobbies</h2>
                  {currentUser.hobbies.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentUser.hobbies.map(hobby => (
                        <Badge key={hobby} variant="secondary" className="text-sm py-1.5">
                          {hobby}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground mb-4">
                      No hobbies selected yet. Add some to find matches!
                    </p>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    Manage My Hobbies
                  </Button>
                </div>
              </div>
            </AnimatedTransition>
          </div>
        </div>
        
        <div className="mt-8">
          <HobbyFilter 
            selectedHobbies={currentUser.hobbies} 
            onHobbyToggle={toggleHobby} 
            className="mx-auto"
          />
        </div>
      </main>
    </div>
  );
};

export default Profile;
