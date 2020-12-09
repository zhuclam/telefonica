import React from 'react'
import { Spinner as RSSpinner, Container } from 'reactstrap'
import styled, { css } from 'styled-components'

const colors = ['success', 'danger', 'warning', 'info']
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

interface SpinnerProps {
  fulfill?: boolean
  container?: boolean
}

const Spinner: React.FC<SpinnerProps> = ({
  fulfill = false,
  container = false,
}) => (
  <Container className="h-100">
    <SpinnerContainer
      fulfill={fulfill}
      container={container}
      className="d-flex justify-content-center align-items-center"
    >
      <RSSpinner
        color={getRandomColor()}
        style={{ width: '3rem', height: '3rem' }}
      />
    </SpinnerContainer>
  </Container>
)

const SpinnerContainer = styled.div<Required<SpinnerProps>>`
  ${({ fulfill, container, theme }) =>
    fulfill &&
    css`
      width: 100%;
      height: ${container ? `calc(100vh - ${theme.navbarHeight}px)` : '100%'};
    `}
`

export { Spinner }
