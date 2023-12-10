"use client";

import { useState } from "react";
import { menuItems } from "../../../../public/menuItems";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`overflow-hidden bg-white p-4 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 ${
        isOpen ? "fixed top-0 z-10 w-full" : "sticky"
      }`}
    >
      <div className={"relative"}>
        <div className="m-auto flex w-full max-w-[1196px] items-center justify-between">
          <h1 className="text-xl">
            <Link href={"/"}>
              <Image
                alt={"La base"}
                src={"/images/la-base-logo.png"}
                width={88}
                height={24}
              ></Image>
            </Link>
          </h1>
          <button
            data-testid="hamburger"
            aria-expanded={isOpen}
            onClick={handleClick}
            className="flex items-center justify-center gap-2"
          >
            <div className="flex flex-col items-end space-y-1">
              <span
                className={`block h-0.5 w-5 rounded-sm bg-gray-500 transition-all duration-300 ease-out ${
                  isOpen ? "translate-y-[6px] -rotate-45" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`my-0.5 block h-0.5 w-4 rounded-sm bg-gray-500 transition-all duration-300 ease-out ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-5 rounded-sm bg-gray-500 transition-all duration-300 ease-out ${
                  isOpen ? "-translate-y-[6px] rotate-45" : "translate-y-0.5"
                }`}
              ></span>
            </div>
            <h2>MENU</h2>
          </button>
        </div>
        <nav
          className={`h-screen bg-white duration-500 ${isOpen ? "" : "hidden"}`}
        >
          <ul
            className={
              "mt-8 flex flex-col items-start justify-center gap-6 p-4"
            }
          >
            {menuItems.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    href={"/"}
                    onClick={handleClick}
                    className={
                      "decoration-sky-600 decoration-4 underline-offset-8 hover:font-bold hover:text-sky-600 hover:underline"
                    }
                  >
                    {item.titre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
