import { create } from 'zustand'

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'booking' | 'message' | 'promo';
  isRead: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notif: Omit<Notification, 'id' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: '1',
      title: 'ยินดีต้อนรับสู่ Vientiane Nest!',
      message: 'เริ่มค้นหาที่พักในฝันของคุณในเวียงจันทน์ได้เลยค่ะ',
      time: '2 ชม. ที่แล้ว',
      type: 'promo',
      isRead: false
    },
    {
      id: '2',
      title: 'ข้อความใหม่จาก Sarah',
      message: 'สวัสดีค่ะ มีอะไรให้เซร่าช่วยไหมคะ?',
      time: '5 นาทีที่แล้ว',
      type: 'message',
      isRead: false
    }
  ],
  unreadCount: 2,
  addNotification: (notif) => set((state) => {
    const newNotif = { ...notif, id: Math.random().toString(), isRead: false };
    return {
      notifications: [newNotif, ...state.notifications],
      unreadCount: state.unreadCount + 1
    };
  }),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n),
    unreadCount: Math.max(0, state.unreadCount - 1)
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, isRead: true })),
    unreadCount: 0
  }))
}));
