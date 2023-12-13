import { useRouter } from 'next/navigation';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const router = useRouter()
  const [token, setToken] = useState('');
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const setAuthToken = (newToken) => {
    setToken(newToken);
    setNotification({ type: 'success', message: 'Successfully logged in' });
  };

  const setErrorNotification = (errorMessage) => {
    setError(errorMessage);
    setNotification({ type: 'error', message: errorMessage });
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

  const handleLogout = () => {
    document.cookie = "AuthToken=; Max-Age=0; Path=/";
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
        userInfo,
        setUserInfo,
        getCookieValue,
        handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};