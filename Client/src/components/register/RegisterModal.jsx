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

import React, { useState } from "react";
import { MailIcon } from "@/components/login/Mailicon";
import { LockIcon } from "@/components/login/LockIcon";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [credentials, setCredentials] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const url = process.env.NEXT_PUBLIC_SWAGGER_URL;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/register/userEntity`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        onOpenChange(false);
        router.push("/panel");
      } else {
        console.error("Error al Registrarse. Estado de respuesta:", res.status);
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
                  Sign Up
                </ModalHeader>
                <ModalBody>
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
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="name"
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
                        name: e.target.value,
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
import { useAuth } from "@/Api/AuthContext";


export default function RegisterModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [credentials, setCredentials] = useState({
    name:"",
    lastName:"",
dateOfBirth:"",
    username: "",
    email: "",
    nationality:"",
    adress:"",
    password: "",
    avatar: "",
    roles: ["INVITED"],
    whatsappNumber:""
  });

  const url = "https://pets-adopt-api.onrender.com/api";
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("lastName", credentials.lastName);
    formData.append("dateOfBirth", credentials.dateOfBirth);
    formData.append("username", credentials.username);
    formData.append("email", credentials.email);
    formData.append("nationality", credentials.nationality);
    formData.append("adress", credentials.adress);
    formData.append("password", credentials.password);
    formData.append("avatar", credentials.avatar);
    formData.append("roles", credentials.roles);
    formData.append("whatsappNumber", credentials.whatsappNumber);

    try {
      const res = await axios.post(
        `${url}/userEntity`,
        Object.fromEntries(formData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        console.log("Registrado correctamente");
        console.log(res);

        onOpenChange(false);
        router.push("/panel");
      } else {
        console.error("Error al Registrarse. Estado de respuesta:", res.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      console.log("FormData content:", Object.fromEntries(formData));
    }
  };

  return (
    <>
      <Link onPress={onOpen}>SIGN UP</Link>
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
                        name: e.target.value,
                      })
                    }
                    autoFocus
                    endContent={
                      <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="name"
                    placeholder="Enter your name"
                    variant="bordered"
                  />

                  <Input
                    type="email"
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
                    placeholder="Enter your lastname"
                    variant="bordered"
                  />


<Input
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                       dateOfBirth: e.target.value,
                      })
                    }
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="dateOfBirth"
                    placeholder="Enter your date of Birth"
                    type="number"
                    variant="bordered"
                  />

<Input
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="username"
                    placeholder="Enter your Username"
                    type="text"
                    variant="bordered"
                  />


<Input
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                       email: e.target.value,
                      })
                    }
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="email"
                    placeholder="Enter your Email"
                    type="email"
                    variant="bordered"
                  />


<Input
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                       nationality: e.target.value,
                      })
                    }
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="nationality"
                    placeholder="Enter your nationality"
                    type="nationality"
                    variant="bordered"
                  />



<Input
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                       adress: e.target.value,
                      })
                    }
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="adress"
                    placeholder="Enter your adress"
                    type="text"
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
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="avatar"
                    placeholder="Enter your Picture"
                    type="file"
                    variant="bordered"
                  />

                  

<Input
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                    whatsappNumber: e.target.value,
                      })
                    }
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="whatsappNumber"
                    placeholder="Enter your date of whatsapp Number"
                    type="number"
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
