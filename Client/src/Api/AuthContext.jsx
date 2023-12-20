import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { serialize } from "cookie";
import { useDisclosure } from "@nextui-org/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const url = "https://pets-adopt-api.onrender.com/api";

  useEffect(() => {
    const storedToken = getCookieValue("AuthToken");
    if (storedToken) {
      setToken(storedToken);
      getUserDataFromLocalStorage();
    }
    setLoading(false);
    // Ahora se establece como false después de intentar recuperar el token
  }, []);

  const getUserDataFromLocalStorage = () => {
    const storedUserData = localStorage.getItem("userInfo");
    if (storedUserData) {
      setUserInfo(JSON.parse(storedUserData));
    }
  };

  const setUserInfoAndLocalStorage = (userData) => {
    setUserInfo(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  const setAuthToken = (newToken) => {
    setToken(newToken);
    setNotification({ type: "success", message: "Successfully logged in" });
    document.cookie = serialize("AuthToken", newToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  };

  const setErrorNotification = (errorMessage) => {
    setError(errorMessage);
    setNotification({ type: "error", message: errorMessage });
  };

  const clearNotification = () => {
    setNotification(null);
    setError(null);
  };

  const getCookieValue = (cookieName) => {
    if (typeof document === "undefined") {
      return null;
    }

    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiePairs = decodedCookie.split(";");

    for (const cookiePair of cookiePairs) {
      const trimmedCookiePair = cookiePair.trim();

      if (trimmedCookiePair.startsWith(name)) {
        return trimmedCookiePair.substring(name.length);
      }
    }

    return null;
  };

  const handleLogin = async (credentials) => {
    try {
      const res = await axios.post(`${url}/user/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + btoa(`${credentials.username}:${credentials.password}`),
        },
      });

      if (res.status === 200) {
        setAuthToken(res.data.token);
        getUserData(res.data.Username, res.data.token);
        router.push("/dashboard");
      } else {
        console.error("Error al login. Estado de respuesta:", res.status);
        setErrorNotification("Error during login. Please try again.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      setErrorNotification("Error during login. Please try again.");
    }
  };

  const handleRegister = async (credentials) => {
    const formData = new FormData();
    formData.append("email", credentials.email);
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);
    formData.append("avatar", credentials.avatar);
    formData.append("roles", credentials.roles);

    try {
      const res = await axios.post(
        `${url}/userEntity/register`,
        Object.fromEntries(formData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        console.log("Registrado correctamente");
        console.log(res);
        setNotification({ type: "success", message: "Successfully registered" });
        handleLogin({
          username: credentials.username,
          password: credentials.password,
        });

        onOpenChange(false);
        router.push("/adopt");
      } else {
        console.error("Error al Registrarse. Estado de respuesta:", res.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      console.log("FormData content:", Object.fromEntries(formData));
    }
  };

  const getUserPhoto = async () => {
    try {
      const res = await axios.get(`${url}/nocountry-pawfinder/PrimerUsuarioConImagen/image/thumbnail`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        console.log(res);
      } else {
        console.error(
          "Error al traer datos del usuario. Estado de respuesta:",
          res.status
        );
        setErrorNotification("Error during get data. Please try again.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      setErrorNotification("Error during get data. Please try again.");
    }
  };

  

  const getUserData = async (username, token) => {
    try {
      const res = await axios.get(`${url}/userEntity/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setUserInfoAndLocalStorage(res.data)
      } else {
        console.error(
          "Error al traer datos del usuario. Estado de respuesta:",
          res.status
        );
        setErrorNotification("Error during get data. Please try again.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      console.log(token);
      setErrorNotification("Error during get data. Please try again.");
    }
  };

  const handleLogout = () => {
    document.cookie = "AuthToken=; Max-Age=0; Path=/";
    setAuthToken("");
    setUserInfo(null);
    setNotification(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setAuthToken,
        setErrorNotification,
        notification,
        clearNotification,
        loading,
        setLoading,
        error,
        setError,
        handleLogin,
        userInfo,
        setUserInfo: setUserInfoAndLocalStorage,
        getUserDataFromLocalStorage,
        getCookieValue,
        handleLogout,
        getUserPhoto,
        handleRegister
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
