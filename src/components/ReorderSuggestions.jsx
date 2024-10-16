import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, ShoppingCart } from 'lucide-react';

const fetchInventoryData = async () => {
  // This would be replaced with an actual API call in a real application
  return [
    { id: 1, name: 'Aspirin', currentStock: 100, threshold: 150, pendingOrder: false },
    { id: 2, name: 'Ibuprofen', currentStock: 50, threshold: 100, pendingOrder: true },
    { id: 3, name: 'Amoxicillin', currentStock: 20, threshold: 75, pendingOrder: false },
  ];
};

const ReorderSuggestions = () => {
  const { data: inventory, isLoading, error } = useQuery({
    queryKey: ['inventoryData'],
    queryFn: fetchInventoryData,
  });

  if (isLoading) return <div>Loading inventory data...</div>;
  if (error) return <div>Error loading inventory data: {error.message}</div>;

  const lowStockItems = inventory.filter(item => item.currentStock < item.threshold);
  const criticallyLowItems = inventory.filter(item => item.currentStock < item.threshold * 0.5);
  const pendingOrders = inventory.filter(item => item.pendingOrder);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2 text-blue-500" />
          Reorder Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {criticallyLowItems.length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Critical Low Stock</AlertTitle>
            <AlertDescription>
              The following items are critically low and need immediate reordering.
            </AlertDescription>
          </Alert>
        )}
        {pendingOrders.length > 0 && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Pending Purchase Orders</AlertTitle>
            <AlertDescription>
              The following items have pending purchase orders.
            </AlertDescription>
          </Alert>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Drug Name</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.currentStock}</TableCell>
                <TableCell>{item.threshold}</TableCell>
                <TableCell>
                  {item.currentStock < item.threshold * 0.5 ? (
                    <span className="text-red-500 font-semibold">Critical - Reorder Immediately</span>
                  ) : item.pendingOrder ? (
                    <span className="text-yellow-500 font-semibold">Pending Order</span>
                  ) : (
                    <span className="text-orange-500 font-semibold">Low Stock - Consider Reordering</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReorderSuggestions;