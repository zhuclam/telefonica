import React from 'react'
import { Container } from 'reactstrap'
import { Breadcrumb, RouterLink } from 'components'
import { Item } from 'features/AdminPanel/AdminPanel'
import { useConfig } from 'hooks'

const breadcrumbItems = [
  {
    title: 'Panel de Administración',
    linkTo: '/admin-panel',
  },
  {
    title: 'Agregar Números',
  },
]

const AddPhones: React.FC = () => {
  const { currentTerritory } = useConfig()

  return (
    <Container className="pt-3 pb-5">
      <Breadcrumb items={breadcrumbItems} />
      <div style={{ marginBottom: '2em' }} />
      <Item>
        <RouterLink
          to={`/${currentTerritory.name}/admin-panel/add-phones/import`}
          background="dark"
        >
          <span>🧲</span> Importar de otro territorio
        </RouterLink>
      </Item>
      <Item>
        <RouterLink
          to={`/${currentTerritory.name}/admin-panel/add-phones/new-list`}
          background="dark"
        >
          <span>⚜</span> Cargar nueva lista
        </RouterLink>
      </Item>
    </Container>
  )
}

export { AddPhones }
