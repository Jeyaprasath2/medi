import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Alerts = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Alerts & Notifications</h2>
        <AlertTriangle className="text-yellow-500" size={24} />
      </div>
      <ul className="space-y-2">
        <li className="flex items-center p-2 bg-red-100 text-red-700 rounded">
          <AlertTriangle className="mr-2" size={16} />
          <span>Critical: Low stock for Amoxicillin</span>
        </li>
        <li className="flex items-center p-2 bg-yellow-100 text-yellow-700 rounded">
          <AlertTriangle className="mr-2" size={16} />
          <span>Warning: Shipment #1234 delayed</span>
        </li>
        <li className="flex items-center p-2 bg-green-100 text-green-700 rounded">
          <AlertTriangle className="mr-2" size={16} />
          <span>Info: New vendor application received</span>
        </li>
      </ul>
    </div>
  );
};

export default Alerts;