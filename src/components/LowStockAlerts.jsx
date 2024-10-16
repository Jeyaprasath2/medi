import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { getDrugInventory } from '../utils/inventoryUtils';

const LowStockAlerts = () => {
  const { data: inventory, isLoading, error } = useQuery({
    queryKey: ['drugInventory'],
    queryFn: getDrugInventory,
  });

  if (isLoading) return <div>Loading inventory data...</div>;
  if (error) return <div>Error loading inventory data: {error.message}</div>;

  const lowStockDrugs = inventory.filter(drug => drug.stockLevel <= drug.minStockLevel);

  if (lowStockDrugs.length === 0) return null;

  return (
    <div className="space-y-2">
      {lowStockDrugs.map(drug => (
        <Alert key={drug.id} variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Low Stock Alert</AlertTitle>
          <AlertDescription>
            The stock for {drug.name} is running low. Current stock: {drug.stockLevel}, Threshold: {drug.minStockLevel}. Consider placing a reorder soon.
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default LowStockAlerts;