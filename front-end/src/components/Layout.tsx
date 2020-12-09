import React from 'react'
import { css } from 'styled-components'
import { Alert } from '.'
import { Navbar } from './Navbar'

const Layout: React.FC = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Alert name="not-so-fast" position="bottom" containerCSS={FailedAlertCss}>
      ¡No tan rápido! No es recomendable tocar un botón tan seguido.
    </Alert>
  </>
)

const FailedAlertCss = css`
  background: #444;
  border-bottom: #28a745 5px solid;
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ theme }) => theme.text.colors.error} 5px solid;
`

export { Layout }
