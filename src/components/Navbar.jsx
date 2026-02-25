import React, { useState, useEffect, useCallback } from "react";
import {
  Menu,
  X,
  Trophy,
  Users,
  Play,
  Radio,
  Briefcase, // ⭐ Career icon
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ===== SCROLL LISTENER (OPTIMIZED) ===== */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== NAV LINKS ===== */
  const navLinks = [
    { name: "Tournaments", icon: Trophy, target: "tournaments" },
    { name: "Teams", icon: Users, target: "teams" },
    { name: "Media", icon: Play, target: "media" },
    { name: "Career", icon: Briefcase, route: "/career" }, // ⭐ NEW
    { name: "Live", icon: Radio, highlight: true, target: "tournaments" },
  ];

  /* ===== SMOOTH SCROLL ===== */
  const scrollToSection = useCallback((targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  /* ===== NAV CLICK HANDLER ===== */
  const handleNavClick = useCallback(
    (link) => {
      // Route navigation (Career)
      if (link.route) {
        navigate(link.route);
        setIsMobileMenuOpen(false);
        return;
      }

      // Section scroll (existing behavior)
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToSection(link.target), 200);
      } else {
        scrollToSection(link.target);
      }

      setIsMobileMenuOpen(false);
    },
    [location.pathname, navigate, scrollToSection]
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* ===== LOGO ===== */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-brand-red skew-x-[-12deg] flex items-center justify-center">
            <span className="text-white font-display font-bold text-2xl skew-x-[12deg]">
              R
            </span>
          </div>

          <span className="text-3xl font-display font-bold tracking-wider text-white">
            RBX <span className="text-brand-red">ESPORTS</span>
          </span>
        </div>

        {/* ===== DESKTOP LINKS ===== */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className={`group flex items-center gap-2 font-bold tracking-widest text-sm uppercase transition-colors ${
                link.highlight
                  ? "text-brand-red animate-pulse"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <link.icon
                className={`w-4 h-4 ${
                  link.highlight
                    ? "text-brand-red"
                    : "group-hover:text-brand-red transition-colors"
                }`}
              />
              <span className="relative inline-block">
                {link.name}

                {link.name === "Career" && (
                  <span className="absolute -top-4 -right-8 px-2 py-[0.2px] text-[7px] font-bold tracking-wider bg-brand-red text-white rounded-xl animate-pulse whitespace-nowrap">
                    HIRING
                  </span>
                )}
              </span>
            </button>
          ))}

          {/* JOIN BUTTON (UNCHANGED) */}
          <button
            onClick={() => navigate("/join")}
            className="bg-white text-black px-6 py-2 font-display font-bold text-lg hover:bg-brand-red hover:text-white transition-colors clip-path-button"
          >
            JOIN US
          </button>
        </div>

        {/* ===== MOBILE TOGGLE ===== */}
        <button
          className="md:hidden text-white hover:text-brand-red"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* ===== MOBILE MENU ===== */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-white/10 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className="flex items-center gap-4 text-white font-bold uppercase tracking-wider py-2 border-b border-white/5 w-full text-left"
            >
              <link.icon className="text-brand-red" size={20} />
              <span className="relative inline-block">
                {link.name}

                {link.name === "Career" && (
                  <span className="absolute -top-2 -right-10 px-2 py-[2px] text-[9px] font-bold tracking-wider bg-brand-red text-white rounded animate-pulse whitespace-nowrap">
                    HIRING
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
