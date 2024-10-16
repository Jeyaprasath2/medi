import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Truck, Package, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getShipments } from '../utils/shipmentUtils';

const ShipmentTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: shipments, isLoading, error } = useQuery({
    queryKey: ['shipments'],
    queryFn: getShipments,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  if (isLoading) return <div>Loading shipment data...</div>;
  if (error) return <div>Error loading shipment data: {error.message}</div>;

  const filteredShipments = shipments.filter(shipment =>
    Object.values(shipment).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ordered': return <Clock className="text-blue-500" />;
      case 'dispatched': return <Package className="text-purple-500" />;
      case 'in transit': return <Truck className="text-orange-500" />;
      case 'delivered': return <CheckCircle className="text-green-500" />;
      case 'delayed': return <AlertTriangle className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ordered': return 'bg-blue-100 text-blue-800';
      case 'dispatched': return 'bg-purple-100 text-purple-800';
      case 'in transit': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2" />
          Shipment Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search shipments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Shipment ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Estimated Delivery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{shipment.type}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(shipment.status)}>
                    {getStatusIcon(shipment.status)}
                    <span className="ml-2">{shipment.status}</span>
                  </Badge>
                </TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.estimatedDelivery}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShipmentTracking;