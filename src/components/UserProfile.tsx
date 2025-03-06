
import React from 'react';
import { cn } from '@/lib/utils';
import { X, MapPin, Calendar, MessageCircle, Heart, Crown, Users, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AnimatedTransition from './AnimatedTransition';
import { useTheme } from '@/contexts/ThemeContext';

interface User {
  id: number;
  name: string;
  avatar: string;
  location: { lat: number; lng: number };
  hobbies: string[];
  active: boolean;
  premium: boolean;
  bio?: string;
  privacy?: 'public' | 'hobby-only' | 'anonymous';
}

interface UserProfileProps {
  user: User;
  onClose: () => void;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onClose, className }) => {
  const { theme } = useTheme();
  
  return (
    <Card className={cn(
      "overflow-hidden w-full glass backdrop-blur-lg",
      user.premium ? "border-primary/30" : "",
      theme === 'dark' ? 'bg-gray-900/70 border-gray-800' : '',
      className
    )}>
      <div className="relative">
        {/* Banner gradient background */}
        <div className={`h-32 ${
          theme === 'dark' 
            ? 'bg-gradient-to-r from-primary/50 to-purple-700/50' 
            : 'bg-gradient-to-r from-primary/80 to-accent/80'
        }`}></div>
        
        {/* Close button */}
        <Button 
          size="icon" 
          variant="ghost" 
          className={`absolute top-3 right-3 rounded-full backdrop-blur-sm hover:bg-background/50 ${
            theme === 'dark' ? 'bg-gray-900/30' : 'bg-background/30'
          }`}
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        {/* Avatar */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className={cn(
            "h-32 w-32 rounded-full border-4 overflow-hidden",
            theme === 'dark' ? 'border-gray-800' : 'border-card',
            user.premium ? "ring-2 ring-primary" : ""
          )}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-full w-full object-cover"
            />
          </div>
          {user.premium && (
            <span className="absolute top-0 right-0 bg-primary text-white rounded-full p-1.5">
              <Crown className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
      
      <CardHeader className="pt-20 pb-4 text-center">
        <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>{user.name}</h3>
        <div className="flex items-center justify-center space-x-2">
          <MapPin className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`} />
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'}`}>New York, NY</span>
        </div>
        <div className="flex justify-center items-center gap-2 mt-1">
          <span className="flex items-center text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5"></div>
            Active now
          </span>
          
          {user.privacy && (
            <span className="flex items-center text-xs px-2 py-0.5 bg-secondary/10 text-secondary-foreground rounded-full">
              <Shield className="h-3 w-3 mr-1" />
              {user.privacy === 'public' 
                ? 'Public profile' 
                : user.privacy === 'hobby-only' 
                  ? 'Visible to hobby matches'
                  : 'Anonymous'}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        <div className="space-y-6">
          {user.bio && (
            <div>
              <h4 className={`text-sm font-medium mb-2.5 ${theme === 'dark' ? 'text-gray-300' : ''}`}>About</h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
              }`}>
                {user.bio || "Passionate about my hobbies and interested in meeting like-minded people. Always up for sharing knowledge and having great conversations!"}
              </p>
            </div>
          )}
          
          <div>
            <h4 className={`text-sm font-medium mb-2.5 ${theme === 'dark' ? 'text-gray-300' : ''}`}>Hobbies</h4>
            <div className="flex flex-wrap gap-2">
              {user.hobbies.map((hobby, i) => (
                <AnimatedTransition key={hobby} delay={i * 50} animationType="scale">
                  <Badge 
                    variant="secondary" 
                    className={`rounded-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : ''}`}
                  >
                    {hobby}
                  </Badge>
                </AnimatedTransition>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className={`text-sm font-medium mb-2.5 ${theme === 'dark' ? 'text-gray-300' : ''}`}>Activity</h4>
            <div className={`flex items-center justify-between text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground'
            }`}>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>12 meetups joined</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>5 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className={`border-t pt-4 pb-4 flex justify-between gap-2 ${
        theme === 'dark' ? 'border-gray-800' : 'border-border'
      }`}>
        <Button 
          variant="outline" 
          className={`w-full ${theme === 'dark' ? 'border-gray-800 hover:bg-gray-800 text-gray-300' : ''}`}
        >
          <Calendar className="h-4 w-4 mr-2" />
          <span>Schedule</span>
        </Button>
        <Button className="w-full">
          <MessageCircle className="h-4 w-4 mr-2" />
          <span>Connect</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
