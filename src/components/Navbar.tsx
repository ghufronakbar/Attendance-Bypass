import Link from "next/link";

const Navbar = () => {
    return (
      <nav className="bg-white border-gray-200 px-8 sm:px-20 py-6 w-full z-40 fixed">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-bold whitespace-nowrap text-black uppercase">
              Bypass Presensi
            </span>
          </Link>
        </div>
      </nav>
    );
  };
export default Navbar;
