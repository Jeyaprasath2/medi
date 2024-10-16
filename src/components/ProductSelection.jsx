import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from 'lucide-react';

const fetchProducts = async () => {
  // Simulated API call
  return [
    { id: 1, name: 'Aspirin', price: 5, stock: 100 },
    { id: 2, name: 'Ibuprofen', price: 7, stock: 50 },
    { id: 3, name: 'Paracetamol', price: 4, stock: 75 },
  ];
};

const ProductSelection = ({ onOrderConfirm }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: parseInt(quantity) || 0
    }));
  };

  const handleConfirmOrder = () => {
    const order = Object.entries(selectedProducts).map(([productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return {
        id: product.id,
        name: product.name,
        quantity,
        price: product.price
      };
    }).filter(item => item.quantity > 0);

    if (order.length > 0) {
      onOrderConfirm(order);
    } else {
      alert('Please select at least one product');
    }
  };

  if (isLoading) return <div>Loading products...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2" />
          Select Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Available Stock</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    max={product.stock}
                    value={selectedProducts[product.id] || ''}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="w-20"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={handleConfirmOrder} className="mt-4">Confirm Order</Button>
      </CardContent>
    </Card>
  );
};

export default ProductSelection;