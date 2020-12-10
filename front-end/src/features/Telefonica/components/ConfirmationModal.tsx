import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap'
import { Feedback, StoragePhone } from 'types'
import { colors, labels } from '../constants'

const useConfirmationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const [feedbackToConfirm, setFeedbackToConfirm] = useState<Feedback | null>(
    null
  )

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const [data, setData] = useState<StoragePhone | null>(null)

  const askEditConfirmation = (f: Feedback, data?: any) => {
    toggleModal()
    setFeedbackToConfirm(f)
    data && setData(data)
  }

  const reset = () => {
    setIsModalOpen(false)
    setFeedbackToConfirm(null)
    setData(null)
  }

  return {
    isModalOpen,
    feedbackToConfirm,
    data,
    askEditConfirmation,
    toggleModal,
    reset,
  }
}

interface ConfirmationModalProps {
  isOpen: boolean
  toggleModal: () => void
  onConfirm: () => void
  feedbackToConfirm: Feedback
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  toggleModal,
  onConfirm,
  feedbackToConfirm,
}) => (
  <Modal centered isOpen={isOpen} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>¿Seguro?</ModalHeader>
    <ModalFooter>
      {feedbackToConfirm !== null && (
        <Button color={colors[feedbackToConfirm]} onClick={onConfirm}>
          {labels[feedbackToConfirm]}
        </Button>
      )}
    </ModalFooter>
  </Modal>
)

export { ConfirmationModal, useConfirmationModal }
