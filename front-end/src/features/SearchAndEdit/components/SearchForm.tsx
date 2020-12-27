import React from 'react'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { Filters } from '../types'

const Error: React.FC = ({ children }) => (
  <span className="text-danger">{children}</span>
)

interface SearchFormProps {
  onSearch: (filters: Filters) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  // const [info, setInfo] = useState<string>('')
  // const [number, setNumber] = useState<string>('')
  // const [id, setId] = useState<string>('')
  // const [answeredOn, setAnsweredOn] = useState<string>('') // yyyy-mm-dd or never
  // const [calledOn, setCalledOn] = useState<string>('') // yyyy-mm-dd or never
  // const [noWeekends, setNoWeekends] = useState<boolean | null>(null)
  // const [noCall, setNoCall] = useState<boolean | null>(null)
  // const [nonExistent, setNonExistent] = useState<boolean | null>(null)

  const { register, handleSubmit, errors, reset, setValue } = useForm<
    Required<Filters>
  >({
    criteriaMode: 'all',
  })

  const onApplyFilters = (form: Filters) => {
    console.log({ form })
    return
    // const filters: Filters = {}

    // info && (filters.info = info)
    // number && (filters.number = number)
    // id && (filters.id = id)
    // answeredOn && (filters.answeredOn = answeredOn)
    // calledOn && (filters.calledOn = calledOn)
    // noWeekends !== null && (filters.noWeekends = noWeekends)
    // noCall !== null && (filters.noCall = noCall)
    // nonExistent !== null && (filters.nonExistent = nonExistent)

    // onSearch(filters)
  }
  console.log({ errors })

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
              <Input id="id" name="id" innerRef={register} />
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="number">Número</Label>
              <Input id="number" name="number" innerRef={register} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="info">Información</Label>
              <Input id="info" name="info" innerRef={register} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="answeredOn">Última vez atendido el</Label>
              <Input
                id="answeredOn"
                name="answeredOn"
                innerRef={register({
                  pattern: /^\d{2}\/\d{2}\/\d{4}$/,
                })}
                placeholder="Ej.: 13/04/2020"
              />
              {errors.answeredOn && (
                <Error>
                  Formato inválido, debe ser dia/mes/año o dejar vacío.
                </Error>
              )}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="calledOn">Última vez atendido el</Label>
              <Input
                id="calledOn"
                name="calledOn"
                innerRef={register({
                  pattern: /^\d{2}\/\d{2}\/\d{4}$/,
                })}
                placeholder="Ej.: 13/04/2020"
              />
              {errors.calledOn && (
                <Error>
                  Formato inválido, debe ser dia/mes/año o dejar vacío.
                </Error>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Input
          type="submit"
          disabled={!!Object.keys(errors).length}
          defaultValue="Buscar"
        />
      </Form>
    </>
  )
}

export { SearchForm }
