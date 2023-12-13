import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { MailIcon } from "@/components/login/Mailicon";
import { LockIcon } from "@/components/login/LockIcon";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserIcon } from "./CredentialIcon";
import { CredentialIcon } from "./UserIcon";

export default function RegisterModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    roles: [
      "Invited"
    ],
    lastName: "ocando",
    nationality: "argentina",
    address: "Las flores",
    avatar: "123",
    status: "Online"


  });

  const url = process.env.NEXT_PUBLIC_SWAGGER_URL;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/userEntity/register`, credentials, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (res.status === 200) {
        console.log("Registrado correctamente");
        console.log(res);

        onOpenChange(false);
        router.push("/panel");
      } else {
        console.log(credentials);
        console.error("Error al login. Estado de respuesta:", res.status);
      }
    } catch (error) {
      // console.log(credentials);
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
                    type="text"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        name: e.target.value,
                      })
                    }
                    autoFocus
                    endContent={
                      <CredentialIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Name"
                    placeholder="Enter your Name"
                    variant="bordered"
                  />
                  <Input
                    type="text"
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        lastName: e.target.value,
                      })
                    }
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="lastName"
                    placeholder="Enter your Lastname"
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
