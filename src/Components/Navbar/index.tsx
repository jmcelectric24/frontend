"use client";
import Image from "next/image";
import Link from "next/link";
import { format, subMonths } from "date-fns";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useSelectedLayoutSegment, useRouter } from "next/navigation";
import clsx from "clsx";
import { useGlobalState } from "@/context";

export default function Navbar() {
  const { setAuth, auth } = useGlobalState();
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const prevMonth: string = format(
    subMonths(new Date(), 1),
    "MMM-yyyy"
  ).toUpperCase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    router.push("/login");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full h-max p-3 flex justify-between items-center bg-[#686464] text-white">
        <Image
          className="cursor-pointer rounded"
          src="/images/LOGO.jpg"
          width={50}
          height={50}
          alt="nav-logo"
        />
        <div className="hidden md:flex ml-28 justify-center gap-6">
          <Link
            className={clsx("font-semibold text-white rounded p-2 hover:bg-orange-600", {
              "bg-orange-600": segment === null,
            })}
            href="/"
          >
            Home
          </Link>
          <Link
            className={clsx("font-semibold text-white rounded p-2 hover:bg-orange-600", {
              "bg-orange-600": segment === "lt-analysis",
            })}
            href="/lt-analysis"
          >
            LT-Analysis
          </Link>
          <Link
            className={clsx("font-semibold text-white rounded p-2 hover:bg-orange-600", {
              "bg-orange-600": segment === "ht-analysis",
            })}
            href="/ht-analysis"
          >
            HT-Analysis
          </Link>
          <Link
            className={clsx("font-semibold text-white rounded p-2 hover:bg-orange-600", {
              "bg-orange-600": segment === "lt-data",
            })}
            href={`/lt-data/main_table/${prevMonth}`}
          >
            LT-data
          </Link>
          <Link
            className={clsx("font-semibold text-white rounded p-2 hover:bg-orange-600", {
              "bg-orange-600": segment === "ht-data",
            })}
            href={`/ht-data/main_table/${prevMonth}`}
          >
            HT-data
          </Link>
          
          {auth.user && auth.user === "jmcelectric24@gmail.com" && (
            <Link
              className={clsx("font-semibold text-white rounded p-2 hover:bg-orange-600", {
                "bg-orange-600": segment === "sign-up",
              })}
              onClick={() => {
                toggleMenu();
              }}
              href="/sign-up"
            >
              Add User
            </Link>
          )}
        </div>
        <div className="flex flex-row">
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <MdClose size={24} /> : <FaBars size={24} />}
          </button>
          <button
            onClick={() => {
              router.push("/reset-password");
            }}
            className="hidden hover:bg-red-700 md:block bg-red-600 font-semibold text-white rounded p-2"
          >
            Reset Password
          </button>
          <button
            onClick={handleLogout}
            className="hidden hover:bg-red-700 md:block bg-red-600 font-semibold text-white rounded p-2 ml-2"
          >
            Logout
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed h-max inset-0 pt-20 md:hidden bg-gray-800 text-white p-4 overflow-y-auto z-40">
          <Link
            className={clsx("block font-semibold text-white rounded p-2 mb-2", {
              "bg-orange-600": segment === null,
            })}
            href="/"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            className={clsx("block font-semibold text-white rounded p-2 mb-2", {
              "bg-orange-600": segment === "lt-analysis",
            })}
            href="/lt-analysis"
            onClick={toggleMenu}
          >
            LT-Analysis
          </Link>
          <Link
            className={clsx("block font-semibold text-white rounded p-2 mb-2", {
              "bg-orange-600": segment === "ht-analysis",
            })}
            href="/ht-analysis"
            onClick={toggleMenu}
          >
            HT-Analysis
          </Link>
          <Link
            className={clsx("block font-semibold text-white rounded p-2 mb-2", {
              "bg-orange-600": segment === "lt-data",
            })}
            href={`/lt-data/main_table/${prevMonth}`}
            onClick={toggleMenu}
          >
            LT-data
          </Link>
          <Link
            className={clsx("block font-semibold text-white rounded p-2 mb-2", {
              "bg-orange-600": segment === "ht-data",
            })}
            href={`/ht-data/main_table/${prevMonth}`}
            onClick={toggleMenu}
          >
            HT-data
          </Link>
          
          {auth.user && auth.user === "jmcelectric24@gmail.com" && (
            <Link
              className={clsx("block font-semibold text-white rounded p-2 mb-2", {
                "bg-orange-600": segment === "sign-up",
              })}
              onClick={() => {
                toggleMenu();
              }}
              href="/sign-up"
            >
              Add User
            </Link>
          )}
          <button
            className="w-full bg-red-600 font-semibold hover:bg-red-700 text-white rounded p-2 mt-2"
            onClick={() => {
              toggleMenu();
              router.push("/reset-password");
            }}
          >
            Reset Password
          </button>
          <button
            className="w-full bg-red-600 font-semibold hover:bg-red-700 text-white rounded p-2 mt-2"
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
