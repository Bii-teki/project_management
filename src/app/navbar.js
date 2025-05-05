"use client"; // This must be at the very top

import Link from "next/link";
import { usePathname } from "next/navigation"; // Changed from useRouter
import { FaPaintBrush } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname(); // Use this instead of useRouter

  // Helper function to determine if a link is active
  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-base-100 container ">
      <div className="mx-auto h-full border-b border-white/10 py-4 px-6 xl:py-6">
        <div className="flex items-center justify-between">
          {/* Logo/Icon on the left */}
          <div className="flex items-center space-x-2">
            <FaPaintBrush className="text-2xl text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Artistry
            </span>
          </div>

          {/* Menu items on the right */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full transition-colors ${
                isActive("/")
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Home
            </Link>
            {/* Uncomment these when ready
            <Link
              href="/gallery"
              className={`px-4 py-2 rounded-full transition-colors ${
                isActive("/gallery")
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-full transition-colors ${
                isActive("/about")
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-full transition-colors ${
                isActive("/contact")
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Contact
            </Link>
            */}
            <button className="btn btn-primary btn-sm rounded-full ml-4">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="btn btn-ghost btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Decorative line below with 20px margins */}
        <div className="mt-3 mx-5">
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </div>
    </nav>
  );
}