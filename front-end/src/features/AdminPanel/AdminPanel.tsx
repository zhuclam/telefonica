import React, { useState } from 'react'
import { Container, Jumbotron, Button, Collapse, Input } from 'reactstrap'
import styled from 'styled-components'
import { RouterLink } from 'components'
import { useConfig } from 'hooks'
import { useHistory, useLocation } from 'react-router'

const AdminPanel: React.FC = () => {
  const { currentTerritory, territories } = useConfig()
  const [isTerritoryChangerOpen, setIsTerritoryChangerOpen] = useState<boolean>(
    false
  )

  const toggleTerritoryChanger = () =>
    setIsTerritoryChangerOpen(!isTerritoryChangerOpen)

  const history = useHistory()
  const location = useLocation()

  const handleTerritoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    history.push(`/${e.target.value}/admin-panel/${location.search}`)
    setIsTerritoryChangerOpen(false)
  }

  return (
    <>
      <StyledJumbotron fluid>
        <Container>
          <h1 className="display-5">Panel de Administración</h1>
        </Container>
      </StyledJumbotron>
      <Container>
        <TerritoryLabel>
          Territorio actual:{' '}
          <TerritoryName>{currentTerritory.name.toUpperCase()}</TerritoryName>{' '}
          <div>
            <StyledButton
              color="link"
              onClick={toggleTerritoryChanger}
              outline={false}
            >
              (Cambiar)
            </StyledButton>
          </div>
          <Collapse isOpen={isTerritoryChangerOpen}>
            <Input
              type="select"
              onChange={handleTerritoryChange}
              defaultValue={currentTerritory.name}
            >
              {territories.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </Input>
          </Collapse>
        </TerritoryLabel>
        <Item>
          <RouterLink
            to={`/${currentTerritory.name}/admin-panel/statistics`}
            background="dark"
          >
            <span>📚</span> Estadísticas del territorio
          </RouterLink>
        </Item>
        <Item>
          <RouterLink
            to={`/${currentTerritory.name}/admin-panel/add-phones`}
            background="dark"
          >
            <span>➕</span> Agregar números a este territorio
          </RouterLink>
        </Item>
        <Item>
          <RouterLink
            to={`/${currentTerritory.name}/admin-panel/search-and-edit`}
            background="dark"
          >
            <span>🔎</span> Buscar y editar números de este territorio
          </RouterLink>
        </Item>
        <Item>
          <RouterLink
            to={`/${currentTerritory.name}/admin-panel/territories`}
            background="dark"
          >
            <span>🌍</span> Gestionar territorios
          </RouterLink>
        </Item>
        <Item>
          <RouterLink
            to={`/${currentTerritory.name}/admin-panel/configurations`}
            background="dark"
          >
            <span>🛠</span> Configuración de la App
          </RouterLink>
        </Item>
        <Item>
          <RouterLink
            to={`/${currentTerritory.name}/admin-panel/passwords`}
            background="dark"
          >
            <span>🔑</span> Cambiar contraseñas
          </RouterLink>
        </Item>
      </Container>
    </>
  )
}

const Item = styled.div`
  margin: 1em 0;
  background: #343a40 !important;
  padding: 0 1em;
  border-radius: 10px;

  > a {
    display: block;
  }
`

const TerritoryLabel = styled.p`
  font-size: 1.25em;
  text-align: center;
`

const TerritoryName = styled.span`
  color: ${({ theme }) => theme.text.colors.info};
  font-size: 1.3em;
  font-weight: 600;
`

const StyledJumbotron = styled(Jumbotron)`
  padding: 1rem 1rem;
  margin-bottom: 0.5rem;
`

const StyledButton = styled(Button)`
  box-shadow: none !important;
  margin-top: -1rem;
`

export { AdminPanel }
