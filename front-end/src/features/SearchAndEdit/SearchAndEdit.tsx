import React, { FunctionComponent, useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { useConfig, useFetch } from 'hooks'
import { Phone } from 'types'
import {
  Alert,
  Spinner,
  useAlerts,
  useConfirmationModal,
  ConfirmationModal,
} from 'components'
import { EditPhone, SearchForm, SearchResult } from './components'
import { Filters } from './types'

const SearchAndEdit: FunctionComponent = () => {
  const [searchResult, setSearchResult] = useState<Phone[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [editingPhone, setEditingPhone] = useState<Phone | null>(null)

  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const { testModeEnabled } = useConfig()

  const {
    isModalOpen,
    data: idToDelete,
    askEditConfirmation,
    toggleModal,
    reset: resetConfirmationModal,
  } = useConfirmationModal<number>()

  useEffect(() => {
    setSearchResult(null)
    setEditingPhone(null)
  }, [testModeEnabled])

  const Fetch = useFetch()
  const { AlertManager } = useAlerts()

  const handleSearch = async (filters: Filters) => {
    try {
      setIsLoading(true)

      const [err, phones] = await Fetch().get<Phone[]>({
        path: 'phones',
        params: Object.entries(filters)
          .map(([k, v]) => [k, typeof v !== 'boolean' ? v : v ? 1 : 0])
          .reduce(
            (acc, [k, v]) => ({ ...acc, [k]: v }),
            {} as Filters
          ) as Record<string, string>,
      })

      if (err) throw err

      setSearchResult(phones)
    } catch {
      AlertManager.show('search-error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditRequest = (phone: Phone) => setEditingPhone(phone)

  const handleDeleteRequest = (id: number) => askEditConfirmation(id)

  const confirmDeletion = async () => {
    try {
      setIsDeleting(true)

      const [err] = await Fetch().delete(`phones/${idToDelete}`)

      if (err) throw err

      resetConfirmationModal()
      setSearchResult(searchResult!.filter((p) => p.id !== idToDelete))
    } catch {
      AlertManager.show('deletion-error')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleBack = () => setEditingPhone(null)

  const handleUpdatedPhone = (updatedPhone: Phone) =>
    searchResult &&
    setSearchResult(
      searchResult.map((p) => (p.id === updatedPhone.id ? updatedPhone : p))
    )

  if (editingPhone !== null)
    return (
      <EditPhone
        phone={editingPhone}
        onBack={handleBack}
        onUpdated={handleUpdatedPhone}
      />
    )

  const phoneToDelete =
    idToDelete !== null && searchResult?.find((p) => p.id === idToDelete)!

  return (
    <>
      <Alert name="search-error" position="top" variant="failure">
        No se pudo buscar. Por favor, intente de nuevo.
      </Alert>
      <Alert name="deletion-error" position="top" variant="failure">
        No se pudo eliminar el número. Por favor, intente de nuevo.
      </Alert>
      <Container className="pt-4 mb-5">
        <h1>Buscar números</h1>
        <SearchForm onSearch={handleSearch} />
      </Container>
      <Container fluid>
        {isLoading ? (
          <Spinner />
        ) : (
          searchResult && (
            <SearchResult
              entries={searchResult}
              onEditRequest={handleEditRequest}
              onDeleteRequest={handleDeleteRequest}
            />
          )
        )}
      </Container>
      {idToDelete !== null && phoneToDelete && (
        <ConfirmationModal
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          onConfirm={confirmDeletion}
          title="¿Seguro que desea eliminar el siguiente número?"
          body={
            isDeleting ? (
              <Spinner fulfill />
            ) : (
              <div>
                <span className="d-block">ID: {phoneToDelete.id}</span>
                <span className="d-block">Número: {phoneToDelete.phone}</span>
                <span className="d-block">Info: {phoneToDelete.info}</span>
              </div>
            )
          }
          buttonColor="danger"
          confirmationLabel="Eliminar para siempre"
        />
      )}
    </>
  )
}

export { SearchAndEdit }
