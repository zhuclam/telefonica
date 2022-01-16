import React, {
  createContext,
  useState,
  FunctionComponent,
  useEffect,
} from 'react'
import { LOCAL_STORAGE } from 'consts'
import { useFetch } from 'hooks'

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

  const Fetch = useFetch()

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [err, response] = await Fetch(false).get<Record<string, string>>(
          'translations'
        )
        if (err) throw err
        if (response) setTranslations(response)
      } catch {}
    }
    doFetch()
  }, [Fetch])

  return {
    translations,
    showSwitch: !!translations,
    shouldTranslate: !!translations && translationWanted,
    translationWanted,
    toggleTranslationWanted,
  }
}
