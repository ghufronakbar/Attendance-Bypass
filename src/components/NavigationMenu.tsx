"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaGithubSquare, FaInstagram } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogoLinkedin } from "react-icons/io5";

const NavigationMenu = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white border-gray-200 px-8 sm:px-20 py-6 w-full z-40 fixed">
        <div className="container flex flex-wrap gap-2 items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <span className="self-center text-lg md:text-xl lg:text-2xl font-extrabold whitespace-nowrap text-black uppercase">
              Hacktendance
            </span>
          </Link>
          <div className="flex flex-row md:order-2 gap-4 items-center">
            {LinkItems.map((item, index) => (
              <Link key={index} href={item.href} target="_blank">
                {item.children}
              </Link>
            ))}
            <GiHamburgerMenu
              className="text-black cursor-pointer lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "fixed" : "hidden"
        } lg:block lg:static top-0 left-0 h-full z-30 bg-yellow-1 w-3/5 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-fit xl:px-12 transition-all lg:transform-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto text-black mt-12`}
      >
        <div className="flex flex-col w-full h-full mx-auto mt-10 md:mt-5 lg:mt-12 xl:mt-16 justify-center px-4">
          {SidebarItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mb-8">
              <span className="text-lg md:text-xl lg:text-2xl font-bold">
                {item.parent}
              </span>
              {item.children.map((child, index) => (
                <div
                  key={index}
                  className={`text-xs sm:text-sm lg:text-base flex flex-col my-2 ${
                    pathname === child.link
                      ? "font-bold underline underline-offset-8"
                      : ""
                  }`}
                >
                  <Link href={child.link}>{child.name}</Link>
                </div>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-2 mb-16">
            <span className="text-lg md:text-xl lg:text-2xl font-bold">
              Contact
            </span>
            {LinkItems.map((item, index) => (
              <div
                key={index}
                className={`text-xs sm:text-sm lg:text-base flex flex-col my-2 hover:underline hover:underline-offset-8`}
              >
                <Link href={item.href} target="_blank">{item.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay untuk mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

// Sidebar and Link Items
interface ChildSidebarProps {
  name: string;
  link: string;
}
interface SidebarProps {
  parent: string;
  children: ChildSidebarProps[];
}

const SidebarItems: SidebarProps[] = [
  {
    parent: "Getting Started",
    children: [
      {
        name: "Overview",
        link: "/",
      },
    ],
  },
  {
    parent: "Attendance",
    children: [
      {
        name: "Do Attendance",
        link: "/attendance",
      },
      {
        name: "Manage Course",
        link: "/course",
      },
      {
        name: "History",
        link: "/history",
      },
    ],
  },
];

interface LinkProps {
  href: string;
  children: React.ReactNode;
  name: string;
}

const LinkItems: LinkProps[] = [
  {
    href: "https://github.com/ghufronakbar",
    name: "Github",
    children: <FaGithubSquare className="text-black" />,
  },
  {
    href: "https://www.linkedin.com/in/ghufronakbar/",
    name: "Linkedin",
    children: <IoLogoLinkedin className="text-black" />,
  },
  {
    href: "https://www.instagram.com/ghufronakbar_/",
    name: "Instagram",
    children: <FaInstagram className="text-black" />,
  },
];

export default NavigationMenu;
