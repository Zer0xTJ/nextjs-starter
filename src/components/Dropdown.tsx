import Link from "next/link";
import React, { useState } from "react";

export type DropdownOption = {
  title: string;
  href: string;
  isExternal?: boolean;
};

type Props = {
  options: DropdownOption[];
  title: string;
};

const Dropdown = ({ options, title }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button className="dropdown-white text-gray-400 hover:text-light bg-transparent p-0" onMouseLeave={() => setOpen(false)} onMouseEnter={() => setOpen(true)} onClick={() => setOpen(!open)}>
        {title}
      </button>
      {open && (
        <div className="absolute pt-2 w-full" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <div className="absolute flex flex-col gap-2 py-1 bg-white w-full rounded-md shadow-md">
            {options.map((option, i) => (
              <Link className="hover:bg-gray-200" href={option.href} key={i} onClick={() => setOpen(false)}>
                <span className="block px-2 py-1">{option.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
