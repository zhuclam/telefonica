import { useMemo } from 'react'
import { PhoneStorage as PhoneStorageConstructor } from 'services'
import { useConfig } from '.'
import { useReactive } from './utils'

const usePhoneStorage = () => {
  const { reactive } = useReactive()
  const { testModeEnabled } = useConfig()

  const PhoneStorage = useMemo(
    () => new PhoneStorageConstructor(testModeEnabled),
    [testModeEnabled]
  )

  return useMemo(
    () => ({
      getAll: PhoneStorage.getAll.bind(PhoneStorage),
      add: reactive(PhoneStorage.add.bind(PhoneStorage)),
      update: reactive(PhoneStorage.update.bind(PhoneStorage)),
    }),
    [PhoneStorage, reactive]
  )
}

export { usePhoneStorage }
