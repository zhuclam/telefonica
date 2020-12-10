import React, { useState } from 'react'
import { Collapse } from 'reactstrap'
import styled from 'styled-components'
import { usePhoneStorage } from 'hooks'
import { Feedback, StoragePhone } from 'types'
import { isToday } from 'utils'
import { colors, labels } from '../constants'
import { useConfirmationModal, ConfirmationModal } from './'

interface PhonesInStorageProps {
  currentPhoneId: number
  onEditRequest: (storagePhone: StoragePhone, newStatus: Feedback) => void
  PhoneStorage: ReturnType<typeof usePhoneStorage>
}

const PhonesInStorage: React.FC<PhonesInStorageProps> = ({
  currentPhoneId,
  onEditRequest,
  PhoneStorage,
}) => {
  const [collapsed, setCollapsed] = useState<number | null>(null)
  const {
    isModalOpen,
    feedbackToConfirm,
    data: storagePhoneToConfirm,
    askEditConfirmation,
    toggleModal,
    reset,
  } = useConfirmationModal()

  const resetStates = () => {
    setCollapsed(null)
    reset()
  }

  const handleCollapsed = (i: number) =>
    collapsed !== i ? setCollapsed(i) : setCollapsed(null)

  const doConfirm = () => {
    if (!storagePhoneToConfirm || feedbackToConfirm === null) return
    onEditRequest(storagePhoneToConfirm, feedbackToConfirm)
    resetStates()
  }

  const phones = PhoneStorage.getAll()

  const rows = phones.reverse().map((p, i) => {
    if (p.id === currentPhoneId) return null

    const phoneIsFromToday = isToday(p.savedOn)
    const color = p.status !== null ? colors[p.status] : ''

    const statusLabel =
      !phoneIsFromToday && p.status === null
        ? 'Asignado a otro publicador'
        : p.status !== null
        ? labels[p.status]
        : 'Sin respuesta'

    const isCollapsed = i === collapsed

    return (
      <tr key={p.id} style={{ position: 'relative' }}>
        <td>{p.phone}</td>
        <td>
          <span className={`text-${color}`}>{statusLabel}</span>
        </td>
        <td>
          {phoneIsFromToday && (
            <button
              className="btn btn-secondary"
              onClick={() => handleCollapsed(i)}
            >
              Editar
            </button>
          )}
          <CollapseButtons isOpen={isCollapsed}>
            {p.status !== Feedback.ANSWERED && (
              <button
                className="btn btn-success btn-sm d-inline-block mr-1 mb-2"
                onClick={() => askEditConfirmation(Feedback.ANSWERED, p)}
              >
                Atendió
              </button>
            )}
            {p.status !== Feedback.UNANSWERED && (
              <button
                className="btn btn-danger btn-sm d-inline-block mr-1 mb-2"
                onClick={() => askEditConfirmation(Feedback.UNANSWERED, p)}
              >
                No en casa
              </button>
            )}
            {p.status !== Feedback.ANSWERING_MACHINE && (
              <button
                className="btn btn-primary btn-sm d-inline-block mr-1 mb-2"
                onClick={() =>
                  askEditConfirmation(Feedback.ANSWERING_MACHINE, p)
                }
              >
                Contestador
              </button>
            )}
            {p.status !== Feedback.POSTPONE && (
              <button
                className="btn btn-info btn-sm d-inline-block mr-1 mb-2"
                onClick={() => askEditConfirmation(Feedback.POSTPONE, p)}
              >
                Aplazar
              </button>
            )}
            {p.status !== Feedback.IGNORE && (
              <button
                className="btn btn-secondary btn-sm d-inline-block mr-1 mb-2"
                onClick={() => askEditConfirmation(Feedback.IGNORE, p)}
              >
                Ignorar
              </button>
            )}
            {p.status !== Feedback.NO_CALL && (
              <button
                className="btn btn-warning btn-sm d-inline-block mr-1 mb-2"
                onClick={() => askEditConfirmation(Feedback.NO_CALL, p)}
              >
                No visitar
              </button>
            )}
            {p.status !== Feedback.NON_EXISTENT && (
              <button
                className="btn btn-dark btn-sm d-inline-block mr-1 mb-2"
                onClick={() => askEditConfirmation(Feedback.NON_EXISTENT, p)}
              >
                No existe
              </button>
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
        Números anteriores en este dispositivo:
      </h6>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
      {!!feedbackToConfirm && (
        <ConfirmationModal
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          onConfirm={doConfirm}
          feedbackToConfirm={feedbackToConfirm}
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
`

export { PhonesInStorage }
