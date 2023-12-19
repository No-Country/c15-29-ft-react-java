
import {
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MailIcon } from "@/components/Auth/login/Mailicon";
import { LockIcon } from "@/components/Auth/login/LockIcon";
import { UserIcon } from "./CredentialIcon";
import { ImageIcon } from "./ImageIcon";
import { useAuth } from "@/Api/AuthContext";

export default function RegisterModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleRegister, clearNotification } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    avatar: "",
    roles: ["INVITED"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(credentials);
      onClose(); // Cierra el modal después de enviar el formulario con éxito
    } catch (error) {
      console.error("Error during register:", error);
    }
  };
  useEffect(() => {
    return () => {
      // Limpiar la notificación cuando el componente se desmonte
      clearNotification();
    };
  }, [clearNotification]);

  return (
    <>
      <Link onPress={onOpen}>Sign Up</Link>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Sign Up
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                    autoFocus
                    endContent={
                      <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Enter your username"
                    variant="bordered"
                  />
                  <Input
                    type="email"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        email: e.target.value,
                      })
                    }
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="email"
                    placeholder="Enter your Email"
                    variant="bordered"
                  />

                  <Input
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="password"
                    placeholder="Enter your Password"
                    type="password"
                    variant="bordered"
                  />

                  <Input
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        avatar: e.target.files[0],
                      })
                    }
                    endContent={
                      <ImageIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />

                    }
                    label="avatar"
                    placeholder="Enter your Picture"
                    type="file"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    Sign up
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
