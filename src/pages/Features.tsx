
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sun, Moon, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/contexts/ThemeContext';
import AnimatedTransition from '@/components/AnimatedTransition';

const Features = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const features = [
    {
      id: 1,
      title: "User Profiles & Interests",
      description: [
        "Create profiles with your hobby interests",
        "AI-driven recommendations for meetups based on preferences",
        "Set privacy levels (public, hobby-only, or anonymous)"
      ],
      icon: "👤"
    },
    {
      id: 2,
      title: "Real-Time & Scheduled Meetups",
      description: [
        "Drop-in Mode for instant nearby hobby meetups",
        "Planner Mode for future scheduled hobby gatherings",
        "RSVP & Check-In to let hosts know who's attending"
      ],
      icon: "🗓️"
    },
    {
      id: 3,
      title: "Geolocation & Smart Discovery",
      description: [
        "Map-based interface showing nearby hobby activities",
        "Location hotspots for popular hobby locations",
        "Filters for age, experience level, and more"
      ],
      icon: "🗺️"
    },
    {
      id: 4,
      title: "Group & Community Features",
      description: [
        "Hobby-specific chats and forums",
        "Create private or public hobby groups",
        "Friend system to connect with favorite organizers"
      ],
      icon: "👥"
    },
    {
      id: 5,
      title: "Monetization & Perks",
      description: [
        "Premium features for exclusive meetups",
        "Local business partnerships for hobby spaces",
        "Event ticketing for special gatherings"
      ],
      icon: "✨"
    },
    {
      id: 6,
      title: "Safety & Moderation",
      description: [
        "Verified hosts and review system",
        "Private and invite-only event options",
        "Code of conduct and reporting system"
      ],
      icon: "🛡️"
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-muted/20'}`}>
      <Navbar />
      
      <main className="container max-w-4xl pt-24 pb-20 px-4">
        <AnimatedTransition delay={100} animationType="slide-up">
          <header className="text-center mb-12">
            <h1 className={`text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : ''}`}>HobbyMeet Features</h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`}>
              Discover how HobbyMeet brings hobby enthusiasts together
            </p>
          </header>
        </AnimatedTransition>
        
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <AnimatedTransition key={feature.id} delay={200 + index * 100} animationType="slide-up">
              <div className={`p-6 rounded-xl h-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white shadow-sm border border-gray-100'}`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h2 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : ''}`}>{feature.title}</h2>
                <ul className="space-y-2">
                  {feature.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className={`h-5 w-5 mr-2 flex-shrink-0 ${theme === 'dark' ? 'text-primary' : 'text-green-500'}`} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedTransition>
          ))}
        </div>
        
        <AnimatedTransition delay={900} animationType="fade">
          <div className="mt-12 text-center space-y-6">
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`}>
              Ready to find your hobby community?
            </p>
            <Button size="lg" onClick={() => navigate('/explore')} className="rounded-full px-8">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className={`mt-12 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-primary/5'} inline-block`}>
              <h3 className={`text-lg font-medium mb-3 ${theme === 'dark' ? 'text-white' : ''}`}>
                <span className="inline-block mr-2">🌓</span> Dark Mode
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-muted-foreground'}`}>
                Toggle between light and dark mode for comfortable browsing day or night.
              </p>
              <Button 
                variant="outline" 
                onClick={toggleTheme}
                className={`h-10 ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : ''}`}
              >
                {theme === 'dark' ? (
                  <><Sun className="h-4 w-4 mr-2" /> Light Mode</>
                ) : (
                  <><Moon className="h-4 w-4 mr-2" /> Dark Mode</>
                )}
              </Button>
            </div>
          </div>
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Features;
