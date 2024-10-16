import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Truck } from 'lucide-react';

const OrderTracking = () => {
  const handleTrack = (e) => {
    e.preventDefault();
    // Handle order tracking logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2" />
          Track Your Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrack} className="space-y-4">
          <Input placeholder="Enter Order ID" required />
          <Button type="submit">Track Order</Button>
        </form>
        {/* Add order tracking results display here */}
      </CardContent>
    </Card>
  );
};

export default OrderTracking;