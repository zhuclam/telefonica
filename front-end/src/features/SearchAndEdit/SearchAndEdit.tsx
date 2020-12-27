import React, { FunctionComponent } from 'react'
import { Container } from 'reactstrap'
import { SearchForm } from './components'
import { Filters } from './types'

const SearchAndEdit: FunctionComponent = () => {
  const handleSearch = (filters: Filters) => {
    console.log({ filters })
  }

  return (
    <Container>
      <h1>Buscar números</h1>
      <SearchForm onSearch={handleSearch} />
    </Container>
  )
}

export { SearchAndEdit }
