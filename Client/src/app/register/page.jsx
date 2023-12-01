import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-2xl font-bold mb-4">REGISTER</h3>
      <form className="flex flex-col">
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="text"
          placeholder="USERNAME"
        />
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="email"
          placeholder="E-MAIL"
        />
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="password"
          placeholder="PASSWORD"
        />
        <input
          className="mb-2 p-2 border border-gray-300 rounded"
          type="password"
          placeholder="CONFIRM PASSWORD"
        />
        <h5 className="text-sm mb-2">REQUIRED FIELD</h5>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          type="submit"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}
