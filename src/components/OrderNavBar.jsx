import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ClipboardList, TrendingUp, Truck } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label }) => (
  <Link to={to} className="flex items-center p-2 text-gray-600 hover:text-blue-600 transition-colors">
    <Icon className="h-5 w-5 mr-2" />
    <span>{label}</span>
  </Link>
);

const OrderNavBar = () => {
  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <div className="flex space-x-4">
            <NavItem to="/orders/new" icon={ShoppingCart} label="New Order" />
            <NavItem to="/orders/list" icon={ClipboardList} label="Order List" />
            <NavItem to="/orders/tracking" icon={Truck} label="Order Tracking" />
            <NavItem to="/orders/analytics" icon={TrendingUp} label="Order Analytics" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OrderNavBar;