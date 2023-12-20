"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Skeleton, useDisclosure } from "@nextui-org/react";
import { useAuth } from "@/Api/AuthContext";
import { usePet } from "@/Api/PetContext";

export default function CardPet({ pet }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { getPet, getPetImage, showPetDetails, selectedPetId, setOpenModalId, srcImg, setSrcImg, deletePet } = usePet()
  const { onOpen } = useDisclosure();
  // starts as null, when it changes to a number, the modal opens, and later on becomes null again
  const { getCookieValue } = useAuth();

  const { id, name, age, breed, images } = pet;

  const token = getCookieValue("AuthToken");


  useEffect(() => {
    if (selectedPetId) {
      getPet(selectedPetId);
    }
  }, [selectedPetId, token, getPet]);

  // test placeholder till we get images from backend, delete later on

  // placeholder to deal with adopt process later on
  const adoptPost = async () => { };

  const fetchImage = async (width, height) => {
    const customURL = `https://picsum.photos/${width}/${height}`;
    const res = await fetch(customURL);
    setSrcImg(res.url);
    if (res.ok) setIsLoaded(true);
    return res.url;
  };
  useEffect(() => {
    console.log(id, images, pet);
    if (images?.length > 0)
      getPetImage(id, images[0]);
    else
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
