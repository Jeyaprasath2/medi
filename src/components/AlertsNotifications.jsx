import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const fetchAlerts = async () => {
  // This would be replaced with an actual API call
  return [
    { id: 1, type: 'error', message: 'Critical low stock: Aspirin' },
    { id: 2, type: 'warning', message: 'Shipment delayed: Order #1234' },
    { id: 3, type: 'info', message: 'New vendor application received' },
    { id: 4, type: 'success', message: 'Restocked: Ibuprofen' },
  ];
};

const AlertsNotifications = () => {
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
  });

  if (isLoading) return <div>Loading alerts...</div>;
  if (error) return <div>Error loading alerts: {error.message}</div>;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <Info className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts & Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <Alert key={alert.id} variant={alert.type}>
            {getAlertIcon(alert.type)}
            <AlertTitle className="capitalize">{alert.type}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlertsNotifications;