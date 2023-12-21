import React, { useEffect, useState } from "react";
import Form from "@/components/PetComponents/updatePet/Form";
import { usePet } from "@/Api/PetContext";
import { useAuth } from "@/Api/AuthContext";

export default function App() {
    const { getPet, onlyPet } = usePet();
    const { token } = useAuth();

    useEffect(() => {
        // Recuperar el ID de la mascota desde el localStorage
        if (typeof window !== 'undefined') {
        }
    }, []);
    return (

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Form pet={onlyPet} />
            <div className="w-1/2">
                <h1 onLoad={console.log("hola", onlyPet)}>hola</h1>
            </div>
        </div>
    );
}
