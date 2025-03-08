
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Camera, Edit, MapPin, Save, User, Settings, Bell, Shield, Calendar, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { useUser } from '@/contexts/UserContext';
import AnimatedTransition from '@/components/AnimatedTransition';
import { Separator } from '@/components/ui/separator';
import { PrivacyLevel } from '@/types/user';
import HobbyFilter from '@/components/HobbyFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

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
  const { currentUser, setCurrentUser, updateUserHobbies, updatePrivacy, toggleActiveStatus, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [privacy, setPrivacy] = useState<PrivacyLevel>(currentUser.privacy);
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationPreferences, setNotificationPreferences] = useState(
    currentUser.notificationPreferences || {
      email: true,
      push: true,
      meetupReminders: true,
      newMessages: true,
      newFollowers: true,
    }
  );
  const { toast } = useToast();
  
  const toggleEditing = () => {
    if (isEditing) {
      // Save changes
      updateProfile({
        name,
        bio,
        privacy,
        notificationPreferences
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
  
  const handleNotificationPrefChange = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleImageUpload = () => {
    toast({
      title: "Feature coming soon",
      description: "Profile image upload will be available in the next update",
    });
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <Navbar />
      
      <main className="container max-w-4xl pt-24 pb-20 px-4">
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="profile" className="text-sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="privacy" className="text-sm">
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  {/* Profile header with cover and avatar */}
                  <div className="relative">
                    <div className="h-32 bg-gradient-to-r from-primary/30 to-primary/10"></div>
                    <div className="absolute -bottom-16 left-8">
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
                          onClick={handleImageUpload}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile content */}
                  <CardContent className="pt-20 pb-8 px-8">
                    <AnimatedTransition>
                      <div className="flex justify-between items-center">
                        {isEditing ? (
                          <Input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="text-2xl font-bold h-auto py-1 px-2 max-w-xs"
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
                        <span className="text-sm">
                          {currentUser.location.address || "New York City"}
                        </span>
                      </div>
                      
                      {currentUser.email && (
                        <div className="mt-2 text-muted-foreground text-sm">
                          {currentUser.email}
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-semibold">{currentUser.meetupsHosted || 0}</span>
                          <span className="text-xs text-muted-foreground">Hosted</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-semibold">{currentUser.meetupsJoined || 0}</span>
                          <span className="text-xs text-muted-foreground">Joined</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-semibold">{currentUser.followers?.length || 0}</span>
                          <span className="text-xs text-muted-foreground">Followers</span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-semibold">{currentUser.following?.length || 0}</span>
                          <span className="text-xs text-muted-foreground">Following</span>
                        </div>
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
                        </div>
                        
                        {/* Recent Activity */}
                        <div>
                          <h2 className="text-lg font-medium mb-3">Recent Activity</h2>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <Calendar className="h-5 w-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium">Joined a Hiking meetup</p>
                                <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <Users className="h-5 w-5 text-primary" />
                              <div>
                                <p className="text-sm font-medium">Added Photography as a hobby</p>
                                <p className="text-xs text-muted-foreground">2 days ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedTransition>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <AnimatedTransition>
                  <Card className="sticky top-24">
                    <CardHeader className="pb-3">
                      <h3 className="text-lg font-medium">Manage Your Hobbies</h3>
                    </CardHeader>
                    <CardContent>
                      <HobbyFilter 
                        selectedHobbies={currentUser.hobbies} 
                        onHobbyToggle={toggleHobby} 
                      />
                    </CardContent>
                  </Card>
                </AnimatedTransition>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Privacy Settings</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Show me on map</p>
                      <p className="text-sm text-muted-foreground">
                        Others can see your location when active
                      </p>
                    </div>
                    <Switch 
                      checked={currentUser.active} 
                      onCheckedChange={toggleActiveStatus} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <p className="font-medium">Profile visibility</p>
                    <div className="grid gap-2">
                      <div className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer"
                           onClick={() => isEditing && setPrivacy('public')}>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          privacy === 'public' ? 'border-primary bg-primary/10' : 'border-muted-foreground'
                        }`}>
                          {privacy === 'public' && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">Public</p>
                          <p className="text-sm text-muted-foreground">Your profile is visible to everyone</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer"
                           onClick={() => isEditing && setPrivacy('hobby-only')}>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          privacy === 'hobby-only' ? 'border-primary bg-primary/10' : 'border-muted-foreground'
                        }`}>
                          {privacy === 'hobby-only' && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">Hobby matches only</p>
                          <p className="text-sm text-muted-foreground">Only visible to users with matching hobbies</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 cursor-pointer"
                           onClick={() => isEditing && setPrivacy('anonymous')}>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          privacy === 'anonymous' ? 'border-primary bg-primary/10' : 'border-muted-foreground'
                        }`}>
                          {privacy === 'anonymous' && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">Anonymous</p>
                          <p className="text-sm text-muted-foreground">Your personal details are hidden</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <p className="font-medium">Blocked users</p>
                    {currentUser.blockedUsers && currentUser.blockedUsers.length > 0 ? (
                      <div className="space-y-2">
                        {currentUser.blockedUsers.map(userId => (
                          <div key={userId} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                            <span>User #{userId}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8"
                            >
                              Unblock
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        You haven't blocked any users
                      </p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      This action cannot be undone and will permanently delete your account and data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about activity
                      </p>
                    </div>
                    <Switch 
                      checked={notificationPreferences.email} 
                      onCheckedChange={() => handleNotificationPrefChange('email')} 
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </div>
                    <Switch 
                      checked={notificationPreferences.push} 
                      onCheckedChange={() => handleNotificationPrefChange('push')} 
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <p className="font-medium">Notify me about</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Meetup reminders</p>
                        <Switch 
                          checked={notificationPreferences.meetupReminders} 
                          onCheckedChange={() => handleNotificationPrefChange('meetupReminders')} 
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm">New messages</p>
                        <Switch 
                          checked={notificationPreferences.newMessages} 
                          onCheckedChange={() => handleNotificationPrefChange('newMessages')} 
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm">New followers</p>
                        <Switch 
                          checked={notificationPreferences.newFollowers} 
                          onCheckedChange={() => handleNotificationPrefChange('newFollowers')} 
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
