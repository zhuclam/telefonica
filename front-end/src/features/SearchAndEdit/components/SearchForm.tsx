import React from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { Filters } from '../types'
import { useRerender } from 'hooks/utils'
import { TerritorySelector } from 'components'
import { useConfig } from 'hooks'

const Error: React.FC = ({ children }) => (
  <span className="text-danger">{children}</span>
)

const delocalizeDateString = (date: string): string =>
  date.split('/').reverse().join('-')

interface SearchFormProps {
  onSearch: (filters: Filters) => void
  isImport: boolean
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isImport }) => {
  const { territories } = useConfig()
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
    reValidateMode: 'onChange',
    defaultValues: {
      count: 100,
      territoryId: '',
    },
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
    comments,
    count,
    territoryId: territoryName,
  }: Required<Filters>) => {
    const filters: Filters = {}

    filters.count = count

    info && (filters.info = info)
    number && (filters.number = number)
    id && (filters.id = id)
    comments && (filters.comments = comments)
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
    if (territoryName) {
      const id = territories.find((t) => t.name === territoryName)!.id
      id && (filters.territoryId = id.toString())
    }

    onSearch(filters)
  }

  const searchAny = () => {
    const filters: Filters = {}

    filters.count = getValues('count')
    filters.any = true

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
          {isImport && (
            <Col xs={12} md={6}>
              <FormGroup>
                <Label>Territorio</Label>
                <TerritorySelector
                  excludeCurrent
                  name="territoryId"
                  ref={register}
                />
              </FormGroup>
            </Col>
          )}
          <Col xs={12} md={isImport ? 6 : 12}>
            <FormGroup>
              <Label>Cantidad a mostrar</Label>
              <Input
                type="number"
                name="count"
                innerRef={register({ validate: (d) => d >= 1 })}
              />
            </FormGroup>
          </Col>
        </Row>
        <hr />
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
          <Col md="4">
            <FormGroup>
              <Label for="comments">Comentarios</Label>
              <Input
                id="comments"
                name="comments"
                innerRef={register}
                autoComplete="off"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={getValues('comments') === '*'}
                  onChange={(e) => {
                    setValue('comments', e.target.checked ? '*' : '', {
                      shouldDirty: true,
                    })
                    forceUpdate()
                  }}
                />
                Comentario no vacío
              </Label>
            </FormGroup>
          </Col>
          <Col md="4">
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
                    setValue('answeredOn', e.target.checked ? 'Nunca' : '', {
                      shouldDirty: true,
                    })
                    forceUpdate()
                  }}
                />
                Nunca antes atendió
              </Label>
            </FormGroup>
          </Col>
          <Col md="4">
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
                    setValue('calledOn', e.target.checked ? 'Nunca' : '', {
                      shouldDirty: true,
                    })
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
          <Col md={isImport ? 6 : 4}>
            <Button block outline onClick={() => reset()}>
              Limpiar campos
            </Button>
          </Col>
          <Col md={isImport ? 6 : 4}>
            <Button
              type="submit"
              disabled={
                (!isDirty &&
                  !getValues('answeredOn') &&
                  !getValues('calledOn') &&
                  !getValues('comments')) ||
                !isValid ||
                isSubmitting
              }
              color="primary"
              block
            >
              Buscar{!isImport ? ' con filtros' : ''}
            </Button>
          </Col>
          {!isImport && (
            <Col md="4">
              <Button color="success" block onClick={searchAny}>
                Buscar todos
              </Button>
            </Col>
          )}
        </Row>
      </Form>
    </>
  )
}

export { SearchForm }
