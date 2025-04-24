"use client";
// import { signOut } from "next-auth/react";
import Image from "next/image";
// import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { logout } from "@/app/store/feature/authSlice";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import HeaderAuth from "./HeaderAuth";

export default function Header() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    signOut({ callbackUrl: "/login" });
  };

  if (status === "loading") return null;
  return (
    <header className="p-6 bg-white header">
      <div className="flex flex-row justify-between items-center">
        {/* App Logo */}
        <div className="shrink-0">
          <div className="header__logo__image">
            <Image
              src="/zurich_logo.png"
              width={150}
              height={50}
              alt="zurich logo header"
            />
          </div>
        </div>
        {/* Header content */}
        <div className="flex flex-row gap-5 justify-between items-center grow-1">
          <div className="flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/billing" legacyBehavior passHref>
                    <NavigationMenuLink className="px-3 py-2 text-sm font-medium hover:underline">
                      Billing Records
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {session.user.role === "admin" && (
                  <NavigationMenuItem>
                    <Link
                      href="/billing/add-new-billing"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className="px-3 py-2 text-sm font-medium hover:underline">
                        Add New Record
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
            {/* <nav>
              <ul className="flex flex-row gap-1">
                <li>
                  <Link href="#">View Billing Record</Link>
                </li>
              </ul>
              <ul className="flex flex-row gap-1">
                <li>
                  <Link href="#">View Billing Record</Link>
                </li>
              </ul>
            </nav> */}
          </div>

          {/* Header Authentication */}
          <div className="flex gap-2">
            <HeaderAuth />
            <form action={handleLogOut}>
              <button type="submit">Sign Out</button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
