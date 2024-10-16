import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Lock } from 'lucide-react';
import PaymentGateway from './PaymentGateway';

const placeOrder = async (orderData) => {
  // Simulated API call - replace with actual API call in production
  console.log('Placing order:', orderData);
  return { id: Date.now(), ...orderData, status: 'Processing' };
};

const PlaceOrder = () => {
  const [order, setOrder] = useState({ drug: '', quantity: '', customer: '', frequency: 'once' });
  const [showPayment, setShowPayment] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries('recentOrders');
      setOrder({ drug: '', quantity: '', customer: '', frequency: 'once' });
      setShowPayment(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate order amount (this is a simplified example)
    const amount = parseFloat(order.quantity) * 10; // Assuming $10 per unit
    setOrderAmount(amount);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (transactionId) => {
    mutation.mutate({ ...order, transactionId, amount: orderAmount });
  };

  const handlePaymentFailure = (errorMessage) => {
    alert(`Payment failed: ${errorMessage}`);
    setShowPayment(false);
  };

  if (showPayment) {
    return (
      <PaymentGateway
        amount={orderAmount}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentFailure={handlePaymentFailure}
      />
    );
  }

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <ShoppingCart className="mr-2" />
          Place New Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            value={order.drug}
            onValueChange={(value) => setOrder({ ...order, drug: value })}
          >
            <SelectTrigger className="bg-white/20 text-white placeholder-white/70">
              <SelectValue placeholder="Select drug" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="aspirin">Aspirin</SelectItem>
              <SelectItem value="ibuprofen">Ibuprofen</SelectItem>
              <SelectItem value="paracetamol">Paracetamol</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Quantity"
            value={order.quantity}
            onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
            required
            className="bg-white/20 text-white placeholder-white/70"
          />
          <Input
            placeholder="Customer Name"
            value={order.customer}
            onChange={(e) => setOrder({ ...order, customer: e.target.value })}
            required
            className="bg-white/20 text-white placeholder-white/70"
          />
          <Select
            value={order.frequency}
            onValueChange={(value) => setOrder({ ...order, frequency: value })}
          >
            <SelectTrigger className="bg-white/20 text-white placeholder-white/70">
              <SelectValue placeholder="Order frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">One-time order</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            type="submit" 
            className="w-full bg-white text-blue-600 hover:bg-blue-100 flex items-center justify-center"
          >
            <Lock className="mr-2" />
            Proceed to Secure Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlaceOrder;