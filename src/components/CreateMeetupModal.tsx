
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface CreateMeetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateMeetupModal: React.FC<CreateMeetupModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState('');
  const [isRealTime, setIsRealTime] = useState(false);
  
  const handleSubmit = () => {
    // Validation
    if (!title || !description || !location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!isRealTime && !date) {
      toast({
        title: "Missing date",
        description: "Please select a date for your scheduled meetup",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would normally save the meetup to the database
    toast({
      title: "Meetup created!",
      description: isRealTime ? "Your real-time meetup is now active" : "Your meetup has been scheduled",
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDate(undefined);
    setLocation('');
    setIsRealTime(false);
    
    // Close modal
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Meetup</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your meetup about?"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell people what to expect..."
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where is your meetup happening?"
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Label>Type</Label>
            <div className="flex gap-2">
              <Badge 
                variant={isRealTime ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setIsRealTime(true)}
              >
                Right Now
              </Badge>
              <Badge 
                variant={!isRealTime ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setIsRealTime(false)}
              >
                Scheduled
              </Badge>
            </div>
          </div>
          
          {!isRealTime && (
            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {isRealTime ? "Start Now" : "Schedule Meetup"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMeetupModal;
