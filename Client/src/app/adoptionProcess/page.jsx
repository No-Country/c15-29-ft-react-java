'use client'

import { useAuth } from "@/Api/AuthContext";
import { usePet } from "@/Api/PetContext";
import { AdoptProcess } from "@/components/PetComponents/adoptProcess/AdoptProcess";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function AdoptProcessPage() {
  const { getPet, onlyPet } = usePet();
  const { token } = useAuth();
  const storedPetIdRef = useRef(null);

  useEffect(() => {
    // Recuperar el ID de la mascota desde el localStorage
    if (typeof window !== 'undefined') {
      // Establecer el ID en el estado local
      storedPetIdRef.current = localStorage.getItem("adoptedPetId");
      getPet(storedPetIdRef.current);
    }
  }, [getPet]);

  return (
    <>
      <div>AdoptPage</div>
      <AdoptProcess pet={onlyPet} user={onlyPet.user_id} />
    </>
  );
}



// address
// : 
// "San Juan 944"
// avatar
// : 
// "pruebasPruebasJuan/images/thumbnail"
// dateOfBirth
// : 
// null
// email
// : 
// "pruebasPruebasJuan@gmail.com"
// id
// : 
// 39
// lastName
// : 
// "Ortega"
// name
// : 
// "Juan"
// nationality
// : 
// null
// password
// : 
// "$2a$10$a1b9HSJ0zqP3eAyr7LKJcuQp9HCJ9O.RSkPKhp4r9ixhJtfqoaoUC"
// roles
// : 
// [{…}]
// username
// : 
// "pruebasPruebasJuan"
// whatsappNumber
// : 
// "3517707973"