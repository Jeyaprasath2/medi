import { getFromStorage, setToStorage } from './storageUtils';

export const setAuthUser = (user, rememberMe = false) => {
  setToStorage('authUser', user);
  if (rememberMe) {
    setToStorage('rememberMe', true);
  }
};

export const getAuthUser = () => getFromStorage('authUser');

export const removeAuthUser = () => {
  localStorage.removeItem('authUser');
  localStorage.removeItem('rememberMe');
};

export const isRememberMeSet = () => getFromStorage('rememberMe') === true;

export const setLastAccessedReport = (reportId) => {
  setToStorage('lastAccessedReport', reportId);
};

export const getLastAccessedReport = () => getFromStorage('lastAccessedReport');

export const resetPassword = (email) => {
  const users = getFromStorage('users') || [];
  const user = users.find(u => u.email === email);
  
  if (user) {
    console.log(`Password reset link sent to ${email}`);
    return true;
  } else {
    console.log(`No user found with email ${email}`);
    return false;
  }
};