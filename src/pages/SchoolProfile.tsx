import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, GraduationCap, UserCheck } from "lucide-react";
import { useState } from "react";
import { SCHOOLS } from "@/data/schools";
import { POSTS } from "@/data/posts";
import { VALUES } from "@/data/mockData";
import PostCard from "@/components/PostCard";
import PublicationsTab from "@/components/PublicationsTab";
import Header from "@/components/Header";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

const TABS = ["Жазбалар", "Жарияланымдар", "Құндылықтар", "Жетістіктер"] as const;

const BADGES = [
  { label: "STEM көшбасшы", icon: "🔬", desc: "STEM бағытында жетекші мектеп" },
  { label: "Инклюзивті мектеп", icon: "🤝", desc: "Инклюзивті білім беру стандарттарына сай" },
  { label: "Жасыл мектеп", icon: "🌿", desc: "Экологиялық жоба жеңімпазы" },
  { label: "Спорт мектебі", icon: "🏆", desc: "Спорттық жетістіктерде үздік" },
];

const SchoolProfile = () => {
  const { id } = useParams();
  const school = SCHOOLS.find((s) => s.id === Number(id));
  const [tab, setTab] = useState<(typeof TABS)[number]>("Жазбалар");
  const [subscribed, setSubscribed] = useState(false);

  if (!school) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Мектеп табылмады</p>
      </div>
    );
  }

  const schoolPosts = POSTS.filter((p) => p.schoolId === school.id);
  const radarData = school.values.map((v) => ({ name: v.name, value: v.score, fullMark: 100 }));
  const totalScore = school.values.reduce((sum, v) => sum + v.score, 0);
  // Школьный номер берём из названия по префиксу "№N" — стабильнее, чем `id`,
  // потому что id используется только для URL и может быть перетасован.
  const schoolNumber = (() => {
    const m = school.name.match(/№\s*(\d+)/);
    return m ? parseInt(m[1], 10) : null;
  })();

  return (
    <div className="relative z-10 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-28">
        <Link to="/schools" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Мектептер каталогы
        </Link>

        {/* Profile header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6 shadow-card mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/20 font-heading text-2xl font-bold text-primary shrink-0">
              {school.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-heading text-xl font-bold text-foreground lg:text-2xl">{school.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{school.director}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                {[
                  { icon: Users, label: "Оқушы", val: school.students },
                  { icon: GraduationCap, label: "Мұғалімдер", val: school.teachers },
                  { icon: UserCheck, label: "Жазылушы", val: school.subscribers + (subscribed ? 1 : 0) },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-1.5 text-sm">
                    <s.icon size={14} className="text-primary" />
                    <span className="font-heading font-bold text-foreground">{s.val}</span>
                    <span className="text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setSubscribed(!subscribed)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all shrink-0 ${
                subscribed
                  ? "border border-border bg-secondary text-secondary-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {subscribed ? "Жазылдыңыз ✓" : "Жазылу"}
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "Жазбалар" && (
          <div className="space-y-4 max-w-2xl">
            {schoolPosts.length > 0 ? (
              schoolPosts.map((p) => <PostCard key={p.id} post={p} />)
            ) : (
              <p className="py-12 text-center text-muted-foreground">Әзірге жазбалар жоқ</p>
            )}
          </div>
        )}

        {tab === "Жарияланымдар" && (
          schoolNumber !== null ? (
            <PublicationsTab schoolNumber={schoolNumber} />
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              Мектеп нөмірін анықтау мүмкін болмады
            </p>
          )
        )}

        {tab === "Құндылықтар" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="font-heading text-base font-semibold text-foreground mb-1">Құндылық диаграммасы</h3>
              <p className="text-xs text-muted-foreground mb-4">Жалпы балл: <span className="font-bold text-primary">{totalScore}/1000</span></p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(135,100%,22%)" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: "hsl(127,90%,45%)", fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Балл" dataKey="value" stroke="hsl(135,100%,50%)" fill="hsl(135,100%,50%)" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {school.values.map((val) => (
                <div key={val.id} className="rounded-lg border border-border bg-card/60 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{val.icon} {val.name}</span>
                    <span className="font-heading text-sm font-bold text-primary">{val.score}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${val.score}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Жетістіктер" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BADGES.map((b) => (
              <div key={b.label} className="rounded-xl border border-border bg-card p-5 text-center shadow-card">
                <div className="text-3xl mb-2">{b.icon}</div>
                <h4 className="font-heading text-sm font-semibold text-foreground">{b.label}</h4>
                <p className="mt-1 text-xs text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolProfile;
