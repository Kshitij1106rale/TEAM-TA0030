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
          timestamp: '2024-07-23T09:30:00.000Z',
          isRead: false,
          type: 'advisory',
      },
      {
          id: '2',
          title: 'notifications.priceAlert.title',
          description: 'notifications.priceAlert.description',
          timestamp: '2024-07-23T08:00:00.000Z',
          isRead: false,
          type: 'price',
      },
      {
          id: '3',
          title: 'notifications.diseaseDetected.title',
          description: 'notifications.diseaseDetected.description',
          timestamp: '2024-07-22T10:00:00.000Z',
          isRead: true,
          type: 'disease',
      },
  ];
