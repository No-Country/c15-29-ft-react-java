'use client'

import React, { useEffect, useState } from "react";
import { usePet } from "@/Api/PetContext";
import PetCard from "./PetCard";
import { useAuth } from "@/Api/AuthContext";

export default function MyPets() {
  const { userPets = [], getUserPets } = usePet();
  const { userInfo } = useAuth();
  const { token } = useAuth()

  useEffect(() => {
    // Check if userInfo.id is available before calling getUserPets
    if (userInfo && userInfo.id && token) {;
      getUserPets(userInfo.id, token);
    }
  }, [getUserPets, userInfo, token]);
  // Use a separate useEffect for logging when userPets changes

  return (
    <div className="flex gap-12 flex-wrap justify-center items-center">
      {userPets.map((pet) => (
        <React.Fragment key={pet.id}>
          <PetCard
            id={pet.id}
            age={pet.age}
            breed={pet.breed}
            generalDescription={pet.generalDescription}
            images={pet.images}
            name={pet.name}
            tags={pet.tags}
          />
        </React.Fragment>
      ))}
    </div>
  );
}