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
import { parse, serialize } from 'cookie';
import React, { useState } from "react";
import { MailIcon } from "@/components/login/Mailicon";
import { LockIcon } from "@/components/login/LockIcon";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const url = "https://pets-adopt-api.onrender.com/api"
  const router = useRouter();

  const data = {
    email: "seba@gmail.com",
    username: "sebaNoel",
    password: "sebaTheBoss",
    roles: ["INVITED"],
    name: "seba",
  };

  //Enviar datos login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${url}/user/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
          },
        }
      );
  
      if (res.status === 200) {
        console.log("logueado correctamente");
        console.log(res);


        const cookies = parse(document.cookie);

      const updatedCookies = {
        ...cookies,
        token: res.data.token
      };

      document.cookie = serialize('AuthToken', updatedCookies.token, {
        maxAge: 30 * 24 * 60 * 60, 
        path: '/',
      });
   
      onOpenChange(false)
      router.push("/dashboard");

      } else {
        console.error("Error al login. Estado de respuesta:", res.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  return (
    <>
      <Link onPress={onOpen}>Login</Link>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
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
                    <Link
                      color="primary"
                      href="#"
                      size="sm"
                    >
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
