import React, { useState } from 'react'
import { Container } from 'reactstrap'
import { Alert, Breadcrumb, Spinner, useAlerts } from 'components'
import { AddPhonePayload, AddPhoneResponse, NewPhone } from './types'
import { EntryData, Result, Review } from './components'
import { useConfig, useFetch } from 'hooks'
import { css } from 'styled-components'
import { useHistory } from 'react-router'

const breadcrumbItems = [
  {
    title: 'Panel de Administración',
    linkTo: '/admin-panel',
  },
  {
    title: 'Agregar Números',
  },
]

const AddPhones: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [entryData, setEntryData] = useState<NewPhone[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [serverResponse, setServerResponse] = useState<AddPhoneResponse | null>(
    null
  )
  const { currentTerritory } = useConfig()

  const Fetch = useFetch()

  const { AlertManager } = useAlerts()

  const history = useHistory()

  const handleNextStep = () => setStep(step + 1)

  const handleSetEntrydata = (data: NewPhone[]) => setEntryData(data)

  const handleBackToStepOne = () => setStep(1)

  const handleConfirm = async () => {
    try {
      setIsLoading(true)
      const [err, response] = await Fetch().post<
        AddPhonePayload,
        AddPhoneResponse
      >('add_numbers', { phones: entryData })

      if (err) throw err

      setServerResponse(response)
      setStep(3)
    } catch {
      AlertManager.show('add-phones-error', { timeout: 13000 })
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setStep(1)
    setEntryData([])
    setServerResponse(null)
  }

  const handleBackToAdmin = () => {
    history.push(`/${currentTerritory.name}/admin-panel`)
  }

  if (isLoading) return <Spinner container fulfill />

  return (
    <Container className="pt-3 pb-5">
      <Alert
        name="add-phones-error"
        position="bottom"
        containerCSS={FailAlertCss}
      >
        Hubo un error guardando los nuevos números. Por favor, revise los datos
        e intente de nuevo. Si el problema persiste, contacte al desarrollador
        para solucionarlo.{' '}
      </Alert>
      <Breadcrumb items={breadcrumbItems} />
      {step === 1 && (
        <EntryData
          onNextStep={handleNextStep}
          handleSetEntrydata={handleSetEntrydata}
        />
      )}
      {step === 2 && (
        <Review
          entryData={entryData}
          onGoBack={handleBackToStepOne}
          onConfirm={handleConfirm}
        />
      )}
      {step === 3 && serverResponse && (
        <Result
          response={serverResponse}
          onAddMore={reset}
          onBackToAdminPanel={handleBackToAdmin}
        />
      )}
    </Container>
  )
}

const FailAlertCss = css`
  background-color: ${({ theme }) => theme.text.colors.red};
`

export { AddPhones }
