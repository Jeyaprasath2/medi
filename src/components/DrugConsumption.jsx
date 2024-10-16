import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { Pill, TrendingUp, Building, Calendar } from 'lucide-react';
import { getDrugConsumption } from '../utils/localStorageUtils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = ['#0052CC', '#00875A', '#FF5630', '#6554C0'];
const PAGE_SIZE = 20;

const DrugConsumption = () => {
  const [page, setPage] = useState(0);
  const [facilityFilter, setFacilityFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('week');

  const { data, isLoading, error } = useQuery({
    queryKey: ['drugConsumption', page, facilityFilter, timeRange],
    queryFn: () => getDrugConsumption(page, PAGE_SIZE, facilityFilter, timeRange),
    keepPreviousData: true,
    staleTime: 5000,
  });

  if (isLoading) return <div className="animate-pulse bg-white h-96 rounded-lg shadow-md" aria-label="Loading drug consumption data"></div>;
  if (error) return <div className="text-red-700" role="alert">Error fetching drug consumption data</div>;

  const pieData = data?.results?.reduce((acc, item) => {
    const existingItem = acc.find(i => i.name === item.drugName);
    if (existingItem) {
      existingItem.value += item.quantity;
    } else {
      acc.push({ name: item.drugName, value: item.quantity });
    }
    return acc;
  }, []) || [];

  const trendData = data?.results?.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();
    const existingDate = acc.find(i => i.name === date);
    if (existingDate) {
      existingDate[item.drugName] = (existingDate[item.drugName] || 0) + item.quantity;
    } else {
      acc.push({ name: date, [item.drugName]: item.quantity });
    }
    return acc;
  }, []) || [];

  const facilities = [...new Set(data?.results?.map(item => item.facility) || [])];

  const topDrugs = pieData.sort((a, b) => b.value - a.value).slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-900">Drug Consumption Analysis</h2>
        <Pill className="text-blue-700" size={24} aria-hidden="true" />
      </div>
      <div className="mb-4 flex space-x-4">
        <Select value={facilityFilter} onValueChange={setFacilityFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Facility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Facilities</SelectItem>
            {facilities.map(facility => (
              <SelectItem key={facility} value={facility}>{facility}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
            <Pill className="mr-2" size={20} aria-hidden="true" />
            Drug Consumption Distribution
          </h3>
          <div aria-label="Drug consumption pie chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
            <TrendingUp className="mr-2" size={20} aria-hidden="true" />
            Consumption Trends
          </h3>
          <div aria-label="Drug consumption trend chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                {Object.keys(trendData[0] || {}).filter(key => key !== 'name').map((key, index) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={COLORS[index % COLORS.length]} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center">
          <Calendar className="mr-2" size={20} aria-hidden="true" />
          Top 5 Most Consumed Drugs
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topDrugs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => setPage(old => Math.max(0, old - 1))}
          disabled={page === 0}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <Button
          onClick={() => setPage(old => (data?.hasMore ? old + 1 : old))}
          disabled={!data?.hasMore}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DrugConsumption;