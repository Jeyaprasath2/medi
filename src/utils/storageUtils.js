// Simple encryption function (for demonstration purposes only)
const encrypt = (text) => {
  return btoa(text); // Base64 encoding
};

// Simple decryption function (for demonstration purposes only)
const decrypt = (encryptedText) => {
  return atob(encryptedText); // Base64 decoding
};

// Helper function to get data from local storage
export const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(decrypt(data)) : null;
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
    return null;
  }
};

// Helper function to set data in local storage
export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, encrypt(JSON.stringify(value)));
  } catch (error) {
    console.error(`Error storing data for key ${key}:`, error);
  }
};