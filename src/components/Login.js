import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "admin") {
      // Simple password check for demo purposes
      onLogin(true);
    } else {
      alert("Incorrect password");
    }
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 w-80"
    >
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
