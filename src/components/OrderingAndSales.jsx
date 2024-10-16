import React, { useState } from 'react';
import PlaceNewOrder from './PlaceNewOrder';
import CurrentOrders from './CurrentOrders';
import SalesOverview from './SalesOverview';
import OrderDetails from './OrderDetails';

const OrderingAndSales = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="space-y-8">
      <PlaceNewOrder />
      <CurrentOrders onSelectOrder={setSelectedOrder} />
      <SalesOverview />
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderingAndSales;