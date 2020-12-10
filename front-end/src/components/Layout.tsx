import React from 'react'
import { css } from 'styled-components'
import { useConfig } from 'hooks'
import { Alert } from '.'
import { Navbar } from './Navbar'
import { TestingLabel } from './TestingLabel'
import { Helmet } from 'react-helmet'

const Layout: React.FC = ({ children }) => {
  const { testModeEnabled, darkModeEnabled } = useConfig()

  return (
    <>
      {darkModeEnabled && <Helmet>{backgroundGlobalStyles}</Helmet>}
      {testModeEnabled && <TestingLabel />}
      <Navbar />
      {children}
      <Alert name="not-so-fast" position="bottom" containerCSS={FailedAlertCss}>
        ¡No tan rápido! No es recomendable tocar un botón tan seguido.
      </Alert>
    </>
  )
}

const backgroundGlobalStyles = (
  <style>{`
    body {
      background: #222 !important;
      color: white !important;
    }

    table {
      color: white !important;
    }

    .text-secondary {
      color: #999 !important;
    }

    .modal-content {
      background-color: #222 !important;
    }

    .close {
      color: white !important;
    }

    .jumbotron {
      background: #454b4f !important;
    }

    input {
      border-top-style: hidden;
      border-right-style: hidden;
      border-left-style: hidden;
      border-bottom-style: groove;
      background-color: white;
    }

    input::placeholder {
      color: #777 !important;
    }

    .breadcrumb {
      background-color: #333;
    }

    .breadcrumb-item.active {
      color: #ddd;
    }
`}</style>
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
