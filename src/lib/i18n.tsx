"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "id";

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

/** Teks dua bahasa ditulis berpasangan: t("English", "Indonesia"). */
export type Pair = [string, string];

export const SECTIONS: Array<{ id: string; label: Pair }> = [
  { id: "home", label: ["Home", "Beranda"] },
  { id: "about", label: ["About", "Tentang"] },
  { id: "projects", label: ["Projects", "Proyek"] },
  { id: "experience", label: ["Experience", "Pengalaman"] },
  { id: "contact", label: ["Contact", "Kontak"] },
];

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      if (localStorage.getItem("lang") === "id") setLangState("id");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = (en: string, id: string) => (lang === "id" ? id : en);
  return { lang, setLang, t };
}
