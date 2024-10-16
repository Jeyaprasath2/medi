import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Package, TrendingUp, Bell, Truck, PieChart, FileText, Activity, Users } from 'lucide-react';
import VendorActivities from './VendorActivities';
import ShipmentStatus from './ShipmentStatus';
import DrugConsumption from './DrugConsumption';
import AlertsNotifications from './AlertsNotifications';
import VendorManagement from './VendorManagement';
import ShipmentTracking from './ShipmentTracking';
import Reports from '../pages/Reports';
import InventoryMetrics from './InventoryMetrics';
import ExpiryDateTracker from './ExpiryDateTracker';
import ReorderSuggestions from './ReorderSuggestions';
import InventoryTrends from './InventoryTrends';
import SupplierPerformance from './SupplierPerformance';
import ReorderDrugs from './ReorderDrugs';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-teal-500 to-green-600 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <Button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            <RefreshCw className="mr-2" size={16} />
            Refresh Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardCard icon={Package} title="Inventory Metrics" component={<InventoryMetrics />} color="bg-gradient-to-br from-blue-400 to-green-500" />
          <DashboardCard icon={Truck} title="Shipment Status" component={<ShipmentStatus />} color="bg-gradient-to-br from-teal-400 to-blue-500" />
          <DashboardCard icon={PieChart} title="Drug Consumption" component={<DrugConsumption />} color="bg-gradient-to-br from-green-400 to-teal-500" />
          <DashboardCard icon={Bell} title="Alerts & Notifications" component={<AlertsNotifications />} color="bg-gradient-to-br from-blue-400 to-teal-500" />
          <DashboardCard icon={Users} title="Vendor Management" component={<VendorManagement />} color="bg-gradient-to-br from-teal-400 to-green-500" />
          <DashboardCard icon={Activity} title="Expiry Date Tracker" component={<ExpiryDateTracker />} color="bg-gradient-to-br from-green-400 to-blue-500" />
          <DashboardCard icon={Truck} title="Shipment Tracking" component={<ShipmentTracking />} colSpan="lg:col-span-3" color="bg-gradient-to-br from-blue-400 to-green-500" />
          <DashboardCard icon={TrendingUp} title="Inventory Trends" component={<InventoryTrends />} colSpan="lg:col-span-3" color="bg-gradient-to-br from-teal-400 to-blue-500" />
          <DashboardCard icon={FileText} title="Reports" component={<Reports />} colSpan="lg:col-span-3" color="bg-gradient-to-br from-green-400 to-teal-500" />
        </div>

        <div className="mt-8">
          <DashboardCard title="Supplier Performance" component={<SupplierPerformance />} color="bg-gradient-to-br from-blue-400 to-green-500" />
        </div>

        <div className="mt-8">
          <DashboardCard title="Reorder Drugs" component={<ReorderDrugs />} color="bg-gradient-to-br from-teal-400 to-blue-500" />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon: Icon, title, component, colSpan = '', color }) => (
  <div className={`rounded-lg shadow-md overflow-hidden ${colSpan} ${color}`}>
    <div className="p-4 text-white flex items-center">
      {Icon && <Icon className="mr-2" size={20} />}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
    <div className="p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">{component}</div>
  </div>
);

export default Dashboard;