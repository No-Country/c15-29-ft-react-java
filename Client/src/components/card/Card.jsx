"use client"

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import axios from "axios";
import { useAuth } from "@/Api/AuthContext";

export default function App({ age = "not Specified", species = "petSpecies", name = "petName", tags = [] }) {
    const [srcImg, setSrcImg] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // starts as null, when it changes to a number, the modal opens, and later on becomes null again
    const [openModalId, setOpenModalId] = useState(null);
    const { setAuthToken, setErrorNotification, clearNotification, getCookieValue } = useAuth();

    const token = getCookieValue("AuthToken")
    const [pets, setPets] = useState([])
    const [onlyPet, setOnlyPet] = useState([])
    const [selectedPetId, setSelectedPetId] = useState('')

    const showPetDetails = (id) => {
        setSelectedPetId(id);
    };

    useEffect(() => {
        if (selectedPetId) {
            getPet(selectedPetId);
        }
    }, [selectedPetId, token]);

    // test placeholder till we get images from backend, delete later on
    const fetchImage = async (width, height) => {
        const customURL = `https://placekitten.com/${width}/${height}`;
        const res = await fetch(customURL);
        setSrcImg(res.url);
        if (res.ok)
            setIsLoaded(true);
        return res.url;
    };

    const getPet = async () => {
        try {
            const res = await axios.get(`https://pets-adopt-api.onrender.com/api/pet/${selectedPetId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setOnlyPet([res.data]);

        } catch (error) {
            console.log(onlyPet);
            console.log(token);
            console.log(selectedPetId)
            console.error('Error al obtener detalles de la mascota', error);
        }
    };

    // placeholder to deal with adopt process later on
    const adoptPost = async () => {
    }

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const fetchTest = async () => {
        try {
            const response = await axios.get('https://pets-adopt-api.onrender.com/api/pet/getAll', credentials,
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

    useEffect(() => {
        // setTimeout placeholder to simulate loading, remove this in production
        fetchImage(270, 270);

        fetchTest()
    }, []);
    console.log(pets)

    return (
        <>
            <div className="flex gap-12 flex-wrap justify-center items-center">
                {pets.map((pet) => (
                    <Card className="py-4 min-w-72 w-[300px] max-w-xs active:scale-90 transition-all duration-300 ease-in-out hover:scale-105" key={pet.id} onClick={() => {
                        onOpen();
                        showPetDetails(pet.id);
                        setOpenModalId(pet.id);
                    }} isPressable={true} isHoverable={true}>
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
                            <Skeleton isLoaded={isLoaded} className="rounded-lg">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl select-none h-[270px] w-[270px] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                                    src={srcImg}
                                    draggable={false}
                                />
                            </Skeleton>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-2 items-start px-4">
                            <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg mt-2">
                                <p className="text-small uppercase font-bold">{age}</p>
                            </Skeleton>
                            <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg my-0.5">
                                <small className="text-default-500">{species}</small>
                            </Skeleton>
                            <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
                                <h4 className="font-bold text-large">{pet.name}</h4>
                            </Skeleton>
                        </CardBody>
                    </Card>
                ))}
            </div >
            {pets.map((pet) => (
                <Modal isOpen={openModalId === pet.id} onOpenChange={() => setOpenModalId(null)} key={pet.id}>
                    <ModalContent className="flex flex-col gap-2 max-w-2xl w-full max-h-full min-h-[500px] h-auto">
                        {(onClose) => (
                            <>
                                <ModalBody className="flex flex-col gap-2 items-center py-8">
                                    <Image
                                        alt="Card background"
                                        // make image bigger
                                        className="object-cover rounded-xl select-none h-auto w-[400px]"
                                        src={srcImg}
                                        draggable={false}
                                        onClick={onOpen}
                                    />
                                    <div className="flex flex-row gap-2 flex-wrap justify-center items-center w-full mt-1">
                                        {tags.length > 0 ? tags.map((tag, index) => (
                                            <span key={index} className={`bg-blue-100 text-blue-800 text-sm font-medium  ${tags.length > 1 ? "me-2" : ""} px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}>{tag}</span>
                                        )) : <span className={`bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300`}>No tags available</span>
                                        }
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        {/* {tags.map((tag, index) => ( 
                                            <span key={index} className={`bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}>{tag}</span>
                                 ))} */}
                                    </div>
                                    <Divider orientation="horizontal" className="my-1" />
                                    <h3 className="font-bold text-xl bold">{pet.name}</h3>
                                    <div className="flex flex-row gap-2">
                                        <p className="text-medium uppercase font-bold">{age}</p>
                                        <Divider orientation="vertical" className="h-auto max-h-full" />
                                        <small className="text-default-500 text-medium">{species}</small>
                                    </div>
                                    <p>
                                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Keep searching
                                    </Button>
                                    <Button color="primary" onPress={adoptPost}>
                                        Adopt!
                                    </Button>
                                </ModalFooter>
                            </>
                        )
                        }
                    </ModalContent >
                </Modal >
            ))
            }
        </>
    );
}