import axios from "axios";
import { createContext, useContext, useState } from "react";
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
  const { getCookieValue } = useAuth()

const token = getCookieValue("AuthToken")

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

  const getUserPets = async (id) => {
    try {
      const response = await axios.get('https://pets-adopt-api.onrender.com/api/pet/getPetByUserId/63', {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserPets(response.data);
    } catch (error) {
      console.log(token);
      console.error("Error al obtener mascotas del usuario", error);
    }
  };


  const getPet = async (id) => {
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
    } catch (error) {
      console.error("Error al obtener detalles de la mascota", error);
    }
  };

  const editPet = async (id, data) => {
    try {
      const response = await axios.put(`https://pets-adopt-api.onrender.com/api/pet/${id}`, data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        })
      console.log(response)
      if (res.status === 201) {
        console.log("Pet edited successfully");
        console.log(res.data);
      }
      else {
        console.log("Error editing pet");
        console.log(res.data, res.status);
      }
    } catch (error) {
      console.error('Error al obtener detalles de la mascota', error);
      console.log(data);
      }
  }

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
        showPetDetails,
        selectedPetId,
        openModalId,
        setOpenModalId,
        srcImg,
        setSrcImg,
        onlyPet,
        getUserPets,
        userPets
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  return useContext(PetContext);
};
