import React, { useState } from 'react'
import {
  Container,
  FormGroup,
  Input,
  Label,
  Form,
  Button,
  Row,
  Col,
} from 'reactstrap'
import { useForm } from 'react-hook-form'
import { useConfig, useFetch } from 'hooks'
import { Configurations as TConfigurations, Feedback } from 'types'
import { Alert, Breadcrumb, Spinner, useAlerts } from 'components'
import { labels } from 'consts'

const breadcrumbItems = [
  {
    title: 'Panel de Administración',
    linkTo: '/admin-panel',
  },
  {
    title: 'Configuración de la App',
  },
]

const translations: Record<
  keyof Omit<TConfigurations, 'hiddenButtons' | 'territoryId'>,
  string
> = {
  unansweredMaxAttemps: 'Máximo de intentos para no en casa',
  answeringMachineMaxAttemps: 'Máximo de intentos para el contestador',
  answeringMachinePostponedDays:
    'Días que se pospone un número al dejar un mensaje en el contestador',
  postponedButtonDays:
    'Días que se pospone un número al tocar el botón "Aplazar"',
  nonExistentPostponedDays: 'Días que queda congelado un número inexistente',
}

type EditableConfigurations = {
  unansweredMaxAttemps: string
  answeringMachineMaxAttemps: string
  answeringMachinePostponedDays: string
  postponedButtonDays: string
  nonExistentPostponedDays: string
  button0shown: boolean
  button1shown: boolean
  button2shown: boolean
  button3shown: boolean
  button4shown: boolean
  button5shown: boolean
  button6shown: boolean
}

const FeedbackValues = Object.values(Feedback).filter(
  (x) => typeof x === 'number'
) as number[]

const Configurations: React.FC = () => {
  const { configurations, updateConfigs } = useConfig()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const Fetch = useFetch()
  const { AlertManager } = useAlerts()

  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid },
  } = useForm<EditableConfigurations>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      unansweredMaxAttemps: configurations.unansweredMaxAttemps.toString(),
      answeringMachineMaxAttemps:
        configurations.answeringMachineMaxAttemps.toString(),
      answeringMachinePostponedDays:
        configurations.answeringMachinePostponedDays.toString(),
      postponedButtonDays: configurations.postponedButtonDays.toString(),
      nonExistentPostponedDays:
        configurations.nonExistentPostponedDays.toString(),
      ...FeedbackValues.reduce(
        (acc, curr) => ({
          ...acc,
          [`button${curr}shown`]: !configurations.hiddenButtons
            .split(',')
            .includes(curr.toString()),
        }),
        {}
      ),
    },
  })

  const saveConfig = async (formData: EditableConfigurations) => {
    try {
      setIsLoading(true)
      const payload = {} as TConfigurations

      payload.unansweredMaxAttemps = parseInt(formData.unansweredMaxAttemps)
      payload.answeringMachineMaxAttemps = parseInt(
        formData.answeringMachineMaxAttemps
      )
      payload.answeringMachinePostponedDays = parseInt(
        formData.answeringMachinePostponedDays
      )
      payload.postponedButtonDays = parseInt(formData.postponedButtonDays)
      payload.nonExistentPostponedDays = parseInt(
        formData.nonExistentPostponedDays
      )

      payload.hiddenButtons = Object.entries(formData)
        .filter(([k]) => /button\dshown/.test(k))
        .reduce((acc, [key, value]) => {
          if (value === true) return acc
          const number = key.match(/button(\d)shown/)![1]
          return [...acc, number]
        }, [] as string[])
        .join(',')

      const [err, configs] = await Fetch().put<
        TConfigurations,
        { configurations: TConfigurations }
      >('/configurations', payload)

      if (err) throw err

      updateConfigs(configs.configurations)
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
        ¡Configuraciones actualizadas con éxito! ✨
      </Alert>
      <Alert name="update-error" position="bottom" variant="failure">
        No se pudo actualizar las configuraciones. Por favor, intente de nuevo.
      </Alert>

      <Container className="pt-3 mb-5">
        <Breadcrumb items={breadcrumbItems} />
        <hr />

        <Form onSubmit={handleSubmit(saveConfig)}>
          <FormGroup>
            <Label>{translations.unansweredMaxAttemps}</Label>
            <Input
              type="number"
              name="unansweredMaxAttemps"
              innerRef={register({ validate: (d) => d >= 1 })}
            />
            {errors.unansweredMaxAttemps && (
              <span className="text-danger">Valor inválido</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label>{translations.answeringMachineMaxAttemps}</Label>
            <Input
              type="number"
              name="answeringMachineMaxAttemps"
              innerRef={register({ validate: (d) => d >= 1 })}
            />
            {errors.answeringMachineMaxAttemps && (
              <span className="text-danger">Valor inválido</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label>{translations.answeringMachinePostponedDays}</Label>
            <Input
              type="number"
              name="answeringMachinePostponedDays"
              innerRef={register({ validate: (d) => d >= 1 })}
            />
            {errors.answeringMachinePostponedDays && (
              <span className="text-danger">Valor inválido</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label>{translations.postponedButtonDays}</Label>
            <Input
              type="number"
              name="postponedButtonDays"
              innerRef={register({ validate: (d) => d >= 1 })}
            />
            {errors.postponedButtonDays && (
              <span className="text-danger">Valor inválido</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label>{translations.nonExistentPostponedDays}</Label>
            <Input
              type="number"
              name="nonExistentPostponedDays"
              innerRef={register({ validate: (d) => d >= 1 })}
            />
            {errors.nonExistentPostponedDays && (
              <span className="text-danger">Valor inválido</span>
            )}
          </FormGroup>
          <hr />
          <p>Botones que los publicadores pueden usar:</p>
          <Row>
            {FeedbackValues.map((i) => (
              <Col md="6" key={i}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      name={`button${i}shown`}
                      innerRef={register}
                    />
                    {labels(false, null!)[i as Feedback]}
                  </Label>
                </FormGroup>
              </Col>
            ))}
          </Row>
          <hr />
          <Button
            type="submit"
            block
            color="primary"
            disabled={!isDirty || !isValid || isLoading}
          >
            {isLoading ? <Spinner fulfill /> : 'Guardar configuraciones'}
          </Button>
        </Form>
      </Container>
    </>
  )
}

export { Configurations }
