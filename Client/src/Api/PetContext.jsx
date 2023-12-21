import axios from "axios";
import { createContext, useCallback, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const PetContext = createContext();

const url = "https://pets-adopt-api.onrender.com/api";

export const PetProvider = ({ children }) => {
    const [pets, setPets] = useState([]);
    const [userPets, setUserPets] = useState([]);
    const [onlyPet, setOnlyPet] = useState([]);
    const [selectedPetId, setSelectedPetId] = useState("");
    const [openModalId, setOpenModalId] = useState(null);
    const [srcImg, setSrcImg] = useState("");
    const { getCookieValue } = useAuth();

    const cookieToken = getCookieValue("AuthToken");
    const showPetDetails = (id) => {
        setSelectedPetId(id);
    };

    const getPets = async () => {
        try {
            const response = await axios.get(`${url}/pet/getAll`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setPets(response.data);
        } catch (error) {
            console.error("Error al obtener mascotas", error);
        }
    };

    const getUserPets = async (id, token) => {
        try {
            const response = await axios.get(
                `https://pets-adopt-api.onrender.com/api/pet/getPetByUserId/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUserPets(response.data);
        } catch (error) {
            console.error("Error al obtener mascotas del usuario", error);
        }
    };

    const getPetImage = useCallback(async (id, firstImg, token) => {
        try {
            if (firstImg) {
                const imgUrl = firstImg.substring(10);
                const response = await axios.get(
                    `https://pets-adopt-api.onrender.com/getimage?entityId=${id}&idImg=${imgUrl}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        responseType: "blob",
                    }
                );
                const imageBlob = response.data;
                const imageUrl = URL.createObjectURL(imageBlob);
                return imageUrl;
            }
        } catch (error) {
            const imageUrl = "./errorlogo.png";
            return imageUrl;
            console.error("Error al obtener imagen de la mascota", error);

            // Imprimir detalles específicos del servidor
            if (error.response) {
                console.error("Server response details:", error.response.data);
            }
            return null; // Manejar el error devolviendo null o algún valor por defecto
        }
    }, []);

    const getPet = async (id) => {
        if (selectedPetId) {
            try {
                const res = await axios.get(
                    `https://pets-adopt-api.onrender.com/api/pet/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setOnlyPet(res.data);
                return res.data;
            } catch (error) {
                console.error("Error al obtener detalles de la mascota", error);
            }
        }
    };

    const editPet = async (id, data) => {
        try {
            const response = await axios.put(
                `https://pets-adopt-api.onrender.com/api/pet/66`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${cookieToken}`,
                    },
                }
            );
            if (response.status === 201) {
                console.log("Pet edited successfully");
                console.log(response.data);
            } else {
                console.log("Error editing pet");
                console.log(response.data, response.status);
            }
        } catch (error) {
            console.error("Error al obtener detalles de la mascota", error);
            console.log(data);
        }
    };

    const deletePet = async (id) => {
        try {
            const response = await axios.delete(
                `https://pets-adopt-api.onrender.com/api/pet/${id}`,
                credentials,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            window.location.reload();
            console.log(response);
            console.log("La mascota ha sido eliminada");
        } catch (error) {
            console.error("La mascota no ha podido ser eliminada", error);
        }
    };

    return (
        <PetContext.Provider
            value={{
                getPets,
                pets,
                deletePet,
                getPet,
                editPet,
                showPetDetails,
                selectedPetId,
                openModalId,
                setOpenModalId,
                srcImg,
                setSrcImg,
                onlyPet,
                getUserPets,
                userPets,
                getPetImage,
            }}
        >
            {children}
        </PetContext.Provider>
    );
};

export const usePet = () => {
    return useContext(PetContext);
};