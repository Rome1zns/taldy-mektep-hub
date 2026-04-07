import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SCHOOLS } from "@/data/schools";
import { VALUES } from "@/data/mockData";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Rating = () => {
  const [activeTab, setActiveTab] = useState("all");

  const ranked = useMemo(() => {
    if (activeTab === "all") {
      return [...SCHOOLS]
        .map((s) => ({ ...s, totalScore: s.values.reduce((sum, v) => sum + v.score, 0) }))
        .sort((a, b) => b.totalScore - a.totalScore);
    }
    const valueId = Number(activeTab);
    return [...SCHOOLS]
      .map((s) => {
        const val = s.values.find((v) => v.id === valueId);
        return { ...s, totalScore: val?.score || 0 };
      })
      .sort((a, b) => b.totalScore - a.totalScore);
  }, [activeTab]);

  const maxScore = activeTab === "all" ? 1000 : 100;
  const isInnovator = (school: typeof SCHOOLS[0], rank: number) => rank < 3 && school.posts > 20;

  return (
    <div className="relative z-10 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground lg:text-4xl">Рейтинг</h1>
          <p className="mt-2 text-muted-foreground">Мектептер рейтингі — {activeTab === "all" ? "жалпы балл" : VALUES.find(v => v.id === Number(activeTab))?.name}</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveTab("all")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Жалпы
          </button>
          {VALUES.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveTab(String(v.id))}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === String(v.id) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {v.icon} {v.name}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="px-4 py-3 text-left font-heading font-semibold text-muted-foreground w-12">#</th>
                  <th className="px-4 py-3 text-left font-heading font-semibold text-muted-foreground">Мектеп</th>
                  <th className="px-4 py-3 text-left font-heading font-semibold text-muted-foreground hidden md:table-cell">Директор</th>
                  <th className="px-4 py-3 text-right font-heading font-semibold text-muted-foreground w-32">Балл</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((school, i) => {
                  const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
                  const rowBg = i < 3 ? "bg-primary/5" : "";

                  return (
                    <motion.tr
                      key={school.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className={`border-b border-border hover:bg-card/80 transition-colors ${rowBg}`}
                    >
                      <td className="px-4 py-3 font-heading font-bold text-muted-foreground">
                        {medal || i + 1}
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/schools/${school.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 font-heading text-xs font-bold text-primary shrink-0">
                            {school.avatar}
                          </div>
                          <div className="min-w-0">
                            <span className="font-heading text-sm font-semibold text-foreground truncate block">{school.name}</span>
                            {isInnovator(school, i) && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-accent font-medium">
                                ⭐ Жаңашыл директор
                              </span>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell text-sm">{school.director}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <div className="w-20 h-2 rounded-full bg-secondary overflow-hidden hidden sm:block">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${(school.totalScore / maxScore) * 100}%` }}
                            />
                          </div>
                          <span className="font-heading text-sm font-bold text-primary w-12 text-right">
                            {school.totalScore}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
