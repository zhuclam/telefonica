import React from 'react'
import { useButtonColor, useConfig, useTranslation } from 'hooks'
import styled from 'styled'
import { CampaignFeedback, Feedback, FeedbackExtended, Phone } from 'types'
import { ConfirmationModal, useConfirmationModal } from 'components'
import { PhoneLink } from './PhoneLink'
import { PhoneOptions } from './PhoneOptions'
import { labels } from 'consts'
import {
  Button,
  Container,
  Jumbotron,
  Alert as ReactstrapAlert,
} from 'reactstrap'

interface PhoneDetailsProps {
  phone: Phone
  comments: string
  handleComments: (comments: string) => void
  openHelpSection: () => void
  handlePhoneFeedback: (n: FeedbackExtended) => void
  selfAssigned: boolean
  isFromAnotherTerritory: boolean
}

const PhoneDetails: React.FC<PhoneDetailsProps> = ({
  phone,
  comments,
  handleComments,
  openHelpSection,
  handlePhoneFeedback,
  selfAssigned,
  isFromAnotherTerritory,
}) => {
  const { advancedModeEnabled, configurations, currentTerritory } = useConfig()
  const { buttonColors } = useButtonColor()
  const { shouldTranslate, translations } = useTranslation()
  const { hiddenButtons } = configurations
  const { campaignMode } = currentTerritory

  const isButtonAllowed = (f: Feedback) =>
    !hiddenButtons.split(',').includes(f.toString())

  const {
    isModalOpen,
    data: feedbackToConfirm,
    askEditConfirmation,
    toggleModal,
    reset,
  } = useConfirmationModal<Feedback>()

  const handleGeneric = (feedback: Feedback) => () => {
    if (advancedModeEnabled) askEditConfirmation(feedback)
    else handlePhoneFeedback(feedback)
  }

  const doConfirm = () => {
    if (feedbackToConfirm === null) return
    handlePhoneFeedback(feedbackToConfirm)
    reset()
  }

  const handleAnswered = handleGeneric(Feedback.ANSWERED)
  const handleUnanswered = handleGeneric(Feedback.UNANSWERED)
  const handleNonExistent = handleGeneric(Feedback.NON_EXISTENT)
  const handleNoCall = handleGeneric(Feedback.NO_CALL)
  const handleAnsweringMachine = handleGeneric(Feedback.ANSWERING_MACHINE)
  const handlePostpone = handleGeneric(Feedback.POSTPONE)
  const handleIgnore = handleGeneric(Feedback.IGNORE)
  const handleRushed = () => handlePhoneFeedback(CampaignFeedback.RUSHED)

  const NUNCA = !shouldTranslate ? 'Nunca' : translations?.['g6']

  const DesktopTable = (
    <div className="table-responsive d-none d-sm-block">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>{!shouldTranslate ? 'Teléfono' : translations?.['c4']}</th>
            <th>{!shouldTranslate ? 'Otros datos' : translations?.['c5']}</th>
            {phone.comments ? (
              <th>{!shouldTranslate ? 'Comentarios' : translations?.['g3']}</th>
            ) : null}
            <th>
              {!shouldTranslate
                ? 'Última fecha que atendió'
                : translations?.['c6']}
            </th>
            <th>
              {!shouldTranslate
                ? 'Última fecha que se lo llamó'
                : translations?.['c7']}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PhoneLink phone={phone.phone} />
            </td>
            <td>{phone.info}</td>
            {phone.comments ? <td>{phone.comments}</td> : null}
            <td>{phone.answeredOn ?? NUNCA}</td>
            <td>
              {phone.unansweredDate ? (
                phone.unansweredDate
              ) : phone.fulfilledOn ? (
                <>
                  {phone.fulfilledOn === 'jue, 25 jun 2020' && 'Antes del '}
                  {phone.fulfilledOn}
                </>
              ) : (
                NUNCA
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  const MobileTable = (
    <div className="d-block d-sm-none text-center">
      <span style={{ fontWeight: 500 }}>
        {!shouldTranslate ? 'Teléfono' : translations?.['c4']}:
      </span>
      <div>
        <PhoneLink phone={phone.phone} />
      </div>
      <br />

      {phone.info && (
        <>
          <span style={{ fontWeight: 500 }}>
            {!shouldTranslate ? 'Otros datos' : translations?.['c5']}:
          </span>
          <div>{phone.info}</div>
          <br />
        </>
      )}

      {phone.comments && (
        <>
          <span style={{ fontWeight: 500 }}>
            {!shouldTranslate ? 'Comentarios' : translations?.['g3']}:
          </span>
          <div>{phone.comments}</div>
          <br />
        </>
      )}

      <span style={{ fontWeight: 500 }}>
        {!shouldTranslate ? 'Última fecha que atendió' : translations?.['c6']}:
      </span>
      <div>{phone.answeredOn ?? NUNCA}</div>
      <br />

      <span style={{ fontWeight: 500 }}>
        {!shouldTranslate
          ? 'Última fecha que se lo llamó'
          : translations?.['c7']}
        :
      </span>
      <div>
        {phone.unansweredDate ? (
          phone.unansweredDate
        ) : phone.fulfilledOn ? (
          <>
            {phone.fulfilledOn === 'jue, 25 jun 2020' && 'Antes del '}
            {phone.fulfilledOn}
          </>
        ) : (
          NUNCA
        )}
      </div>
    </div>
  )

  const helpButton = (
    <MiniSection>
      <HelpButton onClick={openHelpSection}>
        {!shouldTranslate ? '¿Qué hace cada botón?' : translations?.['f1']}
      </HelpButton>
    </MiniSection>
  )

  const CommentsSection = (
    <div className="row my-4">
      <div className="col-12">
        <span className="text-secondary d-inline-block mb-2">
          {!shouldTranslate ? 'Comentarios (opcional)' : translations?.['c8']}:
        </span>
        <Input
          placeholder={
            !shouldTranslate ? 'Su comentario acá...' : translations?.['c9']
          }
          type="text"
          value={comments}
          onChange={(e) => handleComments(e.target.value)}
        />

        {phone.commentedOn && (
          <span className="input-helper text-secondary">
            {!shouldTranslate ? 'Comentado el' : translations?.['g9']}:{' '}
            <span className="text-success">{phone.commentedOn}</span>
          </span>
        )}

        {phone.answeringMachineDate && (
          <span className="d-block input-helper text-secondary">
            {!shouldTranslate
              ? 'Último mensaje en el contestador'
              : translations?.['g8']}
            : <span className="text-success">{phone.answeringMachineDate}</span>
          </span>
        )}

        {!phone.commentedOn && !phone.answeringMachineDate && (
          <span className="input-helper text-secondary">
            {!shouldTranslate ? 'Ej.: lugar de trabajo' : translations?.['d1']}
          </span>
        )}
      </div>
    </div>
  )

  const ButtonGroup = campaignMode ? (
    <div className="my-4">
      <Button color={buttonColors.rushed} block onClick={handleRushed}>
        {!shouldTranslate ? 'Siguiente' : translations?.['g7']}
      </Button>
    </div>
  ) : !advancedModeEnabled ? (
    <div className="my-4 row d-flex justify-content-center">
      {isButtonAllowed(Feedback.ANSWERED) && (
        <div className="col-6 mb-3 col-md-auto">
          <Button
            color={buttonColors.answered}
            className="btn-lg mx-auto mx-md-0 d-block w-100"
            onClick={handleAnswered}
          >
            {!shouldTranslate ? 'Atendió' : translations?.['d4']}
          </Button>
        </div>
      )}
      {isButtonAllowed(Feedback.UNANSWERED) && (
        <div className="col-6 mb-3 col-md-auto">
          <Button
            color={buttonColors.unanswered}
            className="btn-lg mx-auto mx-md-0 d-block w-100"
            onClick={handleUnanswered}
          >
            {!shouldTranslate ? 'No en casa' : translations?.['d5']}
          </Button>
        </div>
      )}
      {isButtonAllowed(Feedback.NO_CALL) && (
        <div className="col-6 col-md-auto">
          <Button
            color={buttonColors.noCall}
            className="btn-lg mx-auto mx-md-0 d-block w-100"
            onClick={handleNoCall}
          >
            {!shouldTranslate ? 'No visitar' : translations?.['d9']}
          </Button>
        </div>
      )}
      {isButtonAllowed(Feedback.NON_EXISTENT) && (
        <div className="col-6 col-md-auto">
          <Button
            color={buttonColors.nonExistent}
            className="btn-lg mx-auto mx-md-0 d-block w-100"
            onClick={handleNonExistent}
          >
            {!shouldTranslate ? 'No existe' : translations?.['e1']}
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div className="my-4 row d-flex justify-content-center">
      {isButtonAllowed(Feedback.ANSWERED) && (
        <div className="col-6 mb-2 col-md-auto">
          <Button
            color={buttonColors.answered}
            className="btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleAnswered}
          >
            {!shouldTranslate ? 'Atendió' : translations?.['d4']}
          </Button>
        </div>
      )}
      {isButtonAllowed(Feedback.UNANSWERED) && (
        <div className="col-6 mb-2 col-md-auto">
          <Button
            color={buttonColors.unanswered}
            className="btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleUnanswered}
          >
            {!shouldTranslate ? 'No en casa' : translations?.['d5']}
          </Button>
        </div>
      )}
      {isButtonAllowed(Feedback.ANSWERING_MACHINE) && (
        <div className="col-6 mb-2 col-md-auto">
          <Button
            color={buttonColors.answeringMachine}
            className="btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleAnsweringMachine}
          >
            {!shouldTranslate ? 'Contestador' : translations?.['d6']}
          </Button>
        </div>
      )}
      {isButtonAllowed(Feedback.POSTPONE) && (
        <div className="col-6 mb-2 col-md-auto">
          <Button
            color={buttonColors.postponed}
            className="btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handlePostpone}
          >
            {!shouldTranslate ? 'Aplazar' : translations?.['d7']}
          </Button>
        </div>
      )}
      {isButtonAllowed(Feedback.IGNORE) && (
        <div className="col-6 mb-2 col-md-auto">
          <Button
            color={buttonColors.ignored}
            className="btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleIgnore}
          >
            {!shouldTranslate ? 'Ignorar' : translations?.['d8']}
          </Button>
        </div>
      )}
      {isButtonAllowed(Feedback.NO_CALL) && (
        <div className="col-6 mb-2 col-md-auto">
          <Button
            color={buttonColors.noCall}
            className="btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleNoCall}
          >
            {!shouldTranslate ? 'No visitar' : translations?.['d9']}
          </Button>
        </div>
      )}
      {isButtonAllowed(Feedback.NON_EXISTENT) && (
        <div className="col-6 col-md-auto">
          <Button
            color={buttonColors.nonExistent}
            className="btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleNonExistent}
          >
            {!shouldTranslate ? 'No existe' : translations?.['e1']}
          </Button>
        </div>
      )}
    </div>
  )

  const feedbackToConfirmColor = {
    0: buttonColors.unanswered,
    1: buttonColors.answered,
    2: buttonColors.nonExistent,
    3: buttonColors.noCall,
    4: buttonColors.answeringMachine,
    5: buttonColors.postponed,
    6: buttonColors.ignored,
    7: buttonColors.rushed,
  }

  return (
    <Container className="py-4">
      {selfAssigned && (
        <ReactstrapAlert color="warning">
          Usando número autoasignado
        </ReactstrapAlert>
      )}
      {isFromAnotherTerritory && (
        <ReactstrapAlert color="danger">
          ¡El número es de otro territorio!
        </ReactstrapAlert>
      )}
      {DesktopTable}
      {MobileTable}
      {CommentsSection}
      {!!advancedModeEnabled && (
        <MiniSection>
          <PhoneOptions
            phoneId={phone.id}
            initialNoCallOnWeekends={phone.noWeekends}
            initiallyOpen={false}
            onNoCall={!!campaignMode && handleNoCall}
          />
        </MiniSection>
      )}
      {!!campaignMode && (
        <Jumbotron fluid className="my-2">
          <Container>
            <h6>
              {!shouldTranslate ? '¡Estamos en campaña!' : translations?.['h3']}
            </h6>
            <small>
              {!shouldTranslate
                ? 'Durante la campaña, solo habrá un botón de "siguiente".'
                : translations?.['h4']}
            </small>
          </Container>
        </Jumbotron>
      )}
      {ButtonGroup}
      {advancedModeEnabled && !campaignMode && helpButton}
      {feedbackToConfirm !== null && (
        <ConfirmationModal
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          onConfirm={doConfirm}
          title={!shouldTranslate ? '¿Seguro?' : translations?.['e9']}
          buttonColor={feedbackToConfirmColor[feedbackToConfirm]}
          confirmationLabel={
            labels(shouldTranslate, translations!)[feedbackToConfirm]
          }
        />
      )}
    </Container>
  )
}

const Input = styled.input`
  width: 100%;
  border-top: none;
  border-right: none;
  border-left: none;
  border-image: initial;
  border-bottom: 2px solid ${({ theme }) => theme.text.colors.secondary};
  outline: none;
  transition: border-bottom-color 0.25s;
  margin-bottom: 0.5em;
  border-radius: 5px;
  padding: 0 10px;

  :focus {
    border-bottom-color: ${({ theme }) =>
      theme.darkMode ? theme.text.colors.white : theme.text.colors.black};
  }
`

const MiniSection = styled.div`
  border-top: 1px solid
    ${({ theme }) =>
      theme.darkMode ? theme.text.colors.white : theme.text.colors.secondary};
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.darkMode ? theme.text.colors.white : theme.text.colors.secondary};
  padding: 10px 0;
  margin-top: 2em;
  display: flex;

  > div {
    width: 100%;
  }
`

const HelpButton = styled.button`
  margin-bottom: 0;
  border: none;
  color: ${({ theme }) => (theme.darkMode ? theme.text.colors.white : '#555')};
  text-decoration: underline;
  background: none;
  margin: auto;
`

export { PhoneDetails }
