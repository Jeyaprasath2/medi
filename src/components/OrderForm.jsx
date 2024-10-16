import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart } from 'lucide-react';

const placeOrder = async (order) => {
  // Simulated API call
  console.log('Placing order:', order);
  return { id: Date.now(), ...order, status: 'Pending' };
};

const OrderForm = ({ frequentOrders }) => {
  const [newOrder, setNewOrder] = React.useState({ drug: '', quantity: '', template: '' });
  const queryClient = useQueryClient();

  const orderMutation = useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
      setNewOrder({ drug: '', quantity: '', template: '' });
    },
  });

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    orderMutation.mutate(newOrder);
  };

  const handleTemplateSelect = (templateId) => {
    const selectedTemplate = frequentOrders.find(order => order.id === parseInt(templateId));
    if (selectedTemplate) {
      setNewOrder({
        drug: selectedTemplate.items[0].drug,
        quantity: selectedTemplate.items[0].quantity.toString(),
        template: templateId
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="mr-2" />
          Place New Order
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleOrderSubmit} className="space-y-4">
          <Select
            value={newOrder.template}
            onValueChange={(value) => handleTemplateSelect(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select order template" />
            </SelectTrigger>
            <SelectContent>
              {frequentOrders.map((template) => (
                <SelectItem key={template.id} value={template.id.toString()}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Drug Name"
            value={newOrder.drug}
            onChange={(e) => setNewOrder({ ...newOrder, drug: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={newOrder.quantity}
            onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
            required
          />
          <Button type="submit">Place Order</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;