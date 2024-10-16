import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDrugInventory } from '../utils/localStorageUtils';
import { Package, AlertTriangle } from 'lucide-react';

const InventoryManagement = () => {
  const { data: inventory, isLoading, error } = useQuery({
    queryKey: ['drugInventory'],
    queryFn: getDrugInventory,
    refetchInterval: 60000, // Refetch every minute
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const lowStockItems = inventory.filter(item => item.stockLevel < item.minStockLevel);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Inventory Management</h1>
        
        {lowStockItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
            {lowStockItems.map((item) => (
              <Alert key={item.id} variant="destructive" className="mb-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Low Stock</AlertTitle>
                <AlertDescription>{`${item.name} is below the minimum stock level.`}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Drug Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Min Stock Level</TableHead>
              <TableHead>Expiry Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="flex items-center">
                  <Package className="mr-2" size={16} />
                  {item.stockLevel}
                </TableCell>
                <TableCell>{item.minStockLevel}</TableCell>
                <TableCell>{item.expiryDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default InventoryManagement;