const { useState, useEffect, useMemo, useRef } = React;
const { Star, X, Search, Film, Tv, Calendar, Building2, Layers, ChevronDown, Check, StickyNote } = window.Icons;

/* ---------------------------------------------------------------
   SEED DATA — researched from the links provided by the user
   ---------------------------------------------------------------- */
const SEED_ANIME = [
  {
    id: "atele-koldovskih-kolpakov",
    title: "Ателье колдовских колпаков",
    original: "Tongari Boushi no Atelier",
    image: "https://animego.online/uploads/mini/240x360/dc/blagouhajuschij-cvetok-rascvetaet-s-dostoinstvom-poster.webp",
    imageFallback: "https://static.wikia.nocookie.net/atele-koldovskih-kolpakov/images/placeholder.png",
    year: 2026,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "Bug Films",
    genres: ["Фэнтези", "Приключения", "Драма"],
    description:
      "Коко мечтает стать волшебницей, хотя магией по легенде можно только родиться. Случайно увидев колдовство странствующего мага Кифри, она узнаёт, что заклинания создаются особыми чернилами — и её жизнь меняется навсегда.",
  },
  {
    id: "mech-i-zhezl-vistorii-2",
    title: "Меч и жезл Вистории 2 сезон",
    original: "Tsue to Tsurugi no Wistoria Season 2",
    image: "",
    year: 2026,
    type: "Сериал",
    episodes: 12,
    seasons: 2,
    studio: "Actas, Bandai Namco Pictures",
    genres: ["Приключения", "Экшен", "Фэнтези", "Школа"],
    description:
      "Уилл Серфорт — студент магической академии без единой капли врождённого дара, зато с несгибаемой волей и мечом в руках. Во втором сезоне ему предстоит доказать, что путь к вершине можно пройти и без магии.",
  },
  {
    id: "pesn-nochnyh-sov",
    title: "Песнь ночных сов",
    original: "Yofukashi no Uta",
    image: "",
    year: 2022,
    type: "Сериал",
    episodes: 13,
    seasons: 2,
    studio: "LIDENFILMS",
    genres: ["Романтика", "Сверхъестественное", "Драма", "Комедия"],
    description:
      "Школьник Ко Ямори, уставший от дневной рутины, находит покой в ночных прогулках — и встречает загадочную вампиршу Надзуну. Чтобы обратиться в вампира, ему нужна не просто кровь, а настоящая любовь.",
  },
  {
    id: "chetire-ritsarya",
    title: "Четыре рыцаря",
    original: "4 Cut Hero / Si Ge Yongzhe",
    image: "https://static.yani.tv/posters/full/1636668614.jpg",
    year: 2023,
    type: "ONA",
    episodes: 10,
    seasons: 1,
    studio: "PHANTOM",
    genres: ["Комедия", "Пародия", "Приключения", "Романтика", "Фэнтези", "Экшен"],
    description:
      "Герой побеждает Короля Демонов и спасает принцессу — но с удивлением узнаёт, что «принцесса» на самом деле юноша. Дальше сюжет отказывается следовать привычным тропам фэнтези-романтики.",
  },
  {
    id: "prigovorennyj-byt-geroem",
    title: "Приговорённый быть героем",
    original: "Yuusha-kei ni Shosu",
    image: "https://yummyanime.tv/uploads/posts/2024-11/prigovorennyj-byt-geroem-tjuremnye-zapisi-devjat-tysjach-chetvertogo-shtrafnogo-otrjada-geroev-poster.webp",
    year: 2026,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "Studio KAI",
    genres: ["Приключения", "Экшен", "Фэнтези", "Военное", "Гарем", "Выживание", "Исекай"],
    description:
      "Звание героя здесь — проклятие: осуждённые на вечную войну с демонами гибнут и воскресают снова и снова. Среди них — убийца богини, чья вина затмевает даже чужие грехи. Но встреча с другой богиней меняет всё.",
  },
  {
    id: "fangkai-nage-nuwu",
    title: "Освободите эту ведьму",
    original: "Fangkai Nage Nuwu / Release that Witch",
    image: "https://static.yani.tv/posters/full/1636885510.jpg",
    year: 2026,
    type: "ONA",
    episodes: 8,
    seasons: 1,
    studio: "Thundray",
    genres: ["Романтика", "Фэнтези", "Экшен", "Исэкай"],
    description:
      "Чэн Янь перерождается принцем Роландом и, спасая ведьму от казни, узнаёт о существовании магии. Он решает превратить магию в аналог современных технологий и строит собственную промышленную империю ведьм.",
  },
  {
    id: "angel-po-sosedstvu-2",
    title: "Ангел по соседству 2",
    original: "Otonari no Tenshi-sama 2nd Season",
    image: "https://static.yani.tv/posters/full/1636936497.jpg",
    year: 2026,
    type: "Сериал",
    episodes: 12,
    seasons: 2,
    studio: "Project No.9",
    genres: ["Сёнэн", "Романтика", "Повседневность", "Школьная жизнь"],
    description:
      "Дистанция между Аманэ и «школьным ангелом» Махиру стремительно сокращается. Теперь им предстоит пережить летние фестивали, поездки и знакомство с родителями — и не бояться слухов в школе.",
  },
  {
    id: "gaikotsu-kishi",
    title: "Рыцарь-скелет вступает в параллельный мир",
    original: "Gaikotsu Kishi-sama, Tadaima Isekai e Odekakechuu",
    image: "",
    year: 2022,
    type: "Сериал",
    episodes: 12,
    seasons: 2,
    studio: "Studio Kai / Aura Studio",
    genres: ["Приключения", "Фэнтези", "Экшен", "Исэкай"],
    description:
      "Заснув во время любимой онлайн-игры, геймер просыпается в теле своего аватара — рыцаря-скелета Арка в тяжёлых доспехах. Начинается путешествие, полное опасностей и негромкого геройства.",
  },
  {
    id: "re-monster",
    title: "Перерождение: Монстр",
    original: "Re:Monster",
    image: "",
    year: 2024,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "Studio Deen",
    genres: ["Приключения", "Фэнтези", "Экшен", "Гарем", "Исэкай", "Реинкарнация"],
    description:
      "Погибнув насильственной смертью, Томокуи Каната перерождается гоблином — представителем самой слабой расы. Но память и разум прошлой жизни остаются при нём, а способность становиться сильнее, поедая врагов, открывает неожиданный путь наверх.",
  },
  {
    id: "mushoku-tensei",
    title: "Реинкарнация безработного",
    original: "Mushoku Tensei: Isekai Ittara Honki Dasu",
    image: "",
    year: 2021,
    type: "Сериал",
    episodes: 48,
    seasons: 3,
    studio: "Studio Bind",
    genres: ["Фэнтези", "Драма", "Приключения", "Исэкай", "Романтика"],
    description:
      "34-летний затворник погибает и перерождается младенцем в фэнтезийном мире, сохранив все воспоминания. Он клянётся прожить эту жизнь без сожалений — история о взрослении, искуплении и второй попытке.",
  },
  {
    id: "subete-wo-parry",
    title: "Я парировал всё время, чтобы стать сильнейшим авантюристом",
    original: "Ore wa Subete wo \"Parry\" suru",
    image: "",
    year: 2024,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "OLM",
    genres: ["Комедия", "Приключения", "Фэнтези", "Экшен"],
    description:
      "Мальчик без единого таланта 14 лет оттачивал в горах только одну технику — парирование. Он даже не подозревает, что довёл её до нечеловеческого, абсурдного уровня мастерства.",
  },
  {
    id: "shinmai-ossan-boukensha",
    title: "Невероятный новичок средних лет",
    original: "Shinmai Ossan Boukensha, Saikyou Party ni Shinu hodo Kitaerarete Muteki ni Naru",
    image: "",
    year: 2024,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "Yumeta Company",
    genres: ["Приключения", "Комедия", "Экшен", "Фэнтези"],
    description:
      "Рик Гладиатор становится авантюристом в тридцать с лишним лет — возраст, в котором принято уже быть ветераном, а не новичком. Но пара высокоранговых наставников решает выковать из него нечто исключительное.",
  },
  {
    id: "vermeil-in-gold",
    title: "Вермейл в золотом",
    original: "Kinsou no Vermeil",
    image: "",
    year: 2022,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "Staple Entertainment",
    genres: ["Комедия", "Фэнтези", "Школа", "Магия", "Выживание", "Этти"],
    description:
      "Отстающий студент магической академии Альто по случайности призывает не безобидного фамильяра, а Вермейл — легендарную демоницу-катастрофу из древних сказаний, которая соглашается стать его спутницей.",
  },
  {
    id: "deadman-wonderland",
    title: "Страна чудес смертников",
    original: "Deadman Wonderland",
    image: "",
    year: 2011,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "Manglobe",
    genres: ["Сёнэн", "Экшен", "Фантастика", "Сверхъестественное", "Триллер", "Ужасы"],
    description:
      "После резни в классе, устроенной таинственным Красным Человеком, школьник Ганта Игараси оказывается единственным подозреваемым и приговорён к «Стране чудес смертников» — частной тюрьме в виде парка развлечений.",
  },
  {
    id: "iseleve",
    title: "Я получил читерские способности в другом мире",
    original: "Isekai de Cheat Skill wo Te ni Shita Ore wa (Iseleve)",
    image: "",
    year: 2023,
    type: "Спешл",
    episodes: 1,
    seasons: 1,
    studio: "millepensee",
    genres: ["Приключения", "Фэнтези", "Экшен", "Школьная жизнь", "Исэкай"],
    description:
      "История о том, как читерские способности, полученные в другом мире, неожиданно меняют жизнь героя и в реальном мире тоже — специальный выпуск-мост между сюжетными арками.",
  },
  {
    id: "diskvalificirovan-po-zhizni",
    title: "Дисквалифицирован по жизни",
    original: "Isekai Shikkaku",
    image: "https://animego.online/uploads/mini/240x360/66/diskvalificirovan-po-zhizni-poster.webp",
    year: 2024,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "Atelier Pontdarc",
    genres: ["Приключения", "Комедия", "Фэнтези", "Магия", "Исекай"],
    description:
      "Меланхолик Осаму Дазай, мечтающий о суициде, попадает в другой мир — и с ужасом обнаруживает, что выходит невредимым из любой смертельной передряги. Деконструкция всех привычных канонов исекай-жанра.",
  },
  {
    id: "dandadan",
    title: "Дандадан",
    original: "Dandadan",
    image: "https://animego.online/uploads/mini/240x360/a7/dandadan-poster.webp",
    year: 2024,
    type: "Сериал",
    episodes: 12,
    seasons: 2,
    studio: "Science SARU",
    genres: ["Приключения", "Комедия", "Фэнтези", "Экшен", "Фантастика", "Школа", "Сверхъестественное", "Выживание"],
    description:
      "Момо верит в призраков и категорически отрицает существование НЛО. Её одноклассник — наоборот. Спор о том, кто прав, оборачивается встречей и с настоящими духами, и с настоящими пришельцами одновременно.",
  },
  {
    id: "blagouhajuschij-cvetok",
    title: "Благоухающий цветок расцветает с достоинством",
    original: "Kaoru Hana wa Rin to Saku",
    image: "https://animego.online/uploads/mini/240x360/dc/blagouhajuschij-cvetok-rascvetaet-s-dostoinstvom-poster.webp",
    year: 2025,
    type: "Сериал",
    episodes: 13,
    seasons: 1,
    studio: "CloverWorks",
    genres: ["Драма", "Романтика", "Школа", "Повседневность"],
    description:
      "Две школы на одной улице — и невидимая социальная стена между ними. Добродушный Ринтаро и сдержанная отличница Каоруко случайно встречаются и постепенно стирают границы, которые разделяют их миры.",
  },
  {
    id: "kaidzju-8-2",
    title: "Кайдзю №8 2 сезон",
    original: "Kaijuu 8-gou 2nd Season",
    image: "https://animego.online/uploads/mini/240x360/2b/kajdzju-8-2-sezon-poster.webp",
    year: 2025,
    type: "Сериал",
    episodes: 11,
    seasons: 2,
    studio: "Production I.G",
    genres: ["Приключения", "Фэнтези", "Экшен", "Фантастика", "Военное", "Ужасы"],
    description:
      "32-летний Кафка чистит город после атак кайдзю, так и не пройдя ни разу в силы обороны. Пока однажды странное существо не проникает в его тело — и не даёт ему способность самому стать монстром.",
  },
  {
    id: "danmachi",
    title: "Может, я встречу тебя в подземелье?",
    original: "Dungeon ni Deai wo Motomeru no wa Machigatteiru Darou ka",
    image: "https://animego.online/uploads/mini/240x360/94/1605283518_poster.webp",
    year: 2015,
    type: "Франшиза",
    episodes: 13,
    seasons: 5,
    studio: "J.C.Staff",
    genres: ["Приключения", "Комедия", "Фэнтези", "Экшен", "Романтика", "Магия", "Гарем"],
    description:
      "Город-лабиринт Орарио притягивает авантюристов со всего света. Новичок Белл Кранел находит богиню-покровительницу и, спасённый от минотавра прекрасной мечницей, решает во что бы то ни стало догнать её по силе. Франшиза из 12 частей — сезоны, OVA и спин-оффы.",
  },
  {
    id: "gargantia",
    title: "Гаргантия на просторах зелёной планеты",
    original: "Suisei no Gargantia",
    image: "https://animego.online/uploads/mini/240x360/e5/suisei-no-gargantia-poster.webp",
    year: 2013,
    type: "Сериал",
    episodes: 13,
    seasons: 1,
    studio: "Production I.G",
    genres: ["Приключения", "Экшен", "Фантастика", "Выживание", "Меха"],
    description:
      "Пилот боевого меха Лейтенант Рен через червоточину попадает на давно покинутую человечеством Землю — и вынужден заново учиться жить среди потомков тех, кто когда-то остался на планете.",
  },
  {
    id: "ja-byl-predan-tovarischami",
    title: "Я был предан товарищами в глубине подземелья",
    original: "Shinjiteita Nakama-tachi ni... \"Mugen Gacha\"",
    image: "https://animego.online/uploads/mini/240x360/11/ja-byl-predan-tovarischami-v-glubine-podzemelja-no-blagodarja-svoemu-navyku-beskonechnaja-gacha-ja-obrel-sojuznikov-devjat-tysjach-devjatsot-devjanosto-devjatogo-urovnja-chtoby-otomstit-byvshim-soratnikam-i-vsemu-miru-poster.webp",
    year: 2025,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "J.C.Staff",
    genres: ["Приключения", "Фэнтези", "Экшен"],
    description:
      "Преданный бывшими товарищами Лайт скрывается в смертоносном подземелье Бездна. Его единственный шанс — способность «Безграничная Гача», призывающая союзников чудовищной силы.",
  },
  {
    id: "shkola-mertvecov",
    title: "Школа мертвецов",
    original: "Highschool of the Dead",
    image: "https://animego.online/uploads/mini/240x360/c3/1616344341_poster.webp",
    year: 2010,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "Madhouse",
    genres: ["Приключения", "Экшен", "Сверхъестественное", "Выживание", "Гарем", "Этти", "Триллер", "Ужасы"],
    description:
      "Вирус-зомби мгновенно превращает город в зону выживания. Такаси Комуро и горстка выживших студентов академии Фудзими должны пробиться через захваченный зомби город к безопасности.",
  },
  {
    id: "poschadi-menja-2",
    title: "Пощади меня, великий господин! 2 сезон",
    original: "Da Wang Rao Ming 2",
    image: "https://animego.online/uploads/mini/240x360/7c/poschadi-menja-velikij-gospodin-2_poster.webp",
    year: 2023,
    type: "ONA",
    episodes: 12,
    seasons: 2,
    studio: "Big Firebird Culture",
    genres: ["Приключения", "Комедия", "Фэнтези", "Экшен"],
    description:
      "Продолжение истории рано осиротевшего Лу Шу, который оказывается не человеком, а обладателем сверхъестественных сил. Вместе с сестрой он продолжает путь постижения магии и встречает новых врагов.",
  },
  {
    id: "veselaya-zaschita",
    title: "Весёлая защита владений беспечного лорда",
    original: "Okiraku Ryoushu no Tanoshii Ryouchi Bouei",
    image: "https://static.yani.tv/posters/full/1636898099.jpg",
    year: 2026,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "NAZ",
    genres: ["Приключения", "Фэнтези", "Исэкай"],
    description:
      "Четвёртый сын дворянина вспоминает прошлую жизнь офисного работника и получает «бесполезный» дар Магии Созидания. Сосланный управлять захолустной деревушкой, он должен превратить её в процветающий город.",
  },
  {
    id: "yuusha-party",
    title: "Мастера на все руки выгнали из отряда героев",
    original: "Yuusha Party wo Oidasareta Kiyoubinbou",
    image: "https://static.yani.tv/posters/full/1636881591.jpg",
    year: 2026,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "studio42",
    genres: ["Приключения", "Фэнтези", "Магия", "Экшен", "Сражения на мечах"],
    description:
      "Мечника Орна, ставшего чародеем ради нужд отряда героев, изгоняют, назвав слабаком. Вернувшись к мечу, он понимает, что опыт в магии не пропал даром — и становится воином, не имеющим аналогов.",
  },
  {
    id: "adskij-rezhim",
    title: "Адский режим: Геймер, который любит спидран",
    original: "Hell Mode: Yarikomizuki no Gamer wa Hai Settei no Isekai de Musou suru",
    image: "https://yummyanime.tv/uploads/mini/200x300/46/poster-adskij-rezhim-gejmer-kotoryj-ljubit-spidran.webp",
    year: 2026,
    type: "Сериал",
    episodes: 12,
    seasons: 1,
    studio: "Yokohama Animation Lab",
    genres: ["Приключения", "Экшен", "Фэнтези", "Исекай", "Реинкарнация"],
    description:
      "Заядлый геймер выбирает в новой игре максимальную сложность «Ад» — и оказывается нищим в чужом теле, без единой подсказки. Опыт спидранов становится его единственным преимуществом на выживание.",
  },
  {
    id: "incident-darvina",
    title: "Инцидент Дарвина",
    original: "Darwin Jihen",
    image: "https://yummyanime.tv/uploads/mini/200x300/f0/poster-incident-darvina.webp",
    year: 2026,
    type: "Сериал",
    episodes: 13,
    seasons: 1,
    studio: "Bellnox Films",
    genres: ["Драма", "Фантастика", "Триллер"],
    description:
      "Похищенный из лаборатории детёныш шимпанзе с человеческими генами вырастает в Чарли — существо на грани двух видов. Приёмные родители пытаются скрыть его происхождение, но школа не прощает чужаков.",
  },
];

const STATUS = {
  watching: { label: "Смотрю", color: "#E8A94C" },
  planned: { label: "Буду смотреть", color: "#8B7FD6" },
  completed: { label: "Просмотрено", color: "#6FBE8F" },
};

const STORAGE_KEY = "entries-v1";

/* ---------------------------------------------------------------
   Small helpers
   ---------------------------------------------------------------- */
function useDebounced(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

function loadEntries() {
  try {
    const raw = window.localStorage?.getItem?.(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

/* ---------------------------------------------------------------
   Rating stars
   ---------------------------------------------------------------- */
function StarRating({ value, onChange, size = 18, readOnly = false }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-row" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = (hover || value) >= n;
        return (
          <button
            key={n}
            type="button"
            className="star-btn"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(n)}
            onClick={(e) => {
              e.stopPropagation();
              if (!readOnly) onChange(value === n ? 0 : n);
            }}
            aria-label={`${n} из 5`}
          >
            <Star
              size={size}
              strokeWidth={1.6}
              fill={filled ? "#E8A94C" : "none"}
              color={filled ? "#E8A94C" : "#5C5872"}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------
   Status badge / picker
   ---------------------------------------------------------------- */
function StatusPicker({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const s = STATUS[status];

  return (
    <div className="status-picker" ref={ref}>
      <button
        type="button"
        className="status-chip"
        style={{ "--chip-color": s.color }}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <span className="status-dot" />
        {s.label}
        <ChevronDown size={13} strokeWidth={2} style={{ opacity: 0.6 }} />
      </button>
      {open && (
        <div className="status-menu" onClick={(e) => e.stopPropagation()}>
          {Object.entries(STATUS).map(([key, val]) => (
            <button
              key={key}
              type="button"
              className="status-menu-item"
              onClick={() => {
                onChange(key);
                setOpen(false);
              }}
            >
              <span className="status-dot" style={{ background: val.color }} />
              {val.label}
              {status === key && <Check size={13} style={{ marginLeft: "auto", opacity: 0.7 }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   Poster image with graceful fallback
   ---------------------------------------------------------------- */
function Poster({ anime }) {
  const [errored, setErrored] = useState(!anime.image);

  if (errored || !anime.image) {
    const initials = anime.title
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return (
      <div className="poster poster-fallback">
        <span className="poster-fallback-glyph">{initials}</span>
        <div className="poster-fallback-noise" />
      </div>
    );
  }

  return (
    <div className="poster">
      <img
        src={anime.image}
        alt={anime.title}
        loading="lazy"
        onError={() => setErrored(true)}
      />
      <div className="poster-sheen" />
    </div>
  );
}

/* ---------------------------------------------------------------
   Card
   ---------------------------------------------------------------- */
function Card({ anime, entry, onOpen, onStatusChange, onRatingChange }) {
  return (
    <div className="card" onClick={() => onOpen(anime.id)}>
      <Poster anime={anime} />
      <div className="card-body">
        <div className="card-top">
          <h3 className="card-title">{anime.title}</h3>
          <span className="card-year">{anime.year}</span>
        </div>
        <div className="card-meta">
          <Tv size={12} strokeWidth={2} />
          <span>{anime.type}</span>
          <span className="dot-sep" />
          <span>{anime.episodes} эп.</span>
        </div>
        <div className="card-footer" onClick={(e) => e.stopPropagation()}>
          <StatusPicker status={entry.status} onChange={(s) => onStatusChange(anime.id, s)} />
          <StarRating value={entry.rating} onChange={(r) => onRatingChange(anime.id, r)} size={15} />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Detail modal
   ---------------------------------------------------------------- */
function DetailModal({ anime, entry, onClose, onStatusChange, onRatingChange, onNoteChange, onDateChange }) {
  const [noteDraft, setNoteDraft] = useState(entry.note || "");
  const debouncedNote = useDebounced(noteDraft, 400);

  useEffect(() => {
    onNoteChange(anime.id, debouncedNote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNote]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">
          <X size={18} strokeWidth={2} />
        </button>

        <div className="modal-hero">
          <Poster anime={anime} />
          <div className="modal-hero-info">
            <p className="modal-original">{anime.original}</p>
            <h2 className="modal-title">{anime.title}</h2>
            <div className="modal-tags">
              {anime.genres.map((g) => (
                <span className="tag" key={g}>
                  {g}
                </span>
              ))}
            </div>

            <div className="modal-stats-grid">
              <div className="stat">
                <Calendar size={14} strokeWidth={1.8} />
                <div>
                  <span className="stat-label">Год</span>
                  <span className="stat-value">{anime.year}</span>
                </div>
              </div>
              <div className="stat">
                <Building2 size={14} strokeWidth={1.8} />
                <div>
                  <span className="stat-label">Студия</span>
                  <span className="stat-value">{anime.studio}</span>
                </div>
              </div>
              <div className="stat">
                <Film size={14} strokeWidth={1.8} />
                <div>
                  <span className="stat-label">Тип</span>
                  <span className="stat-value">{anime.type}</span>
                </div>
              </div>
              <div className="stat">
                <Layers size={14} strokeWidth={1.8} />
                <div>
                  <span className="stat-label">Серии / сезоны</span>
                  <span className="stat-value">
                    {anime.episodes} эп. · {anime.seasons} {anime.seasons === 1 ? "сезон" : "сезона(ов)"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="modal-description">{anime.description}</p>

        <div className="modal-divider" />

        <div className="modal-controls">
          <div className="modal-control-row">
            <span className="modal-control-label">Статус</span>
            <StatusPicker status={entry.status} onChange={(s) => onStatusChange(anime.id, s)} />
          </div>
          <div className="modal-control-row">
            <span className="modal-control-label">Оценка</span>
            <StarRating value={entry.rating} onChange={(r) => onRatingChange(anime.id, r)} size={20} />
          </div>
          <div className="modal-control-row">
            <span className="modal-control-label">Дата просмотра</span>
            <input
              type="date"
              className="date-input"
              value={entry.date || ""}
              onChange={(e) => onDateChange(anime.id, e.target.value)}
            />
          </div>
        </div>

        <div className="modal-note-block">
          <div className="modal-note-label">
            <StickyNote size={13} strokeWidth={2} />
            Заметка
          </div>
          <textarea
            className="note-textarea"
            placeholder="Мысли, впечатления, на чём остановился..."
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Main App
   ---------------------------------------------------------------- */
function App() {
  const [entries, setEntries] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState(null);
  const debouncedQuery = useDebounced(query, 150);

  // Load persisted data (storage API if present, else localStorage, else defaults)
  useEffect(() => {
    let cancelled = false;
    async function init() {
      let data = null;
      try {
        if (window.storage?.get) {
          const res = await window.storage.get(STORAGE_KEY);
          if (res?.value) data = JSON.parse(res.value);
        }
      } catch (e) {}
      if (!data) data = loadEntries();

      const base = {};
      SEED_ANIME.forEach((a) => {
        base[a.id] = { status: "planned", rating: 0, note: "", date: "" };
      });
      const merged = { ...base, ...(data || {}) };
      if (!cancelled) {
        setEntries(merged);
        setLoaded(true);
      }
    }
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist on change
  useEffect(() => {
    if (!loaded) return;
    const json = JSON.stringify(entries);
    try {
      window.localStorage?.setItem?.(STORAGE_KEY, json);
    } catch (e) {}
    (async () => {
      try {
        if (window.storage?.set) await window.storage.set(STORAGE_KEY, json);
      } catch (e) {}
    })();
  }, [entries, loaded]);

  function updateEntry(id, patch) {
    setEntries((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  const counts = useMemo(() => {
    const c = { watching: 0, planned: 0, completed: 0 };
    Object.values(entries).forEach((e) => {
      if (c[e.status] !== undefined) c[e.status] += 1;
    });
    return c;
  }, [entries]);

  const filtered = useMemo(() => {
    let list = SEED_ANIME;
    if (activeTab !== "all") list = list.filter((a) => entries[a.id]?.status === activeTab);
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.original.toLowerCase().includes(q) ||
          a.genres.some((g) => g.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeTab, debouncedQuery, entries]);

  const openAnime = openId ? SEED_ANIME.find((a) => a.id === openId) : null;

  if (!loaded) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="app">
      <style>{CSS}</style>

      <header className="header">
        <div className="header-inner">
          <div className="header-title-block">
            <p className="header-eyebrow">Личная коллекция</p>
            <h1 className="header-title">Что смотрю</h1>
          </div>
          <div className="search-box">
            <Search size={15} strokeWidth={2} />
            <input
              type="text"
              placeholder="Поиск по названию или жанру..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <nav className="tabs">
          <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
            Все <span className="tab-count">{SEED_ANIME.length}</span>
          </button>
          <button
            className={`tab ${activeTab === "watching" ? "active" : ""}`}
            onClick={() => setActiveTab("watching")}
            style={{ "--tab-accent": STATUS.watching.color }}
          >
            Смотрю <span className="tab-count">{counts.watching}</span>
          </button>
          <button
            className={`tab ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
            style={{ "--tab-accent": STATUS.completed.color }}
          >
            Просмотрено <span className="tab-count">{counts.completed}</span>
          </button>
          <button
            className={`tab ${activeTab === "planned" ? "active" : ""}`}
            onClick={() => setActiveTab("planned")}
            style={{ "--tab-accent": STATUS.planned.color }}
          >
            Буду смотреть <span className="tab-count">{counts.planned}</span>
          </button>
        </nav>
      </header>

      <main className="grid-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>Ничего не нашлось. Попробуй другой запрос или вкладку.</p>
          </div>
        ) : (
          <div className="grid">
            {filtered.map((a) => (
              <Card
                key={a.id}
                anime={a}
                entry={entries[a.id]}
                onOpen={setOpenId}
                onStatusChange={(id, s) => updateEntry(id, { status: s })}
                onRatingChange={(id, r) => updateEntry(id, { rating: r })}
              />
            ))}
          </div>
        )}
      </main>

      {openAnime && (
        <DetailModal
          anime={openAnime}
          entry={entries[openAnime.id]}
          onClose={() => setOpenId(null)}
          onStatusChange={(id, s) => updateEntry(id, { status: s })}
          onRatingChange={(id, r) => updateEntry(id, { rating: r })}
          onNoteChange={(id, note) => updateEntry(id, { note })}
          onDateChange={(id, date) => updateEntry(id, { date })}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   Styles
   ---------------------------------------------------------------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --bg: #100F17;
  --bg-elevated: #17151F;
  --bg-card: #1B1926;
  --border: #2A2735;
  --border-soft: #232030;
  --text: #EDEAF6;
  --text-dim: #9C96AF;
  --text-faint: #6B6580;
  --amber: #E8A94C;
  --lilac: #8B7FD6;
  --green: #6FBE8F;
  --radius: 14px;
}

* { box-sizing: border-box; }

.app {
  min-height: 100vh;
  background:
    radial-gradient(ellipse 900px 500px at 15% -10%, rgba(139,127,214,0.10), transparent),
    radial-gradient(ellipse 700px 400px at 90% 10%, rgba(232,169,76,0.06), transparent),
    var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, sans-serif;
  padding-bottom: 64px;
}

.app-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
}
.loading-spinner {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 2px solid var(--border);
  border-top-color: var(--amber);
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ---------- Header ---------- */
.header {
  padding: 28px 20px 0;
  position: sticky;
  top: 0;
  z-index: 20;
  background: linear-gradient(to bottom, var(--bg) 70%, transparent);
  backdrop-filter: blur(10px);
}
.header-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 1100px;
  margin: 0 auto;
}
.header-eyebrow {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--amber);
  margin: 0 0 4px;
  font-weight: 600;
}
.header-title {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  font-weight: 600;
  font-optical-sizing: auto;
  margin: 0;
  letter-spacing: -0.01em;
  color: var(--text);
}
.search-box {
  display: flex;
  align-items: center;
  gap: 9px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 11px;
  padding: 10px 13px;
  color: var(--text-faint);
}
.search-box input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 14px;
  font-family: inherit;
}
.search-box input::placeholder { color: var(--text-faint); }
.search-box:focus-within { border-color: #3A3650; }

.tabs {
  display: flex;
  gap: 6px;
  max-width: 1100px;
  margin: 18px auto 0;
  padding-bottom: 14px;
  overflow-x: auto;
  scrollbar-width: none;
}
.tabs::-webkit-scrollbar { display: none; }
.tab {
  --tab-accent: var(--text-dim);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-dim);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.tab:hover { border-color: #3A3650; color: var(--text); }
.tab.active {
  background: color-mix(in srgb, var(--tab-accent) 14%, transparent);
  border-color: color-mix(in srgb, var(--tab-accent) 45%, transparent);
  color: var(--text);
}
.tab-count {
  font-size: 11px;
  color: var(--text-faint);
  background: rgba(255,255,255,0.06);
  padding: 1px 6px;
  border-radius: 999px;
}
.tab.active .tab-count { color: var(--tab-accent); }

/* ---------- Grid ---------- */
.grid-wrap { max-width: 1100px; margin: 8px auto 0; padding: 0 20px; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 16px;
}
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-faint);
  font-size: 14px;
}

/* ---------- Card ---------- */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  display: flex;
  flex-direction: column;
}
.card:hover {
  transform: translateY(-3px);
  border-color: #3A3650;
  box-shadow: 0 12px 28px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(232,169,76,0.06);
}

.poster {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  background: #0C0B12;
  overflow: hidden;
}
.poster img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}
.card:hover .poster img { transform: scale(1.04); }
.poster-sheen {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(16,15,23,0.55) 0%, transparent 45%);
  pointer-events: none;
}
.poster-fallback {
  display: flex; align-items: center; justify-content: center;
  background:
    repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 6px),
    linear-gradient(155deg, #241F35, #16131F);
  position: relative;
}
.poster-fallback-glyph {
  font-family: 'Fraunces', serif;
  font-size: 34px;
  font-weight: 600;
  color: rgba(237,234,246,0.22);
  letter-spacing: 0.02em;
}

.card-body { padding: 12px 13px 13px; display: flex; flex-direction: column; gap: 8px; }
.card-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.card-title {
  font-family: 'Fraunces', serif;
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.28;
  margin: 0;
  color: var(--text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-year { font-size: 11px; color: var(--text-faint); flex-shrink: 0; font-variant-numeric: tabular-nums; }
.card-meta {
  display: flex; align-items: center; gap: 6px;
  font-size: 11.5px; color: var(--text-faint);
}
.dot-sep { width: 3px; height: 3px; border-radius: 50%; background: var(--text-faint); }

.card-footer {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 2px;
  gap: 6px;
}

/* ---------- Status chip / picker ---------- */
.status-picker { position: relative; }
.status-chip {
  --chip-color: var(--text-dim);
  display: flex; align-items: center; gap: 5px;
  background: color-mix(in srgb, var(--chip-color) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--chip-color) 30%, transparent);
  color: var(--text);
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  padding: 5px 9px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
}
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--chip-color); flex-shrink: 0; }
.status-menu {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  background: #211E2C;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 4px;
  min-width: 160px;
  box-shadow: 0 16px 32px -8px rgba(0,0,0,0.6);
  z-index: 30;
}
.status-menu-item {
  display: flex; align-items: center; gap: 8px;
  width: 100%;
  background: transparent;
  border: none;
  color: var(--text);
  font-family: inherit;
  font-size: 12.5px;
  padding: 7px 8px;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
}
.status-menu-item:hover { background: rgba(255,255,255,0.05); }

/* ---------- Stars ---------- */
.star-row { display: flex; gap: 1px; }
.star-btn { background: none; border: none; padding: 2px; cursor: pointer; display: flex; }
.star-btn:disabled { cursor: default; }

/* ---------- Modal ---------- */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(8,7,12,0.72);
  backdrop-filter: blur(4px);
  display: flex; align-items: flex-start; justify-content: center;
  padding: 40px 16px;
  z-index: 100;
  overflow-y: auto;
  animation: fadeIn 0.15s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.modal {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 20px;
  max-width: 640px;
  width: 100%;
  padding: 28px;
  position: relative;
  animation: modalIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes modalIn {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.modal-close {
  position: absolute; top: 18px; right: 18px;
  background: rgba(255,255,255,0.06);
  border: none;
  color: var(--text-dim);
  width: 30px; height: 30px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  z-index: 5;
}
.modal-close:hover { background: rgba(255,255,255,0.12); color: var(--text); }

.modal-hero {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 20px;
}
.modal-hero .poster { border-radius: 10px; }
.modal-hero-info { min-width: 0; }
.modal-original {
  font-size: 12px;
  color: var(--text-faint);
  margin: 0 0 3px;
}
.modal-title {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 10px;
  line-height: 1.2;
}
.modal-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
.tag {
  font-size: 10.5px;
  color: var(--text-dim);
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border-soft);
  padding: 3px 9px;
  border-radius: 999px;
}
.modal-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 16px;
}
.stat { display: flex; align-items: flex-start; gap: 7px; color: var(--text-dim); }
.stat svg { margin-top: 2px; flex-shrink: 0; opacity: 0.7; }
.stat-label { display: block; font-size: 10px; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.05em; }
.stat-value { display: block; font-size: 12.5px; color: var(--text); margin-top: 1px; }

.modal-description {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--text-dim);
  margin: 20px 0 0;
}

.modal-divider { height: 1px; background: var(--border-soft); margin: 22px 0; }

.modal-controls { display: flex; flex-direction: column; gap: 14px; }
.modal-control-row { display: flex; align-items: center; justify-content: space-between; }
.modal-control-label { font-size: 12.5px; color: var(--text-dim); font-weight: 500; }

.date-input {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-family: inherit;
  font-size: 12.5px;
  padding: 6px 10px;
  color-scheme: dark;
}

.modal-note-block { margin-top: 20px; }
.modal-note-label {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--text-faint);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.note-textarea {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.55;
  padding: 12px 13px;
  resize: vertical;
  min-height: 80px;
}
.note-textarea:focus { outline: none; border-color: #4A4560; }
.note-textarea::placeholder { color: var(--text-faint); }

@media (max-width: 520px) {
  .modal-hero { grid-template-columns: 92px 1fr; }
  .modal-title { font-size: 18px; }
  .modal-stats-grid { grid-template-columns: 1fr; }
  .header-title { font-size: 25px; }
}
`;

const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(React.createElement(App));
