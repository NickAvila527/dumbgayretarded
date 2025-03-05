
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, Crown, X } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  recommended?: boolean;
}

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 9.99,
    period: 'month',
    features: [
      'Advanced hobby filters',
      'Priority in map view',
      'No ads',
      'Unlimited connections',
      'Premium badge'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 99.99,
    period: 'year',
    features: [
      'Advanced hobby filters',
      'Priority in map view',
      'No ads',
      'Unlimited connections',
      'Premium badge',
      'Early access to new features'
    ],
    recommended: true
  }
];

const PremiumModal: React.FC<PremiumModalProps> = ({ open, onOpenChange }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleUpgrade = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
    }, 2000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass backdrop-blur-lg border-none">
        <DialogHeader>
          <div className="mx-auto mb-6 bg-primary/10 p-3 rounded-full">
            <Crown className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">Upgrade to Premium</DialogTitle>
          <DialogDescription className="text-center max-w-xs mx-auto">
            Get the most out of your hobby connections with our premium features.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          {PREMIUM_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-xl border p-4 transition-all cursor-pointer",
                selectedPlan === plan.id ? "border-primary bg-primary/5" : "bg-background/50 hover:border-primary/50"
              )}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.recommended && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  Best value
                </span>
              )}
              
              <div className="text-center mb-4">
                <h3 className="font-medium">{plan.name}</h3>
                <div className="mt-2 flex items-baseline justify-center">
                  <span className="text-2xl font-bold">${plan.price}</span>
                  <span className="text-xs text-muted-foreground ml-1">/{plan.period}</span>
                </div>
                {plan.id === 'yearly' && (
                  <span className="text-xs text-primary mt-1 block">Save 17%</span>
                )}
              </div>
              
              <ul className="space-y-1.5 text-sm mb-4">
                {plan.features.map((feature, index) => (
                  <AnimatedTransition
                    key={index}
                    delay={index * 50}
                    animationType="fade"
                    className="flex items-center"
                  >
                    <Check className="h-3.5 w-3.5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </AnimatedTransition>
                ))}
              </ul>
              
              {selectedPlan === plan.id && (
                <div className="absolute top-2 right-2 h-3 w-3 bg-primary rounded-full" />
              )}
            </div>
          ))}
        </div>
        
        <DialogFooter className="flex-col gap-2 sm:gap-0">
          <Button className="w-full" onClick={handleUpgrade} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <span className="animate-spin mr-2">●</span>
                Processing...
              </>
            ) : (
              `Upgrade Now`
            )}
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => onOpenChange(false)}>
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumModal;
