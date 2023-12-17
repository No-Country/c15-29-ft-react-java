"use client"

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Divider } from "@nextui-org/react";
import axios from "axios";
import { useAuth } from "@/Api/AuthContext";

export default function App({ id = "Missing ID", age, breed, generalDescription, images, name, tags = ["No tags available"] }) {
    const [srcImg, setSrcImg] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // starts as null, when it changes to a number, the modal opens, and later on becomes null again
    const [openModalId, setOpenModalId] = useState(null);
    const { setAuthToken, setErrorNotification, clearNotification, getCookieValue } = useAuth();

    const token = getCookieValue("AuthToken")
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
        const customURL = `https://picsum.photos/${width}/${height}`;
        const res = await fetch(customURL)
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
            // getPetImages(id);
            setOnlyPet([res.data]);
        } catch (error) {
            console.log(onlyPet);
            console.log(token);
            console.log(selectedPetId)
            console.error('Error al obtener detalles de la mascota', error);
        }
    };


    const deletePet = async (id) => {
        try {
            const response = await axios.delete(`https://pets-adopt-api.onrender.com/api/pet/${id}`, credentials,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            )
            window.location.reload()
            console.log(response)
            console.log("La mascota ha sido eliminada")
        }
        catch (error) {
            console.error('La mascota no ha podido ser eliminada', error);
        }
    }

    // const getPetImage = async (id, firstImg) => {
    //     try {
    //         // url-en-produccion/api/image?key=39/images/ca2570d3-713f-4fcc-8292-c4e595073927 LA URL A LA QUE ME PEDISTE QUE HAGA FETCH
    //         // "/38/images/27637304-2f0c-402d-82c8-cdf5e16e6e23" LO QUE HAY EN IMAGES ARRAY, PRIMER INDICE
    //         const res = await axios.get(`https://pets-adopt-api.onrender.com/api/image/keyz38/images/27637304-2f0c-402d-82c8-cdf5e16e6e23`, credentials, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
    //         console.log(res)
    //     } catch (error) {
    //         console.error('Error al obtener imagenes de la mascota', error);
    //     }
    // };


    // placeholder to deal with adopt process later on
    const adoptPost = async () => {
    }

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        // setTimeout placeholder to simulate loading, remove this in production
        fetchImage(270, 270);

    }, []);

    return (
        < >
            <Card className="py-4 min-w-72 w-[300px] max-w-xs active:scale-90 transition-all duration-300 ease-in-out hover:scale-105" onClick={() => {
                onOpen();
                showPetDetails(id);
                setOpenModalId(id);
            }} isPressable={true} isHoverable={true}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
                    <Skeleton isLoaded={isLoaded} className="rounded-lg">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl select-none h-[270px] w-[270px] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                            src={images ? images[0] : srcImg}
                            draggable={false}
                        />
                    </Skeleton>
                </CardHeader>
                <CardBody className="flex flex-col gap-2 items-start px-4">
                    <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg mt-2">
                        <p className="text-small uppercase font-bold">{typeof age !== "number" ? "Not specified" : age}</p>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg my-0.5">
                        <small className="text-default-500">{breed == "" || typeof breed !== "string" ? "Not specified" : breed}</small>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg w-full">
                        <h4 className="font-bold text-large overflow-hidden overflow-ellipsis whitespace-nowrap w-full">{name == "" || typeof name !== "string" ? "Not specified" : name}</h4>
                    </Skeleton>
                </CardBody>
            </Card>
            <Modal isOpen={openModalId === id} onOpenChange={() => setOpenModalId(null)} backdrop="blur" shouldBlockScroll={false}>
                <ModalContent className="flex flex-col gap-2 max-w-2xl w-full max-h-full min-h-[500px] h-auto">
                    {(onClose) => (
                        <>
                            <ModalBody className="flex flex-col gap-2 items-center py-8">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl select-none h-auto w-[400px]"
                                    src={images ? images[0] : srcImg}
                                    draggable={false}
                                    onClick={() => {
                                        onOpen
                                        console.log("hola")
                                        deletePet(id)
                                    }}
                                />
                                <div className="flex flex-row gap-2 flex-wrap justify-center items-center w-full mt-1">
                                    {tags.length > 0 ? tags.map((tag, index) => (
                                        <span key={index} className={`bg-blue-100 text-blue-800 text-sm font-medium  ${tags.length > 1 ? "me-2" : ""} px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}>{tag}</span>
                                    )) : <span className={`bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300`}>No tags available</span>
                                    }
                                </div>
                                <Divider orientation="horizontal" className="my-1" />
                                <h3 className="font-bold text-xl bold">{name == "" || typeof name !== "string" ? "Not specified" : name}</h3>
                                <div className="flex flex-row gap-2">
                                    <p className="text-medium uppercase font-bold">{age == "" || typeof age !== "string" ? "Not specified" : age}</p>
                                    <Divider orientation="vertical" className="h-auto max-h-full" />
                                    <small className="text-default-500 text-medium">{breed == "" || typeof breed !== "string" ? "Not specified" : breed}</small>
                                </div>
                                <p>
                                    {generalDescription == "" || typeof generalDescription !== "string" ? "Not specified" : generalDescription}
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
        </>
    );
}