import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  MapPin,
  ArrowUpRight,
  Lock,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white border-t border-white/10 relative overflow-hidden pt-20 pb-10">
      {/* Watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute -bottom-20 -right-20 text-[20vw] font-display font-bold text-white/5">
          RBX
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand */}
          <div className="md:col-span-4 space-y-8">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-12 h-12 bg-brand-red skew-x-[-12deg] flex items-center justify-center shadow-[0_0_20px_rgba(255,0,51,0.5)]">
                <span className="text-white font-display font-bold text-3xl skew-x-[12deg]">
                  R
                </span>
              </div>

              <div>
                <span className="text-3xl font-display font-bold">
                  RBX <span className="text-brand-red">ESPORTS</span>
                </span>
                <span className="text-xs text-gray-500 uppercase block">
                  Est. 2025
                </span>
              </div>
            </div>

            <p className="text-gray-400 border-l-2 border-brand-red pl-4">
              Dominating the arena with passion, precision, and power.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <SocialLink Icon={Twitter} url="https://twitter.com/" />
              <SocialLink
                Icon={Instagram}
                url="https://www.instagram.com/rbx.esports_official/"
              />
              <SocialLink
                Icon={Youtube}
                url="https://www.youtube.com/@RBXESPORTS"
              />
              <SocialLink Icon={Twitch} url="https://twitch.tv/" />
              <SocialLink Icon={Facebook} url="https://facebook.com/" />
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-2 md:col-start-6">
            <FooterHeading title="EXPLORE" />

            <ul className="space-y-4">
              <FooterLink
                text="Tournaments"
                action={() => navigate("/tournaments")}
              />
              <FooterLink
                text="Team Roster"
                action={() => navigate("/teams")}
              />
              <FooterLink
                text="News & Media"
                action={() => navigate("/media")}
              />
              <FooterLink text="Shop Merch" badge="NEW" action={() => navigate("/shop")} />
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <FooterHeading title="COMPANY" />

            <ul className="space-y-4">
              <FooterLink text="About Us" action={() => navigate("/")} />
              <FooterLink
                text="Management"
                action={() => navigate("/management")}
                badge="NEW"
              />
              <FooterLink
                text="Careers"
                action={() => navigate("/career")}
                badge="HIRING"
              />
              <FooterLink text="Contact" action={() => navigate("/")} />
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <FooterHeading title="NEWSLETTER" />

            <div className="bg-white/5 border border-white/10 p-6 space-y-3">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-black/50 border border-white/10 px-4 py-3 text-sm outline-none focus:border-brand-red"
              />

              <button className="w-full bg-brand-red py-3 font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-brand-red transition">
                SUBSCRIBE <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-6 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-6">
            <span>© 2025 RBX ESPORTS</span>

            <button
              onClick={() => navigate("/privacy")}
              className="hover:text-white"
            >
              PRIVACY POLICY
            </button>

            <button
              onClick={() => navigate("/terms")}
              className="hover:text-white"
            >
              TERMS OF SERVICE
            </button>
          </div>

          <div className="flex items-center gap-4 uppercase">
            {/* Admin Button */}
            <button
              onClick={() => navigate("/protected")}
              className="flex items-center gap-2 hover:text-brand-red"
            >
              <Lock size={12} />
              Admin
            </button>

            <div className="flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Servers Online
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-brand-red" />
              Competitive Hub
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* Reusable Components */

const SocialLink = ({ Icon, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition cursor-pointer"
  >
    <Icon size={18} />
  </a>
);

const FooterHeading = ({ title }) => (
  <h4 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
    <span className="w-2 h-2 bg-brand-red"></span> {title}
  </h4>
);

const FooterLink = ({ text, badge, action }) => (
  <li>
    <button
      onClick={action}
      className="text-gray-400 hover:text-white text-sm flex items-center gap-2"
    >
      {text}
      {badge && (
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded ml-1 bg-brand-red/20 text-brand-red">
          {badge}
        </span>
      )}
    </button>
  </li>
);

export default Footer;
