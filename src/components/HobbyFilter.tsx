
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import AnimatedTransition from './AnimatedTransition';
import { Badge } from '@/components/ui/badge';

// Mock hobby categories and data
const HOBBY_CATEGORIES = [
  { id: 'popular', label: 'Popular' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'creative', label: 'Creative' },
  { id: 'social', label: 'Social' },
  { id: 'tech', label: 'Tech' },
];

const HOBBY_DATA = {
  popular: ['Photography', 'Hiking', 'Reading', 'Cooking', 'Gaming', 'Music', 'Yoga', 'Drawing'],
  outdoor: ['Hiking', 'Cycling', 'Camping', 'Fishing', 'Kayaking', 'Climbing', 'Birdwatching', 'Gardening'],
  creative: ['Photography', 'Painting', 'Writing', 'Drawing', 'Knitting', 'Pottery', 'Singing', 'Dancing'],
  social: ['Board Games', 'Book Club', 'Dancing', 'Wine Tasting', 'Language Exchange', 'Volunteering', 'Cooking Classes'],
  tech: ['Coding', 'Game Development', '3D Printing', 'Robotics', 'Cybersecurity', 'Data Science', 'App Development'],
};

interface HobbyFilterProps {
  selectedHobbies: string[];
  onHobbyToggle: (hobby: string) => void;
  className?: string;
}

const HobbyFilter: React.FC<HobbyFilterProps> = ({
  selectedHobbies,
  onHobbyToggle,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('popular');

  // Filter hobbies based on search term
  const filteredHobbies = searchTerm
    ? Object.values(HOBBY_DATA)
        .flat()
        .filter(hobby => 
          hobby.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((hobby, index, self) => self.indexOf(hobby) === index) // Remove duplicates
    : HOBBY_DATA[activeTab as keyof typeof HOBBY_DATA];

  const handleClearSelection = () => {
    selectedHobbies.forEach(hobby => onHobbyToggle(hobby));
  };

  return (
    <div className={cn("w-full max-w-md glass p-6 rounded-2xl shadow-sm backdrop-blur-lg", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Find Your Interests</h3>
        {selectedHobbies.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs"
            onClick={handleClearSelection}
          >
            Clear ({selectedHobbies.length})
          </Button>
        )}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search hobbies..."
          className="pl-9 bg-background/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={() => setSearchTerm('')}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {searchTerm ? (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Search results for "{searchTerm}"
            </p>
            <div className="flex flex-wrap gap-2">
              {filteredHobbies.length > 0 ? (
                filteredHobbies.map((hobby, i) => (
                  <AnimatedTransition key={hobby} delay={i * 50} animationType="scale">
                    <Button
                      variant={selectedHobbies.includes(hobby) ? "default" : "outline"}
                      size="sm"
                      className="rounded-full text-xs"
                      onClick={() => onHobbyToggle(hobby)}
                    >
                      {hobby}
                    </Button>
                  </AnimatedTransition>
                ))
              ) : (
                <p className="text-sm text-muted-foreground w-full text-center py-6">
                  No hobbies found. Try a different search term.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="popular" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-5 mb-4 bg-background/50">
            {HOBBY_CATEGORIES.map(category => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-xs py-1.5"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {HOBBY_CATEGORIES.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="flex flex-wrap gap-2">
                {HOBBY_DATA[category.id as keyof typeof HOBBY_DATA].map((hobby, i) => (
                  <AnimatedTransition key={hobby} delay={i * 30} animationType="scale">
                    <Button
                      variant={selectedHobbies.includes(hobby) ? "default" : "outline"}
                      size="sm"
                      className="rounded-full text-xs"
                      onClick={() => onHobbyToggle(hobby)}
                    >
                      {hobby}
                    </Button>
                  </AnimatedTransition>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {selectedHobbies.length > 0 && (
        <>
          <Separator className="my-6" />
          <div>
            <h4 className="text-sm font-medium mb-3">Selected Hobbies</h4>
            <div className="flex flex-wrap gap-2">
              {selectedHobbies.map((hobby, i) => (
                <Badge key={hobby} variant="default" className="rounded-full pl-2 pr-1 py-1">
                  {hobby}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-primary/20"
                    onClick={() => onHobbyToggle(hobby)}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HobbyFilter;
