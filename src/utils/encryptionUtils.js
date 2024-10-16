// Simple encryption function (for demonstration purposes only)
export const encrypt = (text) => {
  return btoa(text); // Base64 encoding
};

// Simple decryption function (for demonstration purposes only)
export const decrypt = (encryptedText) => {
  return atob(encryptedText); // Base64 decoding
};