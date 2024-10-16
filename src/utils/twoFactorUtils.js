import { authenticator } from 'otplib';

export const generate2FASecret = () => {
  return authenticator.generateSecret();
};

export const verify2FAToken = (secret, token) => {
  return authenticator.verify({ token, secret });
};