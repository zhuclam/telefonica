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
  Breadcrumb,
} from 'components'
import { EditPhone, SearchForm, SearchResult } from './components'
import { Filters, SearchResponse } from './types'

const breadcrumbItems = [
  {
    title: 'Panel de Administración',
    linkTo: '/admin-panel',
  },
  {
    title: 'Buscar y editar',
  },
]

const SearchAndEdit: FunctionComponent = () => {
  const [foundPhones, setFoundPhones] = useState<
    SearchResponse['phones'] | null
  >(null)
  const [foundCount, setFoundCount] = useState<SearchResponse['count']>(0)
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
    setFoundPhones(null)
    setFoundCount(0)
    setEditingPhone(null)
  }, [testModeEnabled])

  const Fetch = useFetch()
  const { AlertManager } = useAlerts()

  const handleSearch = async (filters: Filters) => {
    try {
      setIsLoading(true)

      const [err, result] = await Fetch().get<SearchResponse>({
        path: 'phones',
        params: Object.entries(filters)
          .map(([k, v]) => [k, typeof v !== 'boolean' ? v : v ? 1 : 0])
          .reduce(
            (acc, [k, v]) => ({ ...acc, [k]: v }),
            {} as Filters
          ) as Record<string, string>,
      })

      if (err) throw err

      setFoundPhones(result.phones)
      setFoundCount(result.count)
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
      setFoundPhones(foundPhones!.filter((p) => p.id !== idToDelete))
      setFoundCount(foundCount - 1)
    } catch {
      AlertManager.show('deletion-error')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleBack = () => setEditingPhone(null)

  const handleUpdatedPhone = (updatedPhone: Phone) =>
    foundPhones &&
    setFoundPhones(
      foundPhones.map((p) => (p.id === updatedPhone.id ? updatedPhone : p))
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
    idToDelete !== null && foundPhones?.find((p) => p.id === idToDelete)!

  return (
    <>
      <Alert name="search-error" position="top" variant="failure">
        No se pudo buscar. Por favor, intente de nuevo.
      </Alert>
      <Alert name="deletion-error" position="top" variant="failure">
        No se pudo eliminar el número. Por favor, intente de nuevo.
      </Alert>
      <Container className="pt-4 mb-5">
        <Breadcrumb items={breadcrumbItems} />
        <SearchForm onSearch={handleSearch} />
      </Container>
      <Container fluid>
        {isLoading ? (
          <Spinner />
        ) : (
          foundPhones && (
            <SearchResult
              entries={foundPhones}
              count={foundCount}
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
