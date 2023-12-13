import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    Avatar,
    AvatarIcon,
    ModalFooter,
    ModalHeader,
    useDisclosure,
  } from "@nextui-org/react";
  
  import React, { useState } from "react";
  
  import axios from "axios";
  import { useRouter } from "next/navigation";
  
  export default function RegisterModal() {
    const [credentials, setCredentials] = useState({
      name: "",
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
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <Avatar
              icon={<AvatarIcon />}
              classNames={{
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                icon: "text-black/80",
              }}
            />
          </div>
          <Modal placement="top-center">
            <ModalContent>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader className="flex flex-col gap-1">
                    Fill all the Fields
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
                      label="name"
                      placeholder="Enter your Name"
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
                      label="Email"
                      placeholder="Enter your Email"
                      variant="bordered"
                    />
  
                    <Input
                      type="text"
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                      autoFocus
                      label="Username"
                      placeholder="Enter your username"
                      variant="bordered"
                    />
  
                    <Input
                      type="text"
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                      autoFocus
                      label="Username"
                      placeholder="Enter your username"
                      variant="bordered"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button type="submit" color="primary">
                      Ready
                    </Button>
                  </ModalFooter>
                </form>
              </>
            </ModalContent>
          </Modal>
        </form>
      </>
    );
  }
  