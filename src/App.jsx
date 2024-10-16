import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Inventory from "./pages/Inventory";
import ShipmentStatus from "./pages/ShipmentStatus";
import VendorManagement from "./pages/VendorManagement";
import OnlinePayment from "./components/OnlinePayment";
import AllOrders from "./pages/AllOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import NavigationBar from "./components/NavigationBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/inventory" element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            } />
            <Route path="/shipment-status" element={
              <ProtectedRoute>
                <ShipmentStatus />
              </ProtectedRoute>
            } />
            <Route path="/vendor-management" element={
              <ProtectedRoute>
                <VendorManagement />
              </ProtectedRoute>
            } />
            <Route path="/online-payment" element={
              <ProtectedRoute>
                <OnlinePayment />
              </ProtectedRoute>
            } />
            <Route path="/all-orders" element={
              <ProtectedRoute>
                <AllOrders />
              </ProtectedRoute>
            } />
            {navItems.map(({ to, page }) => (
              <Route key={to} path={to} element={page} />
            ))}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;