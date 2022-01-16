import React, {
  createContext,
  useState,
  FunctionComponent,
  useEffect,
} from 'react'
import { LOCAL_STORAGE } from 'consts'

type TranslationContextValue = {
  translations: Record<string, string> | null
  showSwitch: boolean
  shouldTranslate: boolean
  translationWanted: boolean
  toggleTranslationWanted: (checked: boolean) => void
}

export const TranslationContext = createContext<TranslationContextValue>(
  {} as TranslationContextValue
)

export const TranslationProvider: FunctionComponent = ({ children }) => {
  const translationValue = useTranslation()

  return (
    <TranslationContext.Provider value={translationValue}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = (): TranslationContextValue => {
  const [translations, setTranslations] =
    useState<Record<string, string> | null>(null)

  const [translationWanted, setTranslationWanted] = useState<boolean>(
    !!localStorage.getItem(LOCAL_STORAGE.TRANSLATION_WANTED)
  )

  const toggleTranslationWanted = (checked: boolean) => {
    checked
      ? localStorage.setItem(LOCAL_STORAGE.TRANSLATION_WANTED, '1')
      : localStorage.removeItem(LOCAL_STORAGE.TRANSLATION_WANTED)
    setTranslationWanted(checked)
  }

  useEffect(() => {
    try {
      const translations = require('../translations.json')
      setTranslations(translations)
    } catch {}
  }, [])

  return {
    translations,
    showSwitch: !!translations,
    shouldTranslate: !!translations && translationWanted,
    translationWanted,
    toggleTranslationWanted,
  }
}
