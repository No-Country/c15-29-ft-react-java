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
import { useAuth } from "@/Api/AuthContext";

export default function LoginModal({ onClose }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handleLogin, clearNotification } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });


  //Enviar datos login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(credentials);
      onClose(); // Cierra el modal después de enviar el formulario con éxito
    } catch (error) {
      console.error("Error during login:", error);
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
      <Link onPress={onOpen}>Login</Link>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form  onSubmit={(e) => handleSubmit(e, onClose)}>
                <ModalHeader className="flex flex-col gap-1">
                  Log in
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
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Enter your username"
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
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Forgot password?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    Sign in
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
