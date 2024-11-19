    import React, { useState } from "react";
    import ParticleBackground from "../components/ParticleBackground";

const LoginPage = ({ setIsAuthenticated, setUserType }) => {
  const [userType, setLocalUserType] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState(""); // For sellers only

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulating login for demo purposes
    if (email && password) {
      setIsAuthenticated(true);
      setUserType(userType);
      alert(`${userType} logged in successfully!`);
    } else {
      alert("Please enter valid login details.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r">
        <ParticleBackground />
      <div className="relative bg-white bg-opacity-100 shadow-2xl rounded-lg p-8 w-11/12 max-w-md z-10">
        {/* App Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome to Fruit <span className="text-indigo-600">Freshness Detector</span>
        </h1>

        {/* Toggle Between Buyer and Seller */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
              userType === "buyer"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setLocalUserType("buyer")}
          >
            Buyer
          </button>
          <button
            className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
              userType === "seller"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setLocalUserType("seller")}
          >
            Seller
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              required
            />
          </div>

          {/* Additional Input for Sellers */}
          {userType === "seller" && (
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-gray-700"
              >
                Business Name
              </label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Enter your business name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Login as {userType === "buyer" ? "Buyer" : "Seller"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
