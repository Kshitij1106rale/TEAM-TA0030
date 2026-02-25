'use client';

import { useState } from 'react';
import { Bell, Wind, BarChart, Sprout, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/providers/i18n-provider';
import { notifications as initialNotifications, type Notification } from '@/lib/notifications';
import { formatDistanceToNow } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const localeMap = {
  en: enUS,
  hi,
  mr: enUS, // Using English locale as a fallback for Marathi dates
};

const typeIcons: {[key: string]: React.ReactNode} = {
  advisory: <Wind className="h-5 w-5 text-blue-500" />,
  price: <BarChart className="h-5 w-5 text-green-500" />,
  disease: <Sprout className="h-5 w-5 text-red-500" />,
};

export default function NotificationsPage() {
  const { t, language } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, isRead: true})));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-start gap-4 md:items-center">
        <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg">
          <Bell className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-headline">{t('notifications.allNotifications.title')}</h1>
          <p className="text-muted-foreground">
            {t('notifications.allNotifications.description')}
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('notifications.title')}</CardTitle>
          {unreadCount > 0 && (
            <Button variant="link" onClick={markAllAsRead}>
              {t('notifications.markAllAsRead')}
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2">
            {notifications.length > 0 ? notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className={cn("flex items-start gap-4 p-4", !notification.isRead && "bg-accent/50")}>
                  <div className="mt-1 flex-shrink-0">
                      {typeIcons[notification.type]}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold">{t(notification.title)}</p>
                    <p className="text-sm text-muted-foreground">{t(notification.description)}</p>
                    <p className="text-xs text-muted-foreground/80">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true, locale: localeMap[language] })}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                       <Check className="h-4 w-4 mr-2" />
                       {t('notifications.allNotifications.markAsRead')}
                    </Button>
                  )}
                </div>
                {index < notifications.length - 1 && <Separator />}
              </div>
            )) : (
              <div className="text-center text-sm text-muted-foreground p-8">
                {t('notifications.allNotifications.noNotifications')}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
