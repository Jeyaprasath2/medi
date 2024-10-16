import React from 'react';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Notifications = ({ notifications }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li key={notification.id} className="bg-gray-100 p-2 rounded">
                {notification.message}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;