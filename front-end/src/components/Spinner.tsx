import React from 'react'
import { Spinner as RSSpinner, Container } from 'reactstrap'
import styled, { css } from 'styled-components'

const colors = ['primary', 'success', 'danger', 'warning', 'info']
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

interface SpinnerProps {
  fulfill?: boolean
}

const Spinner: React.FC<SpinnerProps> = ({ fulfill = false }) => (
  <Container className="h-100">
    <SpinnerContainer
      fulfill={fulfill}
      className="d-flex justify-content-center align-items-center"
    >
      <RSSpinner
        color={getRandomColor()}
        style={{ width: '3rem', height: '3rem' }}
      />
    </SpinnerContainer>
  </Container>
)

const SpinnerContainer = styled.div<Required<Pick<SpinnerProps, 'fulfill'>>>`
  ${({ fulfill }) =>
    fulfill &&
    css`
      width: 100%;
      height: 100%;
    `}
`

export { Spinner }
