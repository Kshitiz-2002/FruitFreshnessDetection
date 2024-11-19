import React, { useEffect, useState } from "react";
import axios from "axios";
import InventoryItem from "../components/InventoryItem"; // Component for each fruit in the inventory
import ParticleBackground from "../components/ParticleBackground"; // Background component
import { Link } from "react-router-dom"; // For navigation links

const InventoryPage = ({ userType }) => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch inventory data from your API
    const fetchInventory = async () => {
      try {
        const response = await axios.get("YOUR_API_ENDPOINT_FOR_INVENTORY");
        setInventory(response.data); // Assuming the response contains a list of fruits in the inventory
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleBuyFruit = async (fruitId) => {
    try {
      // API call to remove fruit from inventory
      const response = await axios.post("YOUR_API_ENDPOINT_TO_REMOVE_FRUIT", { fruitId });
      if (response.status === 200) {
        setInventory((prev) => prev.filter((fruit) => fruit.id !== fruitId)); // Remove from local state
        alert("Fruit successfully purchased!");
      }
    } catch (error) {
      console.error("Error purchasing fruit:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Untouchable particle background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Inventory Management</h1>
          <nav className="flex space-x-4">
            <Link
              to="/dashboard"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/inventory"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              {userType === "Seller" ? "Manage Fruits" : "Browse Fruits"}
            </Link>
          </nav>
        </header>

        {/* Inventory content */}
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-semibold text-center mb-6">Inventory</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((fruit) => (
              <InventoryItem
                key={fruit.id}
                fruit={fruit}
                onBuy={userType === "Buyer" ? handleBuyFruit : null} // Buyer can buy fruits
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
