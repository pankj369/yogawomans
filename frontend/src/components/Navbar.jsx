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
    href: "#home",
    icon: <FaHome />,
  },
  {
    label: "Discover Yoga",
    href: "#discover",
    icon: <GiLotus />,
  },
  {
    label: "Live Schedules",
    href: "#events",
    icon: <MdEventAvailable />,
  },
  {
    label: "Shop",
    href: "/shop",
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
        border border-wellness-border
        glass-navbar
        shadow-glass
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
              text-[#c17b42]
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
              relative
              flex items-center gap-2
              px-3 py-2
              text-[16px] font-semibold text-wellness-muted
              transition-colors duration-300
              hover:text-wellness-dark
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
                  rounded-full bg-wellness-orange
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
            className="text-sm font-bold uppercase tracking-widest text-wellness-muted hover:text-wellness-dark transition duration-200 px-4"
          >
            Login
          </Link>

          <Link
            to="/auth"
            className="btn-wellness-primary"
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

          bg-[#ede3d5]

          flex
          items-center
          justify-center

          text-[#3d3125]
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
          rounded-3xl border border-wellness-border
          glass-navbar shadow-glass
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
                  text-[#4d3928]
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
              to="/auth"
              className="btn-wellness-primary w-full"
            >
              Upgrade
            </Link>
            <Link
              to="/login"
              className="btn-wellness-secondary w-full"
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