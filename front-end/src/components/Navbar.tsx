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

const Navbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true)
  const mobileNavRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(mobileNavRef, () => !collapsed && setCollapsed(true))

  const toggleNavbar = () => setCollapsed(!collapsed)

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

  return (
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
                    onChange={toggleTestMode}
                  />
                </NavItem>
              )}
              {isAdmin && (
                <LinkSection>
                  <NavItem onClick={onLinkClicked}>
                    <RouterLink to="/admin-panel">
                      Ir al Panel de administración
                    </RouterLink>
                  </NavItem>
                  <NavItem onClick={onLinkClicked}>
                    <RouterLink to="/telefonica">Ir a Telefónica</RouterLink>
                  </NavItem>
                </LinkSection>
              )}
              {isAuth && (
                <NavItem>
                  <Button onClick={onLogout}>Cerrar sesión</Button>
                </NavItem>
              )}
            </MobileNav>
          </Collapse>
        </Container>
      </BNavbar>
    </div>
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

const Button = styled(NavLink)`
  border-top: 1px solid gray;
  cursor: pointer;
`

const RouterLink = styled(Link)<{ noPadding?: boolean }>`
  color: ${({ theme }) => theme.text.colors.lightgreen};
  display: inline-block;
  padding: ${({ noPadding }) => (noPadding ? 0 : 0.5)}rem 0rem;
`

const LinkSection = styled.div`
  border-top: 1px solid gray;
`

export { Navbar, RouterLink }
