import { getFromStorage, setToStorage } from './storageUtils';
import { updateDrugStockLevel } from './inventoryUtils';
import { updateShipment } from './shipmentUtils';

export const updateInventoryAndShipment = (order) => {
  // Deduct stock from inventory
  order.items.forEach(item => {
    updateDrugStockLevel(item.id, item.quantity, 'decrease');
  });

  // Create a new shipment
  const newShipment = {
    id: `SHP-${Date.now()}`,
    orderId: order.id,
    status: 'preparing',
    items: order.items,
    createdAt: new Date().toISOString(),
  };

  // Add the new shipment to storage
  const shipments = getFromStorage('shipments') || [];
  shipments.push(newShipment);
  setToStorage('shipments', shipments);

  // Update order status
  const orders = getFromStorage('orders') || [];
  const updatedOrders = orders.map(o => 
    o.id === order.id ? { ...o, status: 'processing', shipmentId: newShipment.id } : o
  );
  setToStorage('orders', updatedOrders);

  return newShipment;
};

export const createShipmentRequest = async (order) => {
  // Simulate API call to create shipment request
  await new Promise(resolve => setTimeout(resolve, 1000));

  const shipment = {
    id: `SHP-${Date.now()}`,
    orderId: order.id,
    status: 'requested',
    items: order.items,
    createdAt: new Date().toISOString(),
  };

  // Update shipments in storage
  const shipments = getFromStorage('shipments') || [];
  shipments.push(shipment);
  setToStorage('shipments', shipments);

  return shipment;
};

export const confirmDelivery = (shipmentId) => {
  const shipments = getFromStorage('shipments') || [];
  const shipmentIndex = shipments.findIndex(s => s.id === shipmentId);

  if (shipmentIndex !== -1) {
    const shipment = shipments[shipmentIndex];
    shipment.status = 'delivered';
    shipment.deliveredAt = new Date().toISOString();

    // Update shipment in storage
    shipments[shipmentIndex] = shipment;
    setToStorage('shipments', shipments);

    // Update order status
    const orders = getFromStorage('orders') || [];
    const updatedOrders = orders.map(o => 
      o.shipmentId === shipmentId ? { ...o, status: 'delivered' } : o
    );
    setToStorage('orders', updatedOrders);

    // Update inventory to reflect received stock
    shipment.items.forEach(item => {
      updateDrugStockLevel(item.id, item.quantity, 'increase');
    });
  }
};