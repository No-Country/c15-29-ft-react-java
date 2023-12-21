import { useAuth } from "@/Api/AuthContext";
import { usePet } from "@/Api/PetContext";
import {
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const PetModal = ({ pet }) => {
  const { breed, images, id, age, name, generalDescription } = pet;
  const tags = ["No tags available"];
  const [localSrcImg, setLocalSrcImg] = useState(null);
  const { openModalId, setOpenModalId, srcImg, getPetImage } = usePet();
  const { getCookieValue } = useAuth()

  const token = getCookieValue("AuthToken");

  const handleAdopt = () => {
    localStorage.setItem('adoptedPetId', id);
  }

  useEffect(() => {
    const fetchImage = async () => {
      if (id && images && token) {
        const imageUrl = await getPetImage(id, images[0], token);
        setLocalSrcImg(imageUrl);
      }
    };

    fetchImage();
  }, [id, images, token, getPetImage]);

  return (
    <Modal
      isOpen={openModalId === id}
      onOpenChange={() => setOpenModalId(null)}
      backdrop="blur"
      shouldBlockScroll={false}
    >
      <ModalContent className="flex flex-col gap-2 max-w-2xl w-full max-h-full min-h-[500px] h-auto">
        {(onClose) => (
          <>
            <ModalBody className="flex flex-col gap-2 items-center py-8">
              <Image
                alt="Card background"
                className="object-cover rounded-xl select-none h-auto w-[400px]"
                src={localSrcImg}
                draggable={false}
                loading="lazy"
                onClick={() => {
                  deletePet(id);
                }}
              />
              <div className="flex flex-row gap-2 flex-wrap justify-center items-center w-full mt-1">
                {tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`bg-blue-100 text-blue-800 text-sm font-medium  ${
                        tags.length > 1 ? "me-2" : ""
                      } px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span
                    className={`bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300`}
                  >
                    No tags available
                  </span>
                )}
              </div>
              <Divider orientation="horizontal" className="my-1" />
              <h3 className="font-bold text-xl bold">
                {name == "" || typeof name !== "string"
                  ? "Not specified"
                  : name}
              </h3>
              <div className="flex flex-row gap-2">
                <p className="text-medium uppercase font-bold">
                  {age == "" || typeof age !== "string" ? "Not specified" : age}
                </p>
                <Divider orientation="vertical" className="h-auto max-h-full" />
                <small className="text-default-500 text-medium">
                  {breed == "" || typeof breed !== "string"
                    ? "Not specified"
                    : breed}
                </small>
              </div>
              <p>
                {generalDescription == "" ||
                typeof generalDescription !== "string"
                  ? "Not specified"
                  : generalDescription}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Keep searching
              </Button>
              <Link href='/adoptionProcess'>
                <Button onPress={handleAdopt} color="primary">Adopt!</Button>
              </Link>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
