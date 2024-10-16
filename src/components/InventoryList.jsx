import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, ShoppingCart, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const InventoryList = ({ filteredDrugs, addToCart, handleDeleteDrug }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredDrugs.map(drug => (
        <Card key={drug.id} className="flex flex-col justify-between transition-all duration-300 hover:shadow-lg">
          <CardContent className="pt-4">
            <h3 className="font-semibold text-lg mb-2">{drug.name}</h3>
            <p className="text-sm text-gray-600">Category: {drug.category}</p>
            <p className="text-sm text-gray-600">Supplier: {drug.supplier}</p>
            <p className="text-sm text-gray-600">Hospital: {drug.hospital}</p>
            <p className="flex items-center mt-2">
              <Package className="mr-2" size={16} />
              Stock Level: {drug.stockLevel}
            </p>
            <p className={`text-sm ${drug.status === 'In Stock' ? 'text-green-600' : drug.status === 'Low Stock' ? 'text-yellow-600' : 'text-red-600'}`}>
              Status: {drug.status}
            </p>
          </CardContent>
          <CardContent className="flex justify-between items-center pt-0">
            <Input
              type="number"
              placeholder="Qty"
              className="w-20 mr-2"
              min="1"
              max={drug.stockLevel}
              onChange={(e) => {
                const quantity = parseInt(e.target.value, 10);
                if (quantity > 0 && quantity <= drug.stockLevel) {
                  addToCart(drug.id, quantity);
                }
              }}
            />
            <Button onClick={() => addToCart(drug.id, 1)} disabled={drug.stockLevel === 0} className="bg-blue-500 hover:bg-blue-600">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the drug from the inventory.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteDrug(drug.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InventoryList;