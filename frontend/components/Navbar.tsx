import Link from "next/link";
import Image from "next/image";
import { Truck } from "lucide-react";

const NavBar = () => {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-[#091121]/80 border-b border-white/10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Truck className="text-white h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-white text-xl font-bold">LogiFlow</span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {["Features", "How It Works", "Testimonials", "Pricing"].map(
            (item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-gray-400 hover:text-white transition relative px-2 py-1"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></span>
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right-side Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm text-white hover:underline">
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-primary hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md font-medium"
          >
            Sign up free
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
