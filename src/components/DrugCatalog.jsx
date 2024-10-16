import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, AlertCircle, AlertTriangle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DrugCatalog = ({ drugCatalog }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [supplierFilter, setSupplierFilter] = React.useState('');

  const filteredDrugs = drugCatalog.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'all' || drug.category === categoryFilter) &&
    (supplierFilter === 'all' || drug.supplier === supplierFilter)
  );

  const categories = [...new Set(drugCatalog.map(drug => drug.category))];
  const suppliers = [...new Set(drugCatalog.map(drug => drug.supplier))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="mr-2" />
          Drug Catalog
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Search drugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={supplierFilter} onValueChange={setSupplierFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by supplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suppliers</SelectItem>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier} value={supplier}>
                    {supplier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type/Form</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Warning</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrugs.map((drug) => (
                <TableRow key={drug.id} className={drug.stock === 0 ? 'opacity-50' : ''}>
                  <TableCell>{drug.name}</TableCell>
                  <TableCell>{drug.type}</TableCell>
                  <TableCell>{drug.category}</TableCell>
                  <TableCell>{drug.supplier}</TableCell>
                  <TableCell>${drug.price}</TableCell>
                  <TableCell>
                    {drug.stock === 0 ? (
                      <Badge variant="destructive" className="flex items-center">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Out of Stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-50">
                        {drug.stock} in stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {drug.isAddictive && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <AlertTriangle className="text-yellow-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Potentially addictive medication</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DrugCatalog;