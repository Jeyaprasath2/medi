import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

export const sendVerificationEmail = async (email) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${verificationCode}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return verificationCode;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
};