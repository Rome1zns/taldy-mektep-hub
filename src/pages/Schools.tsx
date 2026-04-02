import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Users, FileText, UserCheck } from "lucide-react";
import { SCHOOLS } from "@/data/schools";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Schools = () => {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return SCHOOLS.filter(
      (s) => s.name.toLowerCase().includes(q) || s.director.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground lg:text-4xl">Мектептер каталогы</h1>
          <p className="mt-2 text-muted-foreground">Талдықорған қаласының 30 мектебі</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Мектеп немесе директор іздеу..."
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((school, i) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`/schools/${school.id}`}
                className="block rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:border-primary/40 hover:shadow-glow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 font-heading text-sm font-bold text-primary">
                    {school.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-semibold text-foreground truncate">{school.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{school.director}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { icon: Users, label: "Оқушы", val: school.students },
                    { icon: FileText, label: "Жазба", val: school.posts },
                    { icon: UserCheck, label: "Жазылушы", val: school.subscribers },
                    { icon: null, label: "Рейтинг", val: school.rating },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="font-heading text-sm font-bold text-primary">{s.val}</div>
                      <div className="text-[10px] text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">Нәтиже табылмады</div>
        )}
      </div>
    </div>
  );
};

export default Schools;
