import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const heroes = {
  AI_ARCHITECT: {
    emoji: "🤖",
    title: "Архитектор ИИ",
    image: "/heroes/ai-architect.jpg",
    subtitle: "Ты создаёшь интеллект будущего и учишь машины понимать мир.",
    description: "Твой путь — искусственный интеллект, машинное обучение, компьютерное зрение, NLP и исследовательская разработка.",
    professions: ["AI Engineer", "ML Engineer", "AI Researcher", "NLP Engineer", "Computer Vision Engineer"],
    directions: ["Математика и компьютерные науки", "Фундаментальная информатика и информационные технологии"],
    companies: ["Яндекс", "Сбер AI", "MTS AI", "VK", "Т-Банк"],
    salary: "120–500 тыс. ₽+",
    accent: "#6df7ff",
  },
  DATA_HUNTER: {
    emoji: "📊",
    title: "Охотник за данными",
    image: "/heroes/data-hunter.jpg",
    subtitle: "Ты находишь закономерности там, где другие видят только цифры.",
    description: "Твой путь — данные, аналитика, прогнозы, BI-системы и модели, которые помогают принимать решения.",
    professions: ["Data Scientist", "Data Analyst", "BI Analyst", "Product Analyst", "Quant Analyst"],
    directions: ["Прикладная математика и программирование", "Математика и компьютерные науки"],
    companies: ["Сбер", "Альфа-Банк", "Яндекс", "Ozon", "Wildberries"],
    salary: "100–400 тыс. ₽+",
    accent: "#63ff9a",
  },
  PRODUCT_BUILDER: {
    emoji: "🚀",
    title: "Создатель продуктов",
    image: "/heroes/product-builder.jpg",
    subtitle: "Ты превращаешь идеи в цифровые продукты, которыми пользуются миллионы.",
    description: "Твой путь — разработка, продуктовая инженерия, мобильные приложения, веб-сервисы и платформы.",
    professions: ["Backend Developer", "Frontend Developer", "Fullstack Developer", "Mobile Developer", "Software Engineer"],
    directions: ["Прикладная информатика", "Фундаментальная информатика и информационные технологии"],
    companies: ["Яндекс", "VK", "Авито", "Ozon", "Т-Банк"],
    salary: "90–350 тыс. ₽+",
    accent: "#ff9d26",
  },
  SYSTEM_ARCHITECT: {
    emoji: "🛡",
    title: "Архитектор систем",
    image: "/heroes/system-architect.jpg",
    subtitle: "Ты проектируешь надёжные системы, которые работают без сбоев.",
    description: "Твой путь — инфраструктура, системная архитектура, DevOps, SRE и кибербезопасность.",
    professions: ["DevOps Engineer", "System Architect", "SRE Engineer", "Infrastructure Engineer", "Cybersecurity Specialist"],
    directions: ["Фундаментальная информатика и информационные технологии", "Прикладная информатика"],
    companies: ["Positive Technologies", "Лаборатория Касперского", "VK", "Ростелеком", "Сбер"],
    salary: "120–500 тыс. ₽+",
    accent: "#9b5cff",
  },
  DIGITAL_STRATEGIST: {
    emoji: "👑",
    title: "Цифровой стратег",
    image: "/heroes/digital-strategist.jpg",
    subtitle: "Ты соединяешь технологии, людей и бизнес, создавая сильные цифровые продукты.",
    description: "Твой путь — управление IT-продуктами, бизнес-анализ, проектное управление и цифровая трансформация.",
    professions: ["Product Manager", "Business Analyst", "Project Manager", "Digital Consultant", "IT Consultant"],
    directions: ["Бизнес-информатика", "Прикладная информатика"],
    companies: ["Сбер", "Альфа-Банк", "Яндекс", "VK", "Ozon"],
    salary: "100–400 тыс. ₽+",
    accent: "#ffd166",
  },
  RESEARCHER: {
    emoji: "🧠",
    title: "Исследователь",
    image: "/heroes/researcher.jpg",
    subtitle: "Ты любишь доказывать, открывать и находить новые законы и модели.",
    description: "Твой путь — математика, алгоритмы, моделирование, исследования и научные задачи, на которых держатся технологии.",
    professions: ["Исследователь", "Научный сотрудник", "Математик-моделист", "Разработчик алгоритмов", "Research Scientist"],
    directions: ["Математика", "Математика и компьютерные науки"],
    companies: ["R&D-центры", "Яндекс Research", "Сбер AI", "университеты", "научные институты"],
    salary: "80–350 тыс. ₽+",
    accent: "#3ad7ff",
  },
  WORLD_ARCHITECT: {
    emoji: "🎮",
    title: "Архитектор цифровых миров",
    image: "/heroes/world-architect.jpg",
    subtitle: "Ты создаёшь виртуальные миры, игры и интерактивные платформы.",
    description: "Твой путь — game development, AR/VR, 3D, интерфейсы, игровые механики и цифровые среды.",
    professions: ["Game Developer", "Unity Developer", "AR/VR Developer", "3D Developer", "Technical Artist"],
    directions: ["Прикладная информатика", "Фундаментальная информатика и информационные технологии"],
    companies: ["VK Play", "MY.GAMES", "Яндекс", "инди-студии", "EdTech-компании"],
    salary: "90–300 тыс. ₽+",
    accent: "#ff4fd8",
  },
  INFRA_GUARDIAN: {
    emoji: "⚡",
    title: "Хранитель инфраструктуры",
    image: "/heroes/infra-guardian.jpg",
    subtitle: "Ты обеспечиваешь работу сервисов и защиту данных миллионов пользователей.",
    description: "Твой путь — серверы, облака, сети, базы данных, автоматизация и стабильность больших систем.",
    professions: ["System Administrator", "DevOps Engineer", "Cloud Engineer", "Network Engineer", "Database Administrator"],
    directions: ["Фундаментальная информатика и информационные технологии", "Прикладная информатика"],
    companies: ["VK", "Яндекс Cloud", "Сбер", "Ростелеком", "Ozon"],
    salary: "100–400 тыс. ₽+",
    accent: "#45e7ff",
  },
  FUTURE_PREDICTOR: {
    emoji: "🔮",
    title: "Предсказатель будущего",
    image: "/heroes/future-predictor.jpg",
    subtitle: "Ты строишь модели и прогнозы, которые помогают принимать важные решения.",
    description: "Твой путь — прогнозирование, риск-анализ, ML-модели, статистика и прикладная математика.",
    professions: ["Data Scientist", "ML Engineer", "Quant Analyst", "Forecasting Analyst", "Risk Analyst"],
    directions: ["Прикладная математика и программирование", "Математика"],
    companies: ["Альфа-Банк", "Сбер", "Т-Банк", "Яндекс", "страховые и финтех-компании"],
    salary: "110–450 тыс. ₽+",
    accent: "#63ff9a",
  },
  PRODUCT_MASTER: {
    emoji: "💼",
    title: "Повелитель продуктов",
    image: "/heroes/product-master.jpg",
    subtitle: "Ты управляешь продуктами и командами, делая мир удобнее и лучше.",
    description: "Твой путь — продуктовая стратегия, управление командами, гипотезы, метрики, запуск и развитие цифровых сервисов.",
    professions: ["Product Manager", "Product Owner", "Project Manager", "Scrum Master", "Delivery Manager"],
    directions: ["Бизнес-информатика", "Прикладная информатика"],
    companies: ["Сбер", "Альфа-Банк", "Ozon", "Яндекс", "VK"],
    salary: "120–450 тыс. ₽+",
    accent: "#ffd166",
  },
};

function pickHero(code) {
  const clean = code.toUpperCase().replace(/[^ABCD]/g, "").slice(0, 4);

  if (clean.length === 0) return null;

  // Специальные коды для презентации.
  // Они позволяют заранее проверить и красиво показать конкретные примеры.
  const exact = {
    AAAA: "FUTURE_PREDICTOR",
    AAAB: "DATA_HUNTER",
    AAAC: "AI_ARCHITECT",
    AAAD: "DIGITAL_STRATEGIST",

    AABB: "INFRA_GUARDIAN",
    ABAB: "SYSTEM_ARCHITECT",
    ABBA: "SYSTEM_ARCHITECT",

    AACA: "AI_ARCHITECT",
    ABCA: "AI_ARCHITECT",

    BBBB: "INFRA_GUARDIAN",
    BBBA: "SYSTEM_ARCHITECT",
    BBBC: "SYSTEM_ARCHITECT",
    BBBD: "INFRA_GUARDIAN",

    CCCC: "WORLD_ARCHITECT",
    CCCA: "PRODUCT_BUILDER",
    CCCB: "WORLD_ARCHITECT",
    CCCD: "PRODUCT_BUILDER",

    CCAD: "PRODUCT_MASTER",

    DDDD: "DIGITAL_STRATEGIST",
    DDDA: "DIGITAL_STRATEGIST",

    DDCD: "PRODUCT_MASTER",
    DCCD: "PRODUCT_MASTER",
  };

  if (clean.length === 4 && exact[clean]) {
    return exact[clean];
  }

  const scores = {
    AI_ARCHITECT: 0,
    DATA_HUNTER: 0,
    PRODUCT_BUILDER: 0,
    SYSTEM_ARCHITECT: 0,
    DIGITAL_STRATEGIST: 0,
    RESEARCHER: 0,
    WORLD_ARCHITECT: 0,
    INFRA_GUARDIAN: 0,
    FUTURE_PREDICTOR: 0,
    PRODUCT_MASTER: 0,
  };

  const add = (hero, value) => {
    scores[hero] += value;
  };

  const [p1, p2, p3, p4] = clean.split("");

  // 1. Суперсила
  if (p1 === "A") {
    add("FUTURE_PREDICTOR", 3);
    add("DATA_HUNTER", 2);
    add("RESEARCHER", 1);
  }

  if (p1 === "B") {
    add("INFRA_GUARDIAN", 3);
    add("SYSTEM_ARCHITECT", 2);
  }

  if (p1 === "C") {
    add("PRODUCT_BUILDER", 3);
    add("WORLD_ARCHITECT", 2);
    add("AI_ARCHITECT", 1);
  }

  if (p1 === "D") {
    add("DIGITAL_STRATEGIST", 3);
    add("PRODUCT_MASTER", 2);
  }

  // 2. Область знаний
  if (p2 === "A") {
    add("RESEARCHER", 3);
    add("DATA_HUNTER", 2);
    add("FUTURE_PREDICTOR", 1);
  }

  if (p2 === "B") {
    add("AI_ARCHITECT", 3);
    add("PRODUCT_BUILDER", 2);
    add("SYSTEM_ARCHITECT", 1);
  }

  if (p2 === "C") {
    add("SYSTEM_ARCHITECT", 2);
    add("INFRA_GUARDIAN", 2);
    add("WORLD_ARCHITECT", 1);
    add("AI_ARCHITECT", 1);
  }

  if (p2 === "D") {
    add("DIGITAL_STRATEGIST", 3);
    add("PRODUCT_MASTER", 3);
  }

  // 3. Новая технология
  if (p3 === "A") {
    add("DATA_HUNTER", 3);
    add("RESEARCHER", 2);
    add("FUTURE_PREDICTOR", 2);
  }

  if (p3 === "B") {
    add("SYSTEM_ARCHITECT", 3);
    add("INFRA_GUARDIAN", 3);
  }

  if (p3 === "C") {
    add("PRODUCT_BUILDER", 3);
    add("WORLD_ARCHITECT", 2);
    add("AI_ARCHITECT", 2);
  }

  if (p3 === "D") {
    add("DIGITAL_STRATEGIST", 3);
    add("PRODUCT_MASTER", 3);
  }

  // 4. Город будущего
  if (p4 === "A") {
    add("FUTURE_PREDICTOR", 4);
    add("DATA_HUNTER", 2);
  }

  if (p4 === "B") {
    add("INFRA_GUARDIAN", 4);
    add("SYSTEM_ARCHITECT", 2);
  }

  if (p4 === "C") {
    add("AI_ARCHITECT", 3);
    add("WORLD_ARCHITECT", 3);
    add("PRODUCT_BUILDER", 2);
  }

  if (p4 === "D") {
    add("PRODUCT_MASTER", 4);
    add("DIGITAL_STRATEGIST", 2);
  }

  const tieBreaker = [
    "AI_ARCHITECT",
    "FUTURE_PREDICTOR",
    "DATA_HUNTER",
    "INFRA_GUARDIAN",
    "SYSTEM_ARCHITECT",
    "PRODUCT_BUILDER",
    "WORLD_ARCHITECT",
    "PRODUCT_MASTER",
    "DIGITAL_STRATEGIST",
    "RESEARCHER",
  ];

  return tieBreaker.sort((a, b) => scores[b] - scores[a])[0];
}


function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  function navigate(nextPath) {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  }
  window.onpopstate = () => setPath(window.location.pathname);
  return { path, navigate };
}

function ListBlock({ title, items }) {
  return (
    <div className="info-card">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function Landing({ navigate }) {
  const [code, setCode] = useState("");

  function submit(e) {
    e.preventDefault();
    const clean = code.toUpperCase().replace(/[^ABCD]/g, "");
    if (clean) navigate(`/hero/${clean}`);
  }

  return (
    <main className="landing">
      <div className="background-grid" />
      <section className="intro">
        <div className="content">
          <p className="kicker">Мастер-класс</p>
          <h1>КОД<br />ДОСТУПА<br />В IT</h1>
          <p className="subtitle">
            Введи код, который ты получил на мастер-классе, и открой своего IT-героя.
          </p>

          <form className="code-panel" onSubmit={submit}>
            <label htmlFor="code">Твой код доступа</label>
            <div className="input-row">
              <input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ABCA"
                maxLength={6}
                autoFocus
              />
              <button type="submit">Открыть доступ</button>
            </div>
            <p className="hint">
              Код состоит из букв A, B, C, D. Не показывай его соседу — результат может отличаться.
            </p>
          </form>
        </div>

        <div className="visual portal-visual" aria-hidden="true">
          <div className="portal-glow" />
          <div className="portal-frame" />
          <div className="secret-card">
            <span>?</span>
            <b>ПЕРСОНАЖ<br />ЗАШИФРОВАН</b>
          </div>
          <div className="data-lines">
            {Array.from({ length: 16 }).map((_, i) => <i key={i} />)}
          </div>
          <p className="faculty">Факультет физико-математических и естественных наук</p>
        </div>
      </section>
    </main>
  );
}

function HeroResult({ hero, code, navigate }) {
  return (
    <main className="result-page" style={{ "--accent": hero.accent }}>
      <div className="result-top">
        <div className="pill">Код принят: {code}</div>
        <button className="ghost-button" onClick={() => navigate("/")}>Ввести другой код</button>
      </div>

      <section className="hero-card-main">
        <div className="portrait">
          <img src={hero.image} alt={hero.title} />
        </div>
        <div className="hero-copy">
          <p className="small-label">Твой IT-герой</p>
          <h1><span>{hero.emoji}</span> {hero.title}</h1>
          <h2>{hero.subtitle}</h2>
          <p className="description">{hero.description}</p>
        </div>
      </section>

      <section className="cards-grid">
        <ListBlock title="Базовые профессии" items={hero.professions} />
        <ListBlock title="Направления факультета" items={hero.directions} />
        <ListBlock title="Где можно работать" items={hero.companies} />
        <div className="info-card salary-card">
          <h3>Ориентир по рынку</h3>
          <div className="salary">{hero.salary}</div>
          <p>Зависит от опыта, региона, компании и уровня задач.</p>
        </div>
      </section>
    </main>
  );
}

function App() {
  const { path, navigate } = useRoute();
  const match = path.match(/^\/hero\/([A-Da-d]+)$/);
  const code = match?.[1]?.toUpperCase();

  const heroKey = useMemo(() => code ? pickHero(code) : null, [code]);
  const hero = heroKey ? heroes[heroKey] : null;

  if (code && hero) return <HeroResult hero={hero} code={code} navigate={navigate} />;
  return <Landing navigate={navigate} />;
}

createRoot(document.getElementById("root")).render(<App />);
