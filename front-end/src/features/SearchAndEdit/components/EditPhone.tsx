import React from 'react'
import { Container } from 'reactstrap'
import { Phone } from 'types'

interface EditPhoneProps {
  phone: Phone
  onBack: () => void
}

const EditPhone: React.FC<EditPhoneProps> = ({ phone, onBack }) => {
  return (
    <>
      <Container className="pt-4">
        <h1>Editar número</h1>
        <h5 onClick={onBack}>Volver atrás</h5>
        <pre>{JSON.stringify(phone, null, 2)}</pre>
      </Container>
    </>
  )
}

export { EditPhone }
