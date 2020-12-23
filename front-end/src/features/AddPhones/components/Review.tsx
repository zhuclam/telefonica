import React from 'react'
import { Button, Container } from 'reactstrap'
import styled from 'styled-components'
import { Buttons, Description, Title } from '../styles'
import { NewPhone } from '../types'

interface ReviewProps {
  entryData: NewPhone[]
  onGoBack: () => void
  onConfirm: () => void
}

const Review: React.FC<ReviewProps> = ({ entryData, onGoBack, onConfirm }) => (
  <Container>
    <Title>
      Segundo paso: <span>Confirmar</span>
    </Title>
    <Description>
      Por favor, revise bien la información y confirme si es correcta.
    </Description>
    <Info>
      {entryData.map(({ number, info }, i) => (
        <>
          <span key={number + i}>
            <span>Número:</span> {number}{' '}
            <span className="separator">{'->'}</span> <span>Info:</span> {info}
          </span>
          <br />
        </>
      ))}
    </Info>
    <Buttons>
      <Button color="info" outline onClick={onGoBack}>
        Volver
      </Button>
      <Button color="success" onClick={onConfirm}>
        Confirmar y guardar
      </Button>
    </Buttons>
  </Container>
)

const Info = styled.p`
  width: 100%;
  height: 400px;
  background: ${({ theme }) =>
    theme.darkMode ? '#fff' : theme.text.colors.black};
  padding: 10px;
  overflow: auto;

  span {
    color: ${({ theme }) =>
      theme.darkMode ? theme.text.colors.black : '#fff'};
    display: inline-block;
    margin-bottom: 0.1em;

    span:not(.separator) {
      background-color: #999;
      padding: 2px 10px;
      border-radius: 3px;
    }

    .separator {
      display: inline-block;
      margin: 0 1em;
    }
  }
`

export { Review }
