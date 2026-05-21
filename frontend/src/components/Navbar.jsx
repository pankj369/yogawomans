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

        border border-[#d8ccb8]

        bg-[#f7f1e8]/95
        backdrop-blur-xl

        shadow-[0_10px_40px_rgba(0,0,0,0.08)]

        px-6
        lg:px-10

        h-[88px]

        flex
        items-center
        justify-between
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
              flex
              items-center
              gap-2

              text-[17px]
              font-medium
              text-[#4d3928]

              transition-all
              duration-300

              hover:text-[#6f8b4e]
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
                  absolute
                  left-0
                  -bottom-3

                  h-[3px]
                  w-full

                  rounded-full
                  bg-[#7a684f]
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
            className="
            rounded-full

            border
            border-[#9e987f]

            px-7
            py-3

            text-[17px]
            font-medium
            text-[#3d3125]

            transition-all
            duration-300

            hover:bg-[#ebe2d5]
            "
          >
            Login
          </Link>

          <Link
            to="/auth"
            className="
            rounded-full

            bg-[#667f42]

            px-8
            py-3

            text-[17px]
            font-semibold
            text-white

            shadow-lg

            transition-all
            duration-300

            hover:scale-105
            hover:bg-[#587037]
            "
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
          lg:hidden

          mt-4

          rounded-[28px]

          border border-[#d9ccb8]

          bg-[#f7f1e8]

          shadow-2xl

          p-6
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

          <div className="mt-8 flex gap-3">

            <Link
              to="/login"
              className="
              flex-1

              rounded-full

              border border-[#a69b86]

              py-3

              text-center
              text-[#3d3125]
              "
            >
              Login
            </Link>

            <Link
              to="/auth"
              className="
              flex-1

              rounded-full

              bg-[#667f42]

              py-3

              text-center
              text-white
              "
            >
              Upgrade
            </Link>

          </div>

        </div>

      )}

    </header>
  );
}

export default Navbar;