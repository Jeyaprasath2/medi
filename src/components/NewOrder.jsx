import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';

const NewOrder = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2" />
          Place New Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Drug Name" required />
          <Input type="number" placeholder="Quantity" required />
          <Input type="number" placeholder="Price per Unit" required />
          <Button type="submit">Place Order</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewOrder;