export const fetchSalesData = async () => {
  // In a real application, this would be an API call
  return [
    { id: 1, drug: 'Aspirin', quantity: 100, totalPrice: 500, date: '2023-06-01', discount: 0, promotion: null, returned: false },
    { id: 2, drug: 'Ibuprofen', quantity: 50, totalPrice: 250, date: '2023-06-02', discount: 10, promotion: 'Summer Sale', returned: false },
    { id: 3, drug: 'Amoxicillin', quantity: 30, totalPrice: 300, date: '2023-06-03', discount: 0, promotion: null, returned: true },
    { id: 4, drug: 'Lisinopril', quantity: 80, totalPrice: 400, date: '2023-06-04', discount: 5, promotion: 'Senior Discount', returned: false },
    { id: 5, drug: 'Metformin', quantity: 60, totalPrice: 180, date: '2023-06-05', discount: 0, promotion: null, returned: false },
    { id: 6, drug: 'Aspirin', quantity: 120, totalPrice: 600, date: '2023-06-06', discount: 0, promotion: null, returned: false },
    { id: 7, drug: 'Ibuprofen', quantity: 40, totalPrice: 200, date: '2023-06-07', discount: 0, promotion: null, returned: false },
    { id: 8, drug: 'Amoxicillin', quantity: 25, totalPrice: 250, date: '2023-06-08', discount: 0, promotion: null, returned: false },
    { id: 9, drug: 'Lisinopril', quantity: 70, totalPrice: 350, date: '2023-06-09', discount: 0, promotion: null, returned: false },
    { id: 10, drug: 'Metformin', quantity: 55, totalPrice: 165, date: '2023-06-10', discount: 0, promotion: null, returned: false },
  ];
};