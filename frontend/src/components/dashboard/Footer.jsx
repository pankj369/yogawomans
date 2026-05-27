import { FiFacebook, FiInstagram, FiMail, FiTwitter, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";
import fotlogo from "../../assets/images/fotlogo.png";

const links = ["Privacy Policy", "Terms of Service", "Help Center", "Contact Us"];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-8 rounded-[2.5rem] border border-wellness-border bg-[rgba(10,15,25,0.72)] px-6 py-8 shadow-glass backdrop-blur-[18px] sm:px-10"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Left Side: Brand and Copyright */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img
              src={fotlogo}
              alt="YogaWoman Logo"
              className="h-8 w-auto object-contain brightness-0 invert opacity-90"
            />
          </div>
          <p className="text-sm text-wellness-muted">
            © {new Date().getFullYear()} YogaWoman. Warm, mindful wellness for daily life.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-wrap items-center gap-5">
          {links.map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-xs font-bold uppercase tracking-wide text-wellness-muted transition hover:text-wellness-glow"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex items-center gap-3">
          {[FiInstagram, FiFacebook, FiTwitter, FiMail].map((Icon, index) => (
            <a
              href="#"
              key={index}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-wellness-muted shadow-sm transition hover:-translate-y-1 hover:bg-wellness-glow hover:text-black hover:shadow-[0_0_15px_rgba(0,230,118,0.3)]"
            >
              <Icon className="text-base" />
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
