import { setToStorage } from './localStorageUtils';

// Mock data for testing
export const initializeMockData = () => {
  const mockShipments = [
    { id: 1, status: 'In Transit', origin: 'Warehouse A', destination: 'Hospital B', expectedDelivery: '2023-04-15' },
    { id: 2, status: 'Delivered', origin: 'Supplier X', destination: 'Pharmacy Y', expectedDelivery: '2023-04-10' },
    { id: 3, status: 'Delayed', origin: 'Manufacturer Z', destination: 'Clinic C', expectedDelivery: '2023-04-20' },
  ];

  const mockInventory = [
    { id: 1, name: 'Paracetamol', category: 'Pain Relief', stockLevel: 500, minStockLevel: 100, expiryDate: '2024-06-30' },
    { id: 2, name: 'Amoxicillin', category: 'Antibiotics', stockLevel: 200, minStockLevel: 150, expiryDate: '2023-12-31' },
    { id: 3, name: 'Insulin', category: 'Diabetes', stockLevel: 50, minStockLevel: 75, expiryDate: '2023-09-30' },
  ];

  const mockVendors = [
    { id: 1, name: 'PharmaCorp', contact: 'John Doe', email: 'john@pharmacorp.com', phone: '123-456-7890' },
    { id: 2, name: 'MediSupply', contact: 'Jane Smith', email: 'jane@medisupply.com', phone: '987-654-3210' },
  ];

  const mockPayments = [
    { id: 1, vendorId: 1, amount: 5000, status: 'completed', date: '2023-04-01' },
    { id: 2, vendorId: 2, amount: 7500, status: 'pending', date: '2023-04-05' },
  ];

  setToStorage('shipments', mockShipments);
  setToStorage('drugInventory', mockInventory);
  setToStorage('vendors', mockVendors);
  setToStorage('payments', mockPayments);
};