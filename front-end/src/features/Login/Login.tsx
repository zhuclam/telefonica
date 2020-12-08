import React, { KeyboardEvent, useState } from 'react'
import {
  Input,
  Label,
  Container,
  FormGroup,
  Button,
  Jumbotron,
} from 'reactstrap'
import { Spinner } from 'components'
import { useAuth } from 'hooks'

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { doLogin, isLoading } = useAuth()

  const submit = () => doLogin(username, password)

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && submit()

  if (isLoading) return <Spinner fulfill />

  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1 className="display-5">Iniciar sesión</h1>
          <p className="lead">
            Solicite los datos de ingreso a su superintendente de servicio.
          </p>
        </Container>
      </Jumbotron>
      <Container>
        <FormGroup>
          <Label for="username">Usuario</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Contraseña</Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </FormGroup>
        <div className="d-flex justify-content-center mt-4">
          <Button color="success" onClick={submit}>
            Ingresar
          </Button>
        </div>
      </Container>
    </>
  )
}

export { Login }
