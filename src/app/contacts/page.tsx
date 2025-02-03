'use client';

import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Адрес',
    description: 'Бишкек, ул. Киевская, 77',
    link: 'https://maps.google.com'
  },
  {
    icon: Phone,
    title: 'Телефон',
    description: '+996 (555) 123-456',
    link: 'tel:+996555123456'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'info@autosalon.kg',
    link: 'mailto:info@autosalon.kg'
  },
  {
    icon: Clock,
    title: 'Режим работы',
    description: 'Ежедневно с 9:00 до 21:00'
  },
  {
    icon: MessageSquare,
    title: 'Мессенджеры',
    description: 'WhatsApp, Telegram',
    link: 'https://wa.me/996555123456'
  }
];

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12">Контакты</h1>

      <div className="grid lg:grid-cols-[1fr_400px] gap-12 mb-12">
        {/* Карта */}
        <div className="rounded-lg overflow-hidden h-[400px] bg-muted">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.2233106731744!2d74.58746707675395!3d42.87631770261402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb7dc91b3c881%3A0x492ebaf57cdee27d!2z0YPQuy4g0JrQuNC10LLRgdC60LDRjywg0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1690374523038!5m2!1sru!2skg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Контактная информация */}
        <div className="space-y-6">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-card text-card-foreground hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <item.icon className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-primary hover:underline"
                      target={item.link.startsWith('http') ? '_blank' : undefined}
                      rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {item.description}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 