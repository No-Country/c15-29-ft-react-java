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
  import React, {useEffect, useState } from "react";
 
  import axios from "axios";
  import { useRouter } from "next/navigation";
  import { useAuth } from "@/Api/AuthContext";
 
  
  
 export const UserPannel=()=> {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { token } = useAuth();
    const [credentials, setCredentials] = useState({
      name:"juan",
      lastName:"",
      nationality:"",
      address:"",
      avatar: "",
      whatsappNumber:""
    });
  
    const url = "https://pets-adopt-api.onrender.com/api";
    const router = useRouter();
  
   
    const handleSubmitPannel = async (e) => {
        e.preventDefault();
        
  
        const formData = new FormData();
        formData.append("name", credentials.name);
       formData.append("lastName", credentials.lastName);
        formData.append("nationality", credentials.nationality);
        formData.append("address", credentials.address);
        formData.append("whatsappNumber", credentials.whatsappNumber); 
        formData.append("avatar", credentials.avatar); 
    
        try {
          const res = await axios.put(
            `${url}/userEntity`,
            Object.fromEntries(formData),
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (res.status === 200) {
           
            console.log(res);
    
            onOpenChange(false);
            router.push("/panel");
          } else {
            console.error("Error al Terminar de completar sus datos. Estado de respuesta:", res.status);
          }
        } catch (error) {
           
          console.error("Error en la solicitud:", error.message);
          console.log("FormData content:", Object.fromEntries(formData));
        }
    }
  
    

  
 
  
    return (
      <>
        <Link onPress={onOpen}>userPanel</Link>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            {(onClose) => (
              <>
                <form onSubmit={handleSubmitPannel} >
                  <ModalHeader className="flex flex-col gap-1">
                    userPanel
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
                     
                      label="name"
                      placeholder="Enter your name"
                      variant="bordered"
                    />
  
                   
  
 
  
  
  
  
  
  <Input
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                         nationality: e.target.value,
                        })
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
                         address: e.target.value,
                        })
                      }
                    
                      label="address"
                      placeholder="Enter your address"
                      type="text"
                      variant="bordered"
                    />
  
                   
  
                    <Input
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          avatar: e.target.files[0],
                        })
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
                    <Button onClick={handleSubmitPannel}  color="primary">
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
  