import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { addDrugConsumption } from '../utils/localStorageUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DrugConsumptionForm = () => {
  const [facility, setFacility] = useState('');
  const [drugName, setDrugName] = useState('');
  const [quantityUsed, setQuantityUsed] = useState('');
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!facility.trim() || !drugName.trim() || !quantityUsed.trim()) {
      setError('All fields are required');
      return;
    }

    const quantityNum = parseInt(quantityUsed, 10);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('Quantity must be a positive number');
      return;
    }

    const newConsumption = {
      facility,
      drugName,
      quantityUsed: quantityNum,
      dateLogged: new Date().toISOString(),
    };

    try {
      addDrugConsumption(newConsumption);
      queryClient.invalidateQueries('drugConsumption');
      setFacility('');
      setDrugName('');
      setQuantityUsed('');
    } catch (err) {
      setError('Failed to log consumption. Please try again.');
    }
  };

  // Mock list of facilities - replace with actual data in a real application
  const facilities = ['Hospital A', 'Clinic B', 'Pharmacy C'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-900 mb-4">Log Drug Consumption</h2>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="facility" className="block text-sm font-medium text-gray-700">Healthcare Facility</label>
          <Select value={facility} onValueChange={setFacility}>
            <SelectTrigger id="facility">
              <SelectValue placeholder="Select Facility" />
            </SelectTrigger>
            <SelectContent>
              {facilities.map(f => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="drugName" className="block text-sm font-medium text-gray-700">Drug Name</label>
          <Input
            id="drugName"
            placeholder="Enter drug name"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            required
            className="mt-1"
            aria-label="Drug Name"
          />
        </div>
        <div>
          <label htmlFor="quantityUsed" className="block text-sm font-medium text-gray-700">Quantity Used</label>
          <Input
            id="quantityUsed"
            type="number"
            placeholder="Enter quantity"
            value={quantityUsed}
            onChange={(e) => setQuantityUsed(e.target.value)}
            required
            min="1"
            className="mt-1"
            aria-label="Quantity Used"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white">
          Log Consumption
        </Button>
      </form>
    </div>
  );
};

export default DrugConsumptionForm;