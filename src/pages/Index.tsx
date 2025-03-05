
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Filter, Heart, MapPin } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import HobbyFilter from '@/components/HobbyFilter';
import MapView from '@/components/MapView';
import Navbar from '@/components/Navbar';
import PremiumModal from '@/components/PremiumModal';

const Index = () => {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  const toggleHobby = (hobby: string) => {
    setSelectedHobbies(prevSelected => 
      prevSelected.includes(hobby)
        ? prevSelected.filter(h => h !== hobby)
        : [...prevSelected, hobby]
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-20 px-4 md:px-8 pb-8">
        <div className="container mx-auto">
          <AnimatedTransition delay={100} animationType="slide-up">
            <header className="text-center mb-10 mt-6">
              <div className="inline-flex items-center justify-center bg-primary/10 px-3 py-1 rounded-full mb-4">
                <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></div>
                <span className="text-xs font-medium text-primary">Find passionate people nearby</span>
              </div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight">
                Discover Hobby Enthusiasts <br className="hidden md:inline" />
                <span className="text-primary">In Your Area</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Connect with people who share your interests. Whether you're looking for a photography buddy or a yoga partner, find them on our interactive map.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="rounded-full px-6"
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Find Hobbies
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-6"
                  onClick={() => setShowPremiumModal(true)}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Go Premium
                </Button>
              </div>
            </header>
          </AnimatedTransition>
          
          <div className="relative">
            <AnimatedTransition animationType="fade" delay={300}>
              <MapView className="z-10" />
            </AnimatedTransition>
            
            {showFilterPanel && (
              <AnimatedTransition
                animationType="slide-up"
                className="absolute top-6 left-6 z-20"
              >
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-background shadow-sm"
                    onClick={() => setShowFilterPanel(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <HobbyFilter
                    selectedHobbies={selectedHobbies}
                    onHobbyToggle={toggleHobby}
                  />
                </div>
              </AnimatedTransition>
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-primary p-1.5">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium">HobbyMeet</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Connecting people through shared passions
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-xs">
                Terms
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Privacy
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                Help
              </Button>
            </div>
          </div>
        </div>
      </footer>
      
      <PremiumModal open={showPremiumModal} onOpenChange={setShowPremiumModal} />
    </div>
  );
};

export default Index;
