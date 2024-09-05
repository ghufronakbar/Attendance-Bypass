"use client";
import { useState } from "react";

const DropDownWeek = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number|null>(null);

  const handleSelect = (itemWeek: number) => {
    setSelected(itemWeek);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-72 justify-center gap-x-1.5 bg-[#B8FF9F] hover:bg-[#99fc77] px-3 py-2 border-black border-2 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setOpen(!open)}
        >
          {selected? `Week ${selected}` : "Select Week"}
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
        className={`w-72 absolute right-0 z-10 mt-2 origin-top-right bg-white focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black border-2 divide-y divide-black ${
          open ? "" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div role="none">
          {Array.from({ length: 14 }, (_, i) => i + 1).map((item) => (
            <div
              className="block px-4 py-2 text-sm border-black border-b-2 hover:bg-[#B8FF9F] hover:font-medium cursor-pointer"
              role="menuitem"
              id="menu-item-0"
              key={item}
              onClick={() => handleSelect(item)}
            >
              Week {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDownWeek;
