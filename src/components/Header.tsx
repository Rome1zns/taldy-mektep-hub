import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Bot } from "lucide-react";

const NAV_ITEMS = [
  { label: "Басты бет", href: "#" },
  { label: "Мектептер", href: "#schools" },
  { label: "Жаңалықтар", href: "#news" },
  { label: "Рейтинг", href: "#rating" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-heading text-sm font-bold text-primary-foreground">
            TH
          </div>
          <span className="font-heading text-xl font-bold text-foreground">
            Taldi<span className="text-primary">Hub</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <button className="ml-3 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
            <Bot size={16} />
            AI Көмекші
          </button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border bg-background px-4 pb-4 md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            <Bot size={16} />
            AI Көмекші
          </button>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
