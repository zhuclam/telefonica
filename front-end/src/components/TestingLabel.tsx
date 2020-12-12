import React from 'react'
import styled from 'styled-components'

const TestingLabel: React.FC = () => (
  <TestingLabelContainer>
    <span>Modo de Prueba</span>
  </TestingLabelContainer>
)

const TestingLabelContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: darkred;
  color: white;
  padding: 5px 10px;
  border-top: 2px solid orange;
  border-bottom: 2px solid orange;
  width: 400px;
  text-align: center;
  transform: rotate(-45deg) translateX(-185px) translateY(73px);
  transform-origin: left;
`

export { TestingLabel }
