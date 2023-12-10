import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Skeleton, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function App({ age = "not Specified", species = "petSpecies", name = "petName", tags = [] }) {
    const [srcImg, setSrcImg] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const fetchImage = async (width, height) => {
        const customURL = `https://placekitten.com/${width}/${height}`;
        const res = await fetch(customURL);
        setSrcImg(res.url);
        if (res.ok)
            setIsLoaded(true);
        return res.url;
    }

    const fetchData = async (id) => {
        const res = await fetch(`https://pets-adopt-api.onrender.com/api/pet/${id}`);
        const data = await res.json().catch(err => console.log(err));

        return data;
    }

    useEffect(() => {
        // setTimeout placeholder to simulate loading, remove this in production
        fetchImage(270, 270);

        // fetch data from API
        // fetchData(1).then(data => {
        //     setFetchedData(data);
        //     if (data.image)
        //         setSrcImg(data.image);
        //     setIsLoaded(true);
        // });
    }, []);

    const handleCardClick = () => {
        console.log("Card clicked");
    }

    return (
        <>
            <Card className="py-4 min-w-72 w-[300px] max-w-xs">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
                    <Skeleton isLoaded={isLoaded} className="rounded-lg">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl select-none h-[270px] w-[270px] cursor-pointer"
                            src={srcImg}
                            draggable={false}
                            onClick={onOpen}
                        />
                    </Skeleton>
                </CardHeader>
                <CardBody className="overflow-visible py-2 m-auto">
                    <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg mt-2">
                        <p className="text-small uppercase font-bold">{age}</p>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg my-0.5">
                        <small className="text-default-500">{species}</small>
                    </Skeleton>
                    <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
                        <h4 className="font-bold text-large">{name}</h4>
                    </Skeleton>
                </CardBody>
            </Card >
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
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
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
