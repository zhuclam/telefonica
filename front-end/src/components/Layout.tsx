import React from 'react'
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
      <Alert name="not-so-fast" position="bottom" variant="failure">
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

export { Layout }
