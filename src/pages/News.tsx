import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { POSTS } from "@/data/posts";
import { SCHOOLS } from "@/data/schools";
import { VALUES } from "@/data/mockData";
import PostCard from "@/components/PostCard";
import Header from "@/components/Header";

const News = () => {
  const [valueFilter, setValueFilter] = useState("all");
  const [schoolFilter, setSchoolFilter] = useState("all");

  const sorted = useMemo(() => {
    let posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
    if (valueFilter !== "all") posts = posts.filter((p) => p.valueTag === valueFilter);
    if (schoolFilter !== "all") posts = posts.filter((p) => p.schoolId === Number(schoolFilter));
    return posts;
  }, [valueFilter, schoolFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground lg:text-4xl">Жаңалықтар</h1>
          <p className="mt-2 text-muted-foreground">Мектептердің соңғы жаңалықтары мен жазбалары</p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          <select
            value={valueFilter}
            onChange={(e) => setValueFilter(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">Барлық құндылықтар</option>
            {VALUES.map((v) => (
              <option key={v.id} value={v.name}>{v.icon} {v.name}</option>
            ))}
          </select>
          <select
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">Барлық мектептер</option>
            {SCHOOLS.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Posts */}
        <div className="space-y-4 max-w-2xl">
          {sorted.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
          {sorted.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">Жазбалар табылмады</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
