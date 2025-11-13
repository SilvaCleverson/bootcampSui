import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode, FC } from "react";

type Language = "pt-BR" | "en-US" | "es-ES";

const translations = {
  "pt-BR": {
    app: {
      title: "CronoCapilar",
      subtitle: "Transforma sua rotina capilar em prova on-chain de autocuidado",
      website: "cronogramacapilar.com.br",
    },
    checkin: {
      title: "CronoCapilar",
      description: "Transforma sua rotina capilar em prova on-chain de autocuidado",
      notConnected: "Não conectado",
      connect: "Conectar",
      streak: "Sequência",
      lastCheckIn: "Último check-in",
      checkInToday: "Fazer check-in hoje",
      processing: "Processando...",
      checkInDone: "Check-in concluído! Sequência: {streak}",
      localTestMode: "Modo de teste local. Transação on-chain será adicionada depois.",
      noData: "—",
    },
    footer: {
      builtFor: "Criado para Sui Blockchain",
      madeWithLove: "Feito com amor",
    },
    language: {
      pt: "Português",
      en: "English",
    },
    treatments: {
      hydration: "Hidratação",
      nutrition: "Nutrição",
      reconstruction: "Reconstrução",
      selectToday: "Qual tratamento você fez hoje?",
      confirmCheckIn: "Confirmar Check-in",
      registerToday: "Registrar Tratamento de Hoje",
      yourTotal: "Seu Total",
      treatmentCount: "tratamentos",
      loadingProfile: "Carregando...",
      checkInSuccess: "Check-in registrado!",
      checkInAlert: "Total:",
    },
    profile: {
      title: "Perfil de Cuidados Capilares",
      statistics: "Estatísticas",
      streak: "Sequência",
      myTreatments: "Meus Tratamentos de Cuidados Capilares",
      level: "Nível",
      days: "dias",
      day: "dia",
    },
    bigchop: {
      title: "Big Chop",
      subtitle: "Sua data do Big Chop",
      description: "O dia que você começou sua jornada natural",
      placeholder: "Selecione a data",
      save: "Salvar",
      saved: "Salvo em",
      daysAgo: "dias atrás",
      today: "hoje",
      calculate: "Calcular dias",
      noBigChop: "Não registrado",
    },
    community: {
      title: "Comunidade CronoCapilar",
      challenge: "Desafio do Mês",
      ranking: "Seu Ranking",
      days: "21 dias de hidratação",
      position: "#42 da comunidade",
    },
    hairTypes: {
      title: "Tipo de cabelo",
      escolha: "Escolha",
      liso: "Liso (Tipo 1)",
      ondulado: "Ondulado (Tipo 2)",
      cacheado: "Cacheado (Tipo 3)",
      crespo: "Crespo / Afro (Tipo 4)",
      description: {
        liso: "Foco em hidratação e controle de oleosidade para cuidados capilares",
        ondulado: "Foco em hidratação e nutrição moderada para cuidados capilares",
        cacheado: "Foco em nutrição profunda e hidratação para cuidados capilares",
        crespo: "Foco em nutrição intensa e hidratação profunda para cuidados capilares",
      },
    },
    hairLength: {
      title: "Comprimento atual",
      placeholder: "Digite em cm",
      unit: "cm",
      label: "Comprimento do cabelo",
    },
    hairTexture: {
      title: "Textura do cabelo",
      escolha: "Escolha",
      oleoso: "Oleoso",
      seco: "Seco",
      normal: "Normal",
      misto: "Misto",
      description: {
        oleoso: "Cabelo que produz muito óleo naturalmente - cuidados capilares focados em controle",
        seco: "Cabelo que falta oleosidade e umidade - cuidados capilares focados em hidratação",
        normal: "Cabelo equilibrado - cuidados capilares de manutenção",
        misto: "Oleoso na raiz, seco nas pontas - cuidados capilares diferenciados",
      },
    },
  },
  "en-US": {
    app: {
      title: "CronoCapilar",
      subtitle: "Turn your haircare routine into onchain proof of self-care",
      website: "cronogramacapilar.com.br",
    },
    checkin: {
      title: "CronoCapilar",
      description: "Turn your haircare routine into onchain proof of self-care",
      notConnected: "Not connected",
      connect: "Connect",
      streak: "Streak",
      lastCheckIn: "Last check-in",
      checkInToday: "Check-in for today",
      processing: "Processing...",
      checkInDone: "Check-in done! Streak: {streak}",
      localTestMode: "Local test mode. On-chain tx will be added later.",
      noData: "—",
    },
    footer: {
      builtFor: "Built for Sui Blockchain",
      madeWithLove: "Made with love",
    },
    language: {
      pt: "Português",
      en: "English",
    },
    treatments: {
      hydration: "Hydration",
      nutrition: "Nutrition",
      reconstruction: "Reconstruction",
      selectToday: "Which treatment did you do today?",
      confirmCheckIn: "Confirm Check-in",
      registerToday: "Register Today's Treatment",
      yourTotal: "Your Total",
      treatmentCount: "treatments",
      loadingProfile: "Loading...",
      checkInSuccess: "Check-in registered!",
      checkInAlert: "Total:",
    },
    profile: {
      title: "Hair Care Profile",
      statistics: "Statistics",
      streak: "Streak",
      myTreatments: "My Hair Care Treatments",
      level: "Level",
      days: "days",
      day: "day",
    },
    bigchop: {
      title: "Big Chop",
      subtitle: "Your Big Chop Date",
      description: "The day you started your natural journey",
      placeholder: "Select the date",
      save: "Save",
      saved: "Saved on",
      daysAgo: "days ago",
      today: "today",
      calculate: "Calculate days",
      noBigChop: "Not registered",
    },
    community: {
      title: "CronoCapilar Community",
      challenge: "Monthly Challenge",
      ranking: "Your Ranking",
      days: "21 days of hydration",
      position: "#42 in community",
    },
    hairTypes: {
      title: "Hair type",
      escolha: "Choose",
      liso: "Straight (Type 1)",
      ondulado: "Wavy (Type 2)",
      cacheado: "Curly (Type 3)",
      crespo: "Coily / Afro (Type 4)",
      description: {
        liso: "Focus on hydration and oiliness control for hair care",
        ondulado: "Focus on hydration and moderate nutrition for hair care",
        cacheado: "Focus on deep nutrition and hydration for hair care",
        crespo: "Focus on intense nutrition and deep hydration for hair care",
      },
    },
    hairLength: {
      title: "Current length",
      placeholder: "Enter in inches",
      unit: "inches",
      label: "Hair length",
    },
    hairTexture: {
      title: "Hair texture",
      escolha: "Choose",
      oleoso: "Oily",
      seco: "Dry",
      normal: "Normal",
      misto: "Combination",
      description: {
        oleoso: "Hair that produces a lot of natural oil - hair care focused on control",
        seco: "Hair lacking oil and moisture - hair care focused on hydration",
        normal: "Balanced hair - maintenance hair care",
        misto: "Oily at roots, dry at ends - differentiated hair care",
      },
    },
  },
  "es-ES": {
    app: {
      title: "CronoCapilar",
      subtitle: "Transforma tu rutina capilar en prueba on-chain de autocuidado",
      website: "cronogramacapilar.com.br",
    },
    checkin: {
      title: "CronoCapilar",
      description: "Transforma tu rutina capilar en prueba on-chain de autocuidado",
      notConnected: "No conectado",
      connect: "Conectar",
      streak: "Racha",
      lastCheckIn: "Último check-in",
      checkInToday: "Check-in de hoy",
      processing: "Procesando...",
      checkInDone: "¡Check-in completado! Racha: {streak}",
      localTestMode: "Modo de prueba local. Transacción on-chain se agregará después.",
      noData: "—",
    },
    footer: {
      builtFor: "Creado para Sui Blockchain",
      madeWithLove: "Hecho con amor",
    },
    language: {
      pt: "Português",
      en: "English",
      es: "Español",
    },
    treatments: {
      hydration: "Hidratación",
      nutrition: "Nutrición",
      reconstruction: "Reconstrucción",
      selectToday: "¿Qué tratamiento hiciste hoy?",
      confirmCheckIn: "Confirmar Check-in",
      registerToday: "Registrar Tratamiento de Hoy",
      yourTotal: "Tu Total",
      treatmentCount: "tratamientos",
      loadingProfile: "Cargando...",
      checkInSuccess: "¡Check-in registrado!",
      checkInAlert: "Total:",
    },
    profile: {
      title: "Perfil de Cuidados Capilares",
      statistics: "Estadísticas",
      streak: "Racha",
      myTreatments: "Mis Tratamientos de Cuidados Capilares",
      level: "Nivel",
      days: "días",
      day: "día",
    },
    bigchop: {
      title: "Big Chop",
      subtitle: "Tu Fecha del Big Chop",
      description: "El día que comenzaste tu viaje natural",
      placeholder: "Selecciona la fecha",
      save: "Guardar",
      saved: "Guardado el",
      daysAgo: "días atrás",
      today: "hoy",
      calculate: "Calcular días",
      noBigChop: "No registrado",
    },
    community: {
      title: "Comunidad CronoCapilar",
      challenge: "Desafío del Mes",
      ranking: "Tu Ranking",
      days: "21 días de hidratación",
      position: "#42 en la comunidad",
    },
    hairTypes: {
      title: "Tipo de cabello",
      escolha: "Elige",
      liso: "Liso (Tipo 1)",
      ondulado: "Ondulado (Tipo 2)",
      cacheado: "Rizado (Tipo 3)",
      crespo: "Crespo / Afro (Tipo 4)",
      description: {
        liso: "Enfoque en hidratación y control de oleosidad para cuidados capilares",
        ondulado: "Enfoque en hidratación y nutrición moderada para cuidados capilares",
        cacheado: "Enfoque en nutrición profunda e hidratación para cuidados capilares",
        crespo: "Enfoque en nutrición intensa e hidratación profunda para cuidados capilares",
      },
    },
    hairLength: {
      title: "Longitud actual",
      placeholder: "Ingresa en cm",
      unit: "cm",
      label: "Longitud del cabello",
    },
    hairTexture: {
      title: "Textura del cabello",
      escolha: "Elige",
      oleoso: "Graso",
      seco: "Seco",
      normal: "Normal",
      misto: "Mixto",
      description: {
        oleoso: "Cabello que produce mucho aceite naturalmente - cuidados capilares enfocados en control",
        seco: "Cabello que carece de oleosidad y humedad - cuidados capilares enfocados en hidratación",
        normal: "Cabello equilibrado - cuidados capilares de mantenimiento",
        misto: "Graso en la raíz, seco en las puntas - cuidados capilares diferenciados",
      },
    },
  },
};

type TranslationKeys = typeof translations["pt-BR"];

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Função para detectar idioma automaticamente
function detectLanguage(): Language {
  if (typeof window === "undefined") return "en-US";
  
  const browserLang = navigator.language || (navigator as any).userLanguage || "en-US";
  
  // Mapear idiomas do navegador para nossos idiomas suportados
  if (browserLang.startsWith("pt")) {
    return "pt-BR";
  } else if (browserLang.startsWith("es")) {
    return "es-ES";
  } else {
    return "en-US";
  }
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  // Iniciar com um idioma padrão para evitar erro de hidratação
  const [language, setLanguage] = useState<Language>("en-US");
  const [isClient, setIsClient] = useState(false);

  // Detectar idioma apenas no cliente após a hidratação
  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem("cronocapilar_language") as Language | null;
    if (savedLang && ["pt-BR", "en-US", "es-ES"].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      const detectedLang = detectLanguage();
      setLanguage(detectedLang);
    }
  }, []);

  // Salvar idioma quando mudar
  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      localStorage.setItem("cronocapilar_language", language);
    }
  }, [language, isClient]);

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </I18nContext.Provider>
  ) as React.ReactElement;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

// Helper function to replace placeholders in strings
export function formatTranslation(text: string, params: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key]?.toString() ?? match;
  });
}

