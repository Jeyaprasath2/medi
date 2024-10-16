import { getFromStorage, setToStorage } from './storageUtils';

export const getCustomers = () => getFromStorage('customers') || [];

export const addCustomer = (customer) => {
  const customers = getCustomers();
  customers.push({ ...customer, id: Date.now(), creditStatus: 'Good', purchaseHistory: [] });
  setToStorage('customers', customers);
};

export const updateCustomer = (id, updatedCustomer) => {
  const customers = getCustomers();
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...updatedCustomer };
    setToStorage('customers', customers);
  }
};

export const getCustomerById = (id) => {
  const customers = getCustomers();
  return customers.find(c => c.id === id);
};

export const addOrderToCustomerHistory = (customerId, order) => {
  const customers = getCustomers();
  const customerIndex = customers.findIndex(c => c.id === customerId);
  if (customerIndex !== -1) {
    customers[customerIndex].purchaseHistory.push(order);
    setToStorage('customers', customers);
  }
};