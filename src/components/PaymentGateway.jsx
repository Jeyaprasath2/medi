import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, Calendar, Hash } from 'lucide-react';
import { encryptPaymentData } from '../utils/PaymentEncryption';

const processPayment = async (paymentDetails) => {
  // Simulated API call to process payment
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (Math.random() > 0.9) {
    throw new Error('Payment failed');
  }
  return { success: true, transactionId: `TRX-${Date.now()}` };
};

const PaymentGateway = ({ amount, onPaymentSuccess, onPaymentFailure }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const paymentMutation = useMutation({
    mutationFn: processPayment,
    onSuccess: (data) => {
      onPaymentSuccess(data.transactionId);
    },
    onError: (error) => {
      onPaymentFailure(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const encryptedData = encryptPaymentData({ cardNumber, expiryDate, cvv, name, amount });
    paymentMutation.mutate(encryptedData);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold text-blue-900">
          <Lock className="mr-2" />
          Secure Payment Gateway
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="pl-10 pr-4 py-2 border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              className="pl-10 pr-4 py-2 border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
          </div>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              className="pl-10 pr-4 py-2 border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
          </div>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Cardholder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="pl-10 pr-4 py-2 border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
            />
          </div>
          <div className="text-lg font-semibold text-blue-900">Total Amount: ${amount.toFixed(2)}</div>
          <Button 
            type="submit" 
            disabled={paymentMutation.isPending} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
          >
            <Lock className="mr-2" />
            {paymentMutation.isPending ? 'Processing...' : 'Pay Securely'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentGateway;