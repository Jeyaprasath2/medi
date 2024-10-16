import { getFromStorage, setToStorage } from './storageUtils';

// CRUD operations for supply orders
export const getSupplyOrders = () => getFromStorage('supplyOrders') || [];
export const addSupplyOrder = (supplyOrder) => {
  const supplyOrders = getSupplyOrders();
  supplyOrders.push({ ...supplyOrder, id: Date.now() });
  setToStorage('supplyOrders', supplyOrders);
};
export const updateSupplyOrder = (id, updatedSupplyOrder) => {
  const supplyOrders = getSupplyOrders();
  const index = supplyOrders.findIndex(o => o.id === id);
  if (index !== -1) {
    supplyOrders[index] = { ...supplyOrders[index], ...updatedSupplyOrder };
    setToStorage('supplyOrders', supplyOrders);
  }
};
export const deleteSupplyOrder = (id) => {
  const supplyOrders = getSupplyOrders();
  const updatedSupplyOrders = supplyOrders.filter(o => o.id !== id);
  setToStorage('supplyOrders', updatedSupplyOrders);
};