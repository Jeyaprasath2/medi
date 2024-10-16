import React from 'react';
import { Truck, Package, CheckCircle, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const fetchShipmentStatus = async () => {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        inTransit: 12,
        delivered: 45,
        delayed: 3,
        preparing: 8,
      });
    }, 1000);
  });
};

const ShipmentStatus = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['shipmentStatus'],
    queryFn: fetchShipmentStatus,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data fresh for 10 seconds
  });

  if (isLoading) return <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>;
  if (error) return <div className="text-red-500">Error fetching shipment status</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Shipment Status</h2>
        <Truck className="text-green-500" size={24} />
      </div>
      <ul className="space-y-2">
        <li className="flex justify-between items-center">
          <span className="flex items-center"><Package className="mr-2" size={16} /> Preparing</span>
          <span className="font-semibold text-purple-500">{data.preparing}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="flex items-center"><Truck className="mr-2" size={16} /> In Transit</span>
          <span className="font-semibold text-blue-500">{data.inTransit}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="flex items-center"><CheckCircle className="mr-2" size={16} /> Delivered</span>
          <span className="font-semibold text-green-500">{data.delivered}</span>
        </li>
        <li className="flex justify-between items-center">
          <span className="flex items-center"><AlertTriangle className="mr-2" size={16} /> Delayed</span>
          <span className="font-semibold text-red-500">{data.delayed}</span>
        </li>
      </ul>
    </div>
  );
};

export default ShipmentStatus;