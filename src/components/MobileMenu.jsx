import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, Package, Truck, Users, CreditCard } from 'lucide-react';

const MobileMenuItem = ({ to, icon: Icon, label, onClose }) => (
  <Link
    to={to}
    className="flex items-center p-4 text-gray-600 hover:bg-gray-100"
    onClick={onClose}
  >
    <Icon className="h-6 w-6 mr-4" />
    <span>{label}</span>
  </Link>
);

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-grow">
          <MobileMenuItem to="/dashboard" icon={Home} label="Dashboard" onClose={onClose} />
          <MobileMenuItem to="/reports" icon={FileText} label="Reports" onClose={onClose} />
          <MobileMenuItem to="/inventory" icon={Package} label="Inventory" onClose={onClose} />
          <MobileMenuItem to="/shipment-status" icon={Truck} label="Shipment Status" onClose={onClose} />
          <MobileMenuItem to="/vendor-management" icon={Users} label="Vendor Management" onClose={onClose} />
          <MobileMenuItem to="/online-payment" icon={CreditCard} label="Online Payment" onClose={onClose} />
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;