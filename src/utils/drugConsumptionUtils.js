import { getFromStorage, setToStorage } from './storageUtils';

export const getDrugConsumption = () => getFromStorage('drugConsumption') || [];

export const addDrugConsumption = (consumption) => {
  const consumptions = getDrugConsumption();
  consumptions.push({ ...consumption, id: Date.now() });
  setToStorage('drugConsumption', consumptions);
};

export const updateDrugConsumption = (id, updatedConsumption) => {
  const consumptions = getDrugConsumption();
  const index = consumptions.findIndex(c => c.id === id);
  if (index !== -1) {
    consumptions[index] = { ...consumptions[index], ...updatedConsumption };
    setToStorage('drugConsumption', consumptions);
  }
};

export const deleteDrugConsumption = (id) => {
  const consumptions = getDrugConsumption();
  const updatedConsumptions = consumptions.filter(c => c.id !== id);
  setToStorage('drugConsumption', updatedConsumptions);
};