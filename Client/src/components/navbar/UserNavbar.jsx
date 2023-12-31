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
import { UserPannel } from "../userPannel/UserPannel";

export default function UserNavbar() {
  const {
    userInfo,
    loading,
    getCookieValue,
    getUserDataFromLocalStorage,
    handleLogout,
    getUserImage,
    setLoading,
  } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userImg, setUserImg] = useState('')

  useEffect(() => {
    const storedToken = getCookieValue("AuthToken");
    if (storedToken && loading) {
      getUserDataFromLocalStorage();
      console.log(userInfo);
      setUserImg(getUserImage(storedToken, 'usuarioparajosue/images/thumbnail'))
      setLoading(false);
    }
  }, [getCookieValue, getUserDataFromLocalStorage, loading, setLoading, getUserImage]);

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
        <Image
          priority={true}
          alt="logo"
          src="/PawFinder.png"
          width={128}
          height={128}
        />
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            <p> Home</p>
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/adopt" aria-current="page" color="secondary">
            <p>Pet Browser</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            <p> About Us</p>
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
              name={userImg}
              size="sm"
              src={userImg}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              textValue="Signed in as"
              key="profile"
              className="h-14 gap-2"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {userInfo ? userInfo.email : "Guest"}
              </p>
            </DropdownItem>
            <DropdownItem
              textValue="Dashboard"
              href="/dashboard"
              key="Dashboard"
            >
              <p>Dashboard</p>
            </DropdownItem>

            <DropdownItem textValue="My Pets" href="myPets" key="My Pets">
              <p>My Pets</p>
            </DropdownItem>

            <DropdownItem
              textValue="Create Pet"
              href="/createPet"
              key="Create Pet"
            >
              <p>Create Pet</p>
            </DropdownItem>

            <DropdownItem
              textValue="User pannel"
              key="User pannel"
            >
              <Link onPress={<UserPannel />}>User Panel</Link>
            </DropdownItem>


            <DropdownItem
              textValue="Log Out"
              key="logout"
              color="danger"
              onClick={handleLogout}
            >
              <p>Log Out</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarMenu>
          <NavbarMenuItem>
            <Link color={"foreground"} className="w-full" href="/" size="lg">
              <p>Home</p>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            {" "}
            <Link
              color={"foreground"}
              className="w-full"
              href="about"
              size="lg"
            >
              <p>About Us</p>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            {" "}
            <Link
              color={"foreground"}
              className="w-full"
              href="/adopt"
              size="lg"
            >
              <p>Pet Browser</p>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            {" "}
            <Link
              color={"foreground"}
              className="w-full"
              href="/howto"
              size="lg"
            >
              <p>How to Adopt</p>
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}
