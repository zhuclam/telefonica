import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'
import { Alert, Spinner, useAlerts } from 'components'
import { useFetch } from 'hooks'
import { Phone } from 'types'

type Fields = Pick<
  Phone,
  | 'comments'
  | 'info'
  | 'noCall'
  | 'nonExistent'
  | 'postponedDays'
  | 'phone'
  | 'noWeekends'
>

type EditableFields = {
  [k in keyof Fields]: NonNullable<Fields[k]>
}

interface EditPhoneProps {
  phone: Phone
  onBack: () => void
  onUpdated: (updatedPhone: Phone) => void
}

const EditPhone: React.FC<EditPhoneProps> = ({ phone, onBack, onUpdated }) => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm<EditableFields>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      phone: phone.phone,
      comments: phone.comments,
      info: phone.info ?? '',
      noCall: phone.noCall,
      nonExistent: phone.nonExistent,
      postponedDays: phone.postponedDays,
      noWeekends: phone.noWeekends,
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const Fetch = useFetch()
  const { AlertManager } = useAlerts()

  const onSaveEdition = async (formData: EditableFields) => {
    try {
      setIsLoading(true)

      const [err, updatedPhone] = await Fetch().put<
        EditableFields,
        { phone: Phone }
      >(`phones/${phone.id}`, formData)

      if (err) throw err

      onUpdated(updatedPhone.phone)
      AlertManager.show('update-success')
    } catch {
      AlertManager.show('update-error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Alert name="update-success" position="top" variant="success">
        ¡Número actualizado con éxito! ✨
      </Alert>
      <Alert name="update-error" position="bottom" variant="failure">
        No se pudo actualizar el teléfono. Por favor, intente de nuevo.
      </Alert>
      <Container className="pt-4">
        <h1>Editar número</h1>
        <Form onSubmit={handleSubmit(onSaveEdition)}>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>Número</Label>
                <Input name="phone" innerRef={register} />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label>Info</Label>
                <Input name="info" innerRef={register} />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Días pospuesto</Label>
                <Input
                  type="number"
                  name="postponedDays"
                  innerRef={register({ validate: (d) => d >= 0 })}
                />
              </FormGroup>
              {errors.postponedDays && (
                <span className="text-danger">Valor inválido</span>
              )}
            </Col>
            <Col md="12">
              <FormGroup>
                <Label>Comentarios</Label>
                <Input name="comments" innerRef={register} />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="noWeekends"
                    innerRef={register}
                  />
                  No llamar los finde
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
                  <Input
                    type="checkbox"
                    name="nonExistent"
                    innerRef={register}
                  />
                  No existente
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md="6">
              <Button outline block onClick={onBack}>
                Volver atrás
              </Button>
            </Col>
            <Col md="6">
              <Button
                type="submit"
                block
                color="primary"
                disabled={!isDirty || !isValid}
              >
                {isLoading ? <Spinner fulfill /> : 'Guardar'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export { EditPhone }
