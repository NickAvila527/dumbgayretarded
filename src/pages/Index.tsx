
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import AnimatedTransition from '@/components/AnimatedTransition';
import MapView from '@/components/MapView';
import Navbar from '@/components/Navbar';
import PremiumModal from '@/components/PremiumModal';

const Index = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <AnimatedTransition delay={300} animationType="fade">
          <div className="relative">
            <MapView className="z-10 h-[calc(100vh-4rem)]" />
          </div>
        </AnimatedTransition>
        
        {/* Premium button (fixed position) */}
        <div className="fixed bottom-24 right-4 z-20">
          <AnimatedTransition delay={500} animationType="scale">
            <Button 
              size="sm" 
              className="rounded-full shadow-lg flex items-center px-4 h-10"
              onClick={() => setShowPremiumModal(true)}
            >
              <Crown className="h-4 w-4 mr-2" />
              Go Premium
            </Button>
          </AnimatedTransition>
        </div>
      </main>
      
      <PremiumModal open={showPremiumModal} onOpenChange={setShowPremiumModal} />
    </div>
  );
};

export default Index;
