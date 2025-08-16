import { useEffect, useState } from "react";
import { FaShoppingCart, FaStore, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { pathname: path } = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const {cart} = useSelector((state) => state.carts);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setNavbarOpen(false);
  }, [path]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (navbarOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [navbarOpen]);

  const navLinkBase =
    "px-4 py-2 rounded-md transition-colors duration-200 flex items-center justify-center md:justify-start focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

  const isActive = (href) => path === href;

  const navLinks = (
    <>
      <li className="w-full">
        <Link
          to="/"
          className={`${navLinkBase} ${
            isActive("/") ? "bg-white text-indigo-700 shadow" : "text-white hover:bg-white hover:text-indigo-700"
          }`}
        >
          Home
        </Link>
      </li>
      <li className="w-full">
        <Link
          to="/products"
          className={`${navLinkBase} ${
            isActive("/products") ? "bg-white text-indigo-700 shadow" : "text-white hover:bg-white hover:text-indigo-700"
          }`}
        >
          Products
        </Link>
      </li>
      <li className="w-full">
        <Link
          to="/about"
          className={`${navLinkBase} ${
            isActive("/about") ? "bg-white text-indigo-700 shadow" : "text-white hover:bg-white hover:text-indigo-700"
          }`}
        >
          About
        </Link>
      </li>
      <li className="w-full">
        <Link
          to="/contact"
          className={`${navLinkBase} ${
            isActive("/contact") ? "bg-white text-indigo-700 shadow" : "text-white hover:bg-white hover:text-indigo-700"
          }`}
        >
          Contact
        </Link>
      </li>
      <li className="w-full">
        <Link
          to="/login"
          className={`${navLinkBase} ${
            isActive("/login") ? "bg-white text-indigo-700 shadow" : "text-white hover:bg-white hover:text-indigo-700"
          }`}
        >
          <FaUser className="mr-2" />
          Login
        </Link>
      </li>
      <li className="w-full">
        <Link
          to="/cart"
          className={`${navLinkBase} ${
            isActive("/cart") ? "bg-white text-indigo-700 shadow" : "text-white hover:bg-white hover:text-indigo-700"
          }`}
        >
          <span className="relative inline-block">
            <FaShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-indigo-700 text-white text-[10px] leading-none rounded-full px-1.5 py-0.5">
              {cart.length || 0}
            </span>
          </span>
        </Link>
      </li>
    </>
  );

  return (
    <nav
      className="sticky top-0 z-40 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg flex items-center justify-between px-4 md:px-8"
      role="navigation"
      aria-label="Primary"
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center text-white font-extrabold text-2xl tracking-tight hover:opacity-90 transition-opacity"
      >
        <FaStore className="mr-2 text-3xl" />
        <span className="select-none">E-Shop</span>
      </Link>

      {/* Hamburger button for mobile */}
      <button
        className="md:hidden text-white text-2xl cursor-pointer p-2 rounded-md hover:opacity-80 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        onClick={() => setNavbarOpen((v) => !v)}
        aria-label="Toggle navigation"
        aria-controls="mobile-menu"
        aria-expanded={navbarOpen}
      >
        {navbarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop menu */}
      <ul className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">{navLinks}</ul>

      {/* Mobile menu (full-screen overlay) */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ${
          navbarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Dimmed background with blur; clicking it closes the menu */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setNavbarOpen(false)}
          aria-hidden="true"
        />
        {/* Sliding panel */}
        <div
          className="relative h-[100dvh] w-full bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-600 pt-[env(safe-area-inset-top)]"
        >
          <div className="flex items-center justify-between h-16 px-4">
            <span className="text-white font-semibold text-lg">Menu</span>
            <button
              className="text-white text-2xl cursor-pointer p-2 rounded-md hover:opacity-80 hover:bg-white/10 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition"
              onClick={() => setNavbarOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          <ul className="mt-4 flex flex-col items-center space-y-3 px-4">
            {/* Make each link wide enough for comfortable touch targets */}
            <div className="w-11/12 max-w-sm space-y-2">{navLinks}</div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
