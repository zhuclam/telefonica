import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { Collapse } from 'reactstrap'
import { useFetch } from 'hooks'
import { Alert, useAlerts, Switch } from 'components'
import { PhoneOptionsType } from 'types'

interface PhoneOptionsProps {
  phoneId: number
  initialNoCallOnWeekends: boolean
}

const PhoneOptions: FunctionComponent<PhoneOptionsProps> = ({
  phoneId,
  initialNoCallOnWeekends,
}) => {
  const [showPhoneOptions, setShowPhoneOptions] = useState<boolean>(false)
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
        <div className="title" onClick={togglePhoneOptions}>
          Opciones de teléfono
          <span>{showPhoneOptions ? '-' : '+'}</span>
        </div>
        <Collapse isOpen={showPhoneOptions}>
          <div className="inner">
            <span>No llamar los fin de semana:</span>
            <Switch
              label=""
              checked={noCallOnWeekends}
              onChange={(checked) =>
                handleOptionChanged('callOnWeekends', checked)
              }
            />
          </div>
        </Collapse>
      </PhoneOptionsContainer>
    </>
  )
}

const PhoneOptionsContainer = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    font-weight: 500;

    span {
      font-weight: 800;
    }
  }

  .inner {
    display: flex;
    justify-content: space-between;
    padding-top: 0.5em;
  }
`

export { PhoneOptions }
