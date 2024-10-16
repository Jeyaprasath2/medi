import React from 'react';
import Header from '../components/Header';

const ShipmentStatus = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Shipment Status</h1>
        {/* Add shipment status content here */}
      </main>
    </div>
  );
};

export default ShipmentStatus;