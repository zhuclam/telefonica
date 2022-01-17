import React, { ReactNode } from 'react'
import { Container } from 'reactstrap'
import styled from 'styled'
import { useTranslation } from 'hooks'

interface ErrorDisplayProps {
  message?: ReactNode
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  const { shouldTranslate, translations } = useTranslation()
  return (
    <ErrorContainer className="d-flex justify-content-center align-items-center h-100 text-center">
      <h4>
        {message ?? (
          <>
            {!shouldTranslate ? (
              <>
                Hubo un problema :( <br /> <br /> Intentá recargando la página.
              </>
            ) : (
              <>
                {translations?.['g4']} :( <br /> <br /> {translations?.['g5']}
              </>
            )}
          </>
        )}
      </h4>
    </ErrorContainer>
  )
}

const ErrorContainer = styled(Container)`
  margin-top: 3rem;
  color: ${({ theme }) => theme.text.colors.error};
`

export { ErrorDisplay }
