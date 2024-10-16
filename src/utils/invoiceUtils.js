export const generateInvoice = (order) => {
  // In a real application, this would generate a proper invoice
  // For now, we'll just return a simple object
  return {
    invoiceNumber: `INV-${order.id}-${Date.now()}`,
    orderDetails: order,
    total: order.quantity * 10, // Assuming a fixed price of $10 per unit
    generatedAt: new Date().toISOString(),
  };
};