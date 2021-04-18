import React, { useEffect, useRef, useState } from 'react'
import {
  Collapse,
  Navbar as BNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button,
} from 'reactstrap'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { useAuth, useConfig } from 'hooks'
import { useOnClickOutside } from 'hooks/utils'
import { Alert, useAlerts, Switch } from '.'
import { useHistory, useLocation } from 'react-router'
import { TerritorySelector } from './TerritorySelector'

const Navbar: React.FC<{ territory?: string }> = ({ territory }) => {
  const [collapsed, setCollapsed] = useState(true)
  const mobileNavRef = useRef<HTMLDivElement | null>(null)

  const [showInstallButton, setShowInstallButton] = useState<boolean>(true)
  const installEventRef = useRef<any>(null)

  const [isTerritoryChangerOpen, setIsTerritoryChangerOpen] = useState<boolean>(
    false
  )

  const toggleTerritoryChanger = () =>
    setIsTerritoryChangerOpen(!isTerritoryChangerOpen)

  const history = useHistory()
  const location = useLocation()

  const handleTerritoryChange = (territoryName: string) => {
    history.push(`/${territoryName}/admin-panel/${location.search}`)
    setIsTerritoryChangerOpen(false)
  }

  useOnClickOutside(mobileNavRef, () => !collapsed && setCollapsed(true))

  const toggleNavbar = () => setCollapsed(!collapsed)

  const { AlertManager } = useAlerts()

  const {
    darkModeEnabled,
    advancedModeEnabled,
    testModeEnabled,
    currentTerritory,
    registeredTerritories,
    toggleAdvancedMode,
    toggleDarkMode,
    toggleTestMode,
  } = useConfig()

  const { isAuth, isAdmin, doLogout } = useAuth()

  const onLogout = () => {
    doLogout()
    onLinkClicked()
  }

  const onLinkClicked = () => toggleNavbar()

  const onTestModeClick = (checked: boolean) => {
    checked
      ? AlertManager.show('test-mode-alert', { timeout: 6000 })
      : AlertManager.hide('test-mode-alert')
    toggleTestMode(checked)
  }

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      installEventRef.current = e
    })
    // @ts-ignore
    const isInWebAppiOS = window.navigator.standalone === true
    const isInWebAppChrome = window.matchMedia('(display-mode: standalone)')
      .matches

    if (isInWebAppiOS || isInWebAppChrome) setShowInstallButton(false)
  }, [])

  const installApp = () => {
    installEventRef.current?.prompt()
    installEventRef.current?.userChoice.then((choiceResult: any) => {
      choiceResult.outcome === 'accepted' && setShowInstallButton(false)
    })
  }

  return (
    <>
      <Alert name="test-mode-alert" position="bottom">
        En el modo de prueba, todo funciona con un duplicado de la app real.
      </Alert>
      <Alert name="territory-registered-alert" position="top" variant="success">
        {(name: string) => `¡Nuevo territorio registrado: "${name}"!`}
      </Alert>
      <div ref={mobileNavRef}>
        <BNavbar color="dark" dark>
          <Container>
            <NavbarBrand className="mr-auto">
              {process.env.REACT_APP_CONG_INITIALS} Telefónica
              {territory && isAdmin && (
                <Version ml>
                  <span className="d-none d-md-inline">
                    Territorio actual:{' '}
                  </span>
                  <span className="d-md-none">(</span>
                  {territory}
                  <span className="d-md-none">)</span>
                </Version>
              )}
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
              <MobileNav navbar>
                {!isAdmin && !!currentTerritory && (
                  <>
                    <CurrentTerritoryLabel
                      alignRight={registeredTerritories.length < 2}
                    >
                      <span>
                        Territorio actual: <span>{currentTerritory.name}</span>{' '}
                      </span>
                      {registeredTerritories.length >= 2 && (
                        <ChangeTerritoryButton
                          color="link"
                          onClick={toggleTerritoryChanger}
                          outline={false}
                          inline
                        >
                          (Cambiar)
                        </ChangeTerritoryButton>
                      )}
                    </CurrentTerritoryLabel>

                    <Collapse isOpen={isTerritoryChangerOpen}>
                      <TerritorySelector
                        defaultValue="current"
                        onChange={handleTerritoryChange}
                        availableTerritories="registered"
                      />
                    </Collapse>
                    <Separator spacing="0.5rem" />
                  </>
                )}
                <NavItem>
                  <Switch
                    label="Modo oscuro"
                    checked={darkModeEnabled}
                    onChange={toggleDarkMode}
                  />
                </NavItem>
                {isAuth && (
                  <NavItem>
                    <Switch
                      label="Modo avanzado"
                      checked={advancedModeEnabled}
                      onChange={toggleAdvancedMode}
                    />
                  </NavItem>
                )}
                {isAdmin && (
                  <NavItem>
                    <Switch
                      label="Modo de prueba"
                      checked={testModeEnabled}
                      onChange={onTestModeClick}
                    />
                  </NavItem>
                )}
                {isAdmin && (
                  <Separator>
                    <NavItem onClick={onLinkClicked}>
                      <RouterLink
                        to={`/${currentTerritory?.name}/admin-panel`}
                        background="dark"
                      >
                        Ir al Panel de administración
                      </RouterLink>
                    </NavItem>
                    <NavItem onClick={onLinkClicked}>
                      <RouterLink
                        to={`/${currentTerritory?.name}/telefonica`}
                        background="dark"
                      >
                        Ir a Telefónica
                      </RouterLink>
                    </NavItem>
                  </Separator>
                )}
                {isAuth && (
                  <NavItem>
                    <ButtonContainer>
                      <NavLink onClick={onLogout}>Cerrar sesión</NavLink>
                    </ButtonContainer>
                  </NavItem>
                )}
                {showInstallButton && (
                  <Separator>
                    <Button
                      block
                      className="my-2"
                      color="info"
                      onClick={installApp}
                    >
                      Instalar App
                    </Button>
                  </Separator>
                )}
                <Version>v{process.env.REACT_APP_VERSION}</Version>
              </MobileNav>
            </Collapse>
          </Container>
        </BNavbar>
      </div>
    </>
  )
}

const Version = styled.small<{ ml?: boolean }>`
  color: ${({ theme }) => theme.text.colors.secondary};

  ${({ ml }) =>
    ml &&
    css`
      margin-left: 0.3em;
    `}
`

const MobileNav = styled(Nav)`
  justify-content: right;
  text-align: right;
  padding-top: 1rem;
`

const ButtonContainer = styled.div`
  border-top: 1px solid gray;

  > a {
    cursor: pointer;
    display: inline-block;
  }
`

const RouterLink = styled(Link)<{ noPadding?: boolean; background?: 'dark' }>`
  color: ${({ theme, background }) =>
    background === 'dark' || theme.darkMode
      ? theme.text.colors.lightgreen
      : theme.text.colors.info};
  display: inline-block;
  padding: ${({ noPadding }) => (noPadding ? 0 : 0.5)}rem 0rem;
`

const Separator = styled.div<{ spacing?: string }>`
  border-top: 1px solid gray;
  ${({ spacing }) =>
    spacing &&
    css`
      margin: ${spacing} 0;
    `}
`

const CurrentTerritoryLabel = styled.span<{ alignRight: boolean }>`
  display: flex;
  justify-content: ${({ alignRight }) =>
    alignRight ? 'flex-end' : 'space-between'};
  align-items: center;
  > span {
    color: ${({ theme }) => theme.text.colors.yellow};
  }
  > span > span {
    margin-left: 0.3rem;
    color: ${({ theme }) => theme.text.colors.white};
  }
`

const ChangeTerritoryButton = styled(Button)`
  box-shadow: none !important;
  color: ${({ theme }) => theme.text.colors.lightgreen};
`

export { Navbar, RouterLink }
