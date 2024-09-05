"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const NavigationMenu = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <>
      <nav className="bg-white border-gray-200 px-8 sm:px-20 py-6 w-full z-40 fixed">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <span className="self-center text-lg md:text-xl lg:text-2xl font-extrabold whitespace-nowrap text-black uppercase">
              Hacktendance
            </span>
          </Link>
          <GiHamburgerMenu
            className="text-black cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
      </nav>
      <div
        className={`${
          isSidebarOpen ? "fixed md:static" : "hidden"
        } w-3/5 sm:w-3/5 md:w-1/3 lg:w-1/4 xl:w-1/5 h-full xl:min-h-[100vh] lg:min-h-[110vh] md:min-h-[120vh] bg-yellow-1 text-black flex-shrink-0 z-30`}
      >
        <div className="flex flex-col w-fit h-full mx-auto my-auto justify-center">
          {SidebarItem.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mb-16">
              <span className="text-lg md:text-xl lg:text-2xl font-bold">{item.parent}</span>
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
        </div>      
      </div>
    </>
  );
};

interface ChildSidebarProps {
  name: string;
  link: string;
}
interface SidebarProps {
  parent: string;
  children: ChildSidebarProps[];
}

const SidebarItem: SidebarProps[] = [
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

export default NavigationMenu;
