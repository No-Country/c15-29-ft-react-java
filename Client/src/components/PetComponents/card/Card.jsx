"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { useAuth } from "@/Api/AuthContext";
import { usePet} from "@/Api/PetContext";

export default function CardPet({
  id = "Missing ID",
  age,
  breed,
  images,
  name,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { getPet, showPetDetails, selectedPetId, setOpenModalId, srcImg, setSrcImg  } = usePet()
  const { onOpen } = useDisclosure();
  // starts as null, when it changes to a number, the modal opens, and later on becomes null again
  const {
    getCookieValue,
  } = useAuth();

  const token = getCookieValue("AuthToken");



  useEffect(() => {
    if (selectedPetId) {
      getPet(selectedPetId);
    }
  }, [selectedPetId, token, getPet]);

  // test placeholder till we get images from backend, delete later on
  const fetchImage = async (width, height) => {
    const customURL = `https://picsum.photos/${width}/${height}`;
    const res = await fetch(customURL);
    setSrcImg(res.url);
    if (res.ok) setIsLoaded(true);
    return res.url;
  };

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
  const adoptPost = async () => {};

//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });

  useEffect(() => {
    // setTimeout placeholder to simulate loading, remove this in production
    fetchImage(270, 270);
  }, []);

  return (
    <>
        <Card
          className="py-4 min-w-72 w-[300px] max-w-xs active:scale-90 transition-all duration-300 ease-in-out hover:scale-105"
          onClick={() => {
              onOpen();
            showPetDetails(id);
            setOpenModalId(id);
          }}
          isPressable={true}
          isHoverable={true}
        >
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
            <Skeleton isLoaded={isLoaded} className="rounded-lg">
              <Image
                alt="Card background"
                className="object-cover rounded-xl select-none h-[270px] w-[270px] cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
                src={images ? images[0] : srcImg}
                draggable={false}
                loading="lazy"
              />
            </Skeleton>
          </CardHeader>
          <CardBody className="flex flex-col gap-2 items-start px-4">
            <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg mt-2">
              <p className="text-small uppercase font-bold">
                {typeof age !== "number" ? "Not specified" : age}
              </p>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg my-0.5">
              <small className="text-default-500">
                {breed == "" || typeof breed !== "string"
                  ? "Not specified"
                  : breed}
              </small>
            </Skeleton>
            <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg w-full">
              <h4 className="font-bold text-large overflow-hidden overflow-ellipsis whitespace-nowrap w-full">
                {name == "" || typeof name !== "string"
                  ? "Not specified"
                  : name}
              </h4>
            </Skeleton>
          </CardBody>
        </Card>
    </>
  );
}
