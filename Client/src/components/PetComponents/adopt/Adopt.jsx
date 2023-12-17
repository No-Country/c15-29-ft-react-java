"use client";

import React, { useContext, useEffect, useState } from "react";
import Card from "@/components/PetComponents/card/Card";
import { PetProvider, usePet } from "@/Api/PetContext";
import { PetModal } from "../card/PetModal";

export default function Adopt() {
  const { pets, getPets } = usePet();

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div className="flex gap-12 flex-wrap justify-center items-center">
      {pets.map((pet) => (
        <>
          <Card
            id={pet.id}
            age={pet.age}
            breed={pet.breed}
            generalDescription={pet.generalDescription}
            images={pet.images}
            name={pet.name}
            tags={pet.tags}
            key={pet.id}
          />
          <PetModal pet={pet}/>
        </>
      ))}
    </div>
  );
}
