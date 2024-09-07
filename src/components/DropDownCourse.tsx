"use client";
import { Course } from "@/models/Course";

interface DropDownCourseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selected: Course;
  setSelected: (selected: Course) => void;
  courses: Course[];
}

const DropDownCourse = ({
  open,
  setOpen,
  selected,
  setSelected,
  courses,
}: DropDownCourseProps) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex lg:w-80 sm:w-60 w-full h-11 justify-center gap-x-1.5 bg-green-1 hover:bg-green-2 px-12 py-2 border-black border-2 focus:outline-none shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setOpen(!open)}
        >
          {selected.name}
          <svg
            className="mt-1 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`w-full absolute max-h-40 overflow-y-auto hide-scroll right-0 z-10 mt-2 origin-top-right bg-white focus:outline-none shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black border-2 divide-y divide-black ${
          open ? "" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div role="none">
          {courses.map((item) => (
            <div
              className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-green-2 hover:font-medium cursor-pointer"
              role="menuitem"
              id="menu-item-0"
              key={item.code}
              onClick={() => setSelected(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDownCourse;
