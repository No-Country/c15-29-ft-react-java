import React, { useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "@/components/navbar/acmelogo";
import { useAuth } from "@/Api/AuthContext.jsx";
import { UserPannel } from "@/components/UserPannel/UserPannel";

export default function UserNavbar() {
  const { userInfo, loading, getCookieValue, getUserDataFromLocalStorage, handleLogout, getUserPhoto, setLoading } = useAuth();

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
          <Link color="foreground" href="#">
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
              name={userInfo ? userInfo.username : "Guest"}
              size="sm"
              src={userInfo ? userInfo.profileImage : "https://pets-adopt-api.onrender.com/api/nocountry-pawfinder/PrimerUsuarioConImagen/image/thumbnail"}
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
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback" onClick={getUserPhoto}>
              Help & Feedback
            </DropdownItem>

            <DropdownItem key="help_and_feedback">
              <UserPannel />
            </DropdownItem>

            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
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
