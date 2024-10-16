import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { fetchSalesData } from '../utils/salesUtils';

const SalesAnalytics = () => {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const { data: salesData = [] } = useQuery({
    queryKey: ['salesData'],
    queryFn: fetchSalesData,
  });

  const aggregatedData = useMemo(() => {
    const aggregated = {};
    salesData.forEach(sale => {
      // Aggregate by drug
      if (!aggregated[sale.drug]) {
        aggregated[sale.drug] = { totalSales: 0, quantitySold: 0 };
      }
      aggregated[sale.drug].totalSales += sale.totalPrice;
      aggregated[sale.drug].quantitySold += sale.quantity;

      // Aggregate by time period
      const date = new Date(sale.date);
      let timePeriod;
      switch (timeFrame) {
        case 'daily':
          timePeriod = date.toISOString().split('T')[0];
          break;
        case 'weekly':
          const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
          timePeriod = weekStart.toISOString().split('T')[0];
          break;
        case 'monthly':
          timePeriod = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        default:
          timePeriod = 'unknown';
      }
      if (!aggregated[timePeriod]) {
        aggregated[timePeriod] = { totalSales: 0 };
      }
      aggregated[timePeriod].totalSales += sale.totalPrice;
    });
    return aggregated;
  }, [salesData, timeFrame]);

  const totalSalesByDrug = Object.entries(aggregatedData)
    .filter(([key]) => !key.includes('-'))
    .map(([drug, data]) => ({ drug, ...data }))
    .sort((a, b) => b.totalSales - a.totalSales);

  const salesByTimePeriod = Object.entries(aggregatedData)
    .filter(([key]) => key.includes('-'))
    .map(([period, data]) => ({ period, ...data }))
    .sort((a, b) => a.period.localeCompare(b.period));

  const topSellingDrugs = totalSalesByDrug.slice(0, 5);
  const slowMovingDrugs = [...totalSalesByDrug].sort((a, b) => a.quantitySold - b.quantitySold).slice(0, 5);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Sales Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px] mb-4">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Sales by Drug</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={totalSalesByDrug}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="drug" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalSales" fill="#8884d8" name="Total Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Sales by Time Period</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesByTimePeriod}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalSales" stroke="#82ca9d" name="Total Sales" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Top Selling Drugs</h3>
                <ul>
                  {topSellingDrugs.map((drug, index) => (
                    <li key={drug.drug} className="mb-1">
                      {index + 1}. {drug.drug} - ${drug.totalSales.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Slow Moving Drugs</h3>
                <ul>
                  {slowMovingDrugs.map((drug, index) => (
                    <li key={drug.drug} className="mb-1">
                      {index + 1}. {drug.drug} - {drug.quantitySold} units
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalytics;