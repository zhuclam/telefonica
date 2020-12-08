import { useContext } from 'react'
import { ConfigContext } from 'contexts'

export const useConfig = () => useContext(ConfigContext)
