import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp } from 'lucide-react';

const fetchSales = async () => {
  // Simulated API call
  return [
    { id: 1, drug: 'Aspirin', quantity: 200, revenue: 1000 },
    { id: 2, drug: 'Ibuprofen', quantity: 100, revenue: 800 },
  ];
};

const SalesOverview = () => {
  const { data: sales = [], isLoading } = useQuery({
    queryKey: ['sales'],
    queryFn: fetchSales,
  });

  if (isLoading) return <div>Loading sales data...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2" />
          Sales Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Drug</TableHead>
              <TableHead>Quantity Sold</TableHead>
              <TableHead>Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.drug}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>${sale.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;