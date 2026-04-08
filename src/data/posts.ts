import { VALUES } from "./mockData";

export interface Post {
  id: number;
  schoolId: number;
  title: string;
  content: string;
  date: string;
  valueTag: string;
  valueIcon: string;
  likes: number;
  comments: number;
  shares: number;
  saved: number;
  image?: string;
}

export const POSTS: Post[] = [
  { id: 1, schoolId: 1, title: "STEM зертханасы ашылды!", content: "Мектебімізде жаңа STEM зертханасы іске қосылды. Оқушылар робототехника, 3D басып шығару және бағдарламалау бойынша сабақтарға қатыса алады.", date: "2026-03-28", valueTag: "Инновация", valueIcon: "🚀", likes: 145, comments: 32, shares: 18, saved: 24 },
  { id: 2, schoolId: 5, title: "Инклюзивті білім беру форумы", content: "Біздің мектеп инклюзивті білім беру бойынша облыстық форумға қатысып, тәжірибесімен бөлісті. Ерекше қажеттіліктері бар балаларға арналған жаңа бағдарламалар таныстырылды.", date: "2026-03-27", valueTag: "Инклюзия", valueIcon: "🤝", likes: 198, comments: 45, shares: 37, saved: 52 },
  { id: 3, schoolId: 3, title: "Волейболдан облыс чемпионы!", content: "Мектебіміздің қыздар волейбол командасы облыстық чемпионатта бірінші орын алды! Спортшыларымызды құттықтаймыз!", date: "2026-03-26", valueTag: "Денсаулық", valueIcon: "💪", likes: 312, comments: 67, shares: 54, saved: 41 },
  { id: 4, schoolId: 8, title: "Наурыз мерекесі тойланды", content: "Мектебімізде Наурыз мейрамы кең ауқымда тойланды. Ұлттық ойындар, көрме, концерт — бәрі болды!", date: "2026-03-22", valueTag: "Мәдениет", valueIcon: "🎭", likes: 267, comments: 53, shares: 42, saved: 38 },
  { id: 6, schoolId: 16, title: "Математикалық олимпиада жеңімпаздары", content: "Республикалық математика олимпиадасында 3 оқушымыз жүлделі орын алды. Жеңімпаздарды мектеп басшылығы марапаттады.", date: "2026-03-18", valueTag: "Білім", valueIcon: "📚", likes: 234, comments: 41, shares: 29, saved: 33 },
  { id: 7, schoolId: 24, title: "«Болашақ көшбасшылар» клубы", content: "Мектебімізде «Болашақ көшбасшылар» клубы құрылды. Оқушылар лидерлік қасиеттерін дамытатын тренингтерге қатысады.", date: "2026-03-15", valueTag: "Көшбасшылық", valueIcon: "👑", likes: 156, comments: 34, shares: 21, saved: 27 },
  { id: 8, schoolId: 7, title: "Отанды сүю — борышымыз", content: "1 наурыз — Алғыс айту күніне орай патриоттық іс-шара өтті. Оқушылар ардагерлермен кездесіп, отансүйгіштік рухта тәрбиеленді.", date: "2026-03-12", valueTag: "Патриотизм", valueIcon: "🇰🇿", likes: 178, comments: 29, shares: 25, saved: 20 },
  { id: 10, schoolId: 4, title: "Қауіпсіздік апталығы", content: "Мектебімізде қауіпсіздік апталығы аясында өрт сөндіру, жол қауіпсіздігі және алғашқы көмек бойынша тренингтер өтті.", date: "2026-03-08", valueTag: "Қауіпсіздік", valueIcon: "🛡️", likes: 134, comments: 22, shares: 15, saved: 18 },
  { id: 11, schoolId: 14, title: "Smart мектеп жобасы іске қосылды", content: "Мектебімізде Smart мектеп жобасы іске қосылды. Барлық сыныптар интерактивті тақталармен жабдықталды.", date: "2026-03-05", valueTag: "Инновация", valueIcon: "🚀", likes: 278, comments: 56, shares: 43, saved: 48 },
  { id: 12, schoolId: 22, title: "Ұлттық спорт күні", content: "Тоғызқұмалақ, асық ату, арқан тарту — ұлттық спорт түрлері бойынша жарыстар өтті. 200-ден астам оқушы қатысты.", date: "2026-03-03", valueTag: "Мәдениет", valueIcon: "🎭", likes: 167, comments: 31, shares: 20, saved: 22 },
  { id: 13, schoolId: 11, title: "Кітап оқу марафоны", content: "«Оқы да ойлан» кітап оқу марафоны басталды. Бір ай бойы оқушылар кітап оқып, пікірлерін бөліседі.", date: "2026-03-01", valueTag: "Білім", valueIcon: "📚", likes: 143, comments: 26, shares: 17, saved: 31 },
  { id: 14, schoolId: 20, title: "Дене шынықтыру залы жаңартылды", content: "Мектептің дене шынықтыру залы толығымен жаңартылды. Жаңа жабдықтар, жаттығу залы және душ бөлмелері орнатылды.", date: "2026-02-28", valueTag: "Денсаулық", valueIcon: "💪", likes: 215, comments: 43, shares: 35, saved: 29 },
  { id: 15, schoolId: 6, title: "Менторлық бағдарлама", content: "Жоғарғы сынып оқушылары кіші сынып оқушыларына менторлық көмек көрсететін бағдарлама басталды.", date: "2026-02-25", valueTag: "Достық", valueIcon: "💛", likes: 128, comments: 19, shares: 14, saved: 16 },
];
