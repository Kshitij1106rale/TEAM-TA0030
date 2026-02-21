'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { locations, type Location } from '@/lib/data';

// Import locales
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import mr from '@/locales/mr.json';

const translations: { [key: string]: any } = { en, hi, mr };

export type Language = 'en' | 'hi' | 'mr';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  location: Location;
  setLocation: (location: Location) => void;
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
  const [location, setLocation] = useState<Location>(locations[0]);

  const t = useCallback((key: string, options?: { [key: string]: string | number }): string => {
    const fallbackLang = 'en';
    
    let template = deepValue(translations[language], key);
    
    if (!template) {
        template = deepValue(translations[fallbackLang], key);
    }

    if (typeof template !== 'string') {
        return key;
    }

    if (options) {
        return template.replace(/\{(\w+)\}/g, (placeholderWithBraces: string, placeholderKey: string) => {
            return options[placeholderKey] !== undefined ? String(options[placeholderKey]) : placeholderWithBraces;
        });
    }

    return template;
  }, [language]);
  
  const value = useMemo(() => ({ language, setLanguage, location, setLocation, t }), [language, location, t]);

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
