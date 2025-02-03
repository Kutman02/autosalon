export default function AboutPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">О нас</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          Мы являемся одним из ведущих автосалонов в регионе, предлагающим широкий выбор
          новых и подержанных автомобилей от ведущих производителей.
        </p>
        <h2>Наши преимущества</h2>
        <ul>
          <li>Более 10 лет на рынке</li>
          <li>Гарантия на все автомобили</li>
          <li>Профессиональный сервис</li>
          <li>Выгодные условия кредитования</li>
        </ul>
      </div>
    </div>
  );
} 