import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Trash2 } from 'lucide-react';

const fetchExpiringDrugs = async () => {
  // This would be replaced with an actual API call in a real application
  return [
    { id: 1, name: 'Aspirin', batchNumber: 'A001', expiryDate: '2023-07-15', quantity: 500 },
    { id: 2, name: 'Ibuprofen', batchNumber: 'I002', expiryDate: '2023-07-30', quantity: 300 },
    { id: 3, name: 'Amoxicillin', batchNumber: 'AM003', expiryDate: '2023-06-30', quantity: 200 },
  ];
};

const ExpiringDrugsAlert = () => {
  const { data: expiringDrugs, isLoading, error } = useQuery({
    queryKey: ['expiringDrugs'],
    queryFn: fetchExpiringDrugs,
  });

  if (isLoading) return <div>Loading expiring drugs data...</div>;
  if (error) return <div>Error loading expiring drugs data: {error.message}</div>;

  const today = new Date();
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  const drugsNearingExpiry = expiringDrugs.filter(drug => {
    const expiryDate = new Date(drug.expiryDate);
    return expiryDate > today && expiryDate <= thirtyDaysFromNow;
  });

  const expiredDrugs = expiringDrugs.filter(drug => new Date(drug.expiryDate) <= today);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 text-yellow-500" />
          Expiring Drugs Alert
        </CardTitle>
      </CardHeader>
      <CardContent>
        {drugsNearingExpiry.length > 0 && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Drugs Nearing Expiry</AlertTitle>
            <AlertDescription>
              The following drugs will expire within 30 days. Please use them or plan for disposal.
            </AlertDescription>
          </Alert>
        )}
        {expiredDrugs.length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <Trash2 className="h-4 w-4" />
            <AlertTitle>Expired Drugs</AlertTitle>
            <AlertDescription>
              The following drugs have expired and need to be disposed of or returned immediately.
            </AlertDescription>
          </Alert>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Drug Name</TableHead>
              <TableHead>Batch Number</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...drugsNearingExpiry, ...expiredDrugs].map((drug) => (
              <TableRow key={drug.id}>
                <TableCell>{drug.name}</TableCell>
                <TableCell>{drug.batchNumber}</TableCell>
                <TableCell>{drug.expiryDate}</TableCell>
                <TableCell>{drug.quantity}</TableCell>
                <TableCell>
                  {new Date(drug.expiryDate) <= today ? (
                    <span className="text-red-500 font-semibold">Expired</span>
                  ) : (
                    <span className="text-yellow-500 font-semibold">Expiring Soon</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpiringDrugsAlert;