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
    <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg shadow-md p-6  mx-auto flex flex-col md:flex-row ">
    
      <div className="md:w-1/2 md:pr-6 animate__animated animate__fadeInLeft">
        <div>
        {/* // eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={srcImg} // Reemplaza con la URL de tu imagen de mascota
          alt={`Avatar de ${pet.name}`}
          className="w-full md:w-64 h-64 mx-auto md:rounded-full mb-4 animate__animated animate__fadeInLeft"
        />
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">{pet.name}</h2>
          <p className="mb-4">{pet.age}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Información General</h3>
          <ul className="list-disc pl-4">
            <li>ID: {pet.id}</li>
            <li>Adoptado: {pet.adopted ? "Sí" : "No"}</li>
            <li>
              En proceso de adopción: {pet.adoptionInProcess ? "Sí" : "No"}
            </li>
            <li>Fecha de nacimiento: {pet.vaccinated || "No especificada"}</li>
            {/* Agrega más detalles según sea necesario */}
          </ul>
        </div>
      </div>
      <div className="md:w-1/2 md:pl-6 animate__animated animate__fadeInRight mt-6 md:mt-0">
        <h2 className="text-3xl font-semibold mb-2">Datos del Adoptante</h2>
        {user && (
          <ul className="list-disc pl-4">
            <li>Email: {user.email}</li>
            <li>Apellido: {user.lastName || 'No especificado'}</li>
            <li>Nacionalidad: {user.nationality || 'No especificada'}</li>
            <li>Whatsapp: {user.whatsappNumber || 'No especificado'}</li>
          </ul>
        )}
        <div className="mt-6">
          <button className="bg-f3794f text-white px-6 py-3 rounded-full hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-red-800 transition duration-300">
            Adoptar
          </button>
        </div>
      </div>
    </div>
      </Skeleton>
  );
};
