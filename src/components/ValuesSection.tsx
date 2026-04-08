import { motion } from "framer-motion";
import { getAverageValues } from "@/data/schools";

const ValuesSection = () => {
  const values = getAverageValues();

  return (
    <section className="relative py-20 lg:py-28 ornament-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center lg:mb-16"
        >
          <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
            10 құндылық
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold text-foreground lg:text-4xl">
            Мектеп құндылықтары
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Әрбір мектеп 10 негізгі құндылық бойынша бағаланады. Орташа көрсеткіш:
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((value, i) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group rounded-xl border border-border bg-card/80 p-5 shadow-card transition-all hover:border-primary/40 hover:shadow-glow"
            >
              <div className="mb-3 text-2xl">{value.icon}</div>
              <h3 className="font-heading text-sm font-semibold text-foreground">
                {value.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {value.description}
              </p>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Орташа балл</span>
                  <span className="font-heading text-sm font-bold text-primary">
                    {value.score}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
