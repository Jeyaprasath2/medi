import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart2 } from 'lucide-react';

const fetchInventoryTrends = async () => {
  // This would be replaced with an actual API call in a real application
  return [
    { date: '2023-01', stock: 1000, sales: 800 },
    { date: '2023-02', stock: 1200, sales: 900 },
    { date: '2023-03', stock: 1100, sales: 1000 },
    { date: '2023-04', stock: 1300, sales: 1100 },
    { date: '2023-05', stock: 1400, sales: 1200 },
    { date: '2023-06', stock: 1200, sales: 1300 },
  ];
};

const InventoryTrends = () => {
  const { data: trends, isLoading, error } = useQuery({
    queryKey: ['inventoryTrends'],
    queryFn: fetchInventoryTrends,
  });

  if (isLoading) return <div>Loading inventory trends...</div>;
  if (error) return <div>Error loading inventory trends: {error.message}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2" />
            Inventory Trends Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stock" stroke="#8884d8" name="Stock" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart2 className="mr-2" />
            Stock vs. Sales Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#8884d8" name="Stock" />
              <Bar dataKey="sales" fill="#82ca9d" name="Sales" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryTrends;