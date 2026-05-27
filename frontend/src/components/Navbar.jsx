import { useState } from "react";
import { FaBars, FaTimes, FaHome } from "react-icons/fa";
import { GiLotus } from "react-icons/gi";
import { MdEventAvailable } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";

import navlogo from "../assets/images/navlogo.png";

const links = [
  {
    label: "Home",
    href: "/",
    icon: <FaHome />,
  },
  {
    label: "Discover Yoga",
    href: "/discover-yoga",
    icon: <GiLotus />,
  },
  {
    label: "Live Schedules",
    href: "/live-schedules",
    icon: <MdEventAvailable />,
  },
  {
    label: "Store",
    href: "/store",
    icon: <FiShoppingBag />,
  },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-1 left-0 w-full z-50 px-4">

      <nav
        className="
        mx-auto
        max-w-[1450px]
        rounded-[32px]
        border border-luxury-surface/50
        bg-white/72 backdrop-blur-xl
        shadow-sm
        px-6 lg:px-10
        h-[88px]
        flex items-center justify-between
        transition-all duration-300
        "
      >

        {/* LEFT LOGO */}
        <a href="#home" className="flex items-center gap-3">

          <img
            src={navlogo}
            alt="logo"
            className="h-14 w-auto object-contain"
          />

          <div className="hidden sm:block">
           
            <p
              className="
              text-[11px]
              leading-[1.4]
              tracking-[0.22em]
              uppercase
              text-luxury-white
              "
            >
              Why should all
              <br />
              superheros be man?
            </p>
          </div>

        </a>

        {/* DESKTOP MENU */}
        <ul
          className="
          hidden
          lg:flex
          items-center
          gap-10
          "
        >

          {links.map((link, index) => (

            <li key={link.label} className="relative group">

              <Link
              to={link.href}
              className="
              relative z-50 pointer-events-auto
              flex items-center gap-2
              px-3 py-2
              text-[16px] font-bold text-[#11281d]
              transition-colors duration-300
              hover:text-white
              drop-shadow-sm
              "
                >
                <span className="text-[18px]">
                  {link.icon}
                </span>
                {link.label}
              </Link>

              {index === 0 && (
                <div
                  className="
                  absolute left-1/2 -bottom-2
                  h-[4px] w-6 -translate-x-1/2
                  rounded-full bg-luxury-gold
                  "
                />
              )}

            </li>

          ))}

        </ul>

        {/* RIGHT BUTTONS */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="relative z-50 pointer-events-auto text-sm font-bold uppercase tracking-widest text-[#11281d] hover:text-white transition duration-200 px-4"
          >
            Login
          </Link>

          <Link
            to="/pricing"
            className="rounded-full bg-luxury-emerald hover:bg-luxury-emerald/90 text-white px-7 py-3.5 text-sm font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5"
          >
            Upgrade
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="
          lg:hidden

          h-11
          w-11

          rounded-full

          bg-luxury-surface

          flex
          items-center
          justify-center

          text-luxury-text
          "
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (

        <div
          className="
          lg:hidden mt-4
          rounded-3xl border border-luxury-surface/50
          bg-white/95 backdrop-blur-xl shadow-lg
          p-6 max-h-[80vh] overflow-y-auto
          "
        >

          <ul className="space-y-6">

            {links.map((link) => (

              <li key={link.label}>

                <Link
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                  flex
                  items-center
                  gap-3

                  text-[18px]
                  font-medium
                  text-luxury-text
                  "
                  >

                  <span>
                    {link.icon}
                  </span>

                  {link.label}

                </Link>

              </li>

            ))}

          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/pricing"
              className="w-full text-center rounded-full bg-luxury-emerald hover:bg-luxury-emerald/95 text-white py-3.5 text-sm font-bold transition"
            >
              Upgrade
            </Link>
            <Link
              to="/login"
              className="w-full text-center rounded-full bg-luxury-surface hover:bg-luxury-surface/80 text-luxury-text py-3.5 text-sm font-bold transition border border-luxury-sand/30"
            >
              Login
            </Link>
          </div>

        </div>

      )}

    </header>
  );
}

export default Navbar;