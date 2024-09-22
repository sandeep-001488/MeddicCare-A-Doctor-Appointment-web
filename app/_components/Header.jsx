"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const Menu = [
    {
      id: 1,
      name: "Explore",
      path: "/explore",
    },
    {
      id: 2,
      name: "Contact Us",
      path: "/contact",
    },
    {
      id:3,
      name:"Bookings",
      path:"/my-booking"
    }
  ];

  const { user } = useKindeBrowserClient();
  const [openPopOver, setOpenPopOver] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 p-4 shadow-sm bg-white z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={120}
            height={80}
            color="teal"
          />
          </Link>

          <ul className="md:flex gap-8 hidden">
            {Menu.map((item) => (
              <li
                key={item.id}
                className="hover:text-blue-700 hover:scale-110 transition-all ease-in cursor-pointer"
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {user ? (
          <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
            <PopoverTrigger>
              <Image
                src={user?.picture}
                alt="profile-image"
                height={50}
                width={50}
                className="rounded-full cursor-pointer"
              />
            </PopoverTrigger>
            <PopoverContent className="w-44">
              <ul className="flex flex-col gap-2 text-pretty text-red-500 hover:text-blue-600">
                <li
                  className="cursor-pointer hover:bg-slate-100 p-2 rounded-lg"
                  onClick={() => setOpenPopOver(false)}
                >
                  Profile
                </li>
                <Link
                  href="/my-booking"
                  className="cursor-pointer hover:bg-slate-100 p-2 rounded-lg"
                  onClick={() => setOpenPopOver(false)}
                >
                  Bookings
                </Link>
                <li
                  className="cursor-pointer hover:bg-slate-100 p-2 rounded-lg"
                  onClick={() => setOpenPopOver(false)}
                >
                  <LogoutLink>Logout</LogoutLink>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        ) : (
          <LoginLink>
            <Button className="text-teal-100 bg-blue-700">Get Started</Button>
          </LoginLink>
        )}
      </div>
    </div>
  );
};

export default Header;
