import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StockLevels from '../components/StockLevels';
import SupplyOrderTracking from '../components/SupplyOrderTracking';
import AddDrugForm from '../components/AddDrugForm';
import InventoryFilters from '../components/InventoryFilters';
import InventoryList from '../components/InventoryList';
import { fetchDrugs, deleteDrugFromInventory } from '../utils/inventoryUtils';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [hospitalFilter, setHospitalFilter] = useState('all');
  const [cart, setCart] = useState({});

  const queryClient = useQueryClient();

  const { data: drugs, isLoading, error } = useQuery({
    queryKey: ['drugs'],
    queryFn: fetchDrugs,
  });

  const filteredDrugs = useMemo(() => {
    if (!drugs) return [];
    return drugs.filter(drug =>
      (drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       drug.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
       drug.supplier.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === 'all' || drug.category === categoryFilter) &&
      (supplierFilter === 'all' || drug.supplier === supplierFilter) &&
      (statusFilter === 'all' || drug.status === statusFilter) &&
      (hospitalFilter === 'all' || drug.hospital === hospitalFilter)
    );
  }, [drugs, searchTerm, categoryFilter, supplierFilter, statusFilter, hospitalFilter]);

  if (isLoading) return <div className="text-center text-2xl mt-8">Loading...</div>;
  if (error) return <div className="text-center text-2xl mt-8 text-red-600">Error: {error.message}</div>;

  const categories = [...new Set(drugs.map(drug => drug.category))];
  const suppliers = [...new Set(drugs.map(drug => drug.supplier))];
  const statuses = [...new Set(drugs.map(drug => drug.status))];
  const hospitals = [...new Set(drugs.map(drug => drug.hospital))];

  const addToCart = (drugId, quantity) => {
    setCart(prevCart => ({
      ...prevCart,
      [drugId]: (prevCart[drugId] || 0) + quantity
    }));
  };

  const handleDeleteDrug = async (drugId) => {
    await deleteDrugFromInventory(drugId);
    queryClient.invalidateQueries('drugs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Inventory Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Drug Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <InventoryFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  supplierFilter={supplierFilter}
                  setSupplierFilter={setSupplierFilter}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  hospitalFilter={hospitalFilter}
                  setHospitalFilter={setHospitalFilter}
                  categories={categories}
                  suppliers={suppliers}
                  statuses={statuses}
                  hospitals={hospitals}
                />
                <InventoryList
                  filteredDrugs={filteredDrugs}
                  addToCart={addToCart}
                  handleDeleteDrug={handleDeleteDrug}
                />
              </CardContent>
            </Card>
            <StockLevels />
          </div>
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add New Drug</CardTitle>
              </CardHeader>
              <CardContent>
                <AddDrugForm />
              </CardContent>
            </Card>
            <SupplyOrderTracking />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inventory;