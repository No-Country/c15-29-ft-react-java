import React from "react";
import Adopt from "@/components/PetComponents/adopt/Adopt";
import MyPets from "@/components/PetComponents/myPets/MyPets";

export default function MyPetsPage() {
  return (
    <>
      <div className="container mx-auto my-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white flex justify-center">
          <p className="ml-4 md:mr-2">🐾</p>  Revisá las mascotas que estás ayudando a conseguir un hogar!  <p className="mr-4 md:ml-2">🐾</p>
        </h1>
        <p className="text-gray-400 mb-8 mx-4">
          Aquí podrás ver las mascotas que estás ayudando a conseguir un hogar. Si deseas adoptar una mascota, puedes hacerlo desde la sección de <a href="/adopt" className="underline">Adoptar</a>.
        </p>
      </div>
      <MyPets />
    </>
  );
}
