import { getFromStorage, setToStorage } from './storageUtils';

export const getVendorActivities = () => getFromStorage('vendorActivities') || [];

export const addVendorActivity = (activity) => {
  const activities = getVendorActivities();
  activities.push({ ...activity, id: Date.now() });
  setToStorage('vendorActivities', activities);
};

export const updateVendorActivity = (id, updatedActivity) => {
  const activities = getVendorActivities();
  const index = activities.findIndex(a => a.id === id);
  if (index !== -1) {
    activities[index] = { ...activities[index], ...updatedActivity };
    setToStorage('vendorActivities', activities);
  }
};

export const deleteVendorActivity = (id) => {
  const activities = getVendorActivities();
  const updatedActivities = activities.filter(a => a.id !== id);
  setToStorage('vendorActivities', updatedActivities);
};

export const getVendorDetails = () => getFromStorage('vendorDetails') || [];

export const addVendorDetail = (vendorDetail) => {
  const vendorDetails = getVendorDetails();
  vendorDetails.push({ ...vendorDetail, id: Date.now() });
  setToStorage('vendorDetails', vendorDetails);
};

export const updateVendorDetail = (id, updatedVendorDetail) => {
  const vendorDetails = getVendorDetails();
  const index = vendorDetails.findIndex(v => v.id === id);
  if (index !== -1) {
    vendorDetails[index] = { ...vendorDetails[index], ...updatedVendorDetail };
    setToStorage('vendorDetails', vendorDetails);
  }
};

export const deleteVendorDetail = (id) => {
  const vendorDetails = getVendorDetails();
  const updatedVendorDetails = vendorDetails.filter(v => v.id !== id);
  setToStorage('vendorDetails', updatedVendorDetails);
};