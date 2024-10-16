import { getFromStorage, setToStorage } from './storageUtils';

export const getPayments = () => getFromStorage('payments') || [];

export const addPayment = (payment) => {
  const payments = getPayments();
  payments.push({ ...payment, id: Date.now(), status: 'pending' });
  setToStorage('payments', payments);
};

export const updatePaymentStatus = (id, newStatus) => {
  const payments = getPayments();
  const updatedPayments = payments.map(payment => 
    payment.id === id ? { ...payment, status: newStatus } : payment
  );
  setToStorage('payments', updatedPayments);
};

export const getPaymentById = (id) => {
  const payments = getPayments();
  return payments.find(payment => payment.id === id);
};