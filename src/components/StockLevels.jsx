import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const fetchDrugStock = async () => {
  // Simulated API call - replace with actual API call in production
  return [
    { id: 1, name: 'Aspirin', type: 'Pain reliever', batch: 'A001', expirationDate: '2024-12-31', stockLevel: 500 },
    { id: 2, name: 'Amoxicillin', type: 'Antibiotic', batch: 'B002', expirationDate: '2023-10-15', stockLevel: 100 },
    { id: 3, name: 'Lisinopril', type: 'ACE inhibitor', batch: 'C003', expirationDate: '2025-06-30', stockLevel: 50 },
    // Add more mock data as needed
  ];
};

const StockLevels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: drugs, isLoading, error } = useQuery({
    queryKey: ['drugStock'],
    queryFn: fetchDrugStock,
  });

  if (isLoading) return <div>Loading stock levels...</div>;
  if (error) return <div>Error loading stock levels: {error.message}</div>;

  const filteredDrugs = drugs.filter(drug =>
    Object.values(drug).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStockLevelColor = (level) => {
    if (level > 200) return 'bg-green-100 text-green-800';
    if (level > 100) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="mr-2" />
          Drug Stock Levels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search drugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
            icon={<Search className="mr-2 h-4 w-4" />}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Expiration Date</TableHead>
              <TableHead>Stock Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrugs.map((drug) => (
              <TableRow key={drug.id}>
                <TableCell>{drug.name}</TableCell>
                <TableCell>{drug.type}</TableCell>
                <TableCell>{drug.batch}</TableCell>
                <TableCell>{drug.expirationDate}</TableCell>
                <TableCell>
                  <Badge className={getStockLevelColor(drug.stockLevel)}>
                    {drug.stockLevel}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StockLevels;