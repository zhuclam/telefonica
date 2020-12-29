import React, { useEffect, useLayoutEffect } from 'react'
import {
  BrowserRouter as RouterProvider,
  Switch,
  Route,
} from 'react-router-dom'
import { Redirect, RouteProps, useHistory, useLocation } from 'react-router'
import { ThemeProvider } from 'theme'
import { ContextProviders } from 'contexts'
import { useAuth, useConfig, useFetch } from 'hooks'
import { ErrorDisplay, Layout, Spinner } from './components'
import {
  AdminPanel,
  Login,
  Telefonica,
  StatisticsPanel,
  AddPhones,
  SearchAndEdit,
  Configurations,
} from './features'
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
  const { configsLoading, configsError, getConfigs } = useConfig()
  const location = useLocation()
  const history = useHistory()

  const Fetch = useFetch()

  useLayoutEffect(() => {
    if (!isAuth && !location.pathname.includes('/login')) history.push('/login')
    if (isAuth && location.pathname.includes('/login'))
      isAdmin ? history.push('/admin-panel') : history.push('/telefonica')
  }, [isAuth, isAdmin, location.pathname, history])

  useEffect(() => {
    if (isAuth) getConfigs(Fetch)
  }, [isAuth, Fetch, getConfigs])

  if (configsLoading) return <Spinner container fulfill />

  if (configsError) return <ErrorDisplay />

  return (
    <Switch>
      {/* Common */}
      <Route path="/login" exact component={Login} />

      {/* User */}
      <ProtectedRoute
        path="/telefonica"
        component={Telefonica}
        condition={isAuth}
      />

      {/* Admin */}
      <ProtectedRoute
        path="/admin-panel"
        exact
        component={AdminPanel}
        condition={isAdmin}
      />
      <ProtectedRoute
        path="/admin-panel/statistics"
        exact
        component={StatisticsPanel}
        condition={isAdmin}
      />
      <ProtectedRoute
        path="/admin-panel/add-phones"
        exact
        component={AddPhones}
        condition={isAdmin}
      />
      <ProtectedRoute
        path="/admin-panel/search-and-edit"
        exact
        component={SearchAndEdit}
        condition={isAdmin}
      />
      <ProtectedRoute
        path="/admin-panel/configurations"
        exact
        component={Configurations}
        condition={isAdmin}
      />

      {/* Misc */}
      <Redirect to="/login" />
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
