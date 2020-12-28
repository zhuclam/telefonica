import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'

const useConfirmationModal = <Data extends {}>() => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const toggleModal = () => {
    isModalOpen ? reset() : setIsModalOpen(!isModalOpen)
  }

  const [data, setData] = useState<Data | null>(null)

  const askEditConfirmation = (data?: Data) => {
    toggleModal()
    data && setData(data)
  }

  const reset = () => {
    setIsModalOpen(false)
    setData(null)
  }

  return {
    isModalOpen,
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
  buttonColor: string
  title: React.ReactNode
  body?: React.ReactNode
  confirmationLabel: React.ReactNode
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  toggleModal,
  onConfirm,
  buttonColor,
  confirmationLabel,
  title,
  body,
}) => (
  <Modal centered isOpen={isOpen} toggle={toggleModal}>
    <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
    {body && <ModalBody>{body}</ModalBody>}
    <ModalFooter>
      <Button color={buttonColor} onClick={onConfirm}>
        {confirmationLabel}
      </Button>
    </ModalFooter>
  </Modal>
)

export { ConfirmationModal, useConfirmationModal }
