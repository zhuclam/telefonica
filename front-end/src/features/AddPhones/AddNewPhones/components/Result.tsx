import React from 'react'
import { Button, Container } from 'reactstrap'
import { Buttons, Description, Title } from '../../styles'
import { AddPhoneResponse } from '../../types'

interface ResultProps {
  response: AddPhoneResponse
  onAddMore: () => void
  onBackToAdminPanel: () => void
}

const Result: React.FC<ResultProps> = ({
  response,
  onAddMore,
  onBackToAdminPanel,
}) => (
  <Container>
    <Title>¡Listo! 🌟</Title>
    <h4>Números agregados: {response.successCount}</h4>
    <h4>Números que no se agregaron(*): {response.failureCount}</h4>
    <Description className="mt-3">
      * Cuando un número no se agrega, por lo general se debe a que es
      duplicado.
    </Description>
    <Buttons className="mt-5">
      <Button color="info" onClick={onAddMore}>
        Agregar más números
      </Button>
      <Button color="success" onClick={onBackToAdminPanel}>
        Volver al panel de administrador
      </Button>
    </Buttons>
  </Container>
)

export { Result }
