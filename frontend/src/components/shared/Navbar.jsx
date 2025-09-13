import { useEffect, useState } from "react";
import { FaShoppingCart, FaStore, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "../UserMenu";

const Navbar = () => {
  const { pathname: path } = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const {cart} = useSelector((state) => state.carts);
  const {user} = useSelector((state) => state.auth);

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
    "px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center md:justify-start focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 font-medium text-sm relative group overflow-hidden";

  const isActive = (href) => path === href;

  const navLinks = (
    <>
      <li>
        <Link
          to="/"
          className={`${navLinkBase} ${
            isActive("/") 
              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
              : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
          }`}
        >
          <span className="relative z-10">Home</span>
          {isActive("/") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
        </Link>
      </li>
      <li>
        <Link
          to="/products"
          className={`${navLinkBase} ${
            isActive("/products") 
              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
              : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
          }`}
        >
          <span className="relative z-10">Products</span>
          {isActive("/products") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className={`${navLinkBase} ${
            isActive("/about") 
              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
              : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
          }`}
        >
          <span className="relative z-10">About</span>
          {isActive("/about") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
        </Link>
      </li>
      
      {user && user.id ? (
        <li>
          <UserMenu/>
        </li>
      ) : (
        <li>
          <Link
            to="/login"
            className={`${navLinkBase} ${
              isActive("/login") 
                ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
                : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
            }`}
          >
            <FaUser className="mr-2 text-sm" />
            <span className="relative z-10">Login</span>
            {isActive("/login") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
          </Link>
        </li>
      )}
      
      <li>
        <Link
          to="/cart"
          className={`${navLinkBase} ${
            isActive("/cart") 
              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
              : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
          }`}
        >
          <span className="relative inline-flex items-center">
            <FaShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-yellow-400 text-indigo-900 text-[11px] font-bold leading-none rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 shadow-lg ring-2 ring-white/50 animate-pulse">
                {cart.length > 99 ? '99+' : cart.length}
              </span>
            )}
          </span>
          <span className="ml-2 relative z-10">Cart</span>
          {isActive("/cart") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
        </Link>
      </li>
    </>
  );

  // Mobile-specific navLinks with full width
  const mobileNavLinks = (
    <>
      <li className="w-full">
        <Link
          to="/"
          className={`${navLinkBase} w-full ${
            isActive("/") 
              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
              : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
          }`}
        >
          <span className="relative z-10">Home</span>
          {isActive("/") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
        </Link>
      </li>
      <li className="w-full">
        <Link
          to="/products"
          className={`${navLinkBase} w-full ${
            isActive("/products") 
              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
              : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
          }`}
        >
          <span className="relative z-10">Products</span>
          {isActive("/products") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
        </Link>
      </li>
      <li className="w-full">
        <Link
          to="/about"
          className={`${navLinkBase} w-full ${
            isActive("/about") 
              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
              : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
          }`}
        >
          <span className="relative z-10">About</span>
          {isActive("/about") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
        </Link>
      </li>
      
      {user && user.id ? (
        <li className="w-full flex justify-center">
          <UserMenu/>
        </li>
      ) : (
        <li className="w-full">
          <Link
            to="/login"
            className={`${navLinkBase} w-full ${
              isActive("/login") 
                ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
                : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
            }`}
          >
            <FaUser className="mr-2 text-sm" />
            <span className="relative z-10">Login</span>
            {isActive("/login") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
          </Link>
        </li>
      )}
      
      <li className="w-full">
        <Link
          to="/cart"
          className={`${navLinkBase} w-full ${
            isActive("/cart") 
              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20" 
              : "text-white/90 hover:bg-white/15 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
          }`}
        >
          <span className="relative inline-flex items-center justify-center">
            <FaShoppingCart size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-yellow-400 text-indigo-900 text-[11px] font-bold leading-none rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 shadow-lg ring-2 ring-white/50 animate-pulse">
                {cart.length > 99 ? '99+' : cart.length}
              </span>
            )}
          </span>
          <span className="ml-2 relative z-10">Cart</span>
          {isActive("/cart") && <div className="absolute inset-0 bg-white/10 rounded-xl"></div>}
        </Link>
      </li>
    </>
  );

  return (
    <>
      <nav
        className="sticky top-0 z-30 h-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl backdrop-blur-lg flex items-center justify-between px-4 md:px-8 border-b border-white/10"
        role="navigation"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-white font-extrabold text-xl md:text-2xl tracking-tight hover:opacity-90 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-2 py-1"
        >
          <div className="relative">
            <FaStore className="mr-2 md:mr-3 text-2xl md:text-3xl drop-shadow-lg" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <span className="select-none drop-shadow-sm">E-Shop</span>
        </Link>

        {/* Hamburger button for mobile */}
        <button
          className="md:hidden text-white text-2xl cursor-pointer p-3 rounded-xl hover:bg-white/10 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-all duration-200 backdrop-blur-sm"
          onClick={() => setNavbarOpen((v) => !v)}
          aria-label={navbarOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-menu"
          aria-expanded={navbarOpen}
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className={`absolute transition-all duration-300 ${navbarOpen ? 'rotate-45' : 'rotate-0'}`}>
              {navbarOpen ? <FaTimes /> : <FaBars />}
            </span>
          </div>
        </button>

        {/* Desktop menu - properly spaced without full width on items */}
        <ul className="hidden md:flex md:items-center md:gap-2 lg:gap-3">{navLinks}</ul>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${
          navbarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            navbarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setNavbarOpen(false)}
          aria-hidden="true"
        />
        
        {/* Sliding panel */}
        <div
          className={`relative h-[100dvh] w-full bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 pt-[env(safe-area-inset-top)] shadow-2xl transition-transform duration-500 ${
            navbarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/20 backdrop-blur-sm bg-white/5">
            <h2 id="mobile-menu-title" className="text-white font-bold text-lg">Navigation Menu</h2>
            <button
              className="text-white text-2xl cursor-pointer p-2 rounded-xl hover:bg-white/10 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-all duration-200"
              onClick={() => setNavbarOpen(false)}
              aria-label="Close navigation menu"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="overflow-y-auto h-[calc(100vh-4rem)]">
            <ul className="flex flex-col items-center space-y-4 px-6 py-8">
              <div className="w-full max-w-sm space-y-3">{mobileNavLinks}</div>
            </ul>
            
            {/* Footer info */}
            <div className="px-6 py-8 mt-auto border-t border-white/20">
              <div className="text-center text-white/70 text-sm">
                <p>Welcome to E-Shop</p>
                <p className="text-xs mt-1 text-white/50">Your premium shopping destination</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;