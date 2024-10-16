// Simulated blockchain for drug shipment tracking
let blockchain = [];

export const addShipmentToBlockchain = (shipment) => {
  const block = {
    timestamp: Date.now(),
    shipmentId: shipment.id,
    data: shipment,
    previousHash: blockchain.length > 0 ? blockchain[blockchain.length - 1].hash : '0',
    hash: calculateHash(shipment),
  };
  blockchain.push(block);
  return block;
};

export const getShipmentFromBlockchain = (shipmentId) => {
  return blockchain.find(block => block.shipmentId === shipmentId);
};

export const verifyBlockchain = () => {
  for (let i = 1; i < blockchain.length; i++) {
    const currentBlock = blockchain[i];
    const previousBlock = blockchain[i - 1];
    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
    if (calculateHash(currentBlock.data) !== currentBlock.hash) {
      return false;
    }
  }
  return true;
};

const calculateHash = (data) => {
  // This is a simplified hash function for demonstration purposes
  return btoa(JSON.stringify(data));
};