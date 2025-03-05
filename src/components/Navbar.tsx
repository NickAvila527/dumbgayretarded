
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, MapPin, User, Menu, X, LogIn, Sun, Moon, Sparkles } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/explore', label: 'Explore', icon: <MapPin className="h-5 w-5" /> },
    { path: '/hobbies', label: 'Features', icon: <Sparkles className="h-5 w-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
  ];
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="fixed z-50 top-4 right-4 md:hidden h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="px-0 pt-12">
          <div className="flex flex-col h-full">
            <div className="px-6 flex items-center justify-between">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{currentUser.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {currentUser.role === 'premium' ? 'Premium' : 'Free Account'}
                    </span>
                  </div>
                </div>
              ) : (
                <Button variant="outline" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              )}
              
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
            
            <div className="mt-8 flex flex-col gap-2 px-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  onClick={handleNavigation}
                >
                  <Button 
                    variant={isActive(item.path) ? "default" : "ghost"} 
                    className="w-full justify-start text-lg h-12"
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
            
            {isAuthenticated && (
              <div className="mt-auto px-4 pb-6">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => { logout(); handleNavigation(); }}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl flex items-center">
            HobbyMeet
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={isActive(item.path) ? "default" : "ghost"} 
                  className="gap-2"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {isAuthenticated ? (
              <Link to="/profile">
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
