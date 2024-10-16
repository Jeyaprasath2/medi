import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // This would be your actual API base URL

export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

export const checkInventory = async (drugId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/${drugId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking inventory:', error);
    throw error;
  }
};

export const trackShipment = async (shipmentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shipments/${shipmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error tracking shipment:', error);
    throw error;
  }
};

// For now, we'll use these functions to simulate API calls
export const simulatePlaceOrder = (orderData) => {
  console.log('Simulating place order:', orderData);
  return Promise.resolve({ orderId: Date.now(), status: 'success' });
};

export const simulateCheckInventory = (drugId) => {
  console.log('Simulating check inventory for drug:', drugId);
  return Promise.resolve({ drugId, inStock: Math.random() > 0.5, quantity: Math.floor(Math.random() * 100) });
};

export const simulateTrackShipment = (shipmentId) => {
  console.log('Simulating track shipment:', shipmentId);
  return Promise.resolve({ shipmentId, status: 'in transit', estimatedDelivery: '2023-06-30' });
};