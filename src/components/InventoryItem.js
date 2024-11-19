import React from "react";

const InventoryItem = ({ fruit, onBuy }) => {
  const handleBuyClick = () => {
    onBuy(fruit.id);  // Pass the fruit ID to the parent for removal
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={fruit.imageUrl} alt={fruit.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{fruit.name}</h3>
        <p className="text-sm text-gray-500">Location: {fruit.location}</p>
        <p className="text-sm text-gray-500">Freshness: {fruit.freshness}</p>
        <p className="text-sm text-gray-500">Confidence: {fruit.confidence}%</p>
        <button
          onClick={handleBuyClick}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;
