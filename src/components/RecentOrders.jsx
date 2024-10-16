import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardList } from 'lucide-react';

const fetchRecentOrders = async () => {
  // Simulated API call - replace with actual API call in production
  return [
    { id: 1, customer: 'John Doe', date: '2023-06-15', total: 150.00, status: 'Delivered', items: [{ name: 'Aspirin', quantity: 2 }, { name: 'Ibuprofen', quantity: 1 }] },
    { id: 2, customer: 'Jane Smith', date: '2023-06-14', total: 75.50, status: 'Processing', items: [{ name: 'Amoxicillin', quantity: 1 }] },
    { id: 3, customer: 'Bob Johnson', date: '2023-06-13', total: 200.00, status: 'Shipped', items: [{ name: 'Lisinopril', quantity: 1 }, { name: 'Metformin', quantity: 2 }] },
  ];
};

const RecentOrders = () => {
  const { data: recentOrders = [], isLoading, error } = useQuery({
    queryKey: ['recentOrders'],
    queryFn: fetchRecentOrders,
  });

  if (isLoading) return <div>Loading recent orders...</div>;
  if (error) return <div>Error loading recent orders: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClipboardList className="mr-2" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} (x{item.quantity})
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;