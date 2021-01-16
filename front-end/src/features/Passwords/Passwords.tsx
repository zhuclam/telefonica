import React, { useState } from 'react'
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import styled, { css } from 'styled-components'
import { Alert, Breadcrumb, Spinner, useAlerts } from 'components'
import { useFetch } from 'hooks'
import { PasswordsPayload } from './types'

const breadcrumbItems = [
  {
    title: 'Panel de Administración',
    linkTo: '/admin-panel',
  },
  {
    title: 'Cambiar contraseñas',
  },
]

const Passwords: React.FC = () => {
  const [adminPassword, setAdminPassword] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [noAdminChange, setNoAdminChange] = useState<boolean>(true)
  const [noUserChange, setNoUserChange] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleAdmin = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAdminPassword(e.target.value)

  const handleUser = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserPassword(e.target.value)

  const Fetch = useFetch()
  const { AlertManager } = useAlerts()

  const onSubmit = async () => {
    try {
      setIsLoading(true)

      const [err] = await Fetch().put<PasswordsPayload>('auth/passwords', {
        admin: adminPassword || undefined,
        user: userPassword || undefined,
      })

      if (err) throw err

      AlertManager.show('update-passwords-success')
    } catch {
      AlertManager.show('update-passwords-error')
    } finally {
      setIsLoading(false)
    }
  }

  const submitDisabled =
    (noAdminChange && noUserChange) ||
    (!noAdminChange && !adminPassword) ||
    (!noUserChange && !userPassword)

  if (isLoading) return <Spinner fulfill container />

  return (
    <>
      <Alert name="update-passwords-success" position="top" variant="success">
        ¡Contraseñas cambiadas!
      </Alert>
      <Alert name="update-passwords-error" position="bottom" variant="failure">
        No se pudo actualizar las contraseñas. Por favor, intente de nuevo.
      </Alert>
      <Container className="mt-3">
        <Breadcrumb items={breadcrumbItems} />
        <Form onSubmit={onSubmit}>
          <InputContainer>
            <FormGroup>
              <Label for="admin">
                Contraseña para los <b>administradores</b>
              </Label>
              {!noAdminChange && !adminPassword && (
                <Error>No puede estar vacío</Error>
              )}
              <TextInput
                id="admin"
                value={adminPassword}
                onChange={handleAdmin}
                autoComplete="off"
                disabled={noAdminChange}
              />
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={noAdminChange}
                    onChange={(e) => {
                      setNoAdminChange(e.target.checked)
                      setAdminPassword('')
                    }}
                  />
                  No cambiar
                </Label>
              </FormGroup>
            </FormGroup>
          </InputContainer>

          <InputContainer>
            <FormGroup>
              <Label for="user">
                Contraseña para los <b>publicadores</b>
              </Label>
              {!noUserChange && !userPassword && (
                <Error>No puede estar vacío</Error>
              )}
              <TextInput
                id="user"
                value={userPassword}
                onChange={handleUser}
                autoComplete="off"
                disabled={noUserChange}
              />
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={noUserChange}
                    onChange={(e) => {
                      setNoUserChange(e.target.checked)
                      setUserPassword('')
                    }}
                  />
                  No cambiar
                </Label>
              </FormGroup>
            </FormGroup>
          </InputContainer>

          <Button type="submit" color="success" disabled={submitDisabled}>
            Cambiar
          </Button>
        </Form>
      </Container>
    </>
  )
}

const InputContainer = styled.div`
  max-width: 500px;
`

const TextInput = styled(Input)<{ value: string }>`
  ${({ disabled }) =>
    disabled &&
    css`
      background-color: gray !important;
    `}
`

const Error = styled.p`
  color: ${({ theme }) => theme.text.colors.red};
`

export { Passwords }
