import { getFromStorage, setToStorage } from './storageUtils';

export const sendNotification = (userId, message) => {
  const notifications = getFromStorage('notifications') || {};
  if (!notifications[userId]) {
    notifications[userId] = [];
  }
  notifications[userId].push({
    id: Date.now(),
    message,
    read: false,
    timestamp: new Date().toISOString()
  });
  setToStorage('notifications', notifications);
};

export const getNotifications = (userId) => {
  const notifications = getFromStorage('notifications') || {};
  return notifications[userId] || [];
};

export const markNotificationAsRead = (userId, notificationId) => {
  const notifications = getFromStorage('notifications') || {};
  if (notifications[userId]) {
    notifications[userId] = notifications[userId].map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    );
    setToStorage('notifications', notifications);
  }
};

export const notifyLowDrugStock = (drugName, currentStock, minStock) => {
  const message = `Low stock alert: ${drugName} is below minimum stock level. Current: ${currentStock}, Minimum: ${minStock}`;
  // In a real application, you might want to notify specific users or groups
  // For now, we'll just log the message
  console.warn(message);
  // You could also use the sendNotification function here if you have a system-wide notification setup
  // sendNotification('admin', message);
};