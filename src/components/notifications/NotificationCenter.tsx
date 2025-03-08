
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/contexts/UserContext';
import { Notification } from '@/types/user';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import NotificationItem from './NotificationItem';

const NotificationCenter: React.FC = () => {
  const { getNotifications, markNotificationAsRead } = useUser();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  
  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const handleNotificationClick = (notification: Notification) => {
    markNotificationAsRead(notification.id);
    // In a real app, this would navigate to the relevant page
    console.log(`Navigate to notification: ${notification.type}, ID: ${notification.relatedId}`);
    setOpen(false);
  };
  
  const handleMarkAllAsRead = () => {
    notifications.forEach(notification => {
      markNotificationAsRead(notification.id);
    });
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-80 p-0 max-h-96 overflow-hidden flex flex-col",
          theme === 'dark' ? 'bg-gray-900 border-gray-800' : ''
        )}
        align="end"
      >
        <div className="p-4 flex items-center justify-between">
          <h3 className={cn(
            "font-medium text-sm",
            theme === 'dark' ? 'text-gray-200' : ''
          )}>
            Notifications
          </h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto py-1 px-2 text-xs"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <Separator className={theme === 'dark' ? 'bg-gray-800' : ''} />
        
        <div className="overflow-y-auto flex-grow">
          {notifications.length > 0 ? (
            <div>
              {notifications.map(notification => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className={cn(
                "text-sm text-muted-foreground",
                theme === 'dark' ? 'text-gray-400' : ''
              )}>
                No notifications yet
              </p>
            </div>
          )}
        </div>
        
        <Separator className={theme === 'dark' ? 'bg-gray-800' : ''} />
        
        <div className="p-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full text-xs justify-center"
            onClick={() => setOpen(false)}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
