
import React from 'react';
import { Filter, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface MapControlsProps {
  viewMode: 'people' | 'events';
  onViewModeChange: (mode: 'people' | 'events') => void;
  activeStatus: boolean;
  onActiveStatusChange: () => void;
  allHobbies: string[];
  filteredHobbies: string[];
  onHobbyFilterToggle: (hobby: string) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  viewMode,
  onViewModeChange,
  activeStatus,
  onActiveStatusChange,
  allHobbies,
  filteredHobbies,
  onHobbyFilterToggle
}) => {
  return (
    <>
      {/* View mode toggle */}
      <div className="absolute top-4 left-4 z-20">
        <Tabs value={viewMode} onValueChange={(value) => onViewModeChange(value as 'people' | 'events')} className="glass backdrop-blur-md rounded-full p-1">
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
          checked={activeStatus} 
          onCheckedChange={onActiveStatusChange} 
        />
        <Badge variant={activeStatus ? "default" : "outline"} className="text-xs rounded-full">
          {activeStatus ? "Active" : "Hidden"}
        </Badge>
      </div>
      
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
                    onClick={() => onHobbyFilterToggle(hobby)}
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
    </>
  );
};

export default MapControls;
