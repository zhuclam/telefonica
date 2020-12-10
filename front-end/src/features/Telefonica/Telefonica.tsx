import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import { Alert, ErrorDisplay, Spinner, useAlerts } from 'components'
import { PhoneResponse } from './types'
import { HelpSection, PhoneDetails, PhonesInStorage } from './components'
import { Route, Switch, useHistory } from 'react-router'
import { css } from 'styled-components'
import { useConfig, usePhoneStorage, useFetch } from 'hooks'
import { Feedback, StoragePhone } from 'types'
import { useThrottle } from 'hooks/utils'

const Telefonica: React.FC = () => {
  const [phone, setPhone] = useState<PhoneResponse['phone'] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [comments, setComments] = useState<string>('')

  const PhoneStorage = usePhoneStorage()

  const { advancedModeEnabled } = useConfig()

  const { AlertManager } = useAlerts()

  const Fetch = useFetch()

  const fetchPhone = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(false)
      const [err, newPhone] = await Fetch().get<PhoneResponse>('next')

      if (err) throw err

      setPhone(newPhone.phone)
      setComments(newPhone.phone.comentarios)
      AlertManager.show('new-phone-received', {
        timeout: 5000,
      })
      PhoneStorage.add({
        id: newPhone.phone.id,
        status: null,
        phone: newPhone.phone.telefono,
        savedOn: Date.now(),
        restore: {
          ...newPhone.original,
          lastStatus: null,
        },
      })
    } catch (e) {
      console.log({ e })
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }, [AlertManager, PhoneStorage, Fetch])

  useEffect(() => {
    fetchPhone()
  }, [fetchPhone])

  const onFeedback = async (feedback: Feedback) => {
    if (!phone) return

    try {
      setIsLoading(true)
      const [err] = await Fetch().put('update_phone', {
        id: phone.id,
        answered: feedback,
        comments: comments,
      })

      if (err) throw err

      fetchPhone()
      PhoneStorage.update(phone.id, feedback)
    } catch {
      AlertManager.hideAll()
      AlertManager.show('feedback-failed')
      setIsLoading(false)
    }
  }

  const onEditRequest = async (
    storagePhone: StoragePhone,
    newStatus: Feedback
  ) => {
    try {
      const [err] = await Fetch().put('update_phone', {
        id: storagePhone.id,
        answered: newStatus,
        restore: storagePhone.restore,
      })

      if (err) throw err

      PhoneStorage.update(storagePhone.id, newStatus)
      AlertManager.show('edit-success')
    } catch {
      AlertManager.hideAll()
      AlertManager.show('feedback-failed')
    }
  }

  const sendFeedback = useThrottle(onFeedback, 5000)
  const editNumber = useThrottle(onEditRequest, 5000)

  const history = useHistory()

  const openHelpSection = () => history.push('/telefonica/help')
  const closeHelpSection = () => history.goBack()

  const handleComments = (c: string) => setComments(c)

  if (error) return <ErrorDisplay />

  if (isLoading || !phone) return <Spinner fulfill container />

  const Main = () => (
    <>
      <Helmet>
        <title>{process.env.REACT_APP_CONG_INITIALS} Telefónica</title>
      </Helmet>
      <Alert name="new-phone-received" position="top" containerCSS={AlertCss}>
        <div className="text-center">✨ ¡Nuevo número recibido! ✨🎉</div>
      </Alert>
      <Alert
        name="feedback-failed"
        position="top"
        containerCSS={FailedAlertCss}
      >
        <div className="text-center">No se pudo enviar su feedback 😢</div>
      </Alert>
      <Alert name="edit-success" position="bottom" containerCSS={AlertCss}>
        <div className="text-center">Número actualizado.</div>
      </Alert>
      <PhoneDetails
        phone={phone}
        comments={comments}
        handleComments={handleComments}
        openHelpSection={openHelpSection}
        handlePhoneFeedback={sendFeedback}
      />
      {advancedModeEnabled && (
        <PhonesInStorage
          PhoneStorage={PhoneStorage}
          currentPhoneId={phone.id}
          onEditRequest={editNumber}
        />
      )}
    </>
  )

  const Help = () => (
    <>
      <Helmet>
        <title>{process.env.REACT_APP_CONG_INITIALS} Telefónica Ayuda</title>
      </Helmet>
      <HelpSection close={closeHelpSection} />
    </>
  )

  return (
    <Container>
      <Switch>
        <Route path="/telefonica" exact render={Main} />
        <Route path="/telefonica/help" exact component={Help} />
      </Switch>
    </Container>
  )
}

const AlertCss = css`
  background: #444;
  border-bottom: #28a745 5px solid;
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FailedAlertCss = css`
  ${AlertCss}
  border-bottom: ${({ theme }) => theme.text.colors.error} 5px solid;
`

export { Telefonica }