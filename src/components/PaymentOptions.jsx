import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Smartphone, Laptop, QrCode, Bitcoin } from 'lucide-react';

const PaymentOptions = ({ orderId, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cryptoAddress, setCryptoAddress] = useState('');

  const handlePayment = (method) => {
    setSelectedMethod(method);
  };

  const processPayment = () => {
    // Simulate payment processing
    console.log(`Processing ${selectedMethod} payment for order ${orderId}`);
    if (selectedMethod === 'Credit Card') {
      console.log(`Card details: ${cardNumber}, ${expiryDate}, ${cvv}`);
    } else if (selectedMethod === 'Crypto Payment') {
      console.log(`Crypto address: ${cryptoAddress}`);
    }
    setTimeout(() => {
      console.log('Payment completed');
      onPaymentComplete();
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Button onClick={() => handlePayment('Credit Card')} className="flex items-center justify-center">
          <CreditCard className="mr-2" /> Credit Card
        </Button>
        <Button onClick={() => handlePayment('GPay')} className="flex items-center justify-center">
          <Smartphone className="mr-2" /> GPay
        </Button>
        <Button onClick={() => handlePayment('Net Banking')} className="flex items-center justify-center">
          <Laptop className="mr-2" /> Net Banking
        </Button>
        <Button onClick={() => handlePayment('QR Code')} className="flex items-center justify-center">
          <QrCode className="mr-2" /> QR Code
        </Button>
        <Button onClick={() => handlePayment('Crypto Payment')} className="flex items-center justify-center">
          <Bitcoin className="mr-2" /> Crypto Payment
        </Button>
      </div>
      
      {selectedMethod === 'Credit Card' && (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <Input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          <Input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
      )}
      
      {selectedMethod === 'Crypto Payment' && (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Crypto Wallet Address"
            value={cryptoAddress}
            onChange={(e) => setCryptoAddress(e.target.value)}
          />
        </div>
      )}
      
      {selectedMethod === 'QR Code' && (
        <div className="flex justify-center">
          <img src="/placeholder.svg" alt="QR Code" className="w-48 h-48" />
        </div>
      )}
      
      {selectedMethod && (
        <Button onClick={processPayment} className="w-full">
          Pay Now
        </Button>
      )}
    </div>
  );
};

export default PaymentOptions;