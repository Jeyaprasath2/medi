import React from 'react';
import Header from '../components/Header';

const VendorManagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Vendor Management</h1>
        {/* Add vendor management content here */}
        <p className="text-gray-600">Vendor management features will be implemented here.</p>
      </main>
    </div>
  );
};

export default VendorManagement;