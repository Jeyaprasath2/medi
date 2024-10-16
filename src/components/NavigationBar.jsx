import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, FileText, Package, Truck, Users, CreditCard, Menu, X, ShoppingCart, LogOut, Bell } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from 'framer-motion';

const NavItem = ({ to, icon: Icon, label }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={to}
          className="flex items-center p-2 text-white hover:bg-purple-700 rounded-md transition-colors"
        >
          <Icon className="h-5 w-5 mr-2" />
          <span className="hidden md:inline text-sm">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleNav = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock notifications - replace with actual data fetching logic
  const notifications = [
    { id: 1, message: "New order received" },
    { id: 2, message: "Low stock alert: Aspirin" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-white">PharmaSys</span>
          </div>
          <div className="hidden md:flex space-x-4">
            <NavItem to="/dashboard" icon={Home} label="Dashboard" />
            <NavItem to="/reports" icon={FileText} label="Reports" />
            <NavItem to="/inventory" icon={Package} label="Inventory" />
            <NavItem to="/shipment-status" icon={Truck} label="Shipment Status" />
            <NavItem to="/vendor-management" icon={Users} label="Vendor Management" />
            <NavItem to="/online-payment" icon={CreditCard} label="Online Payment" />
            <NavItem to="/all-orders" icon={ShoppingCart} label="All Orders" />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-purple-700">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id}>
                    {notification.message}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white hover:bg-purple-700">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleNav} className="text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu with sliding animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-blue-600"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavItem to="/dashboard" icon={Home} label="Dashboard" />
              <NavItem to="/reports" icon={FileText} label="Reports" />
              <NavItem to="/inventory" icon={Package} label="Inventory" />
              <NavItem to="/shipment-status" icon={Truck} label="Shipment Status" />
              <NavItem to="/vendor-management" icon={Users} label="Vendor Management" />
              <NavItem to="/online-payment" icon={CreditCard} label="Online Payment" />
              <NavItem to="/all-orders" icon={ShoppingCart} label="All Orders" />
              <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-white hover:bg-purple-700">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;