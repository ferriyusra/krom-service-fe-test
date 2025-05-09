import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@heroui/react";
import { NAV_ITEMS } from "../LandingPageLayout.constants";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { useState } from "react";
import { FaHeart } from "react-icons/fa6";

const LandingPageLayoutNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useLandingPageLayoutNavbar();

  const isAdmin = dataProfile?.role === "ADMIN";

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="bg-white">
      <NavbarBrand>
        <Link href="/">
          <FaHeart
            color="#006a65"
            size={40}
          />
        </Link>
      </NavbarBrand>

      {/* Center menu items - only visible on large screen */}
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        {NAV_ITEMS.map((item) => (
          <NavbarItem key={item.label}>
            <Link href={item.href} className="text-teal-600 hover:font-bold transition-all">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right section (avatar or login/register) */}
      <NavbarContent className="hidden lg:flex gap-4" justify="end">
        {session.status === "authenticated" ? (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointer"
                  showFallback
                />
              </DropdownTrigger>
              <DropdownMenu>
                {isAdmin ? (
                  <DropdownItem key="teacher-dashboard" href="/admin/">
                    Dashboard
                  </DropdownItem>
                ) : null}
                <DropdownItem key="signout" onPress={() => signOut()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Link href="/auth/login" className="text-teal-600 hover:font-semibold">Login</Link>
            </NavbarItem>
            <NavbarItem>
              {/* <Link
                href="/auth/register"
                className="bg-teal-600 text-white rounded-full px-4 py-2 hover:underline font-semibold"
              >
                Register
              </Link> */}
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Menu toggle on mobile */}
      <NavbarMenuToggle className="lg:hidden" />

      {/* Mobile menu */}
      <NavbarMenu className="bg-white">
        {NAV_ITEMS.map((item) => (
          <NavbarMenuItem key={item.label}>
            <Link href={item.href} className="text-black text-base py-2 w-full block">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        {/* Auth section inside mobile menu */}
        {session.status === "authenticated" ? (
          <>
            {isAdmin && (
              <NavbarMenuItem>
                <Link href="/admin/" className="text-black block py-2">
                  My Assignment Dashboard
                </Link>
              </NavbarMenuItem>
            )}

            <NavbarMenuItem>
              <Button
                onPress={() => signOut()}
                className="bg-teal-50 text-teal-600 block py-2 w-full text-left"
              >
                Logout
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link href="/auth/login" className="text-teal-600 py-2 block">Login</Link>
            </NavbarMenuItem>
            {/* <NavbarMenuItem>
              <Link
                href="/auth/register"
                className="bg-teal-600 text-white text-center py-3 rounded-full block font-semibold"
              >
                Register
              </Link>
            </NavbarMenuItem> */}
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
