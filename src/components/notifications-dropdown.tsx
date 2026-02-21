'use client';

import { useState } from 'react';
import { Bell, Wind, BarChart, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/providers/i18n-provider';
import { notifications as initialNotifications, type Notification } from '@/lib/notifications';
import { Badge } from './ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const localeMap = {
  en: enUS,
  hi,
  mr: enUS, // Using English locale as a fallback for Marathi dates
};

const typeIcons: {[key: string]: React.ReactNode} = {
  advisory: <Wind className="h-4 w-4 text-blue-500" />,
  price: <BarChart className="h-4 w-4 text-green-500" />,
  disease: <Sprout className="h-4 w-4 text-red-500" />,
};


export function NotificationsDropdown() {
  const { t, language } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, isRead: true})));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute top-0 right-0 h-4 w-4 justify-center p-0 text-xs">{unreadCount}</Badge>
          )}
          <span className="sr-only">{t('header.notifications')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 md:w-96">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className='p-0'>{t('notifications.title')}</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={markAllAsRead}>
              {t('notifications.markAllAsRead')}
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? notifications.map(notification => (
          <DropdownMenuItem key={notification.id} onSelect={(e) => {e.preventDefault(); markAsRead(notification.id)}} className={cn("flex items-start gap-3 p-2 cursor-pointer", !notification.isRead && "bg-accent/50")}>
            <div className="mt-1 flex-shrink-0">
                { !notification.isRead && <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" /> }
                {typeIcons[notification.type]}
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-sm leading-tight">{t(notification.title)}</p>
              <p className="text-xs text-muted-foreground leading-snug">{t(notification.description)}</p>
              <p className="text-xs text-muted-foreground/80">
                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true, locale: localeMap[language] })}
              </p>
            </div>
          </DropdownMenuItem>
        )) : (
            <div className="text-center text-sm text-muted-foreground py-8">
                {t('notifications.noNotifications')}
            </div>
        )}
        </div>
        {notifications.length > 0 && 
            <>
                <DropdownMenuSeparator />
                <div className="p-1">
                    <Button variant="link" asChild className="w-full justify-center text-sm">
                        <Link href="#">{t('notifications.viewAll')}</Link>
                    </Button>
                </div>
            </>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
