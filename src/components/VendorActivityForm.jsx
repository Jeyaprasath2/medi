import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { addVendorActivity } from '../utils/localStorageUtils';

const VendorActivityForm = () => {
  const [vendorName, setVendorName] = useState('');
  const [shipmentId, setShipmentId] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!vendorName.trim() || !shipmentId.trim() || !status.trim()) {
      setError('All fields are required');
      return;
    }

    const newActivity = {
      id: Date.now(),
      vendorName,
      shipmentId,
      status,
      date: new Date().toISOString(),
    };

    try {
      addVendorActivity(newActivity);
      queryClient.invalidateQueries('vendorActivities');
      setVendorName('');
      setShipmentId('');
      setStatus('');
    } catch (err) {
      setError('Failed to log activity. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Log Vendor Activity</h2>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700">Vendor Name</label>
          <Input
            id="vendorName"
            placeholder="Enter vendor name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            required
            className="mt-1"
            aria-label="Vendor Name"
          />
        </div>
        <div>
          <label htmlFor="shipmentId" className="block text-sm font-medium text-gray-700">Shipment ID</label>
          <Input
            id="shipmentId"
            placeholder="Enter shipment ID"
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
            required
            className="mt-1"
            aria-label="Shipment ID"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <Input
            id="status"
            placeholder="Enter status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="mt-1"
            aria-label="Status"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white">
          Log Activity
        </Button>
      </form>
    </div>
  );
};

export default VendorActivityForm;