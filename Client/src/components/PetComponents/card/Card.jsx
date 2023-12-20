"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Skeleton, useDisclosure } from "@nextui-org/react";
import { useAuth } from "@/Api/AuthContext";
import { usePet } from "@/Api/PetContext";

export default function CardPet({ pet }) {
  const { id, age, breed, images, name } = pet;
  const [isLoaded, setIsLoaded] = useState(false);
  const [localSrcImg, setLocalSrcImg] = useState(null);
  const { getPet, showPetDetails, selectedPetId, setOpenModalId, getPetImage } = usePet();
  const { onOpen } = useDisclosure();
  const { getCookieValue } = useAuth();
  const token = getCookieValue("AuthToken");

  useEffect(() => {
    const fetchImage = async () => {
      if (id && images && token) {
        const imageUrl = await getPetImage(id, images[0], token);
        setLocalSrcImg(imageUrl);
        setIsLoaded(true);
      }
    };

    fetchImage();
  }, [id, images, token, getPetImage]);


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
              src={localSrcImg}
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
