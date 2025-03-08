import React from 'react';
import { Notification } from '@/types/user';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  UserPlus,
  AlertCircle
} from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onClick 
}) => {
  const { theme } = useTheme();
  
  const getIcon = () => {
    switch (notification.type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'meetup':
        return <Calendar className="h-4 w-4 text-green-500" />;
      case 'follow':
        return <UserPlus className="h-4 w-4 text-purple-500" />;
      case 'system':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Format time
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    
    // If less than a day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      if (hours < 1) {
        const minutes = Math.floor(diff / 60000);
        return minutes < 1 ? 'Just now' : `${minutes}m ago`;
      }
      return `${hours}h ago`;
    }
    
    // If less than a week
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000);
      return `${days}d ago`;
    }
    
    // Otherwise show the date
    return new Date(date).toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div 
      className={cn(
        "p-4 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 transition-colors",
        notification.isRead ? "" : "bg-primary/5",
        theme === 'dark' ? 'border-gray-800 hover:bg-gray-800/50' : ''
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "rounded-full p-2 flex-shrink-0",
          notification.isRead 
            ? "bg-muted" 
            : "bg-primary/10",
          theme === 'dark' ? 'bg-gray-800' : ''
        )}>
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-medium text-sm truncate",
            notification.isRead
              ? theme === 'dark' ? 'text-gray-300' : ''
              : theme === 'dark' ? 'text-white' : 'text-foreground',
          )}>
            {notification.title}
          </h4>
          
          <p className={cn(
            "text-xs mt-0.5 text-muted-foreground line-clamp-2",
            theme === 'dark' ? 'text-gray-400' : ''
          )}>
            {notification.message}
          </p>
          
          <span className={cn(
            "text-[10px] block mt-1.5",
            theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
          )}>
            {formatTime(notification.createdAt)}
          </span>
        </div>
        
        {!notification.isRead && (
          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
