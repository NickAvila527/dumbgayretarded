
import React from 'react';
import { cn } from '@/lib/utils';
import { X, MapPin, Calendar, MessageCircle, Heart, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AnimatedTransition from './AnimatedTransition';

interface User {
  id: number;
  name: string;
  avatar: string;
  location: { lat: number; lng: number };
  hobbies: string[];
  active: boolean;
  premium: boolean;
}

interface UserProfileProps {
  user: User;
  onClose: () => void;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onClose, className }) => {
  return (
    <Card className={cn(
      "overflow-hidden w-full glass backdrop-blur-lg",
      user.premium ? "border-primary/30" : "",
      className
    )}>
      <div className="relative">
        {/* Banner gradient background */}
        <div className="h-32 bg-gradient-to-r from-primary/80 to-accent/80"></div>
        
        {/* Close button */}
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-3 right-3 rounded-full bg-background/30 backdrop-blur-sm hover:bg-background/50"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        {/* Avatar */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className={cn(
            "h-32 w-32 rounded-full border-4 border-card overflow-hidden",
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
        <h3 className="text-xl font-semibold">{user.name}</h3>
        <div className="flex items-center justify-center space-x-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">New York, NY</span>
        </div>
        <div className="flex items-center justify-center mt-1">
          <span className="flex items-center text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5"></div>
            Active now
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2.5">Hobbies</h4>
            <div className="flex flex-wrap gap-2">
              {user.hobbies.map((hobby, i) => (
                <AnimatedTransition key={hobby} delay={i * 50} animationType="scale">
                  <Badge variant="secondary" className="rounded-full">
                    {hobby}
                  </Badge>
                </AnimatedTransition>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2.5">About</h4>
            <p className="text-sm text-muted-foreground">
              Passionate about my hobbies and interested in meeting like-minded people. 
              Always up for sharing knowledge and having great conversations!
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-border pt-4 pb-4 flex justify-between gap-2">
        <Button variant="outline" className="w-full">
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
