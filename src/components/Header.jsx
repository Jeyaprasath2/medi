import React from 'react';
import { Bell, LogOut, Home, Package, PieChart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { removeAuthUser } from '../utils/localStorageUtils';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthUser();
    navigate('/login');
  };

  return (
    <header className="bg-blue-800 text-white shadow-lg" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-center mb-4 md:mb-0">Drug Inventory & Supply Chain</h1>
          <nav className="flex space-x-4" aria-label="Main Navigation">
            <a href="#dashboard" className="flex items-center hover:bg-blue-900 rounded px-3 py-2" aria-label="Dashboard">
              <Home size={20} className="mr-2" aria-hidden="true" />
              <span className="hidden md:inline">Dashboard</span>
            </a>
            <a href="#vendor-activities" className="flex items-center hover:bg-blue-900 rounded px-3 py-2" aria-label="Vendor Activities">
              <Package size={20} className="mr-2" aria-hidden="true" />
              <span className="hidden md:inline">Vendor Activities</span>
            </a>
            <a href="#drug-consumption" className="flex items-center hover:bg-blue-900 rounded px-3 py-2" aria-label="Drug Consumption">
              <PieChart size={20} className="mr-2" aria-hidden="true" />
              <span className="hidden md:inline">Drug Consumption</span>
            </a>
            <a href="/all-orders" className="flex items-center hover:bg-blue-900 rounded px-3 py-2" aria-label="All Orders">
              <ShoppingCart size={20} className="mr-2" aria-hidden="true" />
              <span className="hidden md:inline">All Orders</span>
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-blue-900 rounded-full" aria-label="Notifications">
              <Bell size={24} aria-hidden="true" />
            </button>
            <button onClick={handleLogout} className="flex items-center hover:bg-blue-900 rounded px-3 py-2" aria-label="Logout">
              <LogOut size={20} className="mr-2" aria-hidden="true" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;