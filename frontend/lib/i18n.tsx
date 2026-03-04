"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { tr } from "@/lib/translations";
import { en } from "@/lib/translations";

type Lang = "tr" | "en";
type Translations = typeof tr;

interface I18nContextType {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: Translations;
}

const I18nContext = createContext<I18nContextType>({
    lang: "tr",
    setLang: () => { },
    t: tr,
});

export function I18nProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("tr");
    const t = lang === "tr" ? tr : en;
    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useTranslation() {
    return useContext(I18nContext);
}
