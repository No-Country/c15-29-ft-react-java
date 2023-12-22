import React, { useEffect, useState } from 'react'
import { Input, Select, SelectItem, Button, ButtonGroup, Card } from "@nextui-org/react";
import axios from 'axios';
import { useAuth } from '@/Api/AuthContext';
import { usePet } from '@/Api/PetContext';

export default function Form({ pet }) {
    const { id, name, breed, age, size, healthStatus, behavior, location, generalDescription, images } = pet
    const { getCookieValue } = useAuth();
    const token = getCookieValue("AuthToken")
    const [inputInfo, setInputInfo] = useState("");
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
        images: []
    });
    const { editPet } = usePet();

    const handleInputChange = (e) => {
        e.target.name === "images" ?
            setPetData({
                ...petData,
                [e.target.name]: e.target.files
            })
            :
            setPetData({
                ...petData,
                [e.target.name]: e.target.value
            })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        editPet(3, petData)
    }



    return (
        <>
            <Card className="flex flex-col gap-4 w-full bg-background/60 dark:bg-default-100/50 backdrop-blur-lg p-8 rounded-none sm:w-1/2 sm:rounded-xl">
                <h2 className="text-2xl font-bold">Update Pet</h2>
                <form className="flex flex-col gap-4">
                    <Input type="text" label="Pet Name" placeholder={`${name}`} variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name="name" />
                    <Input type="text" label="Breed" placeholder="Breed" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name='breed' />
                    <Input type="number" label="Age" placeholder="Age" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name='age' />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4" >
                        <Select
                            label="Select pet size"
                            placeholder="Size"
                            className="w-full"
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
            </Card>
        </>
    )
}