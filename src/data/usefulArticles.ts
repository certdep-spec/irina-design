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
  title: string;
  category: UsefulCategoryId;
  featured?: boolean;
}

export const usefulCategories: UsefulCategory[] = [
  { id: "design", title: "Дизайн і планування", description: "Від першої ідеї та функціонального зонування до повного дизайн-проєкту." },
  { id: "repair", title: "Ремонт і бюджет", description: "Послідовність робіт, витрати, контроль і рішення, які допомагають уникнути переробок." },
  { id: "kitchen", title: "Кухня", description: "Ергономіка, планування, техніка, стільниці та деталі щоденного комфорту." },
  { id: "furniture", title: "Меблі", description: "Індивідуальні меблі, системи зберігання, матеріали та фурнітура." },
  { id: "lighting", title: "Освітлення та електрика", description: "Розетки, вимикачі, сценарії освітлення та підготовка до електромонтажу." },
  { id: "materials", title: "Матеріали", description: "Підлога, плитка, фарби, фактури та практичний вибір оздоблення." },
  { id: "styles", title: "Стилі інтер’єру", description: "Як обрати напрям і створити інтер’єр, який не втратить актуальності." },
  { id: "practice", title: "Практичні поради дизайнера", description: "Рішення з реальної практики: від підбору матеріалів до реалізації проєкту." },
];

export const usefulArticles: UsefulArticle[] = [
  { id: 1, category: "design", featured: true, title: "Що таке дизайн-проєкт інтер’єру і що він включає" },
  { id: 2, category: "design", title: "Навіщо потрібен дизайнер інтер’єру перед початком ремонту" },
  { id: 3, category: "design", featured: true, title: "Скільки коштує дизайн інтер’єру у Вінниці у 2026 році" },
  { id: 4, category: "design", title: "Як формується ціна дизайн-проєкту" },
  { id: 5, category: "design", title: "Як правильно поставити завдання дизайнеру інтер’єру" },
  { id: 6, category: "design", title: "Як проходить робота над дизайн-проєктом від першої зустрічі до реалізації" },
  { id: 7, category: "design", title: "Скільки часу займає розробка дизайн-проєкту" },
  { id: 8, category: "design", title: "Дизайн-проєкт чи самостійний ремонт: що вигідніше" },
  { id: 9, category: "design", title: "Чим відрізняється планування від повноцінного дизайн-проєкту" },
  { id: 10, category: "design", title: "3D-візуалізація інтер’єру: навіщо вона потрібна" },
  { id: 11, category: "design", title: "Робочі креслення дизайнера: які вони бувають і навіщо потрібні" },
  { id: 12, category: "design", title: "Як дизайн-проєкт допомагає контролювати бюджет ремонту" },
  { id: 13, category: "design", title: "Як правильно спланувати квартиру перед ремонтом" },
  { id: 14, category: "design", title: "Типові помилки планування квартири" },
  { id: 15, category: "design", title: "Як правильно зонувати простір квартири" },
  { id: 16, category: "design", title: "Як зробити маленьку квартиру зручною та просторою" },
  { id: 17, category: "design", title: "Як спланувати квартиру-студію" },
  { id: 18, category: "design", title: "Як об’єднати кухню та вітальню" },
  { id: 19, category: "design", title: "Кухня-вітальня: переваги, недоліки та правила планування" },
  { id: 20, category: "design", title: "Як правильно спланувати спальню" },
  { id: 21, category: "design", title: "Як спланувати дитячу кімнату, щоб вона залишалася зручною з віком" },
  { id: 22, category: "design", title: "Як правильно спланувати гардеробну" },
  { id: 23, category: "design", title: "Як організувати зберігання у невеликій квартирі" },
  { id: 24, category: "design", title: "Як спланувати ванну кімнату" },
  { id: 25, category: "design", title: "Як правильно розташувати сантехніку у ванній" },
  { id: 26, category: "design", title: "Як спланувати приватний будинок" },
  { id: 27, category: "design", title: "Чим відрізняється планування квартири від приватного будинку" },

  { id: 28, category: "repair", featured: true, title: "З чого почати ремонт квартири" },
  { id: 29, category: "repair", title: "Правильна послідовність ремонту квартири" },
  { id: 30, category: "repair", title: "Які роботи потрібно виконати до початку оздоблення" },
  { id: 31, category: "repair", featured: true, title: "Скільки коштує ремонт квартири у Вінниці у 2026 році" },
  { id: 32, category: "repair", title: "Як скласти бюджет ремонту квартири" },
  { id: 33, category: "repair", title: "Як не вийти за межі бюджету під час ремонту" },
  { id: 34, category: "repair", title: "На чому можна економити під час ремонту, а на чому не варто" },
  { id: 35, category: "repair", title: "10 помилок, які збільшують вартість ремонту" },
  { id: 36, category: "repair", title: "Скільки часу займає ремонт квартири" },
  { id: 37, category: "repair", title: "Як контролювати якість ремонту" },
  { id: 38, category: "repair", title: "Що робити, якщо ремонт вийшов за межі початкового бюджету" },
  { id: 39, category: "repair", title: "Як підготувати квартиру до ремонту" },

  { id: 40, category: "lighting", title: "Скільки розеток потрібно у квартирі" },
  { id: 41, category: "lighting", title: "Як правильно спланувати електрику у квартирі" },
  { id: 42, category: "lighting", title: "Де розташовувати розетки та вимикачі" },
  { id: 43, category: "lighting", title: "Розетки на кухні: скільки потрібно і де їх розмістити" },
  { id: 44, category: "lighting", title: "Електрика у ванній кімнаті: що потрібно передбачити" },
  { id: 45, category: "lighting", title: "Як спланувати електрику у спальні" },
  { id: 46, category: "lighting", title: "Як правильно спланувати освітлення квартири" },
  { id: 47, category: "lighting", title: "Скільки світильників потрібно для кімнати" },
  { id: 48, category: "lighting", title: "Тепле чи холодне світло: яке обрати для інтер’єру" },
  { id: 49, category: "lighting", title: "Точкові світильники, треки чи люстра: що краще" },
  { id: 50, category: "lighting", title: "Як правильно спланувати підсвічування кухні" },
  { id: 51, category: "lighting", title: "Помилки в плануванні електрики та освітлення" },

  { id: 52, category: "kitchen", title: "Як правильно спланувати кухню" },
  { id: 53, category: "kitchen", title: "Пряма, кутова чи П-подібна кухня: що вибрати" },
  { id: 54, category: "kitchen", title: "Якою має бути зручна кухня" },
  { id: 55, category: "kitchen", title: "Правильна висота кухонної стільниці" },
  { id: 56, category: "kitchen", title: "Як правильно розмістити холодильник, мийку та плиту" },
  { id: 57, category: "kitchen", title: "Робочий трикутник на кухні: чи актуальний він сьогодні" },
  { id: 58, category: "kitchen", title: "Скільки місця потрібно залишити між кухонними меблями" },
  { id: 59, category: "kitchen", title: "Як правильно спланувати кухню-вітальню" },
  { id: 60, category: "kitchen", title: "Яку стільницю вибрати для кухні" },
  { id: 61, category: "kitchen", title: "Типові помилки під час проєктування кухні" },

  { id: 62, category: "furniture", title: "Меблі на замовлення чи готові: що краще" },
  { id: 63, category: "furniture", title: "Коли варто замовляти меблі за індивідуальним проєктом" },
  { id: 64, category: "furniture", title: "Як правильно спроєктувати шафу" },
  { id: 65, category: "furniture", title: "Як спланувати гардеробну систему" },
  { id: 66, category: "furniture", title: "Як спроєктувати зручну вбудовану кухню" },
  { id: 67, category: "furniture", title: "Як правильно спланувати меблі у вітальні" },
  { id: 68, category: "furniture", title: "Меблі до стелі: переваги та недоліки" },
  { id: 69, category: "furniture", title: "Як вибрати матеріали для корпусних меблів" },
  { id: 70, category: "furniture", title: "Фурнітура для меблів: на чому варто економити, а на чому ні" },
  { id: 71, category: "furniture", title: "Як дизайнер створює індивідуальні меблі під конкретний інтер’єр" },

  { id: 72, category: "materials", title: "Як вибрати підлогове покриття для квартири" },
  { id: 73, category: "materials", title: "Кварц-вініл, ламінат чи паркет: що вибрати" },
  { id: 74, category: "materials", title: "Як вибрати плитку для ванної кімнати" },
  { id: 75, category: "materials", title: "Як вибрати плитку для кухні" },
  { id: 76, category: "materials", title: "Фарба чи шпалери: що краще для стін" },
  { id: 77, category: "materials", title: "Як правильно вибрати колір стін" },
  { id: 78, category: "materials", title: "Як поєднувати кольори в інтер’єрі" },
  { id: 79, category: "materials", title: "Як поєднувати дерево, камінь, метал і текстиль" },
  { id: 80, category: "materials", title: "Матеріали, які виглядають дорого: як створити дорогий інтер’єр без зайвих витрат" },
  { id: 81, category: "materials", title: "Як вибрати двері для сучасного інтер’єру" },
  { id: 82, category: "materials", title: "Які матеріали найкраще підходять для квартири з дітьми" },

  { id: 83, category: "styles", title: "Як вибрати стиль інтер’єру для квартири" },
  { id: 84, category: "styles", title: "Сучасний стиль інтер’єру: основні принципи" },
  { id: 85, category: "styles", title: "Мінімалізм в інтер’єрі: коли він справді працює" },
  { id: 86, category: "styles", title: "Скандинавський стиль: основні принципи" },
  { id: 87, category: "styles", title: "Japandi: як створити спокійний сучасний інтер’єр" },
  { id: 88, category: "styles", title: "Неокласика в сучасному інтер’єрі" },
  { id: 89, category: "styles", title: "Як не зробити інтер’єр застарілим через кілька років" },
  { id: 90, category: "styles", title: "Тренди дизайну інтер’єру 2026 року: що залишиться актуальним надовго" },

  { id: 91, category: "practice", title: "Як дизайнер приймає рішення під час створення інтер’єру" },
  { id: 92, category: "practice", title: "Як дизайнер допомагає заощадити під час ремонту" },
  { id: 93, category: "practice", title: "Що дизайнер враховує під час планування квартири" },
  { id: 94, category: "practice", title: "Як підбираються матеріали для конкретного інтер’єру" },
  { id: 95, category: "practice", title: "Як підбираються меблі та освітлення" },
  { id: 96, category: "practice", title: "Чому красивий інтер’єр на фото не завжди зручний у житті" },
  { id: 97, category: "practice", title: "Як зробити інтер’єр красивим і практичним одночасно" },
  { id: 98, category: "practice", title: "Авторський нагляд: що це таке і навіщо він потрібен" },
  { id: 99, category: "practice", title: "Як уникнути помилок під час реалізації дизайн-проєкту" },
  { id: 100, category: "practice", title: "Від ідеї до готового інтер’єру: як відбувається реалізація проєкту" },
];
