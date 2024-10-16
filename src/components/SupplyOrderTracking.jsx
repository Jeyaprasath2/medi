import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, Package } from 'lucide-react';

const fetchSupplyOrders = async () => {
  // This would be replaced with an actual API call in a real application
  return [
    { id: 'SO001', vendorName: 'PharmaCorp', orderDate: '2023-06-01', expectedDeliveryDate: '2023-06-10', status: 'In Transit' },
    { id: 'SO002', vendorName: 'MediSupply', orderDate: '2023-06-02', expectedDeliveryDate: '2023-06-12', status: 'Pending' },
    { id: 'SO003', vendorName: 'HealthDrugs', orderDate: '2023-05-30', expectedDeliveryDate: '2023-06-08', status: 'Delivered' },
  ];
};

const SupplyOrderTracking = () => {
  const { data: supplyOrders, isLoading, error } = useQuery({
    queryKey: ['supplyOrders'],
    queryFn: fetchSupplyOrders,
  });

  if (isLoading) return <div>Loading supply orders...</div>;
  if (error) return <div>Error loading supply orders: {error.message}</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2" />
          Supply Order Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplyOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.vendorName}</TableCell>
                <TableCell>{order.expectedDeliveryDate}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    <Package className="mr-1 h-3 w-3" />
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SupplyOrderTracking;