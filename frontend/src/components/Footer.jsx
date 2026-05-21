import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaRegClock,
  FaXTwitter,
  FaYoutube
} from "react-icons/fa6";

import {
  HiMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone
} from "react-icons/hi2";

import fotlogo from "../assets/images/fotlogo.png";
const quickLinks = [
  "Home",
  "About Us",
  "Classes",
  "Retreats",
  "Blog",
  "Contact Us",
  "Join Us"
];

const classLinks = [
  "Hatha Yoga",
  "Vinyasa Flow",
  "Yin Yoga",
  "Meditation & Mindfulness",
  "Prenatal Yoga",
  "Power Yoga",
  "Kids Yoga",
  "Online Classes"
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { label: "Twitter", href: "https://x.com", icon: FaXTwitter },
  { label: "Pinterest", href: "https://pinterest.com", icon: FaPinterestP }
];

function Footer() {
  return (
    <footer id="footer" className="bg-[#1A2E1A] font-body text-[#CCCCCC]">

      <div className="section-container px-3 pb-0 pt-20 sm:pt-24">

        {/* Top Footer Grid */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8 lg:p-10">

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

            {/* Column 1 - Brand */}
            <div className="lg:col-span-1">

<a
  href="#home"
  aria-label="YOGAWOMANS home"
  className="
    inline-flex
    items-center
    rounded-2xl
    border
    border-[#E8651A]/30
    bg-white/10
    px-4
    py-3
    backdrop-blur-md
    transition
    duration-300
    hover:scale-[1.02]
    hover:border-[#E8651A]
  "
>

  <img
    src={fotlogo}
    alt="YOGAWOMANS Logo"
    className="
      h-12
      w-auto
      object-contain

      sm:h-14
      md:h-16
    "
  />

</a>
              <p className="mt-5 font-heading text-xs uppercase tracking-[0.35em] text-white/80">
                Body • Mind • Soul
              </p>

              <p className="mt-4 text-sm leading-7 text-[#CCCCCC]">
                Empowering lives through the ancient wisdom of yoga and meditation.
                Join our community and begin your journey to a healthier body,
                calmer mind, and happier life.
              </p>

              {/* Social Icons */}
              <div className="mt-6 flex flex-wrap gap-3">

                {socialLinks.map(({ label, href, icon: Icon }) => (

                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm text-white/80 transition-all duration-300 hover:scale-110 hover:border-[#E8651A] hover:bg-[#E8651A] hover:text-white"
                  >
                    <Icon />
                  </a>

                ))}

              </div>

            </div>

            {/* Column 2 - Quick Links */}
            <div>

              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#E8651A]">
                Quick Links
              </h3>

              <ul className="mt-5 space-y-3 text-sm">

                {quickLinks.map((link) => (

                  <li key={link}>

                    <a
                      href="#"
                      className="inline-flex transition-all duration-300 hover:translate-x-1.5 hover:text-[#43A047]"
                    >
                      {link}
                    </a>

                  </li>

                ))}

              </ul>

            </div>

            {/* Column 3 - Our Classes */}
            <div>

              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#E8651A]">
                Our Classes
              </h3>

              <ul className="mt-5 space-y-3 text-sm">

                {classLinks.map((link) => (

                  <li key={link}>

                    <a
                      href="#"
                      className="inline-flex transition-all duration-300 hover:translate-x-1.5 hover:text-[#43A047]"
                    >
                      {link}
                    </a>

                  </li>

                ))}

              </ul>

            </div>

            {/* Column 4 - Contact Info */}
            <div>

              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#E8651A]">
                Contact Us
              </h3>

              <ul className="mt-5 space-y-4 text-sm">

                <li className="flex items-start gap-3 leading-6">

                  <HiMapPin className="mt-0.5 shrink-0 text-lg text-[#E8651A]" />

                  <span>
                    123 Serenity Lane, Wellness District,
                    <br />
                    Mumbai, Maharashtra - 400001, India
                  </span>

                </li>

                <li className="flex items-center gap-3">

                  <HiOutlinePhone className="shrink-0 text-lg text-[#E8651A]" />

                  <a
                    href="tel:+919876543210"
                    className="transition-colors duration-300 hover:text-[#43A047]"
                  >
                    +91 98765 43210
                  </a>

                </li>

                <li className="flex items-center gap-3">

                  <HiOutlineEnvelope className="shrink-0 text-lg text-[#E8651A]" />

                  <a
                    href="mailto:hello@yogawomans.com"
                    className="transition-colors duration-300 hover:text-[#43A047]"
                  >
                    hello@yogawomans.com
                  </a>

                </li>

                <li className="flex items-start gap-3 leading-6">

                  <FaRegClock className="mt-0.5 shrink-0 text-base text-[#E8651A]" />

                  <span>
                    Mon - Sat: 6:00 AM - 9:00 PM
                    <br />
                    Sunday: 7:00 AM - 6:00 PM
                  </span>

                </li>

              </ul>

            </div>

            {/* Column 5 - Newsletter */}
            <div>

              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#E8651A]">
                Stay Inspired
              </h3>

              <p className="mt-5 text-sm leading-7">
                Subscribe to receive wellness tips, yoga guides,
                and exclusive class offers.
              </p>

              <form
                className="mt-5 space-y-4"
                onSubmit={(event) => event.preventDefault()}
              >

                <label htmlFor="newsletter-email" className="sr-only">
                  Enter your email address
                </label>

                <input
                  id="newsletter-email"
                  name="newsletterEmail"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-full border border-[#2E7D32] bg-white/10 px-4 py-3 text-sm text-white placeholder:text-[#CCCCCC]/70 outline-none transition duration-300 focus:border-[#E8651A] focus:ring-2 focus:ring-[#E8651A]/50"
                />

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#E8651A] px-5 py-3 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_0_0_0_rgba(232,101,26,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(232,101,26,0.4)]"
                >
                  Subscribe
                </button>

                <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-[#CCCCCC]">

                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border border-[#2E7D32] bg-transparent text-[#E8651A] accent-[#E8651A] focus:ring-[#E8651A]"
                  />

                  <span>
                    I agree to receive wellness updates from YOGAWOMANS
                  </span>

                </label>

              </form>

            </div>

          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-10 border-t border-[#2E4A2E] bg-[#111F11]/80 px-3 py-5">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-[#999999] md:flex-row md:text-left">

            <p>
              &copy; 2025 YOGAWOMANS. All Rights Reserved.
            </p>

            <p>
              Made with 🧘 for Mind, Body & Soul
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">

              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#43A047]"
              >
                Privacy Policy
              </a>

              <span>|</span>

              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#43A047]"
              >
                Terms of Service
              </a>

              <span>|</span>

              <a
                href="#"
                className="transition-colors duration-300 hover:text-[#43A047]"
              >
                Cookie Policy
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
