import React from 'react'
import { useConfig, useTranslation } from 'hooks'
import { Alert } from '.'
import { Navbar } from './Navbar'
import { TestingLabel } from './TestingLabel'
import { Helmet } from 'react-helmet'

const Layout: React.FC = ({ children }) => {
  const { testModeEnabled, darkModeEnabled, currentTerritory } = useConfig()
  const { shouldTranslate, translations } = useTranslation()

  return (
    <>
      {darkModeEnabled && <Helmet>{darkStyles}</Helmet>}
      {testModeEnabled && <TestingLabel />}
      <Navbar territory={currentTerritory?.name} />
      {children}
      <Alert name="not-so-fast" position="bottom" variant="failure">
        {!shouldTranslate
          ? '¡No tan rápido! No es recomendable tocar un botón tan seguido.'
          : translations?.['b7']}
      </Alert>
    </>
  )
}

const darkStyles = (
  <style>{`
    body {
      background: #222 !important;
      color: white !important;
    }

    table {
      color: white !important;
    }

    .table-striped thead tr {
      background-color: rgba(0,0,0,.95)
    }

    .table-striped tbody tr:nth-of-type(even) {
      background-color: rgba(0,0,0,.5)
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
