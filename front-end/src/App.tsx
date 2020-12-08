import React, { useLayoutEffect } from 'react'
import {
  BrowserRouter as RouterProvider,
  Switch,
  Route,
} from 'react-router-dom'
import { RouteProps, useHistory, useLocation } from 'react-router'
import { ThemeProvider } from 'theme'
import { ContextProviders } from 'contexts'
import { useAuth } from 'hooks'
import { Layout } from './components'
import { Login, Telefonica } from './features'
import './app.css'

interface ProtectedRouteProps extends RouteProps {
  condition: boolean
}

const DummyComponent = () => null

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
  condition,
  ...restProps
}) => (
  <Route {...restProps} component={condition ? component : DummyComponent} />
)

const MainRouter: React.FC = () => {
  const { isAuth, isAdmin } = useAuth()
  const location = useLocation()
  const history = useHistory()

  useLayoutEffect(() => {
    if (!isAuth && !location.pathname.includes('/login')) history.push('/login')
    if (isAuth && location.pathname.includes('/login')) history.push('/')
  }, [isAuth, location.pathname, history])

  const isAdminIn = isAuth && isAdmin

  return (
    <Switch>
      {/* Common */}
      <Route path="/login" exact component={Login} />

      {/* User */}
      <ProtectedRoute
        path="/"
        exact
        component={Telefonica}
        condition={isAuth}
      />

      {/* Admin */}
      <ProtectedRoute
        path="/admin-panel"
        exact
        component={Telefonica}
        condition={isAdminIn}
      />
      <Route render={() => <h1>404 no encontrado</h1>} />
    </Switch>
  )
}

const App: React.FC = () => (
  <ContextProviders>
    <ThemeProvider>
      <RouterProvider>
        <Layout>
          <MainRouter />
        </Layout>
      </RouterProvider>
    </ThemeProvider>
  </ContextProviders>
)

export default App
