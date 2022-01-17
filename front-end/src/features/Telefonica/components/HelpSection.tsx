import { useConfig, useButtonColor, useTranslation } from 'hooks'
import React from 'react'
import styled from 'styled'
import { Feedback } from 'types'
import { labels } from 'consts'

interface HelpSectionProps {
  close: () => void
}

const HelpSection: React.FC<HelpSectionProps> = ({ close }) => {
  const { advancedModeEnabled, configurations } = useConfig()
  const { buttonColors } = useButtonColor()
  const { shouldTranslate, translations } = useTranslation()

  const isAllowed = (f: Feedback) =>
    !configurations.hiddenButtons.split(',').includes(f.toString())

  return (
    <Container>
      {isAllowed(Feedback.ANSWERED) && (
        <div className="text-center">
          <h6>
            {!shouldTranslate ? '¿Qué hace el botón de' : translations?.['f2']}{' '}
            <span className={`text-${buttonColors.answered}`}>
              {labels(shouldTranslate, translations!)[Feedback.ANSWERED]}
            </span>
            ?
          </h6>
          <p>
            {!shouldTranslate
              ? 'Manda el número al final de la cola y registra la fecha en que se atendió.'
              : translations?.['f3']}
          </p>
        </div>
      )}
      {isAllowed(Feedback.UNANSWERED) && (
        <div className="text-center">
          <h6>
            {!shouldTranslate ? '¿Qué hace el botón de' : translations?.['f2']}{' '}
            <span className={`text-${buttonColors.unanswered}`}>
              {labels(shouldTranslate, translations!)[Feedback.UNANSWERED]}
            </span>
            ?
          </h6>
          <p>
            {!shouldTranslate ? (
              <>
                Guarda el número para llamarlo de vuelta mañana, hasta un máximo
                de {configurations.unansweredMaxAttemps} intentos. Luego, si no
                atendió, se lo manda al final de la cola.
              </>
            ) : (
              translations?.['f4'].replace(
                '3',
                configurations.unansweredMaxAttemps.toString()
              )
            )}
          </p>
        </div>
      )}
      {advancedModeEnabled && (
        <>
          {isAllowed(Feedback.ANSWERING_MACHINE) && (
            <div className="text-center">
              <h6>
                {!shouldTranslate
                  ? '¿Qué hace el botón de'
                  : translations?.['f2']}{' '}
                <span className={`text-${buttonColors.answeringMachine}`}>
                  {
                    labels(shouldTranslate, translations!)[
                      Feedback.ANSWERING_MACHINE
                    ]
                  }
                </span>
                ?
              </h6>
              <p>
                {!shouldTranslate ? (
                  <>
                    Registra la última vez que se le dejó un mensaje en el
                    contestador al amo de casa.&nbsp;
                    {configurations.answeringMachineMaxAttemps > 1 && (
                      <span>
                        Además, congela el número durante{' '}
                        {configurations.answeringMachinePostponedDays} días para
                        darle un máximo de{' '}
                        {configurations.answeringMachineMaxAttemps}{' '}
                        oportunidades. Estas oportunidades se computan junto a
                        las que ya se le dio con el botón "no en casa" si ha
                        sido el caso.
                      </span>
                    )}
                  </>
                ) : (
                  translations?.['f5']
                    .replace(
                      '10',
                      configurations.answeringMachinePostponedDays.toString()
                    )
                    .replace(
                      '2',
                      configurations.answeringMachineMaxAttemps.toString()
                    )
                )}
              </p>
            </div>
          )}
          {isAllowed(Feedback.POSTPONE) && (
            <div className="text-center">
              <h6>
                {!shouldTranslate
                  ? '¿Qué hace el botón de'
                  : translations?.['f2']}{' '}
                <span className={`text-${buttonColors.postponed}`}>
                  {labels(shouldTranslate, translations!)[Feedback.POSTPONE]}
                </span>
                ?
              </h6>
              <p>
                {!shouldTranslate ? (
                  <>
                    Congela el número para que se lo llame dentro de{' '}
                    {configurations.postponedButtonDays}{' '}
                    {configurations.postponedButtonDays > 1 ? 'días' : 'día'}.
                  </>
                ) : (
                  translations?.['f6'].replace(
                    '3',
                    configurations.postponedButtonDays.toString()
                  )
                )}
              </p>
            </div>
          )}
          {isAllowed(Feedback.IGNORE) && (
            <div className="text-center">
              <h6>
                {!shouldTranslate
                  ? '¿Qué hace el botón de'
                  : translations?.['f2']}{' '}
                <span className={`text-${buttonColors.ignored}`}>
                  {labels(shouldTranslate, translations!)[Feedback.IGNORE]}
                </span>
                ?
              </h6>
              <p>
                {!shouldTranslate
                  ? 'Manda el número directamente al final de la cola.'
                  : translations?.['f7']}
              </p>
            </div>
          )}
        </>
      )}
      {isAllowed(Feedback.NO_CALL) && (
        <div className="text-center">
          <h6>
            {!shouldTranslate ? '¿Qué hace el botón de' : translations?.['f2']}{' '}
            <span className={`text-${buttonColors.noCall}`}>
              {labels(shouldTranslate, translations!)[Feedback.NO_CALL]}
            </span>
            ?
          </h6>
          <p>
            {!shouldTranslate
              ? 'Quita el número de la cola. No se lo borra pero tampoco se lo volverá a llamar.'
              : translations?.['f8']}
          </p>
        </div>
      )}
      {isAllowed(Feedback.NON_EXISTENT) && (
        <div className="text-center">
          <h6>
            {!shouldTranslate ? '¿Qué hace el botón de' : translations?.['f2']}{' '}
            <span className={`text-${buttonColors.nonExistent}`}>
              {labels(shouldTranslate, translations!)[Feedback.NON_EXISTENT]}
            </span>
            ?
          </h6>
          <p>
            {!shouldTranslate ? (
              <>
                Suspende el número durante{' '}
                {configurations.nonExistentPostponedDays} días. Luego vuelve a
                la cola porque existe la posibilidad de que se haya reactivado.
              </>
            ) : (
              translations?.['f9'].replace(
                '180',
                configurations.nonExistentPostponedDays.toString()
              )
            )}
          </p>
        </div>
      )}

      <p className="text-center">
        {!shouldTranslate
          ? 'Nota: en ningún caso se borran los números. Si correspondiera (por ej. por estar fuera del territorio), por favor, comunicarse con el siervo de territorios.'
          : translations?.['g1']}
      </p>

      <Button className="btn btn-secondary" onClick={close}>
        {!shouldTranslate ? 'Volver' : translations?.['g2']}
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
