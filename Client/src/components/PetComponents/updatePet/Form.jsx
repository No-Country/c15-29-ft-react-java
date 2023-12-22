import React, { useEffect, useState } from 'react'
import { Input, Select, SelectItem, Button, ButtonGroup, Card } from "@nextui-org/react";
import axios from 'axios';
import { useAuth } from '@/Api/AuthContext';
import { usePet } from '@/Api/PetContext';
import useValidation from '@/components/hooks/useValidation';

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


    // validations

    // validate age
    const ageRegex = /^(100|[1-9]?\d)$/
    // const ageValidation = handleValidation(ageRegex);
    const [ageValue, setAgeValue, isAgeInvalid] = useValidation(ageRegex);
    // validate name
    const nameRegex = /^[a-zA-Z0-9\s]{3,20}$/
    const [nameValue, setNameValue, isNameInvalid] = useValidation(nameRegex);

    // validate breed
    const breedRegex = /^[a-zA-Z0-9\s]{3,20}$/
    const [breedValue, setBreedValue, isBreedInvalid] = useValidation(breedRegex);

    // validate health status
    const healthStatusRegex = /^[a-zA-Z0-9\s]{3,20}$/
    const [healthStatusValue, setHealthStatusValue, isHealthStatusInvalid] = useValidation(healthStatusRegex);

    // validate behavior
    const behaviorRegex = /^[a-zA-Z0-9\s]{3,20}$/
    const [behaviorValue, setBehaviorValue, isBehaviorInvalid] = useValidation(behaviorRegex);

    // validate location
    const locationRegex = /^[a-zA-Z0-9\s,.'":;¡!?¿-]{3,35}$/
    const [locationValue, setLocationValue, isLocationInvalid] = useValidation(locationRegex);

    // validate general description
    const generalDescriptionRegex = /^[a-zA-Z0-9\s,.'":;¡!?¿-]{3,250}$/
    const [generalDescriptionValue, setGeneralDescriptionValue, isGeneralDescriptionInvalid] = useValidation(generalDescriptionRegex);

    return (
        <>
            <Card className="flex flex-col gap-4 w-full bg-background/60 dark:bg-default-100/50 backdrop-blur-lg p-8 rounded-none sm:w-1/2 sm:rounded-xl">
                <h2 className="text-2xl font-bold">Update your pet info!</h2>
                <form className="flex flex-col gap-4">
                    <Input type="text" label="Pet Name" placeholder="Pet Name / Alias" variant='underlined' labelPlacement="outside" isRequired={true} onChange={handleInputChange} name="name" nameValidation={isNameInvalid} color={isNameInvalid ? "danger" : "success"} errorMessage={isNameInvalid ? "Name must be between 3 and 20 characters" : ""} onValueChange={setNameValue} />
                    <Input type="text" label="Breed" placeholder="Breed" variant='underlined' labelPlacement="outside" isRequired={true} onChange={handleInputChange} name="breed" breedValidation={isBreedInvalid} color={isBreedInvalid ? "danger" : "success"} errorMessage={isBreedInvalid ? "Breed must be between 3 and 20 characters" : ""} onValueChange={setBreedValue} />
                    <Input type="number" label="Age" placeholder="Age" variant='underlined' labelPlacement="outside" isRequired={true} onChange={handleInputChange} name='age' ageValidation={isAgeInvalid} color={isAgeInvalid ? "danger" : "success"} errorMessage={isAgeInvalid ? "Age must be a number between 1 and 100" : ""} onValueChange={setAgeValue} />
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4" >
                        <Select
                            label="Select pet size"
                            placeholder="Size"
                            className="w-full"
                            variant='underlined' isRequired={true} name="size" onChange={handleInputChange}>
                            {sizes.map((size) => (
                                <SelectItem key={size.value} value={size.value} >
                                    {size.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <Input type="text" label="Health Status" placeholder="Health status" variant='underlined' labelPlacement="outside" isRequired={true} onChange={handleInputChange} name='healthStatus' healthStatusValidation={isHealthStatusInvalid} color={isHealthStatusInvalid ? "danger" : "success"} errorMessage={isHealthStatusInvalid ? "Health Status must be between 3 and 20 characters" : ""} onValueChange={setHealthStatusValue} />
                    <Input type="text" label="Behavior" placeholder="Behavior" variant='underlined' labelPlacement="outside" isRequired={true} onChange={handleInputChange} name='behavior' behaviorValidation={isBehaviorInvalid} color={isBehaviorInvalid ? "danger" : "success"} errorMessage={isBehaviorInvalid ? "Behavior must be between 3 and 20 characters" : ""} onValueChange={setBehaviorValue} />
                    <Input type="text" label="Location" placeholder="Location" variant='underlined' labelPlacement="outside" isRequired={true} onChange={handleInputChange} name='location' locationValidation={isLocationInvalid} color={isLocationInvalid ? "danger" : "success"} errorMessage={isLocationInvalid ? "Location must be between 3 and 35 characters" : ""} onValueChange={setLocationValue} />
                    <Input type="text" label="Description" placeholder="Description" variant='underlined' labelPlacement="outside" isRequired={true} isClearable value={inputInfo} onClear={() => setInputInfo("")} onChange={(e) => {
                        setInputInfo(e.target.value)
                        handleInputChange(e)
                    }} name='generalDescription' generalDescriptionValidation={isGeneralDescriptionInvalid} color={isGeneralDescriptionInvalid ? "danger" : "success"} errorMessage={isGeneralDescriptionInvalid ? "Description must be between 3 and 250 characters" : ""} onValueChange={setGeneralDescriptionValue} />
                    <Input type="file" label="Upload Image" placeholder="Upload Images" variant='underlined' labelPlacement="outside" isRequired={true} onChange={(e) => {
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