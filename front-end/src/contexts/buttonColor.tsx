import React, {
  createContext,
  useState,
  FunctionComponent,
  useEffect,
} from 'react'
import { useFetch } from 'hooks'

type ButtonColorContextValue = {
  buttonColors: typeof defaultButtonColors
}

export const ButtonColorContext = createContext<ButtonColorContextValue>(
  {} as ButtonColorContextValue
)

export const ButtonColorProvider: FunctionComponent = ({ children }) => {
  const buttonColorValue = useButtonColor()

  return (
    <ButtonColorContext.Provider value={buttonColorValue}>
      {children}
    </ButtonColorContext.Provider>
  )
}

const defaultButtonColors = {
  unanswered: 'danger',
  answered: 'success',
  nonExistent: 'dark',
  noCall: 'warning',
  answeringMachine: 'primary',
  postponed: 'info',
  ignored: 'secondary',
  rushed: 'success',
}

export const useButtonColor = (): ButtonColorContextValue => {
  const [buttonColors, setButtonColors] =
    useState<typeof defaultButtonColors>(defaultButtonColors)

  const Fetch = useFetch()

  useEffect(() => {
    const doFetch = async () => {
      try {
        const [err, response] = await Fetch(false).get<
          typeof defaultButtonColors | ''
        >('button_colors')
        if (err) throw err
        if (response) setButtonColors(response)
      } catch {}
    }
    doFetch()
  }, [Fetch])

  return {
    buttonColors,
  }
}
