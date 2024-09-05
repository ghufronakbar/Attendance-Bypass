"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
    return (
      <div className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-full bg-yellow-1 text-black flex-shrink-0">
        <div className="flex flex-col w-fit h-full mx-auto my-auto justify-center">
          {SidebarItem.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mb-16">
              <span className="text-xl font-bold">{item.parent}</span>
              {item.children.map((child, index) => (
                <div
                  key={index}
                  className={`flex flex-col my-2 ${
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
        <span className="text-center w-full absolute bottom-10">Made with ❤️ by @lanstheprodigy</span>
      </div>
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

export default Sidebar;
