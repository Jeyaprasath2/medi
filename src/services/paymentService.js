import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

export const processPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/payments`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};