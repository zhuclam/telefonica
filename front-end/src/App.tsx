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
import { usePreviousValue } from 'hooks/utils'

const AdminPanel = lazy(() => import('./features/AdminPanel'))
const Login = lazy(() => import('./features/Login'))
const Telefonica = lazy(() => import('./features/Telefonica'))
const StatisticsPanel = lazy(() => import('./features/StatisticsPanel'))
const AddPhones = lazy(() => import('./features/AddPhones'))
const AddNewPhones = lazy(() => import('./features/AddPhones/AddNewPhones'))
const ImportPhones = lazy(() => import('./features/AddPhones/Import'))
const SearchAndEdit = lazy(() => import('./features/SearchAndEdit'))
const Configurations = lazy(() => import('./features/Configurations'))
const Passwords = lazy(() => import('./features/Passwords'))
const ManageTerritories = lazy(() => import('./features/ManageTerritories'))

interface ProtectedRouteProps extends RouteProps {
  condition: boolean
  fallbackURL: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component,
  condition,
  fallbackURL,
  ...restProps
}) =>
  condition ? (
    <Route {...restProps} component={component} />
  ) : (
    <Redirect to={fallbackURL} />
  )

const WithTerritoryVerifier: React.FC<{
  children: (t: string) => React.ReactNode
}> = ({ children }) => (
  <Route
    path="/:territory"
    render={({ match }) => (
      <TerritoryVerifier territory={match.params.territory}>
        {children(match.params.territory)}
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
    testModeEnabled,
  } = useConfig()
  const location = useLocation()
  const history = useHistory()

  const Fetch = useFetch()

  const returnTo = new URLSearchParams(window.location.search).get('returnTo')

  useLayoutEffect(() => {
    if (!isAuth && !location.pathname.includes('/login'))
      history.push(`/login?returnTo=${window.location.pathname}`)
    if (
      isAuth &&
      (location.pathname.includes('/login') || location.pathname === '/')
    )
      isAdmin
        ? history.push(returnTo ?? '/base/admin-panel')
        : history.push(returnTo ?? '/base/telefonica')
  }, [isAuth, isAdmin, location.pathname, history, returnTo])

  const prevTestModeEnabled = usePreviousValue(testModeEnabled)

  useEffect(() => {
    if (isAuth && (!configurations || testModeEnabled !== prevTestModeEnabled))
      getConfigs(Fetch)
  }, [
    isAuth,
    Fetch,
    getConfigs,
    configurations,
    testModeEnabled,
    prevTestModeEnabled,
  ])

  if (isAuth && configsLoading && !configurations)
    return <Spinner container fulfill />

  if (configsError) return <ErrorDisplay />

  return (
    <Suspense fallback={<Spinner container fulfill />}>
      <Switch>
        {/* Common */}
        <Route path="/login" exact component={Login} />

        <WithTerritoryVerifier>
          {(territory) => (
            <Switch>
              {/* User */}
              <ProtectedRoute
                path="/:territory/telefonica"
                component={Telefonica}
                condition={isAuth}
                fallbackURL={`/${territory}/login`}
              />

              {/* Admin */}
              <ProtectedRoute
                path="/:territory/admin-panel"
                exact
                component={AdminPanel}
                condition={isAdmin}
                fallbackURL={`/${territory}/telefonica`}
              />
              <ProtectedRoute
                path="/:territory/admin-panel/statistics"
                exact
                component={StatisticsPanel}
                condition={isAdmin}
                fallbackURL={`/${territory}/telefonica`}
              />
              <ProtectedRoute
                path="/:territory/admin-panel/add-phones"
                exact
                component={AddPhones}
                condition={isAdmin}
                fallbackURL={`/${territory}/telefonica`}
              />
              <ProtectedRoute
                path="/:territory/admin-panel/add-phones/new-list"
                exact
                component={AddNewPhones}
                condition={isAdmin}
                fallbackURL={`/${territory}/telefonica`}
              />
              <ProtectedRoute
                path="/:territory/admin-panel/add-phones/import"
                exact
                component={ImportPhones}
                condition={isAdmin}
                fallbackURL={`/${territory}/telefonica`}
              />
              <ProtectedRoute
                path="/:territory/admin-panel/search-and-edit"
                exact
                component={SearchAndEdit}
                condition={isAdmin}
                fallbackURL={`/${territory}/telefonica`}
              />
              <ProtectedRoute
                path="/:territory/admin-panel/configurations"
                exact
                component={Configurations}
                condition={isAdmin}
                fallbackURL={`/${territory}/telefonica`}
              />
              <ProtectedRoute
                path="/:territory/admin-panel/passwords"
                exact
                component={Passwords}
                condition={isAdmin}
                fallbackURL={`/${territory}/telefonica`}
              />
              <ProtectedRoute
                path="/:territory/admin-panel/territories"
                exact
                component={ManageTerritories}
                condition={isAdmin}
                fallbackURL={`/${territory}/telefonica`}
              />
              <Redirect to={`/${territory}/admin-panel`} />
            </Switch>
          )}
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
