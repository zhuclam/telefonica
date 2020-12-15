import React, { useRef, useState } from 'react'
import {
  Collapse,
  Navbar as BNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAuth, useConfig } from 'hooks'
import { Switch } from './Switch'
import { useOnClickOutside } from 'hooks/utils'
import { Alert, useAlerts } from './Alert'

const Navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true)
  const mobileNavRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(mobileNavRef, () => !collapsed && setCollapsed(true))

  const toggleNavbar = () => setCollapsed(!collapsed)

  const { AlertManager } = useAlerts()

  const {
    darkModeEnabled,
    advancedModeEnabled,
    testModeEnabled,
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
      ? AlertManager.show('test-mode-alert')
      : AlertManager.hide('test-mode-alert')
    toggleTestMode(checked)
  }

  return (
    <>
      <Alert name="test-mode-alert" position="bottom">
        En el modo de prueba, todo funciona con un duplicado de la app real.
      </Alert>
      <div ref={mobileNavRef}>
        <BNavbar color="dark" dark>
          <Container>
            <NavbarBrand className="mr-auto">
              {process.env.REACT_APP_CONG_INITIALS} Telefónica{' '}
              <Version>v{process.env.REACT_APP_VERSION}</Version>
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
              <MobileNav navbar>
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
                  <LinkSection>
                    <NavItem onClick={onLinkClicked}>
                      <RouterLink to="/admin-panel" background="dark">
                        Ir al Panel de administración
                      </RouterLink>
                    </NavItem>
                    <NavItem onClick={onLinkClicked}>
                      <RouterLink to="/telefonica" background="dark">
                        Ir a Telefónica
                      </RouterLink>
                    </NavItem>
                  </LinkSection>
                )}
                {isAuth && (
                  <NavItem>
                    <ButtonContainer>
                      <Button onClick={onLogout}>Cerrar sesión</Button>
                    </ButtonContainer>
                  </NavItem>
                )}
              </MobileNav>
            </Collapse>
          </Container>
        </BNavbar>
      </div>
    </>
  )
}

const Version = styled.small`
  color: ${({ theme }) => theme.text.colors.secondary};
`

const MobileNav = styled(Nav)`
  justify-content: right;
  text-align: right;
  padding-top: 1rem;
`

const ButtonContainer = styled.div`
  border-top: 1px solid gray;
`

const Button = styled(NavLink)`
  cursor: pointer;
  display: inline-block;
`

const RouterLink = styled(Link)<{ noPadding?: boolean; background?: 'dark' }>`
  color: ${({ theme, background }) =>
    background === 'dark' || theme.darkMode
      ? theme.text.colors.lightgreen
      : theme.text.colors.info};
  display: inline-block;
  padding: ${({ noPadding }) => (noPadding ? 0 : 0.5)}rem 0rem;
`

const LinkSection = styled.div`
  border-top: 1px solid gray;
`

export { Navbar, RouterLink }
