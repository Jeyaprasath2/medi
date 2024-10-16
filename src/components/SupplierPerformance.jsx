import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Truck, Clock, CheckCircle } from 'lucide-react';

const fetchSupplierPerformance = async () => {
  // This would be replaced with an actual API call in a real application
  return [
    { name: 'Supplier A', deliveryAccuracy: 95, timeliness: 90, qualityScore: 88 },
    { name: 'Supplier B', deliveryAccuracy: 98, timeliness: 85, qualityScore: 92 },
    { name: 'Supplier C', deliveryAccuracy: 92, timeliness: 95, qualityScore: 90 },
    { name: 'Supplier D', deliveryAccuracy: 90, timeliness: 88, qualityScore: 85 },
    { name: 'Supplier E', deliveryAccuracy: 97, timeliness: 92, qualityScore: 94 },
  ];
};

const SupplierPerformance = () => {
  const { data: performance, isLoading, error } = useQuery({
    queryKey: ['supplierPerformance'],
    queryFn: fetchSupplierPerformance,
  });

  if (isLoading) return <div>Loading supplier performance data...</div>;
  if (error) return <div>Error loading supplier performance data: {error.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2" />
          Supplier Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={performance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="deliveryAccuracy" fill="#8884d8" name="Delivery Accuracy" />
            <Bar dataKey="timeliness" fill="#82ca9d" name="Timeliness" />
            <Bar dataKey="qualityScore" fill="#ffc658" name="Quality Score" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <Truck className="mr-2 text-indigo-500" />
            <span>Delivery Accuracy</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 text-green-500" />
            <span>Timeliness</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="mr-2 text-yellow-500" />
            <span>Quality Score</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierPerformance;