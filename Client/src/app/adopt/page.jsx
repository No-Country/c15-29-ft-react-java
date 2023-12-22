import React from "react";
import Adopt from "@/components/PetComponents/adopt/Adopt";

export default function AdoptPage() {
  return (
    <>
      <div className="container mx-auto my-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white flex justify-center">
          <p className="ml-4 md:mr-2">🐾</p> Find Your Furry Companion{" "}
          <p className="mr-4 md:ml-2">🐾</p>
        </h1>
        <p className="text-gray-400 mb-8 mx-4">
          Welcome to our adoption community! These pets eagerly await a home
          filled with love and joy. Explore the cards below and discover your
          next best friend.
        </p>
      </div>
      <Adopt />
    </>
  );
}
