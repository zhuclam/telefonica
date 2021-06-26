import React, { ReactNode } from 'react'
import { Container } from 'reactstrap'
import styled from 'styled'

interface ErrorDisplayProps {
  message?: ReactNode
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <ErrorContainer className="d-flex justify-content-center align-items-center h-100 text-center">
    <h4>
      {message ?? (
        <>
          Hubo un problema :( <br /> <br /> Intentá recargando la página.
        </>
      )}
    </h4>
  </ErrorContainer>
)

const ErrorContainer = styled(Container)`
  margin-top: 3rem;
  color: ${({ theme }) => theme.text.colors.error};
`

export { ErrorDisplay }
