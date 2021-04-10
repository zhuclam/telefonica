import React from 'react'
import { useConfig } from 'hooks'
import styled from 'styled-components'
import { CampaignFeedback, Feedback, FeedbackExtended, Phone } from 'types'
import { ConfirmationModal, useConfirmationModal } from 'components'
import { PhoneLink } from './PhoneLink'
import { PhoneOptions } from './PhoneOptions'
import { colors, labels } from 'consts'
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
  const {
    advancedModeEnabled,
    baseConfiguration,
    currentConfiguration,
  } = useConfig()

  const { hiddenButtons } = baseConfiguration
  const { campaignMode } = currentConfiguration

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

  const DesktopTable = (
    <div className="table-responsive d-none d-sm-block">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Teléfono</th>
            <th>Otros datos</th>
            {phone.comments ? <th>Comentarios</th> : null}
            <th>Última fecha que atendió</th>
            <th>Última fecha que se lo llamó</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PhoneLink phone={phone.phone} />
            </td>
            <td>{phone.info}</td>
            {phone.comments ? <td>{phone.comments}</td> : null}
            <td>{phone.answeredOn ?? 'Nunca'}</td>
            <td>
              {phone.unansweredDate ? (
                phone.unansweredDate
              ) : phone.fulfilledOn ? (
                <>
                  {phone.fulfilledOn === 'jue, 25 jun 2020' && 'Antes del '}
                  {phone.fulfilledOn}
                </>
              ) : (
                'Nunca'
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  const MobileTable = (
    <div className="d-block d-sm-none text-center">
      <span style={{ fontWeight: 500 }}>Teléfono:</span>
      <div>
        <PhoneLink phone={phone.phone} />
      </div>
      <br />

      <span style={{ fontWeight: 500 }}>Otros datos:</span>
      <div>{phone.info}</div>
      <br />

      {phone.comments && (
        <>
          <span style={{ fontWeight: 500 }}>Comentarios:</span>
          <div>{phone.comments}</div>
          <br />
        </>
      )}

      <span style={{ fontWeight: 500 }}>Última fecha que atendió:</span>
      <div>{phone.answeredOn ?? 'Nunca'}</div>
      <br />

      <span style={{ fontWeight: 500 }}>Última fecha que se lo llamó:</span>
      <div>
        {phone.unansweredDate ? (
          phone.unansweredDate
        ) : phone.fulfilledOn ? (
          <>
            {phone.fulfilledOn === 'jue, 25 jun 2020' && 'Antes del '}
            {phone.fulfilledOn}
          </>
        ) : (
          'Nunca'
        )}
      </div>
    </div>
  )

  const helpButton = (
    <MiniSection>
      <HelpButton onClick={openHelpSection}>¿Qué hace cada botón?</HelpButton>
    </MiniSection>
  )

  const CommentsSection = (
    <div className="row my-4">
      <div className="col-12">
        <span className="text-secondary d-inline-block mb-2">
          Comentarios (opcional):
        </span>
        <Input
          autoFocus
          placeholder="Sus comentarios acá..."
          type="text"
          value={comments}
          onChange={(e) => handleComments(e.target.value)}
        />

        {phone.commentedOn && (
          <span className="input-helper text-secondary">
            Comentado el:{' '}
            <span className="text-success">{phone.commentedOn}</span>
          </span>
        )}

        {phone.answeringMachineDate && (
          <span className="d-block input-helper text-secondary">
            Último mensaje en el contestador:{' '}
            <span className="text-success">{phone.answeringMachineDate}</span>
          </span>
        )}

        {!phone.commentedOn && !phone.answeringMachineDate && (
          <span className="input-helper text-secondary">
            Ej.: lugar de trabajo, no habla español, etc.
          </span>
        )}
      </div>
    </div>
  )

  const ButtonGroup = campaignMode ? (
    <div className="my-4">
      <Button color="success" block onClick={handleRushed}>
        Siguiente
      </Button>
    </div>
  ) : !advancedModeEnabled ? (
    <div className="my-4 row d-flex justify-content-center">
      {isButtonAllowed(Feedback.ANSWERED) && (
        <div className="col-6 mb-3 col-md-auto">
          <button
            className="btn btn-success btn-lg mx-auto mx-md-0 d-block w-100"
            onClick={handleAnswered}
          >
            Atendió
          </button>
        </div>
      )}
      {isButtonAllowed(Feedback.UNANSWERED) && (
        <div className="col-6 mb-3 col-md-auto">
          <button
            className="btn btn-danger btn-lg mx-auto mx-md-0 d-block w-100"
            onClick={handleUnanswered}
          >
            No en casa
          </button>
        </div>
      )}
      {isButtonAllowed(Feedback.NO_CALL) && (
        <div className="col-6 col-md-auto">
          <button
            className="btn btn-warning btn-lg mx-auto mx-md-0 d-block w-100"
            onClick={handleNoCall}
          >
            No visitar
          </button>
        </div>
      )}
      {isButtonAllowed(Feedback.NON_EXISTENT) && (
        <div className="col-6 col-md-auto">
          <button
            className="btn btn-dark btn-lg mx-auto mx-md-0 d-block w-100"
            onClick={handleNonExistent}
          >
            No existe
          </button>
        </div>
      )}
    </div>
  ) : (
    <div className="my-4 row d-flex justify-content-center">
      {isButtonAllowed(Feedback.ANSWERED) && (
        <div className="col-6 mb-2 col-md-auto">
          <button
            className="btn btn-success btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleAnswered}
          >
            Atendió
          </button>
        </div>
      )}
      {isButtonAllowed(Feedback.UNANSWERED) && (
        <div className="col-6 mb-2 col-md-auto">
          <button
            className="btn btn-danger btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleUnanswered}
          >
            No en casa
          </button>
        </div>
      )}
      {isButtonAllowed(Feedback.ANSWERING_MACHINE) && (
        <div className="col-6 mb-2 col-md-auto">
          <button
            className="btn btn-primary btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleAnsweringMachine}
          >
            Contestador
          </button>
        </div>
      )}
      {isButtonAllowed(Feedback.POSTPONE) && (
        <div className="col-6 mb-2 col-md-auto">
          <button
            className="btn btn-info btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handlePostpone}
          >
            Aplazar
          </button>
        </div>
      )}
      {isButtonAllowed(Feedback.IGNORE) && (
        <div className="col-6 mb-2 col-md-auto">
          <button
            className="btn btn-secondary btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleIgnore}
          >
            Ignorar
          </button>
        </div>
      )}
      {isButtonAllowed(Feedback.NO_CALL) && (
        <div className="col-6 mb-2 col-md-auto">
          <button
            className="btn btn-warning btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleNoCall}
          >
            No visitar
          </button>
        </div>
      )}
      {isButtonAllowed(Feedback.NON_EXISTENT) && (
        <div className="col-6 col-md-auto">
          <button
            className="btn btn-dark btn-lg w-100 mx-auto mx-md-0 d-block"
            onClick={handleNonExistent}
          >
            No existe
          </button>
        </div>
      )}
    </div>
  )

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
      {campaignMode && (
        <Jumbotron fluid className="my-2">
          <Container>
            <h6>¡Estamos en campaña!</h6>
            <small>
              Durante la campaña, solo habrá un botón de "siguiente".
            </small>
          </Container>
        </Jumbotron>
      )}
      {advancedModeEnabled && !campaignMode && (
        <MiniSection>
          <PhoneOptions
            phoneId={phone.id}
            initialNoCallOnWeekends={phone.noWeekends}
          />
        </MiniSection>
      )}
      {ButtonGroup}
      {advancedModeEnabled && !campaignMode && helpButton}
      {feedbackToConfirm !== null && (
        <ConfirmationModal
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          onConfirm={doConfirm}
          title="¿Seguro?"
          buttonColor={colors[feedbackToConfirm]}
          confirmationLabel={labels[feedbackToConfirm]}
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
