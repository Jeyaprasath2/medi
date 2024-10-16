import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import OrderDetails from './OrderDetails';

const placeOrder = async (order) => {
  console.log('Placing order:', order);
  return { id: Date.now(), ...order, status: 'Pending' };
};

const PlaceNewOrder = () => {
  const [newOrder, setNewOrder] = useState({
    drug: '',
    quantity: '',
    price: '',
    place: '',
    address: '',
    state: '',
    mobileNumber: ''
  });
  const [placedOrder, setPlacedOrder] = useState(null);
  const queryClient = useQueryClient();

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries('orders');
      setPlacedOrder(data);
      setNewOrder({
        drug: '',
        quantity: '',
        price: '',
        place: '',
        address: '',
        state: '',
        mobileNumber: ''
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    orderMutation.mutate(newOrder);
  };

  const handleCloseOrderDetails = () => {
    setPlacedOrder(null);
  };

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ShoppingCart className="mr-2" />
            Place New Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <Input
              name="drug"
              placeholder="Drug Name"
              value={newOrder.drug}
              onChange={handleInputChange}
              required
              className="bg-white/20 text-white placeholder-white/70"
            />
            <Input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={newOrder.quantity}
              onChange={handleInputChange}
              required
              className="bg-white/20 text-white placeholder-white/70"
            />
            <Input
              name="price"
              type="number"
              placeholder="Price per Unit"
              value={newOrder.price}
              onChange={handleInputChange}
              required
              className="bg-white/20 text-white placeholder-white/70"
            />
            <Input
              name="place"
              placeholder="Place"
              value={newOrder.place}
              onChange={handleInputChange}
              required
              className="bg-white/20 text-white placeholder-white/70"
            />
            <Input
              name="address"
              placeholder="Address"
              value={newOrder.address}
              onChange={handleInputChange}
              required
              className="bg-white/20 text-white placeholder-white/70"
            />
            <Input
              name="state"
              placeholder="State"
              value={newOrder.state}
              onChange={handleInputChange}
              required
              className="bg-white/20 text-white placeholder-white/70"
            />
            <Input
              name="mobileNumber"
              type="tel"
              placeholder="Mobile Number"
              value={newOrder.mobileNumber}
              onChange={handleInputChange}
              required
              className="bg-white/20 text-white placeholder-white/70"
            />
            <Button type="submit" className="w-full bg-white text-blue-600 hover:bg-blue-100">
              Place Order
            </Button>
          </form>
        </CardContent>
      </Card>
      {placedOrder && (
        <OrderDetails order={placedOrder} onClose={handleCloseOrderDetails} />
      )}
    </>
  );
};

export default PlaceNewOrder;