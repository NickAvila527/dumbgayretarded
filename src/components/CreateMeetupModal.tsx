
import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Info, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';
import { createMeetup } from '@/services/meetupService';
import { toast } from "sonner";

interface CreateMeetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateMeetupModal: React.FC<CreateMeetupModalProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { currentUser } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: {
      address: '',
      lat: currentUser.location.lat,
      lng: currentUser.location.lng
    },
    hobbies: [] as string[],
    isRealTime: true,
    startTime: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:MM
    maxAttendees: 10,
    privacy: 'public' as 'public' | 'private' | 'invite-only'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const toggleHobby = (hobby: string) => {
    if (formData.hobbies.includes(hobby)) {
      setFormData({
        ...formData,
        hobbies: formData.hobbies.filter(h => h !== hobby)
      });
    } else {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, hobby]
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validate form data
      if (!formData.title || !formData.description || !formData.location.address) {
        toast.error("Please fill all required fields");
        setIsSubmitting(false);
        return;
      }
      
      if (formData.hobbies.length === 0) {
        toast.error("Please select at least one hobby");
        setIsSubmitting(false);
        return;
      }
      
      // Create the meetup
      const meetupData = {
        ...formData,
        hostId: currentUser.id,
        attendees: [currentUser.id],
        startTime: new Date(formData.startTime),
        endTime: formData.isRealTime ? undefined : new Date(new Date(formData.startTime).getTime() + 3600000) // Default to 1 hour
      };
      
      await createMeetup(meetupData);
      
      toast.success("Meetup created successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating meetup:", error);
      toast.error("Failed to create meetup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle>Create a Meetup</DialogTitle>
          <DialogDescription>
            Host your own hobby meetup. Set the details below to get started.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Meetup Title</Label>
            <Input 
              id="title" 
              name="title" 
              placeholder="e.g. Photography Walk in the Park" 
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Describe your meetup. What will you do? What should attendees bring?" 
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location.address">Location</Label>
            <div className="flex space-x-2">
              <Input 
                id="location.address" 
                name="location.address" 
                placeholder="Address or place name" 
                className="flex-1"
                value={formData.location.address}
                onChange={handleChange}
              />
              <Button type="button" size="icon" variant="secondary">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Meetup Type</Label>
            <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label className="text-base">Real-time Meetup</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.isRealTime 
                    ? "Happening now - will show as active on the map" 
                    : "Scheduled for a future date and time"}
                </p>
              </div>
              <Switch 
                checked={formData.isRealTime}
                onCheckedChange={(checked) => 
                  setFormData({...formData, isRealTime: checked})
                }
              />
            </div>
          </div>
          
          {!formData.isRealTime && (
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <div className="flex space-x-2">
                <Input 
                  id="startTime" 
                  name="startTime" 
                  type="datetime-local"
                  className="flex-1"
                  value={formData.startTime}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 16)}
                />
                <Button type="button" size="icon" variant="secondary">
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Related Hobbies</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Select the hobbies that best describe this meetup
            </p>
            <div className="flex flex-wrap gap-2">
              {currentUser.hobbies.map(hobby => (
                <Badge 
                  key={hobby}
                  variant={formData.hobbies.includes(hobby) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleHobby(hobby)}
                >
                  {hobby}
                  {formData.hobbies.includes(hobby) && (
                    <Check className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Privacy Setting</Label>
            <RadioGroup 
              value={formData.privacy}
              onValueChange={(value) => 
                setFormData({...formData, privacy: value as 'public' | 'private' | 'invite-only'})
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">Public (Anyone can join)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private">Private (Only visible to your connections)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="invite-only" id="invite-only" />
                <Label htmlFor="invite-only">Invite Only (By invitation only)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter className="flex-col gap-2 sm:gap-0">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Meetup"}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMeetupModal;
