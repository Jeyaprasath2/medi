import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Order #{order.id}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableHead className="font-semibold">Status</TableHead>
              <TableCell>{order.status || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-semibold">Date</TableHead>
              <TableCell>{order.date ? new Date(order.date).toLocaleString() : 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableCell>{order.customer || 'N/A'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead className="font-semibold">Total</TableHead>
              <TableCell>${typeof order.total === 'number' ? order.total.toFixed(2) : 'N/A'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="text-lg font-semibold mt-4 mb-2">Order Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items && order.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name || 'N/A'}</TableCell>
                <TableCell>{item.quantity || 'N/A'}</TableCell>
                <TableCell>${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}</TableCell>
                <TableCell>${typeof item.quantity === 'number' && typeof item.price === 'number' 
                  ? (item.quantity * item.price).toFixed(2) 
                  : 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;