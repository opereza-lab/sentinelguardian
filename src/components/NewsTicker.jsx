import React, { useState, useEffect } from "react";
import { Radio } from "lucide-react";
import { useLang } from "./LanguageContext";

// Keywords for conflict/disaster news - optimized for the app's purpose
const KEYWORDS = "war OR conflict OR attack OR bombing OR missile OR airstrike OR earthquake OR tsunami OR flood OR hurricane OR tornado OR terrorism OR terrorist OR explosion OR shooting OR massacre OR coup OR invasion OR ceasefire OR hostage OR kidnapping OR refugee OR displacement OR sanctions OR nuclear OR Trump OR Putin OR \"Strait of Hormuz\" OR Macron OR \"Pedro Sanchez\" OR Meloni OR Greenland OR Ukraine OR Gaza";

const LIVE_LABEL = {
  es: "EN VIVO", en: "LIVE", fr: "EN DIRECT",
  pt: "AO VIVO", it: "IN DIRETTA", ar: "مباشر", zh: "直播",
};

// Static fallback headlines per language (used when all APIs fail)
const STATIC_HEADLINES = {
  es: [
    { title: "Últimas noticias de conflictos y emergencias mundiales — Reuters", url: "https://www.reuters.com/world" },
    { title: "Cobertura de conflictos armados en tiempo real — BBC Mundo", url: "https://www.bbc.com/mundo" },
    { title: "Alertas de catástrofes naturales y emergencias — Al Jazeera", url: "https://www.aljazeera.com/news" },
    { title: "Últimas alertas sísmicas y tsunamis — USGS", url: "https://www.usgs.gov/natural-hazards" },
    { title: "Noticias de zonas de conflicto activo — AP News", url: "https://apnews.com/world-news" },
    { title: "Alertas de emergencia y protección civil — OCHA", url: "https://www.unocha.org" },
    { title: "Situación humanitaria mundial — UNHCR", url: "https://www.unhcr.org/news" },
  ],
  en: [
    { title: "Latest conflict and emergency news worldwide — Reuters", url: "https://www.reuters.com/world" },
    { title: "Live coverage of armed conflicts — BBC News", url: "https://www.bbc.com/news/world" },
    { title: "Natural disaster and emergency alerts — Al Jazeera", url: "https://www.aljazeera.com/news" },
    { title: "Latest seismic alerts and tsunamis — USGS", url: "https://www.usgs.gov/natural-hazards" },
    { title: "Breaking news from active conflict zones — AP News", url: "https://apnews.com/world-news" },
    { title: "Global emergency and civil protection alerts — OCHA", url: "https://www.unocha.org" },
    { title: "World humanitarian situation — UNHCR", url: "https://www.unhcr.org/news" },
  ],
  fr: [
    { title: "Dernières nouvelles sur les conflits mondiaux — Reuters", url: "https://www.reuters.com/world" },
    { title: "Couverture en direct des conflits armés — BBC", url: "https://www.bbc.com/news/world" },
    { title: "Alertes catastrophes naturelles — Al Jazeera", url: "https://www.aljazeera.com/news" },
    { title: "Dernières alertes sismiques — USGS", url: "https://www.usgs.gov/natural-hazards" },
    { title: "Actualités des zones de conflit — AP News", url: "https://apnews.com/world-news" },
    { title: "Alertes d'urgence mondiales — OCHA", url: "https://www.unocha.org" },
    { title: "Situation humanitaire mondiale — UNHCR", url: "https://www.unhcr.org/news" },
  ],
  pt: [
    { title: "Últimas notícias de conflitos mundiais — Reuters", url: "https://www.reuters.com/world" },
    { title: "Cobertura ao vivo de conflitos armados — BBC", url: "https://www.bbc.com/news/world" },
    { title: "Alertas de catástrofes naturais — Al Jazeera", url: "https://www.aljazeera.com/news" },
    { title: "Últimos alertas sísmicos — USGS", url: "https://www.usgs.gov/natural-hazards" },
    { title: "Notícias de zonas de conflito — AP News", url: "https://apnews.com/world-news" },
    { title: "Alertas de emergência global — OCHA", url: "https://www.unocha.org" },
    { title: "Situação humanitária mundial — UNHCR", url: "https://www.unhcr.org/news" },
  ],
  it: [
    { title: "Ultime notizie sui conflitti mondiali — Reuters", url: "https://www.reuters.com/world" },
    { title: "Copertura in diretta dei conflitti armati — BBC", url: "https://www.bbc.com/news/world" },
    { title: "Allerte catastrofi naturali — Al Jazeera", url: "https://www.aljazeera.com/news" },
    { title: "Ultime allerte sismiche — USGS", url: "https://www.usgs.gov/natural-hazards" },
    { title: "Notizie dalle zone di conflitto — AP News", url: "https://apnews.com/world-news" },
    { title: "Allerte di emergenza globali — OCHA", url: "https://www.unocha.org" },
    { title: "Situazione umanitaria mondiale — UNHCR", url: "https://www.unhcr.org/news" },
  ],
  ar: [
    { title: "آخر أخبار النزاعات والطوارئ العالمية — رويترز", url: "https://www.reuters.com/world" },
    { title: "تغطية مباشرة للنزاعات المسلحة — BBC عربي", url: "https://www.bbc.com/arabic" },
    { title: "تنبيهات الكوارث الطبيعية — الجزيرة", url: "https://www.aljazeera.net/news" },
    { title: "آخر التنبيهات الزلزالية — USGS", url: "https://www.usgs.gov/natural-hazards" },
    { title: "أخبار مناطق النزاع — AP", url: "https://apnews.com/world-news" },
    { title: "تنبيهات الطوارئ العالمية — أوتشا", url: "https://www.unocha.org" },
    { title: "الوضع الإنساني العالمي — UNHCR", url: "https://www.unhcr.org/news" },
  ],
  zh: [
    { title: "全球冲突和紧急情况最新消息 — 路透社", url: "https://www.reuters.com/world" },
    { title: "武装冲突实时报道 — BBC中文", url: "https://www.bbc.com/zhongwen/simp" },
    { title: "自然灾害警报 — 半岛电视台", url: "https://www.aljazeera.com/news" },
    { title: "最新地震海啸警报 — USGS", url: "https://www.usgs.gov/natural-hazards" },
    { title: "冲突地区新闻 — AP通讯社", url: "https://apnews.com/world-news" },
    { title: "全球紧急情况警报 — OCHA", url: "https://www.unocha.org" },
    { title: "全球人道主义状况 — 联合国难民署", url: "https://www.unhcr.org/news" },
  ],
};

// Cache to avoid hitting APIs on every render
let cachedHeadlines = null;
let cacheTime = 0;
const CACHE_DURATION = 0; // Sin caché — siempre noticias frescas

async function fetchFromNewsAPI(lang) {
  const apiKey = import.meta.env.VITE_NEWSAPI_KEY;
  if (!apiKey) return null;
  const langParam = lang === "es" ? "&language=es" : lang === "fr" ? "&language=fr" : lang === "pt" ? "&language=pt" : lang === "it" ? "&language=it" : lang === "ar" ? "&language=ar" : lang === "zh" ? "&language=zh" : "&language=en";
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(KEYWORDS)}&sortBy=publishedAt&pageSize=15${langParam}&apiKey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("NewsAPI failed");
  const data = await res.json();
  if (data.status !== "ok" || !data.articles?.length) throw new Error("No articles");
  return data.articles.map(a => ({ title: a.title, url: a.url }));
}

async function fetchFromNewsData(lang) {
  const apiKey = import.meta.env.VITE_NEWSDATA_KEY;
  if (!apiKey) return null;
  const langParam = ["es","fr","pt","it","ar","zh"].includes(lang) ? lang : "en";
  const url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=${langParam}&q=${encodeURIComponent("war OR conflict OR attack OR earthquake OR tsunami OR terrorism OR disaster OR Trump OR Putin OR Gaza OR Ukraine")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("NewsData failed " + res.status);
  const data = await res.json();
  if (data.status !== "success" || !data.results?.length) throw new Error(data.message || "No articles");
  return data.results.map(a => ({ title: a.title, url: a.link }));
}

async function fetchFromGNews(lang) {
  const apiKey = import.meta.env.VITE_GNEWS_KEY;
  if (!apiKey) return null;
  const langParam = ["es","fr","pt","it","ar","zh"].includes(lang) ? lang : "en";
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent("war OR conflict OR attack OR earthquake OR tsunami OR terrorism OR disaster")}&lang=${langParam}&max=15&apikey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("GNews failed");
  const data = await res.json();
  if (!data.articles?.length) throw new Error("No articles");
  return data.articles.map(a => ({ title: a.title, url: a.url }));
}

async function fetchFromTheNewsAPI(lang) {
  const apiKey = import.meta.env.VITE_THENEWSAPI_KEY;
  if (!apiKey) return null;
  const langParam = ["es","fr","pt","it","ar","zh"].includes(lang) ? lang : "en";
  const url = `https://api.thenewsapi.com/v1/news/all?api_token=${apiKey}&categories=world,politics&language=${langParam}&limit=15&search=${encodeURIComponent("war conflict attack earthquake tsunami terrorism")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("TheNewsAPI failed");
  const data = await res.json();
  if (!data.data?.length) throw new Error("No articles");
  return data.data.map(a => ({ title: a.title, url: a.url }));
}

async function fetchHeadlines(lang) {
  const now = Date.now();
  if (cachedHeadlines && (now - cacheTime) < CACHE_DURATION) {
    return cachedHeadlines;
  }

  // Layer 1: NewsData.io (permite CORS desde browser)
  try {
    const articles = await fetchFromNewsData(lang);
    if (articles && articles.length > 0) {
      cachedHeadlines = articles;
      cacheTime = now;
      console.log("✅ Ticker: NewsData.io");
      return articles;
    }
  } catch (e) {
    console.warn("NewsData failed:", e.message);
  }

  // Layer 2: GNews.io
  try {
    const articles = await fetchFromGNews(lang);
    if (articles && articles.length > 0) {
      cachedHeadlines = articles;
      cacheTime = now;
      console.log("✅ Ticker: GNews.io (fallback)");
      return articles;
    }
  } catch (e) {
    console.warn("GNews failed:", e.message);
  }

  // Layer 3: TheNewsAPI.com
  try {
    const articles = await fetchFromTheNewsAPI(lang);
    if (articles && articles.length > 0) {
      cachedHeadlines = articles;
      cacheTime = now;
      console.log("✅ Ticker: TheNewsAPI.com (fallback)");
      return articles;
    }
  } catch (e) {
    console.warn("TheNewsAPI failed:", e.message);
  }

  // Layer 4: Static fallback
  console.warn("⚠️ Ticker: all APIs failed, using static headlines");
  return STATIC_HEADLINES[lang] || STATIC_HEADLINES["en"];
}

export default function NewsTicker() {
  const { lang } = useLang();
  const liveLabel = LIVE_LABEL[lang] || LIVE_LABEL["en"];
  const [headlines, setHeadlines] = useState(STATIC_HEADLINES[lang] || STATIC_HEADLINES["en"]);

  useEffect(() => {
    fetchHeadlines(lang).then(setHeadlines);
    const interval = setInterval(() => {
      cachedHeadlines = null; // force refresh
      fetchHeadlines(lang).then(setHeadlines);
    }, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [lang]);

  const items = [...headlines, ...headlines];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-8 flex items-center overflow-hidden ticker-red-pulse"
      style={{background: "hsl(0 72% 20%)", borderTop: "2px solid hsl(0 72% 45%)"}}>
      <div className="flex items-center gap-1.5 px-3 h-full flex-shrink-0" style={{background: "hsl(0 72% 45%)"}}>
        <Radio className="w-3 h-3 text-white animate-pulse" />
        <span className="text-white font-military text-xs tracking-widest uppercase">{liveLabel}</span>
      </div>
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div
          className="flex items-center gap-0 whitespace-nowrap"
          style={{ animation: `tickerScroll ${headlines.length * 8}s linear infinite` }}
        >
          {items.map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs text-white hover:text-red-300 transition-colors cursor-pointer px-6"
              onClick={(e) => e.stopPropagation()}>
              <span className="text-red-400 font-bold">▸</span>
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes redPulse {
          0%, 100% { box-shadow: 0 0 8px 2px hsl(0 72% 45% / 0.6); }
          50% { box-shadow: 0 0 18px 6px hsl(0 72% 45% / 0.9); }
        }
        .ticker-red-pulse { animation: redPulse 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
