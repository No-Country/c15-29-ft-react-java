"use client";

import React, { useContext, useEffect, useState } from "react";
import Card from "@/components/PetComponents/card/Card";
import { PetProvider, usePet } from "@/Api/PetContext";
import { PetModal } from "../card/PetModal";
import { useAuth } from "@/Api/AuthContext";
import { toast } from "sonner";

export default function Adopt() {
  const { pets, getPets } = usePet();
  const { notification, clearNotification } = useAuth();


  useEffect(() => {
    getPets();
  }, []);

  useEffect(() => {
    if (notification) {
      if (notification.type === 'success') {
        toast.success(notification.message);
      }
      clearNotification();
    }
  }, [notification, clearNotification]);

  return (
    <div className="flex gap-12 flex-wrap justify-center items-center">
      {pets.map((pet) => (
        <React.Fragment key={pet.id}>
          <Card pet={pet} />
          <PetModal pet={pet} />
        </React.Fragment>
      ))}
    </div>
  );
}
