export type Notification = {
    id: string;
    title: string;
    description: string;
    timestamp: string; // ISO 8601 date string
    isRead: boolean;
    type: 'advisory' | 'price' | 'disease';
  };
  
  export const notifications: Notification[] = [
      {
          id: '1',
          title: 'weather.advisory',
          description: 'weather.advisoryText',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
          isRead: false,
          type: 'advisory',
      },
      {
          id: '2',
          title: 'notifications.priceAlert.title',
          description: 'notifications.priceAlert.description',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          isRead: false,
          type: 'price',
      },
      {
          id: '3',
          title: 'notifications.diseaseDetected.title',
          description: 'notifications.diseaseDetected.description',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          isRead: true,
          type: 'disease',
      },
  ];
