import React, { useState } from 'react'
import { Collapse, Table, Button } from 'reactstrap'
import styled from 'styled'
import {
  useConfig,
  usePhoneStorage,
  useButtonColor,
  useTranslation,
} from 'hooks'
import {
  CampaignFeedback,
  Feedback,
  FeedbackExtended,
  StoragePhone,
} from 'types'
import { isToday } from 'utils'
import { labels } from 'consts'
import { useConfirmationModal, ConfirmationModal } from 'components'

interface PhonesInStorageProps {
  currentPhoneId: number
  onEditRequest: (
    storagePhone: StoragePhone,
    newStatus: FeedbackExtended
  ) => void
  PhoneStorage: ReturnType<typeof usePhoneStorage>
}

const PhonesInStorage: React.FC<PhonesInStorageProps> = ({
  currentPhoneId,
  onEditRequest,
  PhoneStorage,
}) => {
  const [collapsed, setCollapsed] = useState<number | null>(null)
  const { isModalOpen, data, askEditConfirmation, toggleModal, reset } =
    useConfirmationModal<{
      storagePhoneToConfirm: StoragePhone
      feedbackToConfirm: FeedbackExtended
    }>()

  const {
    configurations: { hiddenButtons },
    currentTerritory: { campaignMode },
  } = useConfig()
  const { buttonColors } = useButtonColor()
  const { shouldTranslate, translations } = useTranslation()

  const isAllowed = (f: FeedbackExtended) =>
    !hiddenButtons.split(',').includes(f.toString()) &&
    !(
      campaignMode &&
      [
        Feedback.UNANSWERED,
        Feedback.ANSWERED,
        Feedback.NON_EXISTENT,
        Feedback.NO_CALL,
        Feedback.ANSWERING_MACHINE,
        Feedback.IGNORE,
        // @ts-ignore
      ].includes(f)
    ) &&
    // @ts-ignore
    !(!campaignMode && [CampaignFeedback.RUSHED].includes(f))

  const feedbackToConfirm = data?.feedbackToConfirm ?? null
  const storagePhoneToConfirm = data?.storagePhoneToConfirm ?? null

  const resetStates = () => {
    setCollapsed(null)
    reset()
  }

  const onAskEditConfirmation = (
    feedbackToConfirm: FeedbackExtended,
    storagePhoneToConfirm: StoragePhone
  ) => askEditConfirmation({ storagePhoneToConfirm, feedbackToConfirm })

  const handleCollapsed = (i: number) =>
    collapsed !== i ? setCollapsed(i) : setCollapsed(null)

  const doConfirm = () => {
    if (!storagePhoneToConfirm || typeof feedbackToConfirm !== 'number') return
    onEditRequest(storagePhoneToConfirm, feedbackToConfirm)
    resetStates()
  }

  const feedbackColor = {
    0: buttonColors.unanswered,
    1: buttonColors.answered,
    2: buttonColors.nonExistent,
    3: buttonColors.noCall,
    4: buttonColors.answeringMachine,
    5: buttonColors.postponed,
    6: buttonColors.ignored,
    7: buttonColors.rushed,
  }

  const phones = PhoneStorage.getAll()

  const rows = phones.reverse().map((p, i) => {
    if (p.id === currentPhoneId) return null

    const phoneIsFromToday = isToday(p.savedOn)
    const color = p.status !== null ? feedbackColor[p.status] : ''

    const statusLabel =
      !phoneIsFromToday && p.status === null
        ? !shouldTranslate
          ? 'Asignado a otro publicador'
          : translations?.['e5']
        : p.status !== null
        ? labels(shouldTranslate, translations!)[p.status]
        : !shouldTranslate
        ? 'Pendiente'
        : translations?.['e6']

    const isCollapsed = i === collapsed

    return (
      <tr key={p.id} style={{ position: 'relative' }}>
        <td>{p.phone}</td>
        <td>
          <span className={`text-${color}`}>{statusLabel}</span>
        </td>
        <td>
          {phoneIsFromToday && (
            <Button color="secondary" onClick={() => handleCollapsed(i)}>
              {!shouldTranslate ? 'Editar' : translations?.['c2']}
            </Button>
          )}
          <CollapseButtons isOpen={isCollapsed}>
            {p.status !== CampaignFeedback.RUSHED &&
              isAllowed(CampaignFeedback.RUSHED) && (
                <Button
                  color={buttonColors.rushed}
                  className="btn-sm d-inline-block mr-1 mb-2"
                  onClick={() =>
                    onAskEditConfirmation(CampaignFeedback.RUSHED, p)
                  }
                >
                  {
                    labels(shouldTranslate, translations!)[
                      CampaignFeedback.RUSHED
                    ]
                  }
                </Button>
              )}
            {p.status !== Feedback.ANSWERED && isAllowed(Feedback.ANSWERED) && (
              <Button
                color={buttonColors.answered}
                className="btn-sm d-inline-block mr-1 mb-2"
                onClick={() => onAskEditConfirmation(Feedback.ANSWERED, p)}
              >
                {labels(shouldTranslate, translations!)[Feedback.ANSWERED]}
              </Button>
            )}
            {p.status !== Feedback.UNANSWERED &&
              isAllowed(Feedback.UNANSWERED) && (
                <Button
                  color={buttonColors.unanswered}
                  className="btn-sm d-inline-block mr-1 mb-2"
                  onClick={() => onAskEditConfirmation(Feedback.UNANSWERED, p)}
                >
                  {labels(shouldTranslate, translations!)[Feedback.UNANSWERED]}
                </Button>
              )}
            {p.status !== Feedback.ANSWERING_MACHINE &&
              isAllowed(Feedback.ANSWERING_MACHINE) && (
                <Button
                  color={buttonColors.answeringMachine}
                  className="btn-sm d-inline-block mr-1 mb-2"
                  onClick={() =>
                    onAskEditConfirmation(Feedback.ANSWERING_MACHINE, p)
                  }
                >
                  {
                    labels(shouldTranslate, translations!)[
                      Feedback.ANSWERING_MACHINE
                    ]
                  }
                </Button>
              )}
            {p.status !== Feedback.POSTPONE && isAllowed(Feedback.POSTPONE) && (
              <Button
                color={buttonColors.postponed}
                className="btn-sm d-inline-block mr-1 mb-2"
                onClick={() => onAskEditConfirmation(Feedback.POSTPONE, p)}
              >
                {labels(shouldTranslate, translations!)[Feedback.POSTPONE]}
              </Button>
            )}
            {p.status !== Feedback.IGNORE && isAllowed(Feedback.IGNORE) && (
              <Button
                color={buttonColors.ignored}
                className="btn-sm d-inline-block mr-1 mb-2"
                onClick={() => onAskEditConfirmation(Feedback.IGNORE, p)}
              >
                {labels(shouldTranslate, translations!)[Feedback.IGNORE]}
              </Button>
            )}
            {p.status !== Feedback.NO_CALL && isAllowed(Feedback.NO_CALL) && (
              <Button
                color={buttonColors.noCall}
                className="btn-sm d-inline-block mr-1 mb-2"
                onClick={() => onAskEditConfirmation(Feedback.NO_CALL, p)}
              >
                {labels(shouldTranslate, translations!)[Feedback.NO_CALL]}
              </Button>
            )}
            {p.status !== Feedback.NON_EXISTENT &&
              isAllowed(Feedback.NON_EXISTENT) && (
                <Button
                  color={buttonColors.nonExistent}
                  className="btn-sm d-inline-block mr-1 mb-2"
                  onClick={() =>
                    onAskEditConfirmation(Feedback.NON_EXISTENT, p)
                  }
                >
                  {
                    labels(shouldTranslate, translations!)[
                      Feedback.NON_EXISTENT
                    ]
                  }
                </Button>
              )}
          </CollapseButtons>
        </td>
      </tr>
    )
  })

  const dataInStorage: boolean = rows.filter((r) => !!r).length > 0

  if (!dataInStorage) return null

  return (
    <>
      <h6 className="container mb-3">
        {!shouldTranslate
          ? 'Números anteriores en este dispositivo'
          : translations?.['e2']}
        :
      </h6>
      <Table responsive className="text-center">
        <thead>
          <tr>
            <th>{!shouldTranslate ? 'Teléfono' : translations?.['c4']}</th>
            <th>{!shouldTranslate ? 'Estado' : translations?.['e3']}</th>
            <th>{!shouldTranslate ? 'Acciones' : translations?.['e4']}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      {feedbackToConfirm !== null && (
        <ConfirmationModal
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          onConfirm={doConfirm}
          title={!shouldTranslate ? '¿Seguro?' : translations?.['e9']}
          buttonColor={feedbackColor[feedbackToConfirm]}
          confirmationLabel={
            labels(shouldTranslate, translations!)[feedbackToConfirm]
          }
        />
      )}
    </>
  )
}

const CollapseButtons = styled(Collapse)`
  position: absolute;
  left: 0px;
  background: rgb(34, 34, 34);
  width: 100%;
  border: 1px solid rgb(102, 102, 102);
  padding: ${({ isOpen }) => (isOpen ? '20px' : '0')} 10px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  transition: padding 0.3s, height 0.3s;
  z-index: 1;
`

export { PhonesInStorage }
