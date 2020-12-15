import { useConfig } from 'hooks'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import styled from 'styled-components'
import { Buttons, Description, Title } from '../styles'
import { NewPhone } from '../types'
import { generateRandomInfo, generateRandomNumber } from '../utils'

const LineIndicator: React.ForwardRefExoticComponent<
  {
    lines: number
  } & React.RefAttributes<unknown>
> = forwardRef(({ lines }, ref) => (
  // @ts-ignore
  <LineIndicatorContainer ref={ref}>
    {Array(lines)
      .fill(1)
      .map((_, i) => (
        <li key={i}>{i + 1}-</li>
      ))}
  </LineIndicatorContainer>
))

interface EntryDataProps {
  onNextStep: () => void
  handleSetEntrydata: (data: NewPhone[]) => void
}

const EntryData: React.FC<EntryDataProps> = ({
  onNextStep,
  handleSetEntrydata,
}) => {
  const [numbers, setNumbers] = useState<string>('')
  const [additional, setAdditional] = useState<string>('')
  const numberLineIndicatorRef = useRef<HTMLDivElement | null>(null)
  const additionalLineIndicatorRef = useRef<HTMLDivElement | null>(null)

  const { testModeEnabled } = useConfig()

  const setRandomData = () => {
    if (!testModeEnabled) return
    const numbers = Array(10)
      .fill(1)
      .map((_) => generateRandomNumber())
      .join('\n')
    const info = Array(10)
      .fill(1)
      .map((_) => generateRandomInfo())
      .join('\n')

    setNumbers((prev) => prev + numbers + '\n')
    setAdditional((prev) => prev + info + '\n')
  }

  const handleIndicatorsScroll = (type: 'number' | 'additional') => (
    e: React.UIEvent<HTMLTextAreaElement, UIEvent>
  ) => {
    const position: number =
      // @ts-ignore
      e.target.scrollTop
    const el =
      type === 'number'
        ? numberLineIndicatorRef?.current
        : additionalLineIndicatorRef?.current
    if (!el) return
    el.scroll(0, position)
  }

  const onNumberScroll = handleIndicatorsScroll('number')
  const onAdditionalScroll = handleIndicatorsScroll('additional')

  const numberLines = numbers.split('\n').length
  const additionalLines = additional.split('\n').length

  useEffect(() => {
    if (numberLines === additionalLines) return
    const missing = numberLines > additionalLines
    const difference = Math.abs(numberLines - additionalLines)
    if (missing) {
      setAdditional((additional) => additional + '\n'.repeat(difference))
    } else {
      setAdditional((additional) => {
        let lines = additional.split('\n')
        let pending = difference
        while (lines[lines.length - 1] === '' && pending > 0) {
          lines.pop()
          pending--
        }
        return lines.join('\n')
      })
    }
  }, [numberLines, additionalLines, numbers])

  const haveSameAmountOfLines = numberLines === additionalLines
  const haveEmptyNumberLines = numbers
    .split('\n')
    .some((line) => line.trim() === '')

  const disableNextStep = !haveSameAmountOfLines || haveEmptyNumberLines

  const onDone = () => {
    handleSetEntrydata(
      numbers.split('\n').map((number, index) => ({
        number,
        address: additional.split('\n')[index],
      }))
    )
    onNextStep()
  }

  return (
    <>
      <Title>
        Paso 1: <span>Ingresar datos</span>
      </Title>
      <Description>
        Ingrese una lista de números en la caja de la izquierda.{' '}
        <span>Separe cada número con un nuevo salto de línea (Enter)</span>.
      </Description>
      <Description>
        Repita lo mismo en la caja de la derecha con la{' '}
        <span>información adicional</span> -dirección, nombre de la persona,
        etc.- que deba acompañar a cada número
        <span> que se corresponda en la misma posición de ordenamiento</span>.
      </Description>
      <Description>
        La información adicional de la caja de la derecha es{' '}
        <span>opcional</span>, puede omitirla. Si desea omitir esa información
        solamente para una fila (número), deje un espacio en blanco en la
        posición de esa línea.
      </Description>
      <Description>
        No se preocupe por comenter errores,{' '}
        <span>podrá revisar la información</span> antes de enviarla{' '}
        <span>en el siguiente paso</span>.
      </Description>
      <Description>
        <span>Consejo:</span> puede copiar y pegar una columna entera de excel
        en cada caja.
      </Description>
      {testModeEnabled && (
        <Button color="info" onClick={setRandomData}>
          Generar datos aleatorios
        </Button>
      )}
      <Row className="mt-3">
        <Col xs={12} md={6} style={{ position: 'relative' }}>
          <h5>Teléfonos:</h5>
          <LineIndicator lines={numberLines} ref={numberLineIndicatorRef} />
          <TextArea
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            onScroll={onNumberScroll}
            placeholder="Ej.: (011) 4754-7845"
          ></TextArea>
        </Col>
        <Col xs={12} md={6} style={{ position: 'relative' }}>
          <h5>Información adicional:</h5>
          <LineIndicator
            lines={additionalLines}
            ref={additionalLineIndicatorRef}
          />
          <TextArea
            value={additional}
            onChange={(e) => setAdditional(e.target.value)}
            onScroll={onAdditionalScroll}
            placeholder="Ej.: Pepe Mujica - Av. Gral Rodríguez 2084"
          ></TextArea>
        </Col>
      </Row>
      <Validations>
        <h4>Para avanzar al siguiente paso, se debe cumplir con:</h4>
        <div>
          <Rule valid={!haveEmptyNumberLines}>
            No debe haber filas vacías de números
          </Rule>
          <Rule valid={haveSameAmountOfLines}>
            Números e información adicional deben tener la misma cantidad de
            líneas
          </Rule>
        </div>
      </Validations>
      <Buttons>
        <Button color="success" onClick={onDone} disabled={disableNextStep}>
          Siguiente paso
        </Button>
      </Buttons>
    </>
  )
}

const LineIndicatorContainer = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 1.5em;
  margin: 0;
  padding: 0;
  padding-top: 1px;
  line-height: 20px;
  height: 400px;
  width: 3em;
  overflow-y: hidden;
  border-right: 1px dashed #999;

  li {
    list-style: none;
    font-weight: 500;
    color: #666;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 0 1em 0 4em;
  line-height: 20px;
  white-space: nowrap;
  overflow-x: hidden;
`

const Validations = styled.div`
  margin-top: 2em;
  padding-bottom: 5em;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;

    span {
      margin-top: 1em;
    }
  }
`

const Rule = styled.span<{ valid: boolean }>`
  color: ${({ theme, valid }) =>
    valid ? theme.text.colors.green : theme.text.colors.red};

  ::before {
    content: '${({ valid }) => (valid ? '✅' : '❗')}';
    margin-right: 0.5em;
  }
`

export { EntryData }
