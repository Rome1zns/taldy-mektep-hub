import { VALUES } from "./mockData";

export interface School {
  id: number;
  name: string;
  director: string;
  students: number;
  teachers: number;
  avatar: string;
  subscribers: number;
  values: { id: number; name: string; icon: string; score: number }[];
}

const v = () =>
  VALUES.map((val) => ({
    id: val.id,
    name: val.name,
    icon: val.icon,
    score: Math.floor(Math.random() * 30) + 65,
  }));

// Записи отсортированы по номеру школы (№1 → №30) для отображения в каталоге.
// Поле `id` остаётся стабильным идентификатором для URL и связей с posts.
export const SCHOOLS: School[] = [
  { id: 1, name: "№1 Абай атындағы орта мектеп-гимназиясы", director: "Алдабергенова Шынар Дауловна", students: 1250, teachers: 98, avatar: "А", subscribers: 950, values: v() },
  { id: 13, name: "№2 орта мектеп", director: "Кенжегулова Акмарал Алтынбекова", students: 1673, teachers: 129, avatar: "№2", subscribers: 560, values: v() },
  { id: 14, name: "№4 орта мектеп", director: "Байкенженова Алтыншаш Арыспаевна", students: 2025, teachers: 148, avatar: "№4", subscribers: 910, values: v() },
  { id: 3, name: "№5 М.Ломоносов атындағы орта мектеп-лицейі", director: "Маденова Алия Арыстановна", students: 2426, teachers: 162, avatar: "МЛ", subscribers: 890, values: v() },
  { id: 15, name: "№6 А.С.Макаренко атындағы орта мектебі", director: "Айдабаева Динара Аюхановна", students: 784, teachers: 70, avatar: "АМ", subscribers: 460, values: v() },
  { id: 4, name: "№7 К.Ушинский атындағы орта мектеп", director: "Розакава Инкар Мадияровна", students: 987, teachers: 101, avatar: "КУ", subscribers: 640, values: v() },
  { id: 16, name: "№8 Н.Островский атындағы орта мектеп", director: "Долаев Самгат Садырбаевич", students: 1142, teachers: 94, avatar: "НО", subscribers: 1050, values: v() },
  { id: 17, name: "№9 Сайын Мұратбеков атындағы орта мектеп", director: "Саркытов Кайрат Толепбергенович", students: 1682, teachers: 131, avatar: "СМ", subscribers: 570, values: v() },
  { id: 5, name: "№10 Ш.Уәлиханов атындағы орта мектеп-гимназиясы", director: "Жумадилова Айжан Метедовна", students: 1608, teachers: 132, avatar: "ШУ", subscribers: 1120, values: v() },
  { id: 18, name: "№11 Еркін ауылындағы Е.Берліқожаұлы атындағы орта мектебі", director: "Мамбеталиева Айгерим Рашитовна", students: 960, teachers: 73, avatar: "ЕБ", subscribers: 700, values: v() },
  { id: 6, name: "№12 орта мектеп-гимназия", director: "Керейбаева Раушан Нургалиевна", students: 760, teachers: 58, avatar: "№12", subscribers: 520, values: v() },
  { id: 19, name: "№13 орта мектеп (арнаулы сыныптарымен)", director: "Сулейменова Салтанат Жанылисовна", students: 472, teachers: 101, avatar: "№13", subscribers: 430, values: v() },
  { id: 20, name: "№14 орта мектеп-гимназия", director: "Естибаева Жазира Камизановна", students: 1080, teachers: 82, avatar: "№14", subscribers: 800, values: v() },
  { id: 7, name: "№15 орта мектебі", director: "Искаков Нугман Слямович", students: 1777, teachers: 129, avatar: "№15", subscribers: 730, values: v() },
  { id: 21, name: "№16 орта мектеп-гимназиясы", director: "Андриянова Татьяна Николаевна", students: 846, teachers: 81, avatar: "№16", subscribers: 400, values: v() },
  { id: 22, name: "№17 орта мектеп", director: "Акшолакова Рахила Молдагалиевна", students: 1200, teachers: 93, avatar: "№17", subscribers: 930, values: v() },
  { id: 8, name: "№18 Бақтыбай Жолбарысұлы атындағы орта мектеп-лицейі", director: "Жанаберлиева Салтанат Бейсенбаевна", students: 1328, teachers: 104, avatar: "БЖ", subscribers: 840, values: v() },
  { id: 23, name: "№19 М.Жұмабаев атындағы орта мектеп-гимназиясы", director: "Замзина Қарлығаш Келисовна", students: 1225, teachers: 101, avatar: "МЖ", subscribers: 540, values: v() },
  { id: 24, name: "№21 Өтенай ауылындағы МДШО бар орта мектеп", director: "Баймырзаев Ердос Гайниевич", students: 1287, teachers: 125, avatar: "№21", subscribers: 1200, values: v() },
  { id: 10, name: "№22 Еңбек ауылындағы МДШО бар орта мектеп", director: "Мусанов Ернар Жауынбаевич", students: 546, teachers: 55, avatar: "№22", subscribers: 590, values: v() },
  { id: 25, name: "№23 Мойнақ ауылындағы МДШО бар орта мектеп", director: "Утепбергенов Даурен Ахметович", students: 149, teachers: 38, avatar: "№23", subscribers: 470, values: v() },
  { id: 11, name: "№25 Барлыбек Сырттанұлы атындағы орта мектебі", director: "Ибрагимова Рахат Ныгметбековна", students: 1541, teachers: 126, avatar: "БС", subscribers: 710, values: v() },
  { id: 27, name: "№26 Еркін ауылдық округіндегі МДШО бар орта мектеп", director: "Кусаинова Динара Еркиновна", students: 752, teachers: 68, avatar: "№26", subscribers: 420, values: v() },
  { id: 28, name: "№27 орта мектеп-гимназия", director: "Омарова Гульнара Омаркызы", students: 1728, teachers: 149, avatar: "№27", subscribers: 790, values: v() },
  { id: 12, name: "№28 Қ.Қасымов атындағы ІТ мектеп-лицейі", director: "Абдрахманова Каракоз Избасаровна", students: 2442, teachers: 159, avatar: "КҚ", subscribers: 480, values: v() },
  { id: 29, name: "№29 орта мектеп-лицейі", director: "Иманбекова Ляйля Мукатаева", students: 730, teachers: 56, avatar: "№29", subscribers: 450, values: v() },
  { id: 30, name: "№30 Ынтымақ ауылындағы орта мектеп", director: "Усенова Сауле Рымбаевна", students: 1130, teachers: 87, avatar: "№30", subscribers: 860, values: v() },
];

// Average values across all schools
export const getAverageValues = () => {
  return VALUES.map((val) => {
    const avg = Math.round(
      SCHOOLS.reduce((sum, s) => sum + (s.values.find((sv) => sv.id === val.id)?.score || 0), 0) / SCHOOLS.length
    );
    return { ...val, score: avg };
  });
};
