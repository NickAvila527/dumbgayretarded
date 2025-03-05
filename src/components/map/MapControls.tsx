
import React, { useState } from 'react';
import { Filter, MapPin, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar } from '@/components/ui/avatar';
import { useUser } from '@/contexts/UserContext';
import AnimatedTransition from '../AnimatedTransition';

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: CategoryItem[] = [
  { id: 'creative', name: 'Creative', icon: <span className="text-lg">🎨</span> },
  { id: 'sports', name: 'Sports', icon: <span className="text-lg">⚽</span> },
  { id: 'outdoor', name: 'Outdoor', icon: <span className="text-lg">🌄</span> },
  { id: 'gaming', name: 'Gaming', icon: <span className="text-lg">🎮</span> },
  { id: 'food', name: 'Food', icon: <span className="text-lg">🍳</span> },
  { id: 'writing', name: 'Writing', icon: <span className="text-lg">✍️</span> },
  { id: 'collecting', name: 'Collecting', icon: <span className="text-lg">🏺</span> },
];

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
  const { currentUser } = useUser();
  const [searchTerm, setSearchTerm] = useState('');

  const handleHobbySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredHobbyList = searchTerm ? 
    allHobbies.filter(hobby => hobby.toLowerCase().includes(searchTerm.toLowerCase())) : 
    allHobbies;

  return (
    <>
      {/* Search bar - Airbnb style */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 z-20">
        <div className="bg-white rounded-full shadow-lg border overflow-hidden flex items-center">
          <div className="pl-4 pr-2">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input 
            type="text" 
            placeholder="Search by location or hobby"
            className="border-0 focus-visible:ring-0 bg-transparent py-6 text-base"
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full mr-1.5 h-10 w-10">
                <Filter className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[75vh] rounded-t-3xl p-0">
              <div className="py-6 px-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" className="text-primary">Clear all</Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-4">View Mode</h4>
                    <Tabs value={viewMode} onValueChange={(value) => onViewModeChange(value as 'people' | 'events')} className="w-full">
                      <TabsList className="grid grid-cols-2 w-full">
                        <TabsTrigger value="people" className="py-2.5">
                          <Users className="h-4 w-4 mr-2" />
                          People
                        </TabsTrigger>
                        <TabsTrigger value="events" className="py-2.5">
                          <MapPin className="h-4 w-4 mr-2" />
                          Events
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-2">Your visibility</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Show me on map</span>
                      <Switch 
                        checked={activeStatus} 
                        onCheckedChange={onActiveStatusChange} 
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Hobbies</h4>
                      {filteredHobbies.length > 0 && (
                        <Badge variant="outline" className="rounded-full">
                          {filteredHobbies.length} selected
                        </Badge>
                      )}
                    </div>
                    
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={searchTerm}
                        onChange={handleHobbySearch}
                        placeholder="Search hobbies"
                        className="pl-9 bg-muted/50 rounded-full"
                      />
                      {searchTerm && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full"
                          onClick={() => setSearchTerm('')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {filteredHobbyList.slice(0, 10).map(hobby => (
                        <Button
                          key={hobby}
                          variant={filteredHobbies.includes(hobby) ? "default" : "outline"}
                          size="sm"
                          className="justify-start text-sm h-auto py-2.5 whitespace-normal text-left font-normal"
                          onClick={() => onHobbyFilterToggle(hobby)}
                        >
                          {hobby}
                        </Button>
                      ))}
                    </div>
                    
                    {filteredHobbyList.length > 10 && (
                      <Button variant="ghost" size="sm" className="w-full text-primary">
                        View all hobbies
                      </Button>
                    )}
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Categories</h4>
                    <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1">
                      {categories.map(category => (
                        <Button
                          key={category.id}
                          variant="outline"
                          className="flex-col h-auto py-3 px-4 space-y-1 flex-shrink-0"
                        >
                          {category.icon}
                          <span className="text-xs">{category.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 sticky bottom-0 pt-4 pb-6">
                  <Button className="w-full py-6 text-base rounded-xl">Show Results</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Bottom bar with account and location */}
      <div className="absolute bottom-8 left-0 right-0 mx-auto w-full max-w-sm z-20 flex justify-center">
        <div className="bg-white rounded-full shadow-lg border py-2 px-4 flex items-center gap-3">
          <div className="h-2.5 w-2.5 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">New York City</span>
          <div className="h-4 w-[1px] bg-border mx-1"></div>
          <Avatar className="h-7 w-7">
            <img src={currentUser.avatar} alt={currentUser.name} className="h-full w-full object-cover" />
          </Avatar>
        </div>
      </div>
      
      {/* Category tabs - inspired by Airbnb */}
      <AnimatedTransition animationType="fade" delay={300}>
        <div className="absolute top-24 left-0 right-0 z-20">
          <div className="flex justify-center">
            <div className="flex overflow-x-auto gap-4 pb-2 px-4 max-w-3xl mx-auto">
              {categories.map((category, i) => (
                <div key={category.id} className="flex flex-col items-center flex-shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-16 w-16 rounded-full bg-white shadow-sm mb-1"
                  >
                    {category.icon}
                  </Button>
                  <span className="text-xs font-medium whitespace-nowrap">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedTransition>
    </>
  );
};

export default MapControls;
