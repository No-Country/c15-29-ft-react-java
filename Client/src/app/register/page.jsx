import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col justify-center  items-center h-screen">
      <h3 className="text-2xl  mt-83 font-bold mb-4">REGISTER</h3>
      <form className="flex flex-col  w-72  ">
        <input
          className=" font-medium bg-stone-100 mb-4 p-2 h-9 border border-gray-300 rounded-2xl"
          type="text"
          placeholder="USERNAME"
        />
        <input
          className=" font-medium bg-stone-100 mb-4 w-19 h-9 p-2 border border-gray-300 rounded-2xl"
          type="email"
          placeholder="E-MAIL"
        />
        <input
          className=" font-medium bg-stone-100  mb-4  h-9 p-2 border border-gray-300 rounded-2xl"
          type="password"
          placeholder="PASSWORD"
        />
        <input
          className="font-medium bg-stone-100 text-gray-300  mb-4 h-9 p-2 border border-gray-300 rounded-2xl"
          type="password"
          placeholder="CONFIRM PASSWORD"
        />
        <h5 className="text-xs  mb-2">REQUIRED FIELD</h5>
        <button
          className="font-medium rounded-2xl w-32 h-8 ml-36 mb-4  bg-zinc-800 ml-118 text-white py-2 px-4 rounded"
          type="submit"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}
