export interface School {
  id: number;
  name: string;
  director: string;
  students: number;
  teachers: number;
  rating: number;
  avatar: string;
  values: ValueScore[];
}

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

const generateValues = (): ValueScore[] =>
  VALUES.map((v) => ({
    id: v.id,
    name: v.name,
    icon: v.icon,
    score: Math.floor(Math.random() * 35) + 65,
  }));

export const SCHOOLS: School[] = [
  { id: 1, name: "№1 И. Жансүгіров атындағы мектеп-гимназия", director: "Қасымова Айгүл Серікқызы", students: 1250, teachers: 98, rating: 92, avatar: "ІЖ", values: generateValues() },
  { id: 2, name: "№3 Абай атындағы орта мектеп", director: "Нұрланов Бауыржан Қайратұлы", students: 980, teachers: 72, rating: 88, avatar: "АА", values: generateValues() },
  { id: 3, name: "№5 М. Әуезов атындағы мектеп-лицей", director: "Ахметова Дана Маратқызы", students: 1100, teachers: 85, rating: 91, avatar: "МӘ", values: generateValues() },
  { id: 4, name: "№7 Ш. Уәлиханов атындағы орта мектеп", director: "Тұрсынов Ерлан Жанатұлы", students: 870, teachers: 64, rating: 85, avatar: "ШУ", values: generateValues() },
  { id: 5, name: "№10 Ы. Алтынсарин атындағы мектеп-гимназия", director: "Сейдахметова Гүлнар Асқарқызы", students: 1340, teachers: 105, rating: 94, avatar: "ЫА", values: generateValues() },
  { id: 6, name: "№12 С. Сейфуллин атындағы орта мектеп", director: "Жүнісов Арман Болатұлы", students: 760, teachers: 58, rating: 82, avatar: "СС", values: generateValues() },
  { id: 7, name: "№15 Ж. Жабаев атындағы мектеп-лицей", director: "Оспанова Мәдина Нұрланқызы", students: 920, teachers: 70, rating: 87, avatar: "ЖЖ", values: generateValues() },
  { id: 8, name: "№18 А. Байтұрсынов атындағы орта мектеп", director: "Қалиев Нұрбол Сағынұлы", students: 1050, teachers: 80, rating: 89, avatar: "АБ", values: generateValues() },
  { id: 9, name: "№20 М. Жұмабаев атындағы мектеп-гимназия", director: "Бекенова Сара Тұрғынқызы", students: 1180, teachers: 92, rating: 90, avatar: "МЖ", values: generateValues() },
  { id: 10, name: "№22 Қ. Сатпаев атындағы орта мектеп", director: "Мұратов Дәулет Қанатұлы", students: 830, teachers: 62, rating: 84, avatar: "ҚС", values: generateValues() },
  { id: 11, name: "№25 Б. Момышұлы атындағы мектеп-лицей", director: "Әлімова Жансая Ерболқызы", students: 1020, teachers: 78, rating: 86, avatar: "БМ", values: generateValues() },
  { id: 12, name: "№28 Ғ. Мүсірепов атындағы орта мектеп", director: "Сұлтанов Қайрат Мұратұлы", students: 690, teachers: 52, rating: 81, avatar: "ҒМ", values: generateValues() },
];

export const STATS = [
  { label: "Мектеп", value: 30, suffix: "" },
  { label: "Оқушы", value: 28500, suffix: "+" },
  { label: "Мұғалім", value: 2100, suffix: "+" },
  { label: "Құндылық", value: 10, suffix: "" },
];

// Average values across all schools
export const getAverageValues = () => {
  return VALUES.map((v) => {
    const avg = Math.round(
      SCHOOLS.reduce((sum, s) => sum + (s.values.find((sv) => sv.id === v.id)?.score || 0), 0) / SCHOOLS.length
    );
    return { ...v, score: avg };
  });
};
