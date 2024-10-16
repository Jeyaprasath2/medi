// Simulated API call
const mockOrders = [
  {
    id: 1,
    customer: 'John Doe',
    date: '2023-06-01',
    total: 150.00,
    status: 'Completed',
    items: [
      { name: 'Aspirin', quantity: 2, price: 10.00 },
      { name: 'Ibuprofen', quantity: 1, price: 15.00 },
    ],
  },
  {
    id: 2,
    customer: 'Jane Smith',
    date: '2023-06-02',
    total: 75.50,
    status: 'Processing',
    items: [
      { name: 'Amoxicillin', quantity: 1, price: 25.50 },
      { name: 'Bandages', quantity: 2, price: 25.00 },
    ],
  },
];

export const fetchOrders = async () => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockOrders;
};