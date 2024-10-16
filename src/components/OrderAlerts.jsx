import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const fetchOrderAlerts = async () => {
  // This would be replaced with an actual API call in a real application
  return [
    { id: 1, message: "Order #1234 is delayed", type: "warning" },
    { id: 2, message: "Order #5678 has been shipped", type: "info" },
    { id: 3, message: "Order #9101 requires attention", type: "error" },
  ];
};

const OrderAlerts = () => {
  const { data: alerts, isLoading, error } = useQuery({
    queryKey: ['orderAlerts'],
    queryFn: fetchOrderAlerts,
  });

  if (isLoading) return <div>Loading alerts...</div>;
  if (error) return <div>Error loading alerts: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Order Alerts</h2>
      {alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.type === 'error' ? 'destructive' : alert.type}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Order Alert</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default OrderAlerts;