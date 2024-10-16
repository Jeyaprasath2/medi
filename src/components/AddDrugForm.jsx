import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDrugToInventory } from '../utils/inventoryUtils';

const AddDrugForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState();
  const [hospital, setHospital] = useState('');
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDrug = {
      name,
      stockLevel: parseInt(quantity),
      expirationDate: expirationDate?.toISOString(),
      hospital,
      status: determineStatus(parseInt(quantity), expirationDate),
    };
    addDrugToInventory(newDrug);
    queryClient.invalidateQueries('drugs');
    // Reset form
    setName('');
    setQuantity('');
    setExpirationDate(undefined);
    setHospital('');
  };

  const determineStatus = (quantity, expDate) => {
    if (quantity <= 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    if (expDate && new Date(expDate) < new Date()) return 'Expired';
    return 'In Stock';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Drug Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        min="0"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !expirationDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {expirationDate ? format(expirationDate, "PPP") : <span>Pick an expiration date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={expirationDate}
            onSelect={setExpirationDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        placeholder="Hospital/Medical Institution"
        value={hospital}
        onChange={(e) => setHospital(e.target.value)}
        required
      />
      <Button type="submit">Add Drug</Button>
    </form>
  );
};

export default AddDrugForm;