import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import { Alert, ErrorDisplay, Spinner, useAlerts } from 'components'
import { PhoneResponse } from './types'
import { HelpSection, PhoneDetails, PhonesInStorage } from './components'
import { Route, Switch, useHistory } from 'react-router'
import { useConfig, usePhoneStorage, useFetch, useTranslation } from 'hooks'
import { FeedbackExtended, StoragePhone } from 'types'
import { useThrottle } from 'hooks/utils'

const Telefonica: React.FC = () => {
  const [phone, setPhone] = useState<PhoneResponse['phone'] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [comments, setComments] = useState<string>('')

  const PhoneStorage = usePhoneStorage()

  const { CONG_INITIALS, advancedModeEnabled, currentTerritory } = useConfig()

  const { AlertManager } = useAlerts()

  const { shouldTranslate, translations } = useTranslation()

  const Fetch = useFetch()

  const paramId = new URLSearchParams(window.location.search).get('id')

  const fetchPhone = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(false)
      const [err, newPhone] = await Fetch().get<PhoneResponse>(
        paramId
          ? {
              path: 'next',
              params: { id: paramId },
            }
          : 'next'
      )

      if (err) throw err

      setPhone(newPhone.phone)
      setComments(newPhone.phone.comments)
      AlertManager.show('new-phone-received', {
        timeout: 2000,
      })
      PhoneStorage.add({
        id: newPhone.phone.id,
        status: null,
        phone: newPhone.phone.phone,
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
  }, [AlertManager, PhoneStorage, Fetch, paramId])

  useEffect(() => {
    currentTerritory.active && fetchPhone()
  }, [fetchPhone, currentTerritory])

  const onFeedback = async (feedback: FeedbackExtended) => {
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
    newStatus: FeedbackExtended
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

  const openHelpSection = () =>
    history.push(`/${currentTerritory.name}/telefonica/help`)
  const closeHelpSection = () => history.goBack()

  const handleComments = (c: string) => setComments(c)

  if (error)
    return (
      <ErrorDisplay
        message={
          !shouldTranslate
            ? 'No hay más números disponibles por el día de hoy'
            : translations?.['b3']
        }
      />
    )

  if (!currentTerritory.active)
    return (
      <ErrorDisplay
        message={
          !shouldTranslate
            ? 'Este territorio está desactivado.'
            : translations?.['c1']
        }
      />
    )

  if (isLoading || !phone) return <Spinner fulfill container />

  const Main = () => (
    <>
      <Helmet>
        <title>{CONG_INITIALS} Telefónica</title>
      </Helmet>
      <Alert name="new-phone-received" position="top" variant="success">
        <div className="text-center">
          ✨{' '}
          {!shouldTranslate ? '¡Nuevo número recibido!' : translations?.['b4']}{' '}
          ✨🎉
        </div>
      </Alert>
      <Alert name="feedback-failed" position="top" variant="failure">
        <div className="text-center">
          {!shouldTranslate
            ? 'No se pudo enviar su feedback'
            : translations?.['b5']}{' '}
          😢
        </div>
      </Alert>
      <Alert name="edit-success" position="bottom" variant="success">
        <div className="text-center">
          {!shouldTranslate ? 'Número actualizado' : translations?.['b6']}
        </div>
      </Alert>
      <PhoneDetails
        phone={phone}
        comments={comments}
        handleComments={handleComments}
        openHelpSection={openHelpSection}
        handlePhoneFeedback={sendFeedback}
        selfAssigned={!!paramId}
        isFromAnotherTerritory={phone.territoryId !== currentTerritory.id}
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

  const Help = () => <HelpSection close={closeHelpSection} />

  return (
    <Container>
      <Switch>
        <Route path="/:territory/telefonica" exact render={Main} />
        <Route path="/:territory/telefonica/help" exact component={Help} />
      </Switch>
    </Container>
  )
}

export { Telefonica }
