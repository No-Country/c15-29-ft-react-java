'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@nextui-org/react";

export default function Dashboard() {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });

  const token = getCookieValue('AuthToken')
  const router = useRouter();
  const url = "https://pets-adopt-api.onrender.com/api"

  const getProfile = async () => {
    console.log(token);
    const test = await axios.get(`${url}/test/hello`,{headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer : ${token}`
          }});
    console.log(test);;
  };
  
  const getUsers = async () => {
    console.log(token);
    const users = await axios.get(`${url}/userEntity`,{headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer : ${token}`
          }});
    console.log();(users);
  };
  
  

  function getCookieValue(cookieName) {

    if (typeof document === 'undefined') {
      return null;
    }

    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiePairs = decodedCookie.split(';');
  
    for (const cookiePair of cookiePairs) {
      const trimmedCookiePair = cookiePair.trim();
  
      if (trimmedCookiePair.startsWith(name)) {
        return trimmedCookiePair.substring(name.length);
      }
    }
  
    return null;
  }

  const handleLogout = () => {
    document.cookie = 'AuthToken=; Max-Age=0; Path=/';
    router.push("/");
  };

//   const logout = async () => {
//     try {
//       const res = await axios.get("/api/auth/logout");
//       console.log(res);
//     } catch (error) {
//       console.error(error.message);
//     }
//     router.push("/login");
//   };

  return (
    <div className="flex gap-6 flex-col w-48"> 
      {JSON.stringify(user)}
      <Button onClick={() => getProfile()}>profile</Button>
      <Button onClick={() => getUsers()}>profile</Button>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </div>
  );
}
