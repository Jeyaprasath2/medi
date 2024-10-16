import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, Plus, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Simulated API functions
const fetchSalesData = async () => {
  // In a real app, this would be an API call
  return [
    { id: 1, drug: 'Aspirin', quantity: 100, totalPrice: 500, date: '2023-06-01', discount: 0, promotion: null, returned: false },
    { id: 2, drug: 'Ibuprofen', quantity: 50, totalPrice: 250, date: '2023-06-02', discount: 10, promotion: 'Summer Sale', returned: false },
    { id: 3, drug: 'Amoxicillin', quantity: 30, totalPrice: 300, date: '2023-06-03', discount: 0, promotion: null, returned: true },
  ];
};

const addSaleRecord = async (saleData) => {
  // In a real app, this would be an API call
  console.log('Adding sale record:', saleData);
  return { id: Date.now(), ...saleData };
};

const SalesManagement = () => {
  const [newSale, setNewSale] = useState({ drug: '', quantity: '', price: '', discount: '0', promotion: '', returned: false });
  const [filterDrug, setFilterDrug] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  const queryClient = useQueryClient();

  const { data: salesData = [] } = useQuery({
    queryKey: ['salesData'],
    queryFn: fetchSalesData,
  });

  const addSaleMutation = useMutation({
    mutationFn: addSaleRecord,
    onSuccess: () => {
      queryClient.invalidateQueries('salesData');
      setNewSale({ drug: '', quantity: '', price: '', discount: '0', promotion: '', returned: false });
    },
  });

  const handleAddSale = () => {
    const saleData = {
      ...newSale,
      quantity: parseInt(newSale.quantity),
      totalPrice: parseFloat(newSale.price) * parseInt(newSale.quantity) * (1 - parseFloat(newSale.discount) / 100),
      date: new Date().toISOString().split('T')[0],
    };
    addSaleMutation.mutate(saleData);
  };

  const filteredSales = salesData.filter(sale => 
    (!filterDrug || sale.drug.toLowerCase().includes(filterDrug.toLowerCase())) &&
    (!filterDateFrom || sale.date >= filterDateFrom) &&
    (!filterDateTo || sale.date <= filterDateTo)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="mr-2" />
            Sales Management
          </div>
          <Link to="/sales-analytics">
            <Button variant="outline" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-4">
              <Plus className="mr-2 h-4 w-4" /> Add New Sale
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Sale</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Drug Name"
                value={newSale.drug}
                onChange={(e) => setNewSale({ ...newSale, drug: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newSale.quantity}
                onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Price per Unit"
                value={newSale.price}
                onChange={(e) => setNewSale({ ...newSale, price: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Discount (%)"
                value={newSale.discount}
                onChange={(e) => setNewSale({ ...newSale, discount: e.target.value })}
              />
              <Input
                placeholder="Promotion (if any)"
                value={newSale.promotion}
                onChange={(e) => setNewSale({ ...newSale, promotion: e.target.value })}
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="returned"
                  checked={newSale.returned}
                  onChange={(e) => setNewSale({ ...newSale, returned: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="returned">Returned</label>
              </div>
              <Button onClick={handleAddSale}>Add Sale</Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mb-4 flex space-x-2">
          <Input
            placeholder="Filter by Drug Name"
            value={filterDrug}
            onChange={(e) => setFilterDrug(e.target.value)}
          />
          <Input
            type="date"
            placeholder="From Date"
            value={filterDateFrom}
            onChange={(e) => setFilterDateFrom(e.target.value)}
          />
          <Input
            type="date"
            placeholder="To Date"
            value={filterDateTo}
            onChange={(e) => setFilterDateTo(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Drug</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Promotion</TableHead>
              <TableHead>Returned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.drug}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>${sale.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>{sale.discount}%</TableCell>
                <TableCell>{sale.promotion || 'N/A'}</TableCell>
                <TableCell>{sale.returned ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SalesManagement;
