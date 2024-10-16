import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Calendar } from 'lucide-react';
import { getDrugExpiryDates } from '../utils/inventoryUtils';

const ExpiryDateTracker = () => {
  const { data: expiryData, isLoading, error } = useQuery({
    queryKey: ['drugExpiryDates'],
    queryFn: getDrugExpiryDates,
    refetchInterval: 3600000, // Refetch every hour
  });

  if (isLoading) return <div>Loading expiry data...</div>;
  if (error) return <div>Error loading expiry data: {error.message}</div>;

  const getExpiryStatus = (expiryDate) => {
    const daysUntilExpiry = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry < 0) return 'Expired';
    if (daysUntilExpiry <= 30) return 'Expiring Soon';
    return 'Valid';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Expired': return 'text-red-500';
      case 'Expiring Soon': return 'text-yellow-500';
      default: return 'text-green-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2" />
          Drug Expiry Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Drug Name</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expiryData?.map((drug, index) => {
              const status = getExpiryStatus(drug.expiryDate);
              return (
                <TableRow key={index}>
                  <TableCell>{drug.name}</TableCell>
                  <TableCell>{new Date(drug.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell className={getStatusColor(status)}>
                    {status === 'Expired' && <AlertTriangle className="inline mr-1" />}
                    {status}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpiryDateTracker;