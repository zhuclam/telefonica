import React, { KeyboardEvent, useState } from 'react'
import {
  Input,
  Label,
  Container,
  FormGroup,
  Button,
  Jumbotron,
} from 'reactstrap'
import { Helmet } from 'react-helmet'
import { Alert, Spinner, Switch } from 'components'
import { useAuth, useConfig, useTranslation } from 'hooks'

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { doLogin, isLoading } = useAuth()
  const { CONG_INITIALS } = useConfig()
  const {
    translationWanted,
    toggleTranslationWanted,
    translations,
    shouldTranslate,
  } = useTranslation()

  const submit = () => {
    if (!username || !password) return
    doLogin(username, password)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && submit()

  if (isLoading) return <Spinner fulfill container />

  return (
    <>
      <Helmet>
        <title>{CONG_INITIALS} Telefónica Login</title>
      </Helmet>
      <Alert name="wrong-login-credentials" position="bottom">
        {!shouldTranslate
          ? 'Usuario o contraseña incorrectos.'
          : translations?.['b9']}
      </Alert>
      <Jumbotron fluid>
        <Container>
          <h1 className="display-5">
            {!shouldTranslate ? 'Iniciar sesión' : translations?.['a2']}
          </h1>
          <p className="lead">
            {!shouldTranslate
              ? 'Solicite los datos de ingreso a su superintendente de servicio.'
              : translations?.['a3']}
          </p>
        </Container>
      </Jumbotron>
      <Container>
        {translations && (
          <div className="mb-4">
            <Switch
              label={translations['a0']}
              checked={translationWanted}
              onChange={toggleTranslationWanted}
              theme="white"
            />
          </div>
        )}
        <FormGroup>
          <Label for="username">
            {!shouldTranslate ? 'Usuario' : translations?.['a4']}
          </Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">
            {!shouldTranslate ? 'Contraseña' : translations?.['a5']}
          </Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={onKeyDown}
            type="password"
          />
        </FormGroup>
        <div className="d-flex justify-content-center mt-4">
          <Button color="success" onClick={submit}>
            {!shouldTranslate ? 'Ingresar' : translations?.['a6']}
          </Button>
        </div>
      </Container>
    </>
  )
}

export { Login }
