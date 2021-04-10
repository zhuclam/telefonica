import { useConfig } from 'hooks'
import React from 'react'
import styled from 'styled-components'
import { Feedback } from 'types'

interface HelpSectionProps {
  close: () => void
}

const HelpSection: React.FC<HelpSectionProps> = ({ close }) => {
  const { advancedModeEnabled, baseConfiguration } = useConfig()

  const isAllowed = (f: Feedback) =>
    !baseConfiguration.hiddenButtons.split(',').includes(f.toString())

  return (
    <Container>
      {isAllowed(Feedback.ANSWERED) && (
        <div className="text-center">
          <h6>
            ¿Qué hace el botón de <span className="text-success">atendió</span>?
          </h6>
          <p>
            Manda el número al final de la cola y registra la fecha en que se
            atendió.
          </p>
        </div>
      )}
      {isAllowed(Feedback.UNANSWERED) && (
        <div className="text-center">
          <h6>
            ¿Qué hace el botón de{' '}
            <span className="text-danger">no en casa</span>?
          </h6>
          <p>
            Guarda el número para llamarlo de vuelta mañana, hasta un máximo de{' '}
            {baseConfiguration.unansweredMaxAttemps} intentos. Luego, si no
            atendió, se lo manda al final de la cola.
          </p>
        </div>
      )}
      {advancedModeEnabled && (
        <>
          {isAllowed(Feedback.ANSWERING_MACHINE) && (
            <div className="text-center">
              <h6>
                ¿Qué hace el botón de{' '}
                <span className="text-primary">contestador</span>?
              </h6>
              <p>
                Registra la última vez que se le dejó un mensaje en el
                contestador al amo de casa.&nbsp;
                {baseConfiguration.answeringMachineMaxAttemps > 1 && (
                  <span>
                    Además, congela el número durante{' '}
                    {baseConfiguration.answeringMachinePostponedDays} días para
                    darle un máximo de{' '}
                    {baseConfiguration.answeringMachineMaxAttemps}{' '}
                    oportunidades. Estas oportunidades se computan junto a las
                    que ya se le dio con el botón "no en casa" si ha sido el
                    caso.
                  </span>
                )}
              </p>
            </div>
          )}
          {isAllowed(Feedback.POSTPONE) && (
            <div className="text-center">
              <h6>
                ¿Qué hace el botón de <span className="text-info">aplazar</span>
                ?
              </h6>
              <p>
                Congela el número para que se lo llame dentro de{' '}
                {baseConfiguration.postponedButtonDays}{' '}
                {baseConfiguration.postponedButtonDays > 1 ? 'días' : 'día'}.
              </p>
            </div>
          )}
          {isAllowed(Feedback.IGNORE) && (
            <div className="text-center">
              <h6>
                ¿Qué hace el botón de{' '}
                <span className="text-secondary">ignorar</span>?
              </h6>
              <p>Manda el número directamente al final de la cola.</p>
            </div>
          )}
        </>
      )}
      {isAllowed(Feedback.NO_CALL) && (
        <div className="text-center">
          <h6>
            ¿Qué hace el botón de{' '}
            <span className="text-warning">no visitar</span>?
          </h6>
          <p>
            Quita el número de la cola. No se lo borra pero tampoco se lo
            volverá a llamar.
          </p>
        </div>
      )}
      {isAllowed(Feedback.NON_EXISTENT) && (
        <div className="text-center">
          <h6>
            ¿Qué hace el botón de{' '}
            <span className="text-secondary">no existe</span>?
          </h6>
          <p>
            Suspende el número durante{' '}
            {baseConfiguration.nonExistentPostponedDays} días. Luego vuelve a la
            cola porque existe la posibilidad de que se haya reactivado.
          </p>
        </div>
      )}

      <p className="text-center">
        Nota: en ningún caso se borran los números. Si correspondiera (por ej.
        por estar fuera del territorio), por favor, comunicarse con el siervo de
        territorios.
      </p>

      <Button className="btn btn-secondary" onClick={close}>
        Volver
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  padding: 20px 0;
  min-height: calc(100vh - ${({ theme }) => theme.navbarHeight}px);
  justify-content: space-evenly;
  flex-direction: column;
`

const Button = styled.button`
  width: 100%;
`

export { HelpSection }
