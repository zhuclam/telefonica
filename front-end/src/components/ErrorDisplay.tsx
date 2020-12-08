import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'

const ErrorDisplay: React.FC = () => (
  <ErrorContainer className="d-flex justify-content-center align-items-center h-100 text-center">
    <h4>
      Hubo un problema :( <br /> <br /> Intentá recargando la página.
    </h4>
  </ErrorContainer>
)

const ErrorContainer = styled(Container)`
  color: ${({ theme }) => theme.text.colors.error};
`

export { ErrorDisplay }
