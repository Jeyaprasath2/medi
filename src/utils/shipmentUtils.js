import { getFromStorage, setToStorage } from './storageUtils';

export const getShipments = () => {
  const shipments = getFromStorage('shipments');
  if (!shipments) {
    // If no shipments in storage, return mock data
    return [
      { id: 'SHP001', type: 'Incoming', status: 'in transit', origin: 'Supplier A', destination: 'Warehouse 1', estimatedDelivery: '2023-06-15' },
      { id: 'SHP002', type: 'Outgoing', status: 'dispatched', origin: 'Warehouse 1', destination: 'Hospital B', estimatedDelivery: '2023-06-14' },
      { id: 'SHP003', type: 'Incoming', status: 'ordered', origin: 'Supplier C', destination: 'Warehouse 2', estimatedDelivery: '2023-06-20' },
      { id: 'SHP004', type: 'Outgoing', status: 'delivered', origin: 'Warehouse 2', destination: 'Pharmacy D', estimatedDelivery: '2023-06-10' },
      { id: 'SHP005', type: 'Incoming', status: 'delayed', origin: 'Supplier E', destination: 'Warehouse 1', estimatedDelivery: '2023-06-18' },
    ];
  }
  return shipments;
};

export const addShipment = (shipment) => {
  const shipments = getShipments();
  shipments.push({ ...shipment, id: Date.now() });
  setToStorage('shipments', shipments);
};

export const updateShipment = (id, updatedShipment) => {
  const shipments = getShipments();
  const index = shipments.findIndex(s => s.id === id);
  if (index !== -1) {
    shipments[index] = { ...shipments[index], ...updatedShipment };
    setToStorage('shipments', shipments);
  }
};

export const deleteShipment = (id) => {
  const shipments = getShipments();
  const updatedShipments = shipments.filter(s => s.id !== id);
  setToStorage('shipments', updatedShipments);
};

// New functions for tracking system
export const getShipmentTracking = (trackingNumber) => {
  const shipments = getShipments();
  const shipment = shipments.find(s => s.id === trackingNumber);
  if (shipment) {
    return {
      status: shipment.status,
      location: shipment.currentLocation,
      lastUpdated: shipment.lastUpdated,
    };
  }
  throw new Error('Shipment not found');
};

export const updateShipmentTracking = (trackingNumber, status, location) => {
  const shipments = getShipments();
  const index = shipments.findIndex(s => s.id === trackingNumber);
  if (index !== -1) {
    shipments[index] = {
      ...shipments[index],
      status,
      currentLocation: location,
      lastUpdated: new Date().toISOString(),
    };
    setToStorage('shipments', shipments);
    return true;
  }
  return false;
};