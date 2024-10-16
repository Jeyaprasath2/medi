import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

const fetchHistoricalOrders = async () => {
  // Simulated API call
  return [
    { id: 1, drug: 'Aspirin', quantity: 1000, price: 0.1, status: 'Delivered', date: '2023-05-15' },
    { id: 2, drug: 'Ibuprofen', quantity: 500, price: 0.2, status: 'Shipped', date: '2023-06-01' },
    { id: 3, drug: 'Amoxicillin', quantity: 200, price: 0.5, status: 'Processing', date: '2023-06-10' },
  ];
};

const HistoricalOrders = ({ onRepeatOrder }) => {
  const [filterDrug, setFilterDrug] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState(null);

  const { data: orders = [] } = useQuery({
    queryKey: ['historicalOrders'],
    queryFn: fetchHistoricalOrders,
  });

  const filteredOrders = orders.filter(order => 
    (filterDrug === '' || order.drug.toLowerCase().includes(filterDrug.toLowerCase())) &&
    (filterStatus === '' || order.status === filterStatus) &&
    (filterDate === null || order.date === format(filterDate, 'yyyy-MM-dd'))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historical Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Input
            placeholder="Filter by drug name"
            value={filterDrug}
            onChange={(e) => setFilterDrug(e.target.value)}
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filterDate ? format(filterDate, 'PPP') : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filterDate}
                onSelect={setFilterDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Drug</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.drug}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>${order.price.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Button onClick={() => onRepeatOrder(order)}>Repeat Order</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default HistoricalOrders;