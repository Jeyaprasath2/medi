import * as localStorageUtils from '../localStorageUtils';

describe('localStorageUtils', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    localStorage.clear();
  });

  it('should set and get auth user', () => {
    const user = { id: 1, name: 'John Doe' };
    localStorageUtils.setAuthUser(user);
    expect(localStorageUtils.getAuthUser()).toEqual(user);
  });

  it('should remove auth user', () => {
    const user = { id: 1, name: 'John Doe' };
    localStorageUtils.setAuthUser(user);
    localStorageUtils.removeAuthUser();
    expect(localStorageUtils.getAuthUser()).toBeNull();
  });

  it('should set and get last accessed report', () => {
    const reportId = 'report123';
    localStorageUtils.setLastAccessedReport(reportId);
    expect(localStorageUtils.getLastAccessedReport()).toBe(reportId);
  });

  it('should perform CRUD operations on vendor activities', () => {
    const activity = { vendorName: 'Vendor X', shipmentId: 'SH123', status: 'Delivered' };
    
    // Add
    localStorageUtils.addVendorActivity(activity);
    let activities = localStorageUtils.getVendorActivities();
    expect(activities.length).toBe(1);
    expect(activities[0].vendorName).toBe('Vendor X');

    // Update
    const updatedActivity = { ...activities[0], status: 'Returned' };
    localStorageUtils.updateVendorActivity(activities[0].id, updatedActivity);
    activities = localStorageUtils.getVendorActivities();
    expect(activities[0].status).toBe('Returned');

    // Delete
    localStorageUtils.deleteVendorActivity(activities[0].id);
    activities = localStorageUtils.getVendorActivities();
    expect(activities.length).toBe(0);
  });

  it('should initialize mock data', () => {
    localStorageUtils.initializeMockData();
    const activities = localStorageUtils.getVendorActivities();
    expect(activities).toEqual(localStorageUtils.mockVendorActivities);
  });
});