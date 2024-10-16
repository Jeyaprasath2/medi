import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart } from 'lucide-react';
import { getLowStockDrugs, reorderDrug } from '../utils/inventoryUtils';

const ReorderDrugs = () => {
  const queryClient = useQueryClient();
  const { data: lowStockDrugs, isLoading, error } = useQuery({
    queryKey: ['lowStockDrugs'],
    queryFn: getLowStockDrugs,
  });

  const reorderMutation = useMutation({
    mutationFn: reorderDrug,
    onSuccess: () => {
      queryClient.invalidateQueries('lowStockDrugs');
      queryClient.invalidateQueries('inventoryMetrics');
    },
  });

  if (isLoading) return <div>Loading low stock drugs...</div>;
  if (error) return <div>Error loading low stock drugs: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2" />
          Reorder Drugs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Drug Name</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Reorder Level</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockDrugs.map((drug) => (
              <TableRow key={drug.id}>
                <TableCell>{drug.name}</TableCell>
                <TableCell>{drug.currentStock}</TableCell>
                <TableCell>{drug.reorderLevel}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => reorderMutation.mutate(drug.id)}
                    disabled={reorderMutation.isLoading}
                  >
                    Reorder
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReorderDrugs;