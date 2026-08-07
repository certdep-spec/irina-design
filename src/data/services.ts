export interface Service {
  title: string;
  description: string;
  icon?: string;
}

export const services: Service[] = [
  {
    title: 'Індивідуальний підхід',
    description: 'Кожен проєкт унікальний. Ми враховуємо ваші побажання, спосіб життя та бюджет.'
  },
  {
    title: '3D-візуалізація',
    description: "Фотореалістичні зображення майбутнього інтер'єру перед початком ремонту."
  },
  {
    title: 'Авторський нагляд',
    description: 'Контроль всіх етапів реалізації проєкту для ідеального результату.'
  }
];
