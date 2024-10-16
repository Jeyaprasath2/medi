import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, DollarSign } from "lucide-react";
import PaymentProcessor from './PaymentProcessor';

const OnlinePayment = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!amount.trim()) {
      setError('Amount is required');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Amount must be a positive number');
      return;
    }

    setShowPaymentGateway(true);
  };

  const handlePaymentComplete = (paymentData) => {
    queryClient.invalidateQueries('payments');
    setAmount('');
    setShowPaymentGateway(false);
    alert('Payment processed successfully!');
  };

  if (showPaymentGateway) {
    return (
      <PaymentProcessor
        orderId={`ORD-${Date.now()}`}
        amount={parseFloat(amount)}
        onPaymentComplete={handlePaymentComplete}
      />
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Process Online Payment</h2>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="pl-10 pr-4 py-2 border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm"
              aria-label="Payment Amount"
            />
          </div>
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
};

export default OnlinePayment;