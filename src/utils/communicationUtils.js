// This is a mock implementation. In a real application, you would integrate with an actual email and SMS service.

export const sendEmail = (to, subject, message) => {
  console.log(`Sending email to ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  // In a real application, you would use an email service API here
};

export const sendSMS = (phoneNumber, message) => {
  console.log(`Sending SMS to ${phoneNumber}`);
  console.log(`Message: ${message}`);
  // In a real application, you would use an SMS service API here
};