export default function ContactsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Наш адрес</h2>
          <p className="text-muted-foreground">
            г. Москва, ул. Примерная, д. 123
          </p>
          <p className="text-muted-foreground mt-2">
            Телефон: +7 (123) 456-78-90
          </p>
          <p className="text-muted-foreground mt-2">
            Email: info@autosalon.ru
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">Время работы</h2>
          <p className="text-muted-foreground">
            Пн-Пт: 9:00 - 20:00
            <br />
            Сб-Вс: 10:00 - 18:00
          </p>
        </div>

        <div className="h-[400px] bg-muted rounded-lg">
          {/* Здесь можно добавить карту */}
        </div>
      </div>
    </div>
  );
} 