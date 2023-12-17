"use client"

import React, { useEffect, useState } from 'react'
import Card from '@/components/card/Card'
import axios from 'axios'
import { useAuth } from '@/Api/AuthContext'

export default function Adopt() {
    const { setAuthToken, setErrorNotification, clearNotification, getCookieValue } = useAuth();
    const token = getCookieValue("AuthToken")

    const [pets, setPets] = useState(["soy un valor inicial"])
    const getPets = async () => {
        try {
            const response = await axios.get('https://pets-adopt-api.onrender.com/api/pet/getAll',
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            setPets(response.data);
        } catch (error) {
            console.error('Error al obtener mascotas', error);
        }
    }

    const deletePet = async (id) => {
        try {
            const response = await axios.delete(`https://pets-adopt-api.onrender.com/api/pet/${id}`, credentials,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            console.log(response)
            console.log("La mascota ha sido eliminada")
        }
        catch (error) {
            console.error('La mascota no ha podido ser eliminada', error);
        }
    }


    useEffect(() => {
        getPets();
    }, [])

    return (
        <div className="flex gap-12 flex-wrap justify-center items-center">
            {

                pets.map((pet) => (
                    <Card id={pet.id} age={pet.age} breed={pet.breed} generalDescription={pet.generalDescription} images={pet.images} name={pet.name} tags={pet.tags} key={pet.id} />
                ))
            }
        </div >
    )
}