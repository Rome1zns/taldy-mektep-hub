import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Bot } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AIChatModal from "./AIChatModal";

const NAV_ITEMS = [
  { label: "Басты бет", href: "/" },
  { label: "Мектептер", href: "/schools" },
  { label: "Жаңалықтар", href: "/news" },
  { label: "Рейтинг", href: "/rating" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/30 bg-background/70 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center border border-primary font-heading text-sm font-bold text-primary text-glow-strong">
              TH
            </div>
            <span className="font-heading text-xl font-bold uppercase tracking-widest text-foreground text-glow-strong">
              Taldi<span className="text-primary">Hub</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-2 font-mono text-sm uppercase tracking-wider transition-all ${
                    active
                      ? "text-primary text-glow-strong border-b border-primary"
                      : "text-muted-foreground hover:text-primary hover:text-glow"
                  }`}
                >
                  {active ? `> ${item.label}` : item.label}
                </Link>
              );
            })}
            <button
              onClick={() => setChatOpen(true)}
              className="terminal-btn ml-3 animate-pulse-glow"
            >
              <Bot size={16} />
              AI_Көмекші
            </button>
          </nav>

          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-primary/30 bg-background/95 px-4 pb-4 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block py-3 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-primary hover:text-glow"
                onClick={() => setOpen(false)}
              >
                &gt; {item.label}
              </Link>
            ))}
            <button
              onClick={() => { setChatOpen(true); setOpen(false); }}
              className="terminal-btn mt-2 w-full"
            >
              <Bot size={16} />
              AI Көмекші
            </button>
          </motion.div>
        )}
      </header>

      <AIChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default Header;
