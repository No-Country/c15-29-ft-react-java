/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { Image, Divider, Skeleton } from "@nextui-org/react";
import { usePet } from "@/Api/PetContext";

export const AdoptProcess = ({ pet, user }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { srcImg, setSrcImg } = usePet()

  useEffect(() => {
    const fetchImage = async (width, height) => {
      const customURL = `https://picsum.photos/${width}/${height}`;
      const res = await fetch(customURL);
      setSrcImg(res.url);
      if (res.ok) setIsLoaded(true);
      return res.url;
    };
  
    // setTimeout placeholder to simulate loading, remove this in production
    fetchImage(270, 270);
  }, [setSrcImg, setIsLoaded]);
  


  return (
    <Skeleton isLoaded={isLoaded} className="w-full rounded-lg h-full max-w-screen-lg mx-8 mt-16 md:mx-auto">
<div className="bg-gradient-to-r from-orange-500 to-zinc-900 text-white rounded-lg shadow-md p-6 mx-auto flex flex-col md:flex-row">
  <div className="md:w-1/2 md:pr-6 animate__animated animate__fadeInLeft">
    <div className="relative mb-6">
      <img
        src={srcImg}
        alt={`Avatar de ${pet.name}`}
        className="w-full h-64 object-cover rounded-md shadow-lg animate__animated animate__fadeInLeft"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-4xl font-extrabold leading-tight">{pet.name}</h2>
      </div>
    </div>
    <div className="text-center">
      <p className="text-lg mb-4">{pet.age}</p>
    </div>
    <div>
      <h3 className="text-2xl font-semibold mb-4 mt-6">Información General</h3>
      <ul className="list-disc pl-4">
        <li className="text-lg">ID: {pet.id}</li>
        <li className="text-lg">Adoptado: {pet.adopted ? "Sí" : "No"}</li>
        <li className="text-lg">
          En proceso de adopción: {pet.adoptionInProcess ? "Sí" : "No"}
        </li>
        <li className="text-lg">Fecha de nacimiento: {pet.vaccinated || "No especificada"}</li>
      </ul>
    </div>
  </div>
  <div className="md:w-1/2 md:pl-6 animate__animated animate__fadeInRight mt-6 md:mt-0">
    <h2 className="text-4xl font-extrabold mb-6">Datos del Adoptante</h2>
    {user && (
      <ul className="list-disc pl-4">
        <li className="text-lg">Email: {user.email}</li>
        <li className="text-lg">Apellido: {user.lastName || "No especificado"}</li>
        <li className="text-lg">Nacionalidad: {user.nationality || "No especificada"}</li>
        <li className="text-lg">Whatsapp: {user.whatsappNumber || "No especificado"}</li>
      </ul>
    )}
    <div className="mt-8">
      <button className="bg-orange-700 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-all duration-300 shadow-md">
        Adoptar
      </button>
    </div>
  </div>
</div>
      </Skeleton>
  );
};
