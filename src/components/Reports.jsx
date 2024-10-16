import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { getDrugConsumption, getVendorActivities, getShipments } from '../utils/localStorageUtils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Reports = () => {
  const { data: consumptionData } = useQuery({
    queryKey: ['drugConsumption'],
    queryFn: getDrugConsumption,
  });

  const { data: vendorData } = useQuery({
    queryKey: ['vendorActivities'],
    queryFn: getVendorActivities,
  });

  const { data: shipmentData } = useQuery({
    queryKey: ['shipments'],
    queryFn: getShipments,
  });

  const consumptionPatterns = consumptionData?.reduce((acc, item) => {
    acc[item.drugName] = (acc[item.drugName] || 0) + item.quantityUsed;
    return acc;
  }, {});

  const vendorReliability = vendorData?.reduce((acc, item) => {
    acc[item.vendorName] = acc[item.vendorName] || { onTime: 0, delayed: 0 };
    if (item.status === 'on time') acc[item.vendorName].onTime++;
    if (item.status === 'delayed') acc[item.vendorName].delayed++;
    return acc;
  }, {});

  const distributionTimelines = shipmentData?.reduce((acc, item) => {
    const duration = new Date(item.deliveryDate) - new Date(item.shipDate);
    acc.push({ name: item.shipmentId, duration: duration / (1000 * 60 * 60 * 24) }); // Convert to days
    return acc;
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Drug Consumption Patterns</CardTitle>
          <CardDescription>Total consumption by drug</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(consumptionPatterns || {}).map(([name, value]) => ({ name, value }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Reliability</CardTitle>
          <CardDescription>On-time vs delayed deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(vendorReliability || {}).map(([name, { onTime, delayed }]) => ({ name, onTime, delayed }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" fill="#82ca9d" name="On Time" />
              <Bar dataKey="delayed" fill="#ffc658" name="Delayed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribution Timelines</CardTitle>
          <CardDescription>Delivery duration for each shipment</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={distributionTimelines}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="duration" fill="#8884d8" name="Duration (days)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Button>Generate PDF Report</Button>
    </div>
  );
};

export default Reports;