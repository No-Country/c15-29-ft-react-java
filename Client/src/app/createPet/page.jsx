import React from 'react';
import CreatePet from '@/components/PetComponents/createPet/CreatePet';

export const metadata = {
    title: "Upload Pet",
    description: "Upload your pet!",
};

export default function CreatePetPage() {
    return (
        <>

            <CreatePet />
        </>
    )
}