import { getFromStorage, setToStorage } from './storageUtils';
import { notifyLowDrugStock } from './notificationUtils';

export const fetchDrugs = () => {
  return getFromStorage('drugInventory') || [];
};

export const addDrugToInventory = (drug) => {
  const inventory = fetchDrugs();
  const newDrug = { ...drug, id: Date.now() };
  inventory.push(newDrug);
  setToStorage('drugInventory', inventory);
  checkAndNotifyLowStock(newDrug);
};

export const deleteDrugFromInventory = (id) => {
  const inventory = fetchDrugs();
  const updatedInventory = inventory.filter(d => d.id !== id);
  setToStorage('drugInventory', updatedInventory);
};

const checkAndNotifyLowStock = (drug) => {
  if (drug.stockLevel <= 10) {
    notifyLowDrugStock(drug.name, drug.stockLevel);
  }
};

export const updateDrugInInventory = (id, updatedDrug) => {
  const inventory = getDrugInventory();
  const index = inventory.findIndex(d => d.id === id);
  if (index !== -1) {
    inventory[index] = { ...inventory[index], ...updatedDrug };
    setToStorage('drugInventory', inventory);
    checkAndNotifyLowStock(inventory[index]);
  }
};

export const updateDrugStockLevel = (id, newStockLevel) => {
  const inventory = getDrugInventory();
  const index = inventory.findIndex(d => d.id === id);
  if (index !== -1) {
    inventory[index].stockLevel = newStockLevel;
    setToStorage('drugInventory', inventory);
    checkAndNotifyLowStock(inventory[index]);
  }
};



export const getInventoryMetrics = () => {
  const inventory = getDrugInventory();
  const lowStockThreshold = 10; // Example threshold
  const expiryThreshold = 30; // Days until expiry to show alert

  const expiringItems = inventory.filter(drug => {
    const daysUntilExpiry = Math.ceil((new Date(drug.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= expiryThreshold && daysUntilExpiry > 0;
  });

  return {
    totalStockValue: inventory.reduce((total, drug) => total + (drug.stockLevel * drug.price), 0),
    totalSKUs: inventory.length,
    avgReplenishmentTime: calculateAvgReplenishmentTime(inventory),
    stockTurnoverRate: calculateStockTurnoverRate(inventory),
    onTimeDeliveries: calculateOnTimeDeliveries(),
    outOfStockIncidents: inventory.filter(drug => drug.stockLevel === 0).length,
    stockValueProgress: calculateStockValueProgress(inventory),
    lowStockItems: inventory.filter(drug => drug.stockLevel <= lowStockThreshold).map(drug => ({
      name: drug.name,
      currentStock: drug.stockLevel,
      threshold: lowStockThreshold
    })),
    expiringItems: expiringItems.map(drug => ({
      name: drug.name,
      expiryDate: drug.expiryDate
    }))
  };
};

export const getLowStockDrugs = () => {
  const inventory = getDrugInventory();
  return inventory.filter(drug => drug.stockLevel <= drug.reorderLevel).map(drug => ({
    id: drug.id,
    name: drug.name,
    currentStock: drug.stockLevel,
    reorderLevel: drug.reorderLevel
  }));
};

export const reorderDrug = async (drugId) => {
  // This is a mock function. In a real application, this would make an API call to place an order.
  console.log(`Reordering drug with ID: ${drugId}`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Update local storage to simulate stock increase
  const inventory = getDrugInventory();
  const drugIndex = inventory.findIndex(drug => drug.id === drugId);
  if (drugIndex !== -1) {
    inventory[drugIndex].stockLevel += 100; // Add 100 to stock as an example
    setToStorage('drugInventory', inventory);
  }
  return { success: true, message: 'Drug reordered successfully' };
};

export const getDrugExpiryDates = () => {
  const inventory = getDrugInventory();
  return inventory.map(drug => ({
    name: drug.name,
    expiryDate: drug.expiryDate
  }));
};

const calculateStockValueProgress = (inventory) => {
  const totalValue = inventory.reduce((total, drug) => total + (drug.stockLevel * drug.price), 0);
  const maxValue = 1000000; // Example maximum value
  return (totalValue / maxValue) * 100;
};


export const updateInventoryBasedOnConsumption = (drugName, quantityUsed) => {
  const inventory = getDrugInventory();
  const drugIndex = inventory.findIndex(d => d.name === drugName);
  
  if (drugIndex !== -1) {
    inventory[drugIndex].stockLevel -= quantityUsed;
    if (inventory[drugIndex].stockLevel < 0) {
      inventory[drugIndex].stockLevel = 0;
    }
    setToStorage('drugInventory', inventory);
    checkAndNotifyLowStock(inventory[drugIndex]);
  }
};

export const calculateReorderPoint = (drug) => {
  const leadTime = drug.leadTime || 7; // Default lead time of 7 days if not specified
  const dailyUsage = calculateAverageDailyUsage(drug);
  const safetyStock = calculateSafetyStock(drug);
  return (dailyUsage * leadTime) + safetyStock;
};

const calculateAverageDailyUsage = (drug) => {
  // This should be calculated based on historical consumption data
  // For now, we'll use a simple estimation
  return drug.averageMonthlyUsage ? drug.averageMonthlyUsage / 30 : 1;
};

const calculateSafetyStock = (drug) => {
  // This should be calculated based on demand variability and desired service level
  // For now, we'll use a simple estimation
  return drug.minStockLevel || 10;
};

const calculateAvgReplenishmentTime = (inventory) => {
  // This should be calculated based on historical replenishment data
  // For now, we'll return a fixed value
  return 5;
};

const calculateStockTurnoverRate = (inventory) => {
  // This should be calculated based on historical sales and average inventory value
  // For now, we'll return a fixed value
  return 4.5;
};

const calculateOnTimeDeliveries = () => {
  // This should be calculated based on historical delivery data
  // For now, we'll return a fixed value
  return 0.95;
};

export const getForecastedDemand = (drugId, days) => {
  // This should use more sophisticated forecasting methods
  // For now, we'll use a simple moving average
  const consumptionHistory = getFromStorage('drugConsumption') || [];
  const drugConsumption = consumptionHistory.filter(c => c.drugId === drugId);
  const recentConsumption = drugConsumption.slice(-30); // Last 30 days

  if (recentConsumption.length === 0) return 0;

  const avgDailyConsumption = recentConsumption.reduce((sum, c) => sum + c.quantity, 0) / recentConsumption.length;
  return Math.round(avgDailyConsumption * days);
};

export const getOptimalOrderQuantity = (drug) => {
  // This is a simple implementation of the Economic Order Quantity (EOQ) formula
  // In a real-world scenario, this would be more complex and consider various factors
  const annualDemand = drug.averageMonthlyUsage * 12;
  const orderCost = drug.orderCost || 10; // Default order cost if not specified
  const holdingCost = drug.holdingCost || (drug.price * 0.1); // Default holding cost is 10% of drug price if not specified

  return Math.sqrt((2 * annualDemand * orderCost) / holdingCost);
};
