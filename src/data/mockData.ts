export interface ValueScore {
  id: number;
  name: string;
  icon: string;
  score: number;
}

export const VALUES = [
  { id: 1, name: "Қауіпсіздік", icon: "🛡️", description: "Оқушылар мен мұғалімдердің қауіпсіздігі" },
  { id: 2, name: "Инклюзия", icon: "🤝", description: "Барлық балаларға тең мүмкіндік" },
  { id: 3, name: "Тәрбие", icon: "🌱", description: "Адамгершілікті тұлға тәрбиелеу" },
  { id: 4, name: "Білім", icon: "📚", description: "Заманауи білім беру сапасы" },
  { id: 5, name: "Достық", icon: "💛", description: "Мектеп ішіндегі ынтымақтастық" },
  { id: 6, name: "Инновация", icon: "🚀", description: "Жаңа технологиялар енгізу" },
  { id: 7, name: "Патриотизм", icon: "🇰🇿", description: "Отансүйгіштік тәрбие" },
  { id: 8, name: "Денсаулық", icon: "💪", description: "Салауатты өмір салты" },
  { id: 9, name: "Мәдениет", icon: "🎭", description: "Мәдени құндылықтарды дамыту" },
  { id: 10, name: "Көшбасшылық", icon: "👑", description: "Болашақ лидерлерді дайындау" },
];

export const STATS = [
  { label: "Мектеп", value: 27, suffix: "" },
  { label: "Оқушы", value: 28500, suffix: "+" },
  { label: "Мұғалім", value: 2100, suffix: "+" },
  { label: "Құндылық", value: 10, suffix: "" },
];

