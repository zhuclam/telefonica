import React, { FunctionComponent, useState } from 'react'
import styled from 'styled'
import { Collapse } from 'reactstrap'
import { useFetch, useTranslation } from 'hooks'
import { Alert, useAlerts, Switch } from 'components'
import { PhoneOptionsType } from 'types'

interface PhoneOptionsProps {
  phoneId: number
  initialNoCallOnWeekends: boolean
  initiallyOpen: boolean
  onNoCall: false | (() => void)
}

const PhoneOptions: FunctionComponent<PhoneOptionsProps> = ({
  phoneId,
  initialNoCallOnWeekends,
  initiallyOpen,
  onNoCall,
}) => {
  const [showPhoneOptions, setShowPhoneOptions] =
    useState<boolean>(initiallyOpen)
  const [noCallOnWeekends, setNoCallOnWeekends] = useState<boolean>(
    initialNoCallOnWeekends
  )

  const { AlertManager } = useAlerts()

  const Fetch = useFetch()
  const { shouldTranslate, translations } = useTranslation()

  const togglePhoneOptions = () => setShowPhoneOptions(!showPhoneOptions)

  const handleOptionChanged = async <K extends keyof PhoneOptionsType>(
    option: K,
    newVal: PhoneOptionsType[K]
  ) => {
    let revert: () => void = () => {}
    let backendValue: PhoneOptionsType[K] = newVal

    if (option === 'callOnWeekends') {
      revert = () => setNoCallOnWeekends(noCallOnWeekends)
      setNoCallOnWeekends(newVal)
      // In the case of callOnWeekends, we are handling the opposite case on the back
      backendValue = !newVal
    }

    try {
      const [err] = await Fetch().put<Partial<PhoneOptionsType>>(
        `phones/${phoneId}/options`,
        {
          [option]: backendValue,
        }
      )

      if (err) throw err

      AlertManager.show('phone-option-update-success')
    } catch {
      revert()
      AlertManager.hideAll()
      AlertManager.show('phone-option-update-failed')
    }
  }

  return (
    <>
      <Alert
        name="phone-option-update-success"
        position="top"
        variant="success"
      >
        {!shouldTranslate
          ? 'Opción de teléfono actualizada con éxito.'
          : translations?.['h1']}
      </Alert>
      <Alert
        name="phone-option-update-failed"
        position="bottom"
        variant="failure"
      >
        {!shouldTranslate
          ? 'No se pudo actualizar opción de teléfono.'
          : translations?.['h2']}
      </Alert>

      <PhoneOptionsContainer>
        <Title onClick={togglePhoneOptions}>
          {!shouldTranslate ? 'Opciones de teléfono' : translations?.['d2']}
          <span>{showPhoneOptions ? '-' : '+'}</span>
        </Title>
        <Collapse isOpen={showPhoneOptions}>
          <Inner>
            <span>
              {!shouldTranslate
                ? 'No llamar los fin de semana'
                : translations?.['d3']}
              :
            </span>
            <Switch
              id="no-weekends"
              checked={noCallOnWeekends}
              onChange={(checked) =>
                handleOptionChanged('callOnWeekends', checked)
              }
            />
          </Inner>
          {onNoCall && (
            <Inner>
              <span>
                {!shouldTranslate ? 'No visitar' : translations?.['d9']}:
              </span>
              <Switch id="no-call" checked={false} onChange={onNoCall} />
            </Inner>
          )}
        </Collapse>
      </PhoneOptionsContainer>
    </>
  )
}

const PhoneOptionsContainer = styled.div``

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5em;
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  color: ${({ theme }) =>
    theme.text.colors[theme.darkMode ? 'lightgreen' : 'green']};

  span {
    font-weight: 800;
  }
`

export { PhoneOptions }
