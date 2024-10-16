import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VendorActivities from '../VendorActivities';
import { getVendorActivities } from '../../utils/localStorageUtils';

// Mock the localStorageUtils
jest.mock('../../utils/localStorageUtils');

const queryClient = new QueryClient();

describe('VendorActivities', () => {
  it('displays loading state', () => {
    getVendorActivities.mockImplementation(() => new Promise(() => {}));
    render(
      <QueryClientProvider client={queryClient}>
        <VendorActivities />
      </QueryClientProvider>
    );
    expect(screen.getByLabelText('Loading vendor activities')).toBeInTheDocument();
  });

  it('displays error message and retry button when fetch fails', async () => {
    getVendorActivities.mockRejectedValue(new Error('Network error'));
    render(
      <QueryClientProvider client={queryClient}>
        <VendorActivities />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Unable to fetch data, please check your connection.')).toBeInTheDocument();
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });
  });

  it('displays vendor activities when data is fetched successfully', async () => {
    const mockActivities = [
      { id: 1, vendorName: 'Vendor A', shipmentId: 'SH001', status: 'Delivered' },
      { id: 2, vendorName: 'Vendor B', shipmentId: 'SH002', status: 'In Transit' },
    ];
    getVendorActivities.mockResolvedValue(mockActivities);
    render(
      <QueryClientProvider client={queryClient}>
        <VendorActivities />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Vendor A - SH001')).toBeInTheDocument();
      expect(screen.getByText('Vendor B - SH002')).toBeInTheDocument();
    });
  });

  it('displays no activities message when data is empty', async () => {
    getVendorActivities.mockResolvedValue([]);
    render(
      <QueryClientProvider client={queryClient}>
        <VendorActivities />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('No recent activities to display.')).toBeInTheDocument();
    });
  });
});