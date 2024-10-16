import React from 'react';
import { Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getVendorActivities } from '../utils/localStorageUtils';

const VendorActivities = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['vendorActivities'],
    queryFn: getVendorActivities,
    refetchInterval: 5000,
    staleTime: 1000,
  });

  if (isLoading) return <div className="animate-pulse bg-white h-64 rounded-lg shadow-md" aria-label="Loading vendor activities"></div>;
  if (error) return <div className="text-red-700" role="alert">Error fetching vendor activities</div>;

  // Check if data exists and is an array before calling slice
  const recentActivities = Array.isArray(data) ? data.slice(-5).reverse() : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-900">Recent Vendor Activities</h2>
        <Users className="text-blue-700" size={24} aria-hidden="true" />
      </div>
      {recentActivities.length > 0 ? (
        <ul className="space-y-2" aria-label="Recent vendor activities list">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-800">{activity.vendorName} - {activity.shipmentId}</span>
              <span className="font-semibold text-blue-700">{activity.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No recent activities to display.</p>
      )}
    </div>
  );
};

export default VendorActivities;