import React, { useEffect, useState } from 'react'
import { Input, Select, SelectItem, Button, ButtonGroup, Card } from "@nextui-org/react";
import axios from 'axios';
import { useAuth } from '@/Api/AuthContext';

export default function Form() {
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
        images: [],
    });

    const sendForm = async (data) => {
        try {
            const res = await axios.post(`https://pets-adopt-api.onrender.com/api/pet`, data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
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
        const name = e.target.name;

        if (name === "images") {
            setPetData({
                ...petData,
                [name]: e.target.files
            })
        } else {
            setPetData({
                ...petData,
                [name]: e.target.value
            })
        }
        console.log(petData);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        sendForm(petData);
    }

    // validate age
    const [ageValue, setAgeValue] = useState("");
    const ageRegex = /^(100|[1-9]?\d)$/
    const validateAge = (ageValue) => ageValue.match(ageRegex);

    // const isInvalid = React.useMemo(() => {
    //     if (ageValue === "") return false;

    //     return validateAge(ageValue) ? false : true;
    // }, [ageValue]);

    const handleValidation = (regex) => {
        const [value, setValue] = useState("");

        const validateRegex = (value) => value.match(regex);
        const isInvalid = React.useMemo(() => {
            if (value === "") return false;

            return validateRegex(value) ? false : true;
        }, [value]);
        return [value, setValue, isInvalid];
    }
    const ageValidation = handleValidation(ageRegex);


    // age
    // <Input type="number" label="Age" placeholder="Age" variant='underlined' labelPlacement="outside" isRequired ageValidation={ageValidation} color={ageValidation ? "danger" : "success"} errorMessage={ageValidation && "Please enter a valid age"} onValueChange={setAgeValue} onChange={handleInputChange} name='age' />
    return (
        <>
            <Card className="flex flex-col gap-4 w-full bg-background/60 dark:bg-default-100/50 backdrop-blur-lg p-8 rounded-none sm:w-1/2 sm:rounded-xl">
                <h2 className="text-2xl font-bold pb-1">Let everyone know about the pet looking for a permanent home!</h2>
                <form className="flex flex-col gap-4">
                    <Input type="text" label="Pet Name" placeholder="Pet Name / Alias" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name="name" />
                    <Input type="text" label="Breed" placeholder="Breed" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name='breed' />
                    <Input type="number" label="Age" placeholder="Age" variant='underlined' labelPlacement="outside" isRequired onChange={handleInputChange} name='age' ageValidation={ageValidation[2]} color={ageValidation[2] ? "danger" : "success"} errorMessage={ageValidation[2] ? "Age must be a number between 1 and 100" : ""} onValueChange={ageValidation[1]} />
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
                    <input type="file" label="Upload Image" placeholder="Upload Images" variant='underlined' labelPlacement="outside" isRequired onChange={(e) => {
                        console.log("hi")
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