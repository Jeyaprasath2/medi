import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCustomerById, addOrderToCustomerHistory } from '../utils/customerUtils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CustomerDetails = ({ customerId }) => {
  const queryClient = useQueryClient();
  const { data: customer, isLoading, error } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomerById(customerId),
  });

  const repeatOrderMutation = useMutation({
    mutationFn: (order) => addOrderToCustomerHistory(customerId, order),
    onSuccess: () => {
      queryClient.invalidateQueries(['customer', customerId]);
    },
  });

  const handleRepeatOrder = (order) => {
    const newOrder = { ...order, id: Date.now(), date: new Date().toISOString() };
    repeatOrderMutation.mutate(newOrder);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <p>Name: {customer.name}</p>
          <p>Email: {customer.email}</p>
          <p>Phone: {customer.phone}</p>
          <p>Credit Status: {customer.creditStatus}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Purchase History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.purchaseHistory.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleRepeatOrder(order)}>Repeat Order</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerDetails;