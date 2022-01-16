import { useContext } from 'react'
import { TranslationContext } from 'contexts'

export const useTranslation = () => useContext(TranslationContext)
