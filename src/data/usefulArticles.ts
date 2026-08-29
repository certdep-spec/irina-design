export type UsefulCategoryId =
  | "design"
  | "repair"
  | "kitchen"
  | "furniture"
  | "lighting"
  | "materials"
  | "styles"
  | "practice";
export interface UsefulCategory {
  id: UsefulCategoryId;
  title: string;
  description: string;
}
export interface UsefulArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: UsefulCategoryId;
  featured?: boolean;
  published?: boolean;
  updatedAt?: string;
  cover?: string;
}
export const usefulCategories: UsefulCategory[] = [
  {
    id: "design",
    title: "Дизайн і планування",
    description: "Від першої ідеї та функціонального зонування до повного дизайн-проєкту.",
  },
  {
    id: "repair",
    title: "Ремонт і бюджет",
    description:
      "Послідовність робіт, витрати, контроль і рішення, які допомагають уникнути переробок.",
  },
  {
    id: "kitchen",
    title: "Кухня",
    description: "Ергономіка, планування, техніка, стільниці та деталі щоденного комфорту.",
  },
  {
    id: "furniture",
    title: "Меблі",
    description: "Індивідуальні меблі, системи зберігання, матеріали та фурнітура.",
  },
  {
    id: "lighting",
    title: "Освітлення та електрика",
    description: "Розетки, вимикачі, сценарії освітлення та підготовка до електромонтажу.",
  },
  {
    id: "materials",
    title: "Матеріали",
    description: "Підлога, плитка, фарби, фактури та практичний вибір оздоблення.",
  },
  {
    id: "styles",
    title: "Стилі інтер’єру",
    description: "Як обрати напрям і створити інтер’єр, який не втратить актуальності.",
  },
  {
    id: "practice",
    title: "Практичні поради дизайнера",
    description: "Рішення з реальної практики: від підбору матеріалів до реалізації проєкту.",
  },
];
const raw: Array<[number, UsefulCategoryId, string, boolean?]> = [
  [1, "design", "Що таке дизайн-проєкт інтер’єру і що він включає", true],
  [2, "design", "Навіщо потрібен дизайнер інтер’єру перед початком ремонту"],
  [3, "design", "Скільки коштує дизайн інтер’єру у Вінниці у 2026 році", true],
  [4, "design", "Як формується ціна дизайн-проєкту"],
  [5, "design", "Як правильно поставити завдання дизайнеру інтер’єру"],
  [6, "design", "Як проходить робота над дизайн-проєктом від першої зустрічі до реалізації"],
  [7, "design", "Скільки часу займає розробка дизайн-проєкту"],
  [8, "design", "Дизайн-проєкт чи самостійний ремонт: що вигідніше"],
  [9, "design", "Чим відрізняється планування від повноцінного дизайн-проєкту"],
  [10, "design", "3D-візуалізація інтер’єру: навіщо вона потрібна"],
  [11, "design", "Робочі креслення дизайнера: які вони бувають і навіщо потрібні"],
  [12, "design", "Як дизайн-проєкт допомагає контролювати бюджет ремонту"],
  [13, "design", "Як правильно спланувати квартиру перед ремонтом"],
  [14, "design", "Типові помилки планування квартири"],
  [15, "design", "Як правильно зонувати простір квартири"],
  [16, "design", "Як зробити маленьку квартиру зручною та просторою"],
  [17, "design", "Як спланувати квартиру-студію"],
  [18, "design", "Як об’єднати кухню та вітальню"],
  [19, "design", "Кухня-вітальня: переваги, недоліки та правила планування"],
  [20, "design", "Як правильно спланувати спальню"],
  [21, "design", "Як спланувати дитячу кімнату, щоб вона залишалася зручною з віком"],
  [22, "design", "Як правильно спланувати гардеробну"],
  [23, "design", "Як організувати зберігання у невеликій квартирі"],
  [24, "design", "Як спланувати ванну кімнату"],
  [25, "design", "Як правильно розташувати сантехніку у ванній"],
  [26, "design", "Як спланувати приватний будинок"],
  [27, "design", "Чим відрізняється планування квартири від приватного будинку"],
  [28, "repair", "З чого почати ремонт квартири", true],
  [29, "repair", "Правильна послідовність ремонту квартири"],
  [30, "repair", "Які роботи потрібно виконати до початку оздоблення"],
  [31, "repair", "Скільки коштує ремонт квартири у Вінниці у 2026 році", true],
  [32, "repair", "Як скласти бюджет ремонту квартири"],
  [33, "repair", "Як не вийти за межі бюджету під час ремонту"],
  [34, "repair", "На чому можна економити під час ремонту, а на чому не варто"],
  [35, "repair", "10 помилок, які збільшують вартість ремонту"],
  [36, "repair", "Скільки часу займає ремонт квартири"],
  [37, "repair", "Як контролювати якість ремонту"],
  [38, "repair", "Що робити, якщо ремонт вийшов за межі початкового бюджету"],
  [39, "repair", "Як підготувати квартиру до ремонту"],
  [40, "lighting", "Скільки розеток потрібно у квартирі"],
  [41, "lighting", "Як правильно спланувати електрику у квартирі"],
  [42, "lighting", "Де розташовувати розетки та вимикачі"],
  [43, "lighting", "Розетки на кухні: скільки потрібно і де їх розмістити"],
  [44, "lighting", "Електрика у ванній кімнаті: що потрібно передбачити"],
  [45, "lighting", "Як спланувати електрику у спальні"],
  [46, "lighting", "Як правильно спланувати освітлення квартири"],
  [47, "lighting", "Скільки світильників потрібно для кімнати"],
  [48, "lighting", "Тепле чи холодне світло: яке обрати для інтер’єру"],
  [49, "lighting", "Точкові світильники, треки чи люстра: що краще"],
  [50, "lighting", "Як правильно спланувати підсвічування кухні"],
  [51, "lighting", "Помилки в плануванні електрики та освітлення"],
  [52, "kitchen", "Як правильно спланувати кухню"],
  [53, "kitchen", "Пряма, кутова чи П-подібна кухня: що вибрати"],
  [54, "kitchen", "Якою має бути зручна кухня"],
  [55, "kitchen", "Правильна висота кухонної стільниці"],
  [56, "kitchen", "Як правильно розмістити холодильник, мийку та плиту"],
  [57, "kitchen", "Робочий трикутник на кухні: чи актуальний він сьогодні"],
  [58, "kitchen", "Скільки місця потрібно залишити між кухонними меблями"],
  [59, "kitchen", "Як правильно спланувати кухню-вітальню"],
  [60, "kitchen", "Яку стільницю вибрати для кухні"],
  [61, "kitchen", "Типові помилки під час проєктування кухні"],
  [62, "furniture", "Меблі на замовлення чи готові: що краще"],
  [63, "furniture", "Коли варто замовляти меблі за індивідуальним проєктом"],
  [64, "furniture", "Як правильно спроєктувати шафу"],
  [65, "furniture", "Як спланувати гардеробну систему"],
  [66, "furniture", "Як спроєктувати зручну вбудовану кухню"],
  [67, "furniture", "Як правильно спланувати меблі у вітальні"],
  [68, "furniture", "Меблі до стелі: переваги та недоліки"],
  [69, "furniture", "Як вибрати матеріали для корпусних меблів"],
  [70, "furniture", "Фурнітура для меблів: на чому варто економити, а на чому ні"],
  [71, "furniture", "Як дизайнер створює індивідуальні меблі під конкретний інтер’єр"],
  [72, "materials", "Як вибрати підлогове покриття для квартири"],
  [73, "materials", "Кварц-вініл, ламінат чи паркет: що вибрати"],
  [74, "materials", "Як вибрати плитку для ванної кімнати"],
  [75, "materials", "Як вибрати плитку для кухні"],
  [76, "materials", "Фарба чи шпалери: що краще для стін"],
  [77, "materials", "Як правильно вибрати колір стін"],
  [78, "materials", "Як поєднувати кольори в інтер’єрі"],
  [79, "materials", "Як поєднувати дерево, камінь, метал і текстиль"],
  [
    80,
    "materials",
    "Матеріали, які виглядають дорого: як створити дорогий інтер’єр без зайвих витрат",
  ],
  [81, "materials", "Як вибрати двері для сучасного інтер’єру"],
  [82, "materials", "Які матеріали найкраще підходять для квартири з дітьми"],
  [83, "styles", "Як вибрати стиль інтер’єру для квартири"],
  [84, "styles", "Сучасний стиль інтер’єру: основні принципи"],
  [85, "styles", "Мінімалізм в інтер’єрі: коли він справді працює"],
  [86, "styles", "Скандинавський стиль: основні принципи"],
  [87, "styles", "Japandi: як створити спокійний сучасний інтер’єр"],
  [88, "styles", "Неокласика в сучасному інтер’єрі"],
  [89, "styles", "Як не зробити інтер’єр застарілим через кілька років"],
  [90, "styles", "Тренди дизайну інтер’єру 2026 року: що залишиться актуальним надовго"],
  [91, "practice", "Як дизайнер приймає рішення під час створення інтер’єру"],
  [92, "practice", "Як дизайнер допомагає заощадити під час ремонту"],
  [93, "practice", "Що дизайнер враховує під час планування квартири"],
  [94, "practice", "Як підбираються матеріали для конкретного інтер’єру"],
  [95, "practice", "Як підбираються меблі та освітлення"],
  [96, "practice", "Чому красивий інтер’єр на фото не завжди зручний у житті"],
  [97, "practice", "Як зробити інтер’єр красивим і практичним одночасно"],
  [98, "practice", "Авторський нагляд: що це таке і навіщо він потрібен"],
  [99, "practice", "Як уникнути помилок під час реалізації дизайн-проєкту"],
  [100, "practice", "Від ідеї до готового інтер’єру: як відбувається реалізація проєкту"],
];
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-zа-яіїєґ0-9]+/giu, "-")
    .replace(/^-+|-+$/g, "");
const published: Record<number, Pick<UsefulArticle, "slug" | "excerpt" | "updatedAt" | "cover">> = {
  1: {
    slug: "shcho-take-dyzain-proiekt-interieru",
    excerpt:
      "Розбираємо, з яких етапів складається дизайн-проєкт і які матеріали потрібні, щоб ремонт був передбачуваним.",
    updatedAt: "2026-08-28",
    cover: "/archives/living/001.webp",
  },
  2: {
    slug: "navishcho-potriben-dyzainer-interieru-pered-remontom",
    excerpt:
      "Коли участь дизайнера справді економить час і бюджет та які рішення важливо прийняти ще до виходу будівельної бригади.",
    updatedAt: "2026-08-28",
    cover: "/archives/living/7305e93e-7380-4095-8d4d-22183c01824e.webp",
  },
  3: {
    slug: "skilky-koshtuie-dyzain-interieru-u-vinnytsi",
    excerpt:
      "Пояснюємо, від чого залежить вартість дизайн-проєкту, що входить у ціну та як коректно порівнювати пропозиції дизайнерів.",
    updatedAt: "2026-08-28",
    cover: "/archives/comercial/к001.webp",
  },
  4: {
    slug: "yak-formuietsia-tsina-dyzain-proiektu",
    excerpt:
      "З яких етапів складається вартість роботи дизайнера та чому однакова ціна за квадратний метр не означає однаковий обсяг послуг.",
    updatedAt: "2026-08-28",
    cover: "/archives/comercial/к003.webp",
  },
  5: {
    slug: "yak-pravylno-postavyty-zavdannia-dyzaineru-interieru",
    excerpt:
      "Як підготувати побажання, пріоритети та обмеження, щоб дизайнер запропонував точні рішення без зайвих переробок.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-03_11-49-13-422.webp",
  },
  6: {
    slug: "yak-prokhodyt-robota-nad-dyzain-proiektom",
    excerpt:
      "Послідовно показуємо шлях від першої розмови й обмірів до готових креслень, специфікацій та реалізації інтер’єру.",
    updatedAt: "2026-08-28",
    cover: "/archives/living/4200d396-0e13-4b59-9a8c-759f17e28669.webp",
  },
  7: {
    slug: "skilky-chasu-zaimaie-rozrobka-dyzain-proiektu",
    excerpt:
      "Реальні строки дизайн-проєкту: з яких етапів складається робота та що допомагає уникнути затримок.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-03_12-12-59-459.webp",
  },
  8: {
    slug: "dyzain-proiekt-chy-samostiinyi-remont",
    excerpt:
      "Порівнюємо самостійний ремонт і роботу за дизайн-проєктом за витратами, часом, ризиками та якістю результату.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_08-48-28-634.webp",
  },
  9: {
    slug: "planuvannia-chy-povnyi-dyzain-proiekt",
    excerpt:
      "Коли достатньо планувального рішення, а коли потрібні візуалізації, креслення та специфікації повного проєкту.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-03_12-52-03-731.webp",
  },
  10: {
    slug: "3d-vizualizatsiia-interieru-navishcho-potribna",
    excerpt:
      "Що можна перевірити на 3D-візуалізації, чого вона не замінює та як використовувати її під час ремонту.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/Gemini_Generated_Image_xuj256xuj256xuj2.webp",
  },
  11: {
    slug: "robochi-kreslennia-dyzainera",
    excerpt:
      "Які креслення входять до робочого альбому та як вони допомагають будівельникам реалізувати задум без здогадок.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_08-48-37-102.webp",
  },
  12: {
    slug: "yak-dyzain-proiekt-dopomahaie-kontroliuvaty-biudzhet",
    excerpt:
      "Як зафіксовані рішення, специфікації та послідовність закупівель зменшують ризик випадкових витрат і дорогих переробок.",
    updatedAt: "2026-08-28",
    cover: "/archives/wardrobe/13c9182b-e3f7-4f71-9ff4-edb4871684b9.webp",
  },
  13: {
    slug: "yak-pravylno-splanuvaty-kvartyru-pered-remontom",
    excerpt:
      "Покроковий алгоритм планування квартири: потреби сім’ї, меблі, проходи, зберігання та інженерні точки.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-03_13-04-23-313.webp",
  },
  14: {
    slug: "typovi-pomylky-planuvannia-kvartyry",
    excerpt:
      "Помилки, через які квартира стає незручною: вузькі проходи, конфлікти дверей, нестача зберігання та випадкова електрика.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-04_17-06-06-579.webp",
  },
  15: {
    slug: "yak-pravylno-zonuvaty-prostir-kvartyry",
    excerpt:
      "Як розділити квартиру на функціональні зони світлом, меблями й оздобленням без зайвих перегородок.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-05_16-09-47-142.webp",
  },
  16: {
    slug: "yak-zrobyty-malenku-kvartyru-zruchnoiu",
    excerpt:
      "Практичні прийоми для малої площі: пріоритети, зберігання, компактні меблі, світло та візуальна цілісність.",
    updatedAt: "2026-08-29",
    cover: "/archives/wardrobe/изображение_viber_2026-05-04_15-12-57-396.webp",
  },
  17: {
    slug: "yak-splanuvaty-kvartyru-studiiu",
    excerpt:
      "Як організувати квартиру-студію, відокремити сон, кухню та відпочинок і не перевантажити невелику площу.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-08_13-20-58-111.webp",
  },
  18: {
    slug: "yak-obiednaty-kukhniu-ta-vitalniu",
    excerpt:
      "Що перевірити перед об’єднанням кухні з вітальнею: законність, вентиляцію, зонування, світло й побутові сценарії.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-03_12-01-15-584.webp",
  },
  19: {
    slug: "kukhnia-vitalnia-perevahy-nedoliky-planuvannia",
    excerpt:
      "Чесно про кухню-вітальню: коли відкритий простір зручний, які має недоліки та як правильно його спланувати.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_08-49-54-931.webp",
  },
  20: {
    slug: "yak-pravylno-splanuvaty-spalniu",
    excerpt:
      "Розміри проходів, положення ліжка, шафи, розетки й освітлення для тихої та зручної спальні.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-08_13-21-13-100.webp",
  },
  21: {
    slug: "yak-splanuvaty-dytiachu-kimnatu-na-vyrist",
    excerpt:
      "Як створити дитячу, що адаптується до віку дитини без повного ремонту кожні кілька років.",
    updatedAt: "2026-08-29",
    cover: "/archives/kids/001.webp",
  },
  22: {
    slug: "yak-pravylno-splanuvaty-harderobnu",
    excerpt:
      "Мінімальні розміри, типи наповнення, проходи, освітлення та вентиляція зручної гардеробної.",
    updatedAt: "2026-08-29",
    cover: "/archives/wardrobe/Gemini_Generated_Image_3wz17e3wz17e3wz1.webp",
  },
  23: {
    slug: "yak-orhanizuvaty-zberihannia-u-nevelykii-kvartyri",
    excerpt:
      "Системний підхід до зберігання на малій площі: інвентаризація речей, вбудовані шафи й зручні побутові зони.",
    updatedAt: "2026-08-29",
    cover: "/archives/wardrobe/Gemini_Generated_Image_5gsw6e5gsw6e5gsw.webp",
  },
  24: {
    slug: "yak-splanuvaty-vannu-kimnatu",
    excerpt:
      "Як розмістити сантехніку, зберігання, пральну техніку та світло у ванній без тісноти й випадкових рішень.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-08_13-22-15-962.webp",
  },
  25: {
    slug: "yak-pravylno-roztashuvaty-santekhniku-u-vannii",
    excerpt:
      "Практичні відстані, інсталяції, ухили та точки підключення, які потрібно погодити до монтажу сантехніки.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/Gemini_Generated_Image_98qsfx98qsfx98qs.webp",
  },
  26: {
    slug: "yak-splanuvaty-pryvatnyi-budynok",
    excerpt:
      "Від ділянки й входу до технічних приміщень: як побудувати логічне планування приватного будинку.",
    updatedAt: "2026-08-29",
    cover: "/archives/comercial/к006.webp",
  },
  27: {
    slug: "planuvannia-kvartyry-ta-pryvatnoho-budynku",
    excerpt:
      "Чим проєктування будинку відрізняється від квартири та які додаткові рішення потрібно передбачити заздалегідь.",
    updatedAt: "2026-08-29",
    cover: "/archives/comercial/к007.webp",
  },
  28: {
    slug: "z-choho-pochaty-remont-kvartyry",
    excerpt:
      "Практична послідовність перших рішень: від обмірів і бюджету до планування, кошторису та старту будівельних робіт.",
    updatedAt: "2026-08-28",
    cover: "/archives/kitchen/001.webp",
  },
  29: {
    slug: "pravylna-poslidovnist-remontu-kvartyry",
    excerpt:
      "Покрокова черговість ремонту квартири — від обмірів і демонтажу до чистового монтажу меблів та освітлення.",
    updatedAt: "2026-08-29",
    cover: "/archives/comercial/к008.webp",
  },
  30: {
    slug: "roboty-do-pochatku-ozdoblennia",
    excerpt:
      "Які приховані, інженерні та підготовчі роботи потрібно завершити й перевірити до фарбування, плитки та підлоги.",
    updatedAt: "2026-08-29",
    cover: "/archives/comercial/к009.webp",
  },
  31: {
    slug: "skilky-koshtuie-remont-kvartyry-u-vinnytsi",
    excerpt:
      "Чому немає універсальної ціни ремонту за квадратний метр і як скласти реалістичний кошторис для квартири у Вінниці.",
    updatedAt: "2026-08-28",
    cover: "/archives/kitchen/1779016473fe58.webp",
  },
  32: {
    slug: "yak-sklasty-biudzhet-remontu-kvartyry",
    excerpt:
      "Як перетворити приблизну суму на робочий бюджет із категоріями витрат, пріоритетами, графіком закупівель і резервом.",
    updatedAt: "2026-08-29",
    cover: "/archives/comercial/к002.webp",
  },
  33: {
    slug: "yak-ne-vyity-za-mezhi-biudzhetu-remontu",
    excerpt:
      "Практичні правила контролю кошторису, змін і закупівель, які допомагають не втратити фінансову керованість ремонту.",
    updatedAt: "2026-08-29",
    cover: "/archives/comercial/к004.webp",
  },
  34: {
    slug: "na-chomu-mozhna-ekonomyty-pid-chas-remontu",
    excerpt:
      "Де спрощення не шкодить результату, а де економія створює ризик протікань, переробок і швидкого зношення.",
    updatedAt: "2026-08-29",
    cover: "/archives/comercial/к005.webp",
  },
  35: {
    slug: "pomylky-yaki-zbilshuiut-vartist-remontu",
    excerpt:
      "Десять типових рішень, через які ремонт дорожчає: старт без проєкту, пізні зміни, поспішні закупівлі та подвійна робота.",
    updatedAt: "2026-08-29",
    cover: "/archives/comercial/к010.webp",
  },
  36: {
    slug: "skilky-chasu-zaimaie-remont-kvartyry",
    excerpt:
      "Від чого залежать строки ремонту, які етапи не можна прискорювати та як скласти реалістичний календар робіт.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-08_13-22-14-665.webp",
  },
  37: {
    slug: "yak-kontroliuvaty-yakist-remontu",
    excerpt:
      "Як організувати поетапне приймання робіт, фотофіксацію, перевірку прихованих систем і коректну комунікацію з бригадою.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-08_13-23-39-495.webp",
  },
  38: {
    slug: "shcho-robyty-yakshcho-remont-perevyshchyv-biudzhet",
    excerpt:
      "Антикризовий алгоритм: як зупинити неконтрольовані витрати, переглянути залишок робіт і завершити ремонт без хаосу.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-08_13-23-43-786.webp",
  },
  39: {
    slug: "yak-pidhotuvaty-kvartyru-do-remontu",
    excerpt:
      "Документи, обміри, демонтаж, тимчасові комунікації та організація об’єкта перед приходом будівельної бригади.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-08_13-22-51-647.webp",
  },
  40: {
    slug: "skilky-rozetok-potribno-u-kvartyri",
    excerpt:
      "Практичний розрахунок розеток за кімнатами, технікою та щоденними сценаріями, щоб після ремонту не жити з подовжувачами.",
    updatedAt: "2026-08-28",
    cover: "/archives/living/изображение_viber_2026-05-03_12-08-07-501.webp",
  },
  41: {
    slug: "yak-pravylno-splanuvaty-elektryku-u-kvartyri",
    excerpt:
      "Як пов’язати електрощит, кабельні групи, розетки, вимикачі та техніку з реальним плануванням квартири.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-08_13-24-11-262.webp",
  },
  42: {
    slug: "de-roztashovuvaty-rozetky-ta-vymykachi",
    excerpt:
      "Практичний алгоритм розміщення розеток і вимикачів відносно меблів, дверей та щоденних сценаріїв.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-17_14-12-39-128.webp",
  },
  43: {
    slug: "rozetky-na-kukhni-skilky-i-de",
    excerpt:
      "Окремі лінії для техніки, розетки робочої зони та доступ до підключень без конфліктів із кухонними меблями.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_09-44-31-938.webp",
  },
  44: {
    slug: "elektryka-u-vannii-kimnati",
    excerpt:
      "Що передбачити у ванній: вологі зони, захисне відключення, зрівнювання потенціалів, світло та техніка.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_09-44-44-118.webp",
  },
  45: {
    slug: "yak-splanuvaty-elektryku-u-spalni",
    excerpt:
      "Розетки біля ліжка, прохідні вимикачі, освітлення шафи, телевізор і заряджання без подовжувачів.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-17_14-12-39-704.webp",
  },
  46: {
    slug: "yak-pravylno-splanuvaty-osvitlennia-kvartyry",
    excerpt:
      "Як створити загальне, робоче, акцентне й нічне світло та пов’язати сценарії з плануванням кімнат.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-12_11-32-20-399.webp",
  },
  47: {
    slug: "skilky-svitylnykiv-potribno-dlia-kimnaty",
    excerpt:
      "Чому світильники рахують не лише за площею та як оцінити світловий потік, функції й рівномірність.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-05-08_13-34-16-931.webp",
  },
  48: {
    slug: "teple-chy-kholodne-svitlo-v-interieri",
    excerpt:
      "Колірна температура, передача кольору та доречні діапазони світла для кухні, вітальні, спальні й ванної.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/изображение_viber_2026-04-30_11-17-45-342.webp",
  },
  49: {
    slug: "tochkovi-svitylnyky-treky-chy-liustra",
    excerpt:
      "Порівняння точкових світильників, треків і люстр за функцією, монтажем, гнучкістю та візуальним ефектом.",
    updatedAt: "2026-08-29",
    cover: "/archives/comercial/к001.webp",
  },
  50: {
    slug: "yak-splanuvaty-pidsvichuvannia-kukhni",
    excerpt:
      "Робоче світло без тіней, розміщення LED-профілю, живлення, керування та узгодження з кухонними меблями.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/Gemini_Generated_Image_1x4nuo1x4nuo1x4n.webp",
  },
  51: {
    slug: "pomylky-planuvannia-elektryky-ta-osvitlennia",
    excerpt:
      "Типові конфлікти електрики з меблями, нестача ліній, сліпуче світло й інші помилки, які складно виправити після ремонту.",
    updatedAt: "2026-08-29",
    cover: "/archives/living/001.webp",
  },
  52: {
    slug: "yak-pravylno-splanuvaty-kukhniu",
    excerpt:
      "Покрокове планування кухні: потреби сім’ї, зони зберігання, техніка, робоча поверхня, проходи та комунікації.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/001.webp",
  },
  53: {
    slug: "priama-kutova-chy-p-podibna-kukhnia",
    excerpt:
      "Як вибрати форму кухні за розміром приміщення, розташуванням комунікацій, кількістю техніки та сценаріями руху.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/1779016473fe58.webp",
  },
  54: {
    slug: "yakoiu-maie-buty-zruchna-kukhnia",
    excerpt:
      "Ознаки кухні, якою зручно користуватися щодня: логічні зони, достатня стільниця, доступне зберігання та правильне світло.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-03_12-01-15-584.webp",
  },
  55: {
    slug: "pravylna-vysota-kukhonnoi-stilnytsi",
    excerpt:
      "Як підібрати висоту кухонної стільниці під зріст користувачів, техніку, товщину матеріалу й різні робочі процеси.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_08-48-28-634.webp",
  },
  56: {
    slug: "yak-rozmistyty-kholodylnyk-myiku-ta-plytu",
    excerpt:
      "Безпечна й зручна послідовність холодильника, мийки та плити з робочими проміжками й місцем для розвантаження продуктів.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_08-48-37-102.webp",
  },
  57: {
    slug: "robochyi-trykutnyk-na-kukhni",
    excerpt:
      "Чи актуальне правило робочого трикутника та чому сучасну кухню краще проєктувати як послідовність функціональних зон.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_08-49-54-931.webp",
  },
  58: {
    slug: "vidstani-mizh-kukhonnymy-mebliamy",
    excerpt:
      "Які проходи залишати між рядами, островом, столом і відкритими фасадами, щоб кухня не стала тісною.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_09-44-31-938.webp",
  },
  59: {
    slug: "yak-splanuvaty-kukhniu-vitalniu",
    excerpt:
      "Як поєднати готування, обід і відпочинок в одному просторі та контролювати запахи, шум і візуальний безлад.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-05_09-44-44-118.webp",
  },
  60: {
    slug: "yaku-stilnytsiu-vybraty-dlia-kukhni",
    excerpt:
      "Порівняння популярних матеріалів стільниць за вологостійкістю, термостійкістю, ремонтом, стиками та бюджетом.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/Gemini_Generated_Image_98qsfx98qsfx98qs.webp",
  },
  61: {
    slug: "typovi-pomylky-proiektuvannia-kukhni",
    excerpt:
      "Помилки планування кухні, через які бракує робочої поверхні, конфліктують фасади, техніка й комунікації.",
    updatedAt: "2026-08-29",
    cover: "/archives/kitchen/изображение_viber_2026-05-12_11-32-20-399.webp",
  },
  98: {
    slug: "avtorskyi-nahliad-shcho-tse-i-navishcho",
    excerpt:
      "Що контролює дизайнер під час реалізації, які питання вирішує на об’єкті та чим авторський нагляд не є технічним наглядом.",
    updatedAt: "2026-08-28",
    cover: "/archives/wardrobe/001.webp",
  },
};

export const usefulArticles: UsefulArticle[] = raw.map(([id, category, title, featured]) => ({
  id,
  category,
  title,
  featured,
  slug: published[id]?.slug ?? `${id}-${slugify(title)}`,
  excerpt: published[id]?.excerpt ?? "Тема запланована в редакційному календарі.",
  published: Boolean(published[id]),
  updatedAt: published[id]?.updatedAt,
  cover: published[id]?.cover,
}));
export const publishedUsefulArticles = usefulArticles.filter(article => article.published);
export const getUsefulCategory = (id: UsefulCategoryId) =>
  usefulCategories.find(category => category.id === id);
