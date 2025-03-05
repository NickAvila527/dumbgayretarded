
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, User, Heart, Menu, X } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Function to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'glass shadow-sm backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <div className="rounded-full bg-primary p-1.5">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className="font-medium text-lg">HobbyMeet</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <AnimatedTransition delay={100} animationType="slide-down">
            <Link
              to="/explore"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Explore
            </Link>
          </AnimatedTransition>
          
          <AnimatedTransition delay={200} animationType="slide-down">
            <Link
              to="/hobbies"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Hobbies
            </Link>
          </AnimatedTransition>
          
          <AnimatedTransition delay={300} animationType="slide-down">
            <Link
              to="/premium"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Premium
            </Link>
          </AnimatedTransition>
        </nav>
        
        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <AnimatedTransition delay={400} animationType="scale">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
            </Button>
          </AnimatedTransition>
          
          <AnimatedTransition delay={500} animationType="scale">
            <Avatar className="h-9 w-9 transition-transform hover:scale-105">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </AnimatedTransition>
        </div>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass p-4 border-t border-border shadow-md animate-fade-in">
          <nav className="flex flex-col space-y-4 py-2">
            <Link
              to="/explore"
              className="text-foreground/70 hover:text-foreground transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/hobbies"
              className="text-foreground/70 hover:text-foreground transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hobbies
            </Link>
            <Link
              to="/premium"
              className="text-foreground/70 hover:text-foreground transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Premium
            </Link>
            <div className="border-t border-border my-2"></div>
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-muted-foreground">Profile</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
