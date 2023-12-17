import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const PetContext = createContext();

const url = "https://pets-adopt-api.onrender.com/api";

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [onlyPet, setOnlyPet] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState("");
  const [openModalId, setOpenModalId] = useState(null);
  const [srcImg, setSrcImg] = useState("");



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

  const getPet = async () => {
    try {
      const res = await axios.get(
        `https://pets-adopt-api.onrender.com/api/pet/${selectedPetId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // getPetImages(id);
      setOnlyPet([res.data]);
    } catch (error) {
      console.error("Error al obtener detalles de la mascota", error);
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
        showPetDetails,
        selectedPetId,
        openModalId,
        setOpenModalId,
        srcImg,
        setSrcImg
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  return useContext(PetContext);
};
