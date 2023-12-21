import React, { useEffect, useState } from "react";
import Form from "@/components/PetComponents/updatePet/Form";
import { usePet } from "@/Api/PetContext";
import { useAuth } from "@/Api/AuthContext";

export default function App() {
    const { getPet, onlyPet } = usePet();
    const { token } = useAuth();

    const petData = () => getPet(66);
    return (

        <div className="flex w-full flex-wrap justify-center md:flex-nowrap gap-4">
            <Form pet={petData} />
        </div>
    );
}
