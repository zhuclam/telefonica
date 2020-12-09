import { useConfig } from 'hooks'
import React from 'react'
import styled from 'styled-components'

interface HelpSectionProps {
  close: () => void
}

const HelpSection: React.FC<HelpSectionProps> = ({ close }) => {
  const { advancedModeEnabled } = useConfig()

  return (
    <Container id="FAQ-container">
      <div className="text-center">
        <h6>
          ¿Qué hace el botón de <span className="text-success">atendió</span>?
        </h6>
        <p>
          Manda el número al final de la cola y registra la fecha en que se
          atendió.
        </p>
      </div>
      <div className="text-center">
        <h6>
          ¿Qué hace el botón de <span className="text-danger">no atendió</span>?
        </h6>
        <p>
          Guarda el número para llamarlo de vuelta mañana, hasta un máximo de 3
          días. Al tercer día, si no atendió, se lo manda al final de la cola.
        </p>
      </div>
      {advancedModeEnabled && (
        <>
          <div className="text-center">
            <h6>
              ¿Qué hace el botón de{' '}
              <span className="text-primary">contestador</span>?
            </h6>
            <p>
              Congela el número por 10 días para darle una segunda oportunidad,
              luego lo manda al final de la cola obligatoriamente. En el caso de
              que el número ya fuera una rellamada (ej.: si ayer se le puso "no
              en casa"), este botón lo manda directamenet al final de la cola
              dado que ya tuve 2 oportunidades y se dejo ahora un mensaje.
            </p>
          </div>
          <div className="text-center">
            <h6>
              ¿Qué hace el botón de <span className="text-info">aplazar</span>?
            </h6>
            <p>Congela el número para que se lo llame dentro de 3 días.</p>
          </div>
          <div className="text-center">
            <h6>
              ¿Qué hace el botón de{' '}
              <span className="text-secondary">ignorar</span>?
            </h6>
            <p>Manda el número directamente al final de la cola.</p>
          </div>
        </>
      )}
      <div className="text-center">
        <h6>
          ¿Qué hace el botón de <span className="text-warning">no visitar</span>
          ?
        </h6>
        <p>
          Quita el número de la cola. No se lo borra pero tampoco se lo volverá
          a llamar.
        </p>
      </div>
      <div className="text-center">
        <h6>
          ¿Qué hace el botón de{' '}
          <span className="text-secondary">no existe</span>?
        </h6>
        <p>
          Suspende el número durante 6 meses. Luego vuelve a la cola porque
          existe la posibilidad de que se haya reactivado.
        </p>
      </div>

      <p className="text-center">
        Nota: en ningún caso se borran los números. Si correspondiera (por ej.
        por estar fuera del territorio), por favor, comunicarse con el siervo de
        territorios.
      </p>

      <Button
        id="FAQ-back-button"
        className="btn btn-secondary"
        onClick={close}
      >
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
