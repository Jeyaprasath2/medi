import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { processPayment } from '../services/paymentService';
import PaymentGateway from './PaymentGateway';

const PaymentProcessor = ({ orderId, amount, onPaymentComplete }) => {
  const paymentMutation = useMutation({
    mutationFn: processPayment,
    onSuccess: (data) => {
      console.log('Payment processed successfully:', data);
      onPaymentComplete(data);
    },
    onError: (error) => {
      console.error('Payment processing failed:', error);
    },
  });

  const handlePaymentSuccess = (transactionId) => {
    paymentMutation.mutate({ orderId, amount, transactionId });
  };

  const handlePaymentFailure = (errorMessage) => {
    console.error('Payment failed:', errorMessage);
    // Handle payment failure (e.g., show error message to user)
  };

  return (
    <PaymentGateway
      amount={amount}
      onPaymentSuccess={handlePaymentSuccess}
      onPaymentFailure={handlePaymentFailure}
    />
  );
};

export default PaymentProcessor;