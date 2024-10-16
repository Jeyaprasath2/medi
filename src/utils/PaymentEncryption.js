import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_PAYMENT_ENCRYPTION_KEY || 'default-secret-key';

export const encryptPaymentData = (data) => {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
};

export const decryptPaymentData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};