import { RouterLink } from 'components'
import React from 'react'
import { Container, Jumbotron } from 'reactstrap'
import styled from 'styled-components'

const AdminPanel: React.FC = () => (
  <>
    <Jumbotron fluid>
      <Container>
        <h1 className="display-5">Panel de Administración</h1>
      </Container>
    </Jumbotron>
    <Container>
      <Item>
        <RouterLink to="/admin-panel/statistics">
          <span>📚</span> Estadísticas
        </RouterLink>
      </Item>
      <Item>
        <RouterLink to="/admin-panel/add-phones">
          <span>➕</span> Agregar números a la base de datos
        </RouterLink>
      </Item>
      <Item>
        <RouterLink to="/admin-panel/search-and-edit">
          <span>🔎</span> Buscador inteligente
        </RouterLink>
      </Item>
    </Container>
  </>
)

const Item = styled.div`
  margin: 1em 0;
  background: #343a40 !important;
  padding: 0 1em;
  border-radius: 10px;

  > a {
    display: block;
  }
`

export { AdminPanel }
