import React from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { Filters } from '../types'
import { useRerender } from 'hooks/utils'

const Error: React.FC = ({ children }) => (
  <span className="text-danger">{children}</span>
)

const delocalizeDateString = (date: string): string =>
  date.split('/').reverse().join('-')

interface SearchFormProps {
  onSearch: (filters: Filters) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    getValues,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<Required<Filters>>({
    mode: 'all',
  })

  const onApplyFilters = ({
    info,
    number,
    id,
    answeredOn,
    calledOn,
    noWeekends,
    noCall,
    nonExistent,
  }: Required<Filters>) => {
    const filters: Filters = {}

    info && (filters.info = info)
    number && (filters.number = number)
    id && (filters.id = id)
    answeredOn &&
      (answeredOn === 'Nunca'
        ? (filters.answeredOn = 'never')
        : (filters.answeredOn = delocalizeDateString(answeredOn)))
    calledOn &&
      (calledOn === 'Nunca'
        ? (filters.calledOn = 'never')
        : (filters.calledOn = delocalizeDateString(calledOn)))
    noWeekends && (filters.noWeekends = noWeekends)
    noCall && (filters.noCall = noCall)
    nonExistent && (filters.nonExistent = nonExistent)

    onSearch(filters)
  }

  const { forceUpdate } = useRerender()

  return (
    <>
      <span className="text-secondary d-block mb-3">
        Todos los campos son opcionales.
      </span>
      <Form onSubmit={handleSubmit(onApplyFilters)}>
        <Row>
          <Col md="2">
            <FormGroup>
              <Label for="id">ID</Label>
              <Input id="id" name="id" innerRef={register} autoComplete="off" />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="number">Número</Label>
              <Input
                id="number"
                name="number"
                innerRef={register}
                autoComplete="off"
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="info">Información</Label>
              <Input
                id="info"
                name="info"
                innerRef={register}
                autoComplete="off"
              />
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="answeredOn">Última vez atendido el</Label>
              <Input
                id="answeredOn"
                name="answeredOn"
                innerRef={register({
                  pattern: /^(\d{2}\/\d{2}\/\d{4}|Nunca)$/,
                })}
                placeholder="Ej.: 13/04/2020"
                autoComplete="off"
              />
              {errors.answeredOn && (
                <Error>
                  Formato inválido, debe ser dia/mes/año, 'Nunca' o dejar vacío.
                </Error>
              )}
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={getValues('answeredOn') === 'Nunca'}
                  onChange={(e) => {
                    setValue('answeredOn', e.target.checked ? 'Nunca' : '')
                    forceUpdate()
                  }}
                />
                Nunca antes atendió
              </Label>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="calledOn">Última vez llamado el</Label>
              <Input
                id="calledOn"
                name="calledOn"
                innerRef={register({
                  pattern: /^(\d{2}\/\d{2}\/\d{4}|Nunca)$/,
                })}
                placeholder="Ej.: 13/04/2020"
                autoComplete="off"
              />

              {errors.calledOn && (
                <Error>
                  Formato inválido, debe ser dia/mes/año, 'Nunca' o dejar vacío.
                </Error>
              )}
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={getValues('calledOn') === 'Nunca'}
                  onChange={(e) => {
                    setValue('calledOn', e.target.checked ? 'Nunca' : '')
                    forceUpdate()
                  }}
                />
                Nunca antes llamado
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md="4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="noWeekends" innerRef={register} />
                No llamar los fines de semana
              </Label>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="noCall" innerRef={register} />
                No visitar
              </Label>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="nonExistent" innerRef={register} />
                No existente
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md="6">
            <Button block outline onClick={() => reset()}>
              Limpiar campos
            </Button>
          </Col>
          <Col md="6">
            <Button
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
              color="primary"
              block
            >
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export { SearchForm }
