import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useAuth } from "@/Api/AuthContext.jsx";
import Image from "next/image";

export default function UserNavbar() {
  const {
    userInfo,
    loading,
    getCookieValue,
    getUserDataFromLocalStorage,
    handleLogout,
    getUserPhoto,
    setLoading,
  } = useAuth();

  const menuItems = ["Home", "About Us", "Pet browser", "How to adopt"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  useEffect(() => {
    const storedToken = getCookieValue("AuthToken");
    if (storedToken && loading) {
      getUserDataFromLocalStorage();
      //eslint-disabled-next-line
      console.log(userInfo);
      setLoading(false);
    }
  }, [getCookieValue, getUserDataFromLocalStorage, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Navbar>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      <NavbarBrand>
        <Image alt="logo" src="/PawFinder.png" width={128} height={128} />
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
      Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/adopt" aria-current="page" color="secondary">
          Pet Browser
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            About Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={userInfo ? userInfo.username : "Guest"}
              size="sm"
              src={
                userInfo
                  ? userInfo.avatar
                  : "https://pets-adopt-api.onrender.com/image/josue_zorrilla_profile.jpeg"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {userInfo ? userInfo.email : "Guest"}
              </p>
            </DropdownItem>
            <DropdownItem key="Dashboard">Dashboard</DropdownItem>
            <DropdownItem key="My Pets">My Pets</DropdownItem>
            <DropdownItem key="Create Post">Create Post</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color={"foreground"} className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}







