import { getFromStorage, setToStorage } from './storageUtils';
import { generateInvoice } from './invoiceUtils';
import { updatePaymentStatus } from './paymentUtils';

export const processOrderPayment = (order) => {
  // Generate invoice
  const invoice = generateInvoice(order);

  // Update payment status
  updatePaymentStatus(order.id, 'paid');

  // Update financial records
  updateFinancialRecords(order, invoice);

  return invoice;
};

const updateFinancialRecords = (order, invoice) => {
  const financialRecords = getFromStorage('financialRecords') || [];
  financialRecords.push({
    orderId: order.id,
    invoiceId: invoice.invoiceNumber,
    amount: invoice.total,
    date: new Date().toISOString(),
    type: 'income'
  });
  setToStorage('financialRecords', financialRecords);
};

export const getFinancialRecords = () => {
  return getFromStorage('financialRecords') || [];
};