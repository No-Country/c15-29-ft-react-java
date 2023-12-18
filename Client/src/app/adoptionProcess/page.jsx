'use client'

import { useAuth } from "@/Api/AuthContext";
import { usePet } from "@/Api/PetContext";
import { AdoptProcess } from "@/components/PetComponents/adoptProcess/AdoptProcess";
import axios from "axios";
import { useEffect } from "react";

export default function AdoptProcessPage() {
  const { getPet, onlyPet } = usePet();
  const { token } = useAuth();
  const storedPetId = localStorage.getItem("adoptedPetId");

  useEffect(() => {
    // Recuperar el ID de la mascota desde el localStorage
    if (storedPetId) {
      // Establecer el ID en el estado local
      getPet(storedPetId);
    }
  }, [storedPetId, getPet]);

useEffect(() => {
  // Realizar acciones después de la actualización de onlyPet
  if (token) {
    getUserPet(39, token);
  }
}, [token]); // Asegúrate de que solo token sea la dependencia  

  const getUserPet = async (id, token) => {
    try {
      const res = await axios.get(
        `https://pets-adopt-api.onrender.com/api/userEntity/getById/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error al obtener detalles del usuario", error);
    }
  };

  return (
    <>
      <div>AdoptPage</div>
      <AdoptProcess pet={onlyPet} />
    </>
  );
}