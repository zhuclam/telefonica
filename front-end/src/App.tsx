import React, { lazy, Suspense, useEffect, useLayoutEffect } from 'react'
import {
  BrowserRouter as RouterProvider,
  Switch,
  Route,
} from 'react-router-dom'
import { Redirect, RouteProps, useHistory, useLocation } from 'react-router'
import { ThemeProvider } from 'theme'
import { ContextProviders } from 'contexts'
import { useAuth, useConfig, useFetch } from 'hooks'
import { ErrorDisplay, Layout, Spinner, TerritoryVerifier } from './components'
import './app.css'

const AdminPanel = lazy(() => import('./features/AdminPanel'))
const Login = lazy(() => import('./features/Login'))
const Telefonica = lazy(() => import('./features/Telefonica'))
const StatisticsPanel = lazy(() => import('./features/StatisticsPanel'))
const AddPhones = lazy(() => import('./features/AddPhones'))
const SearchAndEdit = lazy(() => import('./features/SearchAndEdit'))
const Configurations = lazy(() => import('./features/Configurations'))
const Passwords = lazy(() => import('./features/Passwords'))

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

const WithTerritoryVerifier: React.FC = ({ children }) => (
  <Route
    path="/:territory"
    render={({ match }) => (
      <TerritoryVerifier territory={match.params.territory}>
        {children}
      </TerritoryVerifier>
    )}
  />
)

const MainRouter: React.FC = () => {
  const { isAuth, isAdmin } = useAuth()
  const {
    configsLoading,
    configsError,
    getConfigs,
    configurations,
  } = useConfig()
  const location = useLocation()
  const history = useHistory()

  const Fetch = useFetch()

  useLayoutEffect(() => {
    if (!isAuth && !location.pathname.includes('/login')) history.push('/login')
    if (
      isAuth &&
      (location.pathname.includes('/login') || location.pathname === '/')
    )
      isAdmin
        ? history.push('/base/admin-panel')
        : history.push('/base/telefonica')
  }, [isAuth, isAdmin, location.pathname, history])

  useEffect(() => {
    if (isAuth && !configurations) getConfigs(Fetch)
  }, [isAuth, Fetch, getConfigs, configurations])

  if (configsLoading) return <Spinner container fulfill />

  if (configsError) return <ErrorDisplay />

  return (
    <Suspense fallback={<Spinner container fulfill />}>
      <Switch>
        {/* Common */}
        <Route path="/login" exact component={Login} />

        <WithTerritoryVerifier>
          <Switch>
            {/* User */}
            <ProtectedRoute
              path="/:territory/telefonica"
              component={Telefonica}
              condition={isAuth}
            />

            {/* Admin */}
            <ProtectedRoute
              path="/:territory/admin-panel"
              exact
              component={AdminPanel}
              condition={isAdmin}
            />
            <ProtectedRoute
              path="/:territory/admin-panel/statistics"
              exact
              component={StatisticsPanel}
              condition={isAdmin}
            />
            <ProtectedRoute
              path="/:territory/admin-panel/add-phones"
              exact
              component={AddPhones}
              condition={isAdmin}
            />
            <ProtectedRoute
              path="/:territory/admin-panel/search-and-edit"
              exact
              component={SearchAndEdit}
              condition={isAdmin}
            />
            <ProtectedRoute
              path="/:territory/admin-panel/configurations"
              exact
              component={Configurations}
              condition={isAdmin}
            />
            <ProtectedRoute
              path="/:territory/admin-panel/passwords"
              exact
              component={Passwords}
              condition={isAdmin}
            />
            <Redirect to="/login" />
          </Switch>
        </WithTerritoryVerifier>

        {/* Misc */}
        <Redirect to="/login" />
      </Switch>
    </Suspense>
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
