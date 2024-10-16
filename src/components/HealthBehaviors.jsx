import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const fetchHealthBehaviors = async () => {
  // This would be replaced with an actual API call in a real application
  return [
    { behavior: 'Exercise', adherence: 75 },
    { behavior: 'Medication', adherence: 90 },
    { behavior: 'Diet', adherence: 60 },
    { behavior: 'Sleep', adherence: 70 },
    { behavior: 'Stress Management', adherence: 50 },
  ];
};

const HealthBehaviors = () => {
  const [timeRange, setTimeRange] = useState('week');

  const { data: behaviors, isLoading, error } = useQuery({
    queryKey: ['healthBehaviors', timeRange],
    queryFn: fetchHealthBehaviors,
  });

  if (isLoading) return <div>Loading health behaviors data...</div>;
  if (error) return <div>Error loading health behaviors data: {error.message}</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2" />
          Health Behaviors Adherence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={timeRange} onValueChange={setTimeRange} className="mb-4">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={behaviors}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="behavior" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="adherence" fill="#8884d8" name="Adherence %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HealthBehaviors;