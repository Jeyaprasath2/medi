// This is a placeholder for an actual error logging service
const logErrorToService = (error, errorInfo) => {
  // In a real application, you would send this error to your logging service
  // For example, using an API call to your backend or a third-party error tracking service
  console.error('Error logged to service:', error, errorInfo);
};

export const logError = (error, errorInfo) => {
  // Log to console for development
  console.error('Error:', error);
  if (errorInfo) {
    console.error('Error Info:', errorInfo);
  }

  // Remove any sensitive data before logging
  const sanitizedError = {
    message: error.message,
    stack: error.stack,
    // Add any other non-sensitive properties you want to log
  };

  const sanitizedErrorInfo = errorInfo ? {
    componentStack: errorInfo.componentStack,
    // Add any other non-sensitive properties from errorInfo
  } : null;

  // Log to service
  logErrorToService(sanitizedError, sanitizedErrorInfo);
};

export default logError;