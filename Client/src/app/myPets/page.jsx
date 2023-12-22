import React from "react";
import Adopt from "@/components/PetComponents/adopt/Adopt";
import MyPets from "@/components/PetComponents/myPets/MyPets";

export default function MyPetsPage() {
  return (
    <>
      <div className="container mx-auto my-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white flex justify-center">
          <p className="ml-4 md:mr-2">🐾</p>  Check the pets you are helping to find a home!  <p className="mr-4 md:ml-2">🐾</p>
        </h1>
        <p className="text-gray-400 mb-8 mx-4">
        You can see the pets you are helping find a home here. If you wish to adopt a pet, you can do so from the section <a href="/adopt" className="underline">Adopt</a>.
        </p>
      </div>
      <MyPets />
    </>
  );
}
