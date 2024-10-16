import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Package, RefreshCw, Clock, AlertTriangle, ShoppingCart } from 'lucide-react';
import { getInventoryMetrics } from '../utils/inventoryUtils';

const MetricCard = ({ title, value, icon: Icon, progress }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {progress && (
        <Progress
          value={progress}
          className="mt-2"
          indicatorColor={progress > 70 ? "bg-green-500" : progress > 30 ? "bg-yellow-500" : "bg-red-500"}
        />
      )}
    </CardContent>
  </Card>
);

const InventoryMetrics = () => {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['inventoryMetrics'],
    queryFn: getInventoryMetrics,
    refetchInterval: 60000, // Refetch every minute for real-time updates
  });

  if (isLoading) return <div>Loading inventory metrics...</div>;
  if (error) return <div>Error loading inventory metrics: {error.message}</div>;

  if (!metrics) return <div>No inventory metrics available.</div>;

  const lowStockItems = metrics.lowStockItems || [];
  const expiringItems = metrics.expiringItems || [];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard 
          title="Total Stock Value" 
          value={`$${metrics.totalStockValue?.toLocaleString() ?? 'N/A'}`} 
          icon={Package} 
          progress={metrics.stockValueProgress}
        />
        <MetricCard 
          title="Total SKUs" 
          value={metrics.totalSKUs?.toString() ?? 'N/A'} 
          icon={Package} 
        />
        <MetricCard 
          title="Avg. Replenishment Time" 
          value={`${metrics.avgReplenishmentTime?.toString() ?? 'N/A'} days`} 
          icon={RefreshCw} 
        />
        <MetricCard 
          title="Stock Turnover Rate" 
          value={`${metrics.stockTurnoverRate?.toFixed(2) ?? 'N/A'}x`} 
          icon={RefreshCw} 
        />
        <MetricCard 
          title="On-Time Deliveries" 
          value={`${(metrics.onTimeDeliveries * 100)?.toFixed(1) ?? 'N/A'}%`} 
          icon={Clock} 
          progress={metrics.onTimeDeliveries * 100}
        />
        <MetricCard 
          title="Out-of-Stock Incidents" 
          value={metrics.outOfStockIncidents?.toString() ?? 'N/A'} 
          icon={AlertTriangle} 
        />
      </div>

      {lowStockItems.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Low Stock Alert</AlertTitle>
          <AlertDescription>
            The following items are running low on stock:
            <ul className="mt-2 list-disc list-inside">
              {lowStockItems.map((item, index) => (
                <li key={index}>
                  {item.name} - Current stock: {item.currentStock}, Threshold: {item.threshold}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {expiringItems.length > 0 && (
        <Alert variant="warning">
          <Clock className="h-4 w-4" />
          <AlertTitle>Expiring Drugs Alert</AlertTitle>
          <AlertDescription>
            The following drugs are nearing their expiry date:
            <ul className="mt-2 list-disc list-inside">
              {expiringItems.map((item, index) => (
                <li key={index}>
                  {item.name} - Expiry date: {new Date(item.expiryDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default InventoryMetrics;