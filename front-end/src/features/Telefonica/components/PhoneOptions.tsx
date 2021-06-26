import React, { FunctionComponent, useState } from 'react'
import styled from 'styled'
import { Collapse } from 'reactstrap'
import { useFetch } from 'hooks'
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
        Opción de teléfono actualizada con éxito.
      </Alert>
      <Alert
        name="phone-option-update-failed"
        position="bottom"
        variant="failure"
      >
        No se pudo actualizar opción de teléfono.
      </Alert>

      <PhoneOptionsContainer>
        <Title onClick={togglePhoneOptions}>
          Opciones de teléfono
          <span>{showPhoneOptions ? '-' : '+'}</span>
        </Title>
        <Collapse isOpen={showPhoneOptions}>
          <Inner>
            <span>No llamar los fin de semana:</span>
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
              <span>No visitar:</span>
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
