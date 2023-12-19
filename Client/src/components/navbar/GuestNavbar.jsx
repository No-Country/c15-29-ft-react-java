"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import LoginModal from "@/components/Auth/login/LoginModal";
import RegisterModal from "../Auth/register/RegisterModal";
import Image from "next/image";

export default function GuestNavbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsMenuOpen(false);
  };


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
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
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            <p> Home</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/adopt" aria-current="page">
            <p> Pet Browser</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            <p> About Us</p>
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" className="hidden md:flex">
        <NavbarItem>
          <LoginModal />
        </NavbarItem>
        <NavbarItem>
          <Button color="primary" variant="flat">
            <RegisterModal />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex md:hidden w-auto items-center ">
        <NavbarItem className="pl-[80%]">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
            <Avatar showFallback />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                textValue="Sign in"
                key="Sign in"
                color='default-600'
              >
                <LoginModal/>
              </DropdownItem>
              <DropdownItem
                textValue="Sign up"
                key="Sign up"
                color='default-600'
              >
                <RegisterModal />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color={"foreground"} className="w-full" href="/" size="lg">
            <p>Home</p>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          {" "}
          <Link color={"foreground"} className="w-full" href="about" size="lg">
            <p>About Us</p>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          {" "}
          <Link color={"foreground"} className="w-full" href="/adopt" size="lg">
            <p>Pet Browser</p>
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          {" "}
          <Link color={"foreground"} className="w-full" href="/howto" size="lg">
            <p>How to Adopt</p>
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}