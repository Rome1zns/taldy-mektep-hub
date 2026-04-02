import { VALUES } from "./mockData";

export interface School {
  id: number;
  name: string;
  director: string;
  students: number;
  teachers: number;
  rating: number;
  avatar: string;
  posts: number;
  followers: number;
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

export const SCHOOLS: School[] = [
  { id: 1, name: "№1 И. Жансүгіров атындағы мектеп-гимназия", director: "Қасымова Айгүл Серікқызы", students: 1250, teachers: 98, rating: 92, avatar: "ІЖ", posts: 24, followers: 1820, subscribers: 950, values: v() },
  { id: 2, name: "№3 Абай атындағы орта мектеп", director: "Нұрланов Бауыржан Қайратұлы", students: 980, teachers: 72, rating: 88, avatar: "АА", posts: 18, followers: 1450, subscribers: 780, values: v() },
  { id: 3, name: "№5 М. Әуезов атындағы мектеп-лицей", director: "Ахметова Дана Маратқызы", students: 1100, teachers: 85, rating: 91, avatar: "МӘ", posts: 22, followers: 1680, subscribers: 890, values: v() },
  { id: 4, name: "№7 Ш. Уәлиханов атындағы орта мектеп", director: "Тұрсынов Ерлан Жанатұлы", students: 870, teachers: 64, rating: 85, avatar: "ШУ", posts: 15, followers: 1200, subscribers: 640, values: v() },
  { id: 5, name: "№10 Ы. Алтынсарин атындағы мектеп-гимназия", director: "Сейдахметова Гүлнар Асқарқызы", students: 1340, teachers: 105, rating: 94, avatar: "ЫА", posts: 28, followers: 2100, subscribers: 1120, values: v() },
  { id: 6, name: "№12 С. Сейфуллин атындағы орта мектеп", director: "Жүнісов Арман Болатұлы", students: 760, teachers: 58, rating: 82, avatar: "СС", posts: 12, followers: 980, subscribers: 520, values: v() },
  { id: 7, name: "№15 Ж. Жабаев атындағы мектеп-лицей", director: "Оспанова Мәдина Нұрланқызы", students: 920, teachers: 70, rating: 87, avatar: "ЖЖ", posts: 19, followers: 1380, subscribers: 730, values: v() },
  { id: 8, name: "№18 А. Байтұрсынов атындағы орта мектеп", director: "Қалиев Нұрбол Сағынұлы", students: 1050, teachers: 80, rating: 89, avatar: "АБ", posts: 21, followers: 1560, subscribers: 840, values: v() },
  { id: 9, name: "№20 М. Жұмабаев атындағы мектеп-гимназия", director: "Бекенова Сара Тұрғынқызы", students: 1180, teachers: 92, rating: 90, avatar: "МЖ", posts: 20, followers: 1620, subscribers: 870, values: v() },
  { id: 10, name: "№22 Қ. Сатпаев атындағы орта мектеп", director: "Мұратов Дәулет Қанатұлы", students: 830, teachers: 62, rating: 84, avatar: "ҚС", posts: 14, followers: 1100, subscribers: 590, values: v() },
  { id: 11, name: "№25 Б. Момышұлы атындағы мектеп-лицей", director: "Әлімова Жансая Ерболқызы", students: 1020, teachers: 78, rating: 86, avatar: "БМ", posts: 17, followers: 1350, subscribers: 710, values: v() },
  { id: 12, name: "№28 Ғ. Мүсірепов атындағы орта мектеп", director: "Сұлтанов Қайрат Мұратұлы", students: 690, teachers: 52, rating: 81, avatar: "ҒМ", posts: 11, followers: 920, subscribers: 480, values: v() },
  { id: 13, name: "№2 Т. Аубакіров атындағы орта мектеп", director: "Есенова Ақмарал Бекболатқызы", students: 890, teachers: 67, rating: 83, avatar: "ТА", posts: 13, followers: 1050, subscribers: 560, values: v() },
  { id: 14, name: "№4 Ғ. Мұстафин атындағы мектеп-гимназия", director: "Ибрагимов Серік Тілеуұлы", students: 1150, teachers: 88, rating: 90, avatar: "ҒМ", posts: 23, followers: 1700, subscribers: 910, values: v() },
  { id: 15, name: "№6 К. Қамзин атындағы орта мектеп", director: "Нұрмұханова Гүлжан Қасымқызы", students: 780, teachers: 59, rating: 80, avatar: "КҚ", posts: 10, followers: 870, subscribers: 460, values: v() },
  { id: 16, name: "№8 Д. Қонаев атындағы мектеп-лицей", director: "Омаров Бақытжан Нұрұлы", students: 1300, teachers: 100, rating: 93, avatar: "ДҚ", posts: 26, followers: 1950, subscribers: 1050, values: v() },
  { id: 17, name: "№9 С. Торайғыров атындағы орта мектеп", director: "Сарыбаева Айнұр Маратқызы", students: 840, teachers: 63, rating: 82, avatar: "СТ", posts: 14, followers: 1080, subscribers: 570, values: v() },
  { id: 18, name: "№11 Қ. Аманжолов атындағы мектеп-гимназия", director: "Тоқтаров Мұрат Жандосұлы", students: 960, teachers: 73, rating: 87, avatar: "ҚА", posts: 16, followers: 1320, subscribers: 700, values: v() },
  { id: 19, name: "№13 Ә. Қастеев атындағы орта мектеп", director: "Бейсенова Лаура Ғалымқызы", students: 720, teachers: 55, rating: 79, avatar: "ӘҚ", posts: 9, followers: 820, subscribers: 430, values: v() },
  { id: 20, name: "№14 М. Тынышбаев атындағы мектеп-лицей", director: "Жақсыбаев Ерболат Асқарұлы", students: 1080, teachers: 82, rating: 88, avatar: "МТ", posts: 19, followers: 1500, subscribers: 800, values: v() },
  { id: 21, name: "№16 Б. Бейсекбаев атындағы орта мектеп", director: "Құсайынова Мейрамгүл Оралқызы", students: 670, teachers: 50, rating: 78, avatar: "ББ", posts: 8, followers: 750, subscribers: 400, values: v() },
  { id: 22, name: "№17 Ж. Ташенев атындағы мектеп-гимназия", director: "Ақылбеков Дастан Сейілұлы", students: 1200, teachers: 93, rating: 91, avatar: "ЖТ", posts: 22, followers: 1750, subscribers: 930, values: v() },
  { id: 23, name: "№19 А. Марғұлан атындағы орта мектеп", director: "Серікова Қарлығаш Бақытқызы", students: 810, teachers: 61, rating: 83, avatar: "АМ", posts: 13, followers: 1020, subscribers: 540, values: v() },
  { id: 24, name: "№21 Н. Назарбаев атындағы мектеп-лицей", director: "Балтабаев Нұржан Ерікұлы", students: 1400, teachers: 110, rating: 95, avatar: "НН", posts: 30, followers: 2300, subscribers: 1200, values: v() },
  { id: 25, name: "№23 С. Мұқанов атындағы орта мектеп", director: "Тілеуова Сәуле Жанатқызы", students: 750, teachers: 57, rating: 81, avatar: "СМ", posts: 11, followers: 900, subscribers: 470, values: v() },
  { id: 26, name: "№24 Ғ. Орманов атындағы мектеп-гимназия", director: "Кенжебаев Алмас Тұрсынұлы", students: 990, teachers: 75, rating: 86, avatar: "ҒО", posts: 16, followers: 1280, subscribers: 680, values: v() },
  { id: 27, name: "№26 Т. Жүргенов атындағы орта мектеп", director: "Әбдірахманова Нұргүл Сағатқызы", students: 680, teachers: 51, rating: 79, avatar: "ТЖ", posts: 9, followers: 800, subscribers: 420, values: v() },
  { id: 28, name: "№27 К. Байсейітова атындағы мектеп-лицей", director: "Досымов Бақыт Ержанұлы", students: 1060, teachers: 81, rating: 88, avatar: "КБ", posts: 18, followers: 1480, subscribers: 790, values: v() },
  { id: 29, name: "№29 О. Бөкей атындағы орта мектеп", director: "Шайкенова Динара Маратқызы", students: 730, teachers: 56, rating: 80, avatar: "ОБ", posts: 10, followers: 850, subscribers: 450, values: v() },
  { id: 30, name: "№30 Ы. Дукенұлы атындағы мектеп-гимназия", director: "Мұстафин Ержан Болатұлы", students: 1130, teachers: 87, rating: 89, avatar: "ЫД", posts: 20, followers: 1600, subscribers: 860, values: v() },
];
