import React from 'react';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, Truck, Users, CreditCard, Clipboard, ShoppingCart, Home } from 'lucide-react';
import Header from '../components/Header';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CurrentOrders from '../components/CurrentOrders';
import OrderDetails from '../components/OrderDetails';

const NavCard = ({ icon: Icon, title, to }) => (
  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
    <CardContent className="flex flex-col items-center justify-center h-full p-6">
      <Icon className="w-12 h-12 text-indigo-600 mb-4" />
      <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
      <Link to={to} className="mt-auto">
        <Button variant="outline" className="w-full">Go to {title}</Button>
      </Link>
    </CardContent>
  </Card>
);

const Index = () => {
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 mb-6">
            Welcome to PharmaSys
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Streamline your pharmaceutical operations with our comprehensive management solution.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-indigo-800 mb-6">Current Orders</h2>
          <CurrentOrders onSelectOrder={handleSelectOrder} />
        </div>

        {selectedOrder && (
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-indigo-800 mb-6">Order Details</h2>
            <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
          </div>
        )}

        <h2 className="text-3xl font-semibold text-indigo-800 mb-6">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <NavCard icon={Home} title="Dashboard" to="/dashboard" />
          <NavCard icon={Clipboard} title="Reports" to="/reports" />
          <NavCard icon={Package} title="Inventory" to="/inventory" />
          <NavCard icon={Truck} title="Shipment Status" to="/shipment-status" />
          <NavCard icon={Users} title="Vendor Management" to="/vendor-management" />
          <NavCard icon={CreditCard} title="Online Payment" to="/online-payment" />
          <NavCard icon={ShoppingCart} title="Orders" to="/orders" />
          <NavCard icon={TrendingUp} title="Analytics" to="/analytics" />
        </div>
      </main>
    </div>
  );
};

export default Index;