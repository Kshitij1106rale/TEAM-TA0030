'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Import locales
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import mr from '@/locales/mr.json';

const translations: { [key: string]: any } = { en, hi, mr };

export type Language = 'en' | 'hi' | 'mr';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string,
    options?: { [key: string]: string | number }
  ) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function deepValue(obj: any, path: string) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
        if (current === null || current === undefined) {
            return undefined;
        }
        current = current[keys[i]];
    }
    return current;
}


export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string): string => {
    const fallbackLang = 'en';
    
    let translated = deepValue(translations[language], key);
    
    if (!translated) {
        translated = deepValue(translations[fallbackLang], key);
    }

    return translated || key;
  }, [language]);
  
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};
