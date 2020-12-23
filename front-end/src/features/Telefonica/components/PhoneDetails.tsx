import { useConfig } from 'hooks'
import React from 'react'
import styled from 'styled-components'
import { Feedback, Phone } from 'types'
import { ConfirmationModal, useConfirmationModal } from './ConfirmationModal'
import { PhoneLink } from './PhoneLink'

interface PhoneDetailsProps {
  phone: Phone
  comments: string
  handleComments: (comments: string) => void
  openHelpSection: () => void
  handlePhoneFeedback: (n: Feedback) => void
}

const PhoneDetails: React.FC<PhoneDetailsProps> = ({
  phone,
  comments,
  handleComments,
  openHelpSection,
  handlePhoneFeedback,
}) => {
  const { advancedModeEnabled } = useConfig()

  const {
    isModalOpen,
    feedbackToConfirm,
    askEditConfirmation,
    toggleModal,
    reset,
  } = useConfirmationModal()

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

  const DesktopTable = (
    <div className="table-responsive d-none d-sm-block">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Teléfono</th>
            <th>Dirección</th>
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
      <span>Teléfono:</span>
      <div>
        <PhoneLink phone={phone.phone} />
      </div>
      <br />

      <span>Dirección:</span>
      <div>{phone.info}</div>
      <br />

      {phone.comments && (
        <>
          <span>Comentarios:</span>
          <div>{phone.comments}</div>
          <br />
        </>
      )}

      <span>Última fecha que atendió:</span>
      <div>{phone.answeredOn ?? 'Nunca'}</div>
      <br />

      <span>Última fecha que se lo llamó:</span>
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

  const HelpButton = (
    <div className="mt-3 mr-3 d-flex justify-content-end">
      <button
        className="text-secondary mb-0 border-0"
        style={{ textDecoration: 'underline', background: 'none' }}
        onClick={openHelpSection}
      >
        ¿Qué hace cada botón?
      </button>
    </div>
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
          readOnly={!advancedModeEnabled}
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

  const ButtonGroup = !advancedModeEnabled ? (
    <div className="my-3 row d-flex justify-content-center">
      <div className="col-6 mb-3 col-md-auto">
        <button
          className="btn btn-success btn-lg mx-auto mx-md-0 d-block w-100"
          onClick={handleAnswered}
        >
          Atendió
        </button>
      </div>
      <div className="col-6 mb-3 col-md-auto">
        <button
          className="btn btn-danger btn-lg mx-auto mx-md-0 d-block w-100"
          onClick={handleUnanswered}
        >
          No en casa
        </button>
      </div>
      <div className="col-6 col-md-auto">
        <button
          className="btn btn-warning btn-lg mx-auto mx-md-0 d-block w-100"
          onClick={handleNoCall}
        >
          No visitar
        </button>
      </div>
      <div className="col-6 col-md-auto">
        <button
          className="btn btn-dark btn-lg mx-auto mx-md-0 d-block w-100"
          onClick={handleNonExistent}
        >
          No existe
        </button>
      </div>
    </div>
  ) : (
    <div className="my-3 row d-flex justify-content-center">
      <div className="col-6 mb-2 col-md-auto">
        <button
          className="btn btn-success btn-lg w-100 mx-auto mx-md-0 d-block"
          onClick={handleAnswered}
        >
          Atendió
        </button>
      </div>
      <div className="col-6 mb-2 col-md-auto">
        <button
          className="btn btn-danger btn-lg w-100 mx-auto mx-md-0 d-block"
          onClick={handleUnanswered}
        >
          No en casa
        </button>
      </div>
      <div className="col-6 mb-2 col-md-auto">
        <button
          className="btn btn-primary btn-lg w-100 mx-auto mx-md-0 d-block"
          onClick={handleAnsweringMachine}
        >
          Contestador
        </button>
      </div>
      <div className="col-6 mb-2 col-md-auto">
        <button
          className="btn btn-info btn-lg w-100 mx-auto mx-md-0 d-block"
          onClick={handlePostpone}
        >
          Aplazar
        </button>
      </div>
      <div className="col-6 mb-2 col-md-auto">
        <button
          className="btn btn-secondary btn-lg w-100 mx-auto mx-md-0 d-block"
          onClick={handleIgnore}
        >
          Ignorar
        </button>
      </div>
      <div className="col-6 mb-2 col-md-auto">
        <button
          className="btn btn-warning btn-lg w-100 mx-auto mx-md-0 d-block"
          onClick={handleNoCall}
        >
          No visitar
        </button>
      </div>
      <div className="col-6 col-md-auto">
        <button
          className="btn btn-dark btn-lg w-100 mx-auto mx-md-0 d-block"
          onClick={handleNonExistent}
        >
          No existe
        </button>
      </div>
    </div>
  )

  return (
    <main>
      <div className="container py-4">
        {DesktopTable}
        {MobileTable}
        {advancedModeEnabled && HelpButton}
        {CommentsSection}
        {ButtonGroup}
        {feedbackToConfirm !== null && (
          <ConfirmationModal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            onConfirm={doConfirm}
            feedbackToConfirm={feedbackToConfirm}
          />
        )}
      </div>
    </main>
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

export { PhoneDetails }
