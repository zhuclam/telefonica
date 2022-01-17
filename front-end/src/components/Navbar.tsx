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
import styled, { css } from 'styled'
import { Link } from 'react-router-dom'
import { useAuth, useConfig, useTranslation } from 'hooks'
import { useOnClickOutside } from 'hooks/utils'
import { Alert, useAlerts, Switch } from '.'
import { useHistory, useLocation } from 'react-router'
import { TerritorySelector } from './TerritorySelector'

const Navbar: React.FC<{ territory?: string }> = ({ territory }) => {
  const [collapsed, setCollapsed] = useState(true)
  const mobileNavRef = useRef<HTMLDivElement | null>(null)

  const [showInstallButton, setShowInstallButton] = useState<boolean>(true)
  const installEventRef = useRef<any>(null)

  const [isTerritoryChangerOpen, setIsTerritoryChangerOpen] =
    useState<boolean>(false)

  const toggleTerritoryChanger = () =>
    setIsTerritoryChangerOpen(!isTerritoryChangerOpen)

  const history = useHistory()
  const location = useLocation()

  const handleTerritoryChange = (territoryName: string) => {
    const encoded = encodeURIComponent(territoryName)
    history.push(`/${encoded}/admin-panel/${location.search}`)
    setIsTerritoryChangerOpen(false)
  }

  useOnClickOutside(mobileNavRef, () => !collapsed && setCollapsed(true))

  const toggleNavbar = () => setCollapsed(!collapsed)

  const { AlertManager } = useAlerts()

  const {
    CONG_INITIALS,
    darkModeEnabled,
    advancedModeEnabled,
    testModeEnabled,
    currentTerritory,
    registeredTerritories,
    territories,
    toggleAdvancedMode,
    toggleDarkMode,
    toggleTestMode,
  } = useConfig()

  const availableTerritories =
    territories.filter((t) => !!t.public).length + registeredTerritories.length

  const { isAuth, isAdmin, doLogout } = useAuth()
  const {
    translationWanted,
    toggleTranslationWanted,
    translations,
    shouldTranslate,
  } = useTranslation()

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
    const isInWebAppChrome = window.matchMedia(
      '(display-mode: standalone)'
    ).matches

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
        {(name: string) =>
          (!shouldTranslate
            ? `¡Nuevo territorio registrado:`
            : translations?.['b8']) + ` "${name}"!`
        }
      </Alert>
      <div ref={mobileNavRef}>
        <BNavbar color="dark" dark>
          <Container>
            <NavBarMain>
              <AppName className="mr-auto">
                {CONG_INITIALS && CONG_INITIALS.length < 5
                  ? `${CONG_INITIALS} `
                  : ''}
                {shouldTranslate ? translations?.['a1'] : 'Telefónica'}
                {territory && isAdmin && (
                  <AdminTerritoryIndicator>
                    <span className="d-none d-md-inline mr-1">
                      Territorio actual:{' '}
                    </span>
                    <span className="d-md-none">(</span>
                    <OverflowEllipsis>{territory}</OverflowEllipsis>
                    <span className="d-md-none">)</span>
                  </AdminTerritoryIndicator>
                )}
              </AppName>
              <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            </NavBarMain>
            <Collapse isOpen={!collapsed} navbar>
              <MobileNav navbar>
                {!isAdmin && !!currentTerritory && (
                  <>
                    <CurrentTerritoryLabel>
                      <span style={{ display: 'block' }}>
                        {!shouldTranslate
                          ? 'Cerrar sesión'
                          : translations?.['b2']}
                        : <span>{currentTerritory.name}</span>{' '}
                      </span>
                      {availableTerritories >= 2 && (
                        <ChangeTerritoryButton
                          color="link"
                          onClick={toggleTerritoryChanger}
                          outline={false}
                          inline
                        >
                          ({!shouldTranslate ? 'Cambiar' : translations?.['c3']}
                          )
                        </ChangeTerritoryButton>
                      )}
                    </CurrentTerritoryLabel>

                    <Collapse isOpen={isTerritoryChangerOpen}>
                      <TerritorySelector
                        defaultValue="current"
                        onChange={handleTerritoryChange}
                        availableTerritories="registered&public"
                      />
                    </Collapse>
                    <Separator spacing="0.5rem" />
                  </>
                )}
                {translations && (
                  <NavItem>
                    <Switch
                      label={translations['a0']}
                      checked={translationWanted}
                      onChange={toggleTranslationWanted}
                    />
                  </NavItem>
                )}
                <NavItem>
                  <Switch
                    label={
                      !shouldTranslate ? 'Modo oscuro' : translations?.['a7']
                    }
                    checked={darkModeEnabled}
                    onChange={toggleDarkMode}
                  />
                </NavItem>
                {isAuth && (
                  <NavItem>
                    <Switch
                      label={
                        !shouldTranslate
                          ? 'Modo avanzado'
                          : translations?.['a8']
                      }
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
                      <NavLink onClick={onLogout}>
                        {!shouldTranslate
                          ? 'Cerrar sesión'
                          : translations?.['b1']}
                      </NavLink>
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
                      {!shouldTranslate ? 'Instalar App' : translations?.['a9']}
                    </Button>
                  </Separator>
                )}
                {CONG_INITIALS && CONG_INITIALS.length >= 5 && (
                  <Legend>{CONG_INITIALS}</Legend>
                )}
                <Legend>v{process.env.REACT_APP_VERSION}</Legend>
              </MobileNav>
            </Collapse>
          </Container>
        </BNavbar>
      </div>
    </>
  )
}

const NavBarMain = styled.div`
  display: flex;
  width: 100%;
`

const AppName = styled(NavbarBrand)`
  display: flex;
  align-items: baseline;
  max-width: calc(100% - 56px);
  flex: 1;
`

const AdminTerritoryIndicator = styled.small`
  overflow: hidden;
  padding-right: 15px;
  display: flex;
  margin-left: auto;
  color: ${({ theme }) => theme.text.colors.secondary};
`

const Legend = styled.small`
  color: ${({ theme }) => theme.text.colors.secondary};
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

const CurrentTerritoryLabel = styled.span`
  display: block;
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
  padding-right: 0;
  color: ${({ theme }) => theme.text.colors.lightgreen};
`

const OverflowEllipsis = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text.colors.yellow};
`

export { Navbar, RouterLink }
