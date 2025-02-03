import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Award, Users, Car, Wrench } from 'lucide-react';
import Link from 'next/link';

const advantages = [
  {
    icon: Award,
    title: 'Гарантия качества',
    description: 'Все автомобили проходят тщательную техническую проверку'
  },
  {
    icon: Users,
    title: 'Опытные специалисты',
    description: 'Наши сотрудники имеют многолетний опыт работы в автобизнесе'
  },
  {
    icon: Car,
    title: 'Большой выбор',
    description: 'Более 1000 автомобилей в наличии от ведущих производителей'
  },
  {
    icon: Wrench,
    title: 'Сервисное обслуживание',
    description: 'Собственный сервисный центр и оригинальные запчасти'
  }
];

const contacts = [
  {
    icon: MapPin,
    title: 'Адрес',
    info: 'Москва, ул. Автомобильная, 1',
    link: 'https://maps.google.com'
  },
  {
    icon: Phone,
    title: 'Телефон',
    info: '+7 (123) 456-78-90',
    link: 'tel:+71234567890'
  },
  {
    icon: Mail,
    title: 'Email',
    info: 'info@autosalon.ru',
    link: 'mailto:info@autosalon.ru'
  },
  {
    icon: Clock,
    title: 'Режим работы',
    info: 'Ежедневно с 9:00 до 21:00'
  }
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Главная секция */}
      <section className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">О нашем автосалоне</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Мы являемся одним из крупнейших автосалонов в Кыргызстане, предлагающим широкий выбор 
            новых и подержанных автомобилей. Наша миссия - помочь каждому клиенту найти 
            идеальный автомобиль, соответствующий его потребностям и бюджету.
          </p>
          <div className="flex gap-4">
            <Link href="/catalog">
              <Button size="lg">Смотреть каталог</Button>
            </Link>
            <Link href="/contacts">
              <Button variant="outline" size="lg">Связаться с нами</Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src="/images/showroom.jpg"
            alt="Наш автосалон"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Преимущества */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Наши преимущества</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-card text-card-foreground hover:shadow-lg transition-shadow"
            >
              <advantage.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground">{advantage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* История компании */}
      <section className="mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src="/images/history.jpg"
              alt="История компании"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">История компании</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Наша компания была основана в 2010 году и за это время прошла путь от небольшого 
                автосалона до одного из крупнейших дилерских центров в Бишкеке.
              </p>
              <p className="text-muted-foreground">
                Мы постоянно развиваемся, расширяем ассортимент и улучшаем качество обслуживания. 
                Наши клиенты ценят нас за профессионализм, честность и индивидуальный подход.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Контактная информация</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-card text-card-foreground hover:shadow-lg transition-shadow"
            >
              <contact.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{contact.title}</h3>
              {contact.link ? (
                <a
                  href={contact.link}
                  className="text-primary hover:underline"
                  target={contact.link.startsWith('http') ? '_blank' : undefined}
                  rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {contact.info}
                </a>
              ) : (
                <p className="text-muted-foreground">{contact.info}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Сертификаты */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Сертификаты и награды</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="relative aspect-[3/4] rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
            >
              <Image
                src={`/images/certificate-${index}.jpg`}
                alt={`Сертификат ${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 