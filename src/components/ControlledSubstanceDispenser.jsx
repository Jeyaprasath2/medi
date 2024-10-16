import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ControlledSubstanceDispenser = () => {
  const [patientId, setPatientId] = useState('');
  const [prescriptionId, setPrescriptionId] = useState('');
  const [pharmacistId, setPharmacistId] = useState('');
  const [isDispensed, setIsDispensed] = useState(false);

  const handleDispense = () => {
    // In a real application, this would involve API calls and more complex logic
    if (patientId && prescriptionId && pharmacistId) {
      setIsDispensed(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="mr-2 text-red-500" />
          Controlled Substance Dispenser
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
          <Input
            placeholder="Prescription ID"
            value={prescriptionId}
            onChange={(e) => setPrescriptionId(e.target.value)}
          />
          <Input
            placeholder="Pharmacist ID"
            value={pharmacistId}
            onChange={(e) => setPharmacistId(e.target.value)}
          />
          <Button onClick={handleDispense} className="w-full">
            Dispense Controlled Substance
          </Button>
          {isDispensed && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Dispensed Successfully</AlertTitle>
              <AlertDescription>
                The controlled substance has been dispensed and logged.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ControlledSubstanceDispenser;