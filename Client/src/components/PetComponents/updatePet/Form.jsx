import React, { useEffect, useState } from 'react'
import { Input, Select, SelectItem, Button, ButtonGroup } from "@nextui-org/react";
import axios from 'axios';
import { useAuth } from '@/Api/AuthContext';

export default function Form() {
    const { getCookieValue } = useAuth();
    const token = getCookieValue("AuthToken")
    const [inputInfo, setInputInfo] = useState("hola");
    const sizes = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
    ];
    const [petData, setPetData] = useState({
        name: "",
        breed: "",
        age: "",
        size: "",
        healthStatus: "",
        behavior: "",
        location: "",
        generalDescription: "",
        images: [],
    });

    const sendForm = async (data) => {
        try {
            const res = await axios.post(`https://pets-adopt-api.onrender.com/api/pet`, data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

            if (res.status === 201) {
                console.log("Pet created successfully");
                console.log(res.data);
            } else {
                console.log("Error creating pet");
                console.log(res.data, res.status);
            }
        } catch (error) {
            console.log(token);
            console.log(data);
            console.log(petData);
            console.error('Error al obtener detalles de la mascota', error);
        }
    }

    const handleInputChange = (e) => {
        if (e.target.name === "images") {
            setPetData({
                ...petData,
                [e.target.name]: e.target.files
            })
        } else {
            setPetData({
                ...petData,
                [e.target.name]: e.target.value
            })
        }
        console.log(petData)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const imgArr = [...petData.images]
        console.log(imgArr)

        const formData = new FormData();
        formData.append("name", petData.name);
        formData.append("breed", petData.breed);
        formData.append("age", petData.age);
        formData.append("size", petData.size);
        formData.append("healthStatus", petData.healthStatus);
        formData.append("behavior", petData.behavior);
        formData.append("location", petData.location);
        formData.append("generalDescription", petData.generalDescription);
        formData.append("images", imgArr[0]);
        const data = Object.fromEntries(formData);

        console.log("soy formdata", formData)

        console.log("this is data before obj entr: ", data, "this is data after obj entr: ", Object.fromEntries(formData))

        sendForm(petData);
    }
    useEffect(() => {
        // sendForm();
        // console.log("this is the token: ", token)
        // console.log("this is the petData: ", petData)
    }, []);



    return (
        <>
            <article className="flex flex-col gap-4 w-full">
                <h2 className="text-2xl font-bold">Update Pet</h2>
                <form className="flex flex-col gap-4">
                    <Input type="text" label="Pet Name" placeholder="Pet Name / Alias" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name="name" />
                    <Input type="text" label="Breed" placeholder="Breed" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name='breed' />
                    <Input type="number" label="Age" placeholder="Age" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name='age' />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4" >
                        <Select
                            label="Select pet size"
                            placeholder="Size"
                            className="max-w-xs"
                            variant='underlined' isRequired name="size" onChange={handleInputChange}>
                            {sizes.map((size) => (
                                <SelectItem key={size.value} value={size.value} >
                                    {size.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <Input type="text" label="Health Status" placeholder="Health status" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name='healthStatus' />
                    <Input type="text" label="Behavior" placeholder="Behavior" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name='behavior' />
                    <Input type="text" label="Location" placeholder="Location" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name='location' />
                    <Input type="text" label="Description" placeholder="Description" variant='underlined' labelPlacement="outside" isRequired={true} isClearable value={inputInfo} onClear={() => setInputInfo("")} onChange={(e) => {
                        setInputInfo(e.target.value)
                        handleInputChange(e)
                    }} name='generalDescription' />
                    <Input type="file" label="Upload Image" placeholder="Upload Images" variant='underlined' labelPlacement="outside" isRequired onChange={(e) => {
                        handleInputChange(e)
                    }} name='images' />
                    <Button color="secondary" variant='ghost' onClick={(e) => handleFormSubmit(e)}>
                        Post
                    </Button>
                </form>
            </article>
        </>
    )
}