import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash } from 'lucide-react';

const fetchVendors = async () => {
  // This would be replaced with an actual API call
  return [
    { id: 1, name: 'PharmaCorp', contactPerson: 'John Doe', email: 'john@pharmacorp.com', phone: '123-456-7890' },
    { id: 2, name: 'MediSupply', contactPerson: 'Jane Smith', email: 'jane@medisupply.com', phone: '987-654-3210' },
  ];
};

const VendorManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);

  const { data: vendors, isLoading, error } = useQuery({
    queryKey: ['vendors'],
    queryFn: fetchVendors,
  });

  if (isLoading) return <div>Loading vendors...</div>;
  if (error) return <div>Error loading vendors: {error.message}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Vendor Management</span>
          <Button onClick={() => setShowForm(true)} className="bg-green-500 hover:bg-green-600">
            <Plus size={16} className="mr-2" /> Add Vendor
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showForm && (
          <form className="mb-4 space-y-4">
            <Input placeholder="Vendor Name" />
            <Input placeholder="Contact Person" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Phone" type="tel" />
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Save Vendor</Button>
          </form>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.contactPerson}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => setEditingVendor(vendor)}><Edit size={16} /></Button>
                  <Button variant="ghost" className="text-red-500"><Trash size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VendorManagement;