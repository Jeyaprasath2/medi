import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getShipmentFromBlockchain, verifyBlockchain } from '../utils/blockchainUtils';

const BlockchainTracker = () => {
  const { data: blockchainData, isLoading, error } = useQuery({
    queryKey: ['blockchainData'],
    queryFn: () => {
      // In a real application, this would fetch data from the blockchain
      const shipmentId = 'SHP001'; // Example shipment ID
      return getShipmentFromBlockchain(shipmentId);
    },
  });

  const isBlockchainValid = verifyBlockchain();

  if (isLoading) return <div>Loading blockchain data...</div>;
  if (error) return <div>Error loading blockchain data: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blockchain Shipment Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <strong>Blockchain Status:</strong> {isBlockchainValid ? 'Valid' : 'Invalid'}
        </div>
        {blockchainData && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Hash</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{new Date(blockchainData.timestamp).toLocaleString()}</TableCell>
                <TableCell>{blockchainData.shipmentId}</TableCell>
                <TableCell>{blockchainData.hash}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockchainTracker;