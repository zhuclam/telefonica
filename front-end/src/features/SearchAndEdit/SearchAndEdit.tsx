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

const importBreadcrumbItems = [
  {
    title: 'Panel de Administración',
    linkTo: '/admin-panel',
  },
  {
    title: 'Agregar Números',
    linkTo: '/admin-panel/add-phones',
  },
  {
    title: 'Importar',
  },
]

type SearchAndEditProps = {
  isImport?: boolean
}

const SearchAndEdit: FunctionComponent<SearchAndEditProps> = ({
  isImport = false,
}) => {
  const [foundPhones, setFoundPhones] = useState<
    SearchResponse['phones'] | null
  >(null)
  const [foundCount, setFoundCount] = useState<SearchResponse['count']>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isImporting, setIsImporting] = useState<boolean>(false)

  const [editingPhone, setEditingPhone] = useState<Phone | null>(null)

  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const { testModeEnabled } = useConfig()

  const {
    isModalOpen: isDeleteModalOpen,
    data: idToDelete,
    askEditConfirmation: askDeleteOneConfirmation,
    toggleModal: toggleDeleteOneModal,
    reset: resetDeleteConfirmationModal,
  } = useConfirmationModal<number>()

  const {
    isModalOpen: isDeleteManyModalOpen,
    data: idListToDelete,
    askEditConfirmation: askDeleteManyConfirmation,
    toggleModal: toggleDeleteManyModal,
    reset: resetDeleteManyConfirmationModal,
  } = useConfirmationModal<number[]>()

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

  const handleDeleteRequest = (id: number) => askDeleteOneConfirmation(id)

  const handleDeleteManyRequest = (ids: number[]) =>
    askDeleteManyConfirmation(ids)

  const confirmDeletion = async () => {
    try {
      setIsDeleting(true)

      const [err] = await Fetch().delete(`phones/${idToDelete}`)

      if (err) throw err

      resetDeleteConfirmationModal()
      setFoundPhones(foundPhones!.filter((p) => p.id !== idToDelete))
      setFoundCount(foundCount - 1)
    } catch {
      AlertManager.show('deletion-error')
    } finally {
      setIsDeleting(false)
    }
  }

  const confirmManyDeletion = async () => {
    if (!idListToDelete) return
    try {
      setIsDeleting(true)

      const [err] = await Fetch().delete<{ ids: number[] }>('phones/bulk', {
        ids: idListToDelete,
      })

      if (err) throw err

      const newPhones = foundPhones!.filter(
        (p) => !idListToDelete.includes(p.id)
      )
      setFoundPhones(newPhones)
      setFoundCount(foundCount - idListToDelete.length)
      resetDeleteManyConfirmationModal()
    } catch {
      AlertManager.show('deletion-error')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleImport = async (ids: number[]) => {
    if (ids.length === 0) return
    try {
      setIsImporting(true)

      const [err] = await Fetch().post<{ ids: number[] }, void>(
        'phones/import',
        {
          ids,
        }
      )

      if (err) throw err

      const newPhones = foundPhones!.filter((p) => !ids.includes(p.id))
      setFoundPhones(newPhones)
      setFoundCount(foundCount - ids.length)
      AlertManager.show('import-success')
    } catch {
      AlertManager.show('import-error')
    } finally {
      setIsImporting(false)
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
        No se pudo eliminar. Por favor, intente de nuevo.
      </Alert>
      <Alert name="import-success" position="top" variant="success">
        ¡Números importados exitosamente!
      </Alert>
      <Alert name="import-error" position="top" variant="failure">
        No se pudo importar. Por favor, intente de nuevo.
      </Alert>
      <Container className="pt-4 mb-5">
        <Breadcrumb
          items={isImport ? importBreadcrumbItems : breadcrumbItems}
        />
        <SearchForm onSearch={handleSearch} isImport={isImport} />
      </Container>
      <Container fluid>
        {isLoading ? (
          <Spinner />
        ) : (
          foundPhones && (
            <SearchResult
              isImport={isImport}
              entries={foundPhones}
              count={foundCount}
              onEditRequest={handleEditRequest}
              onDeleteRequest={handleDeleteRequest}
              onDeleteManyRequest={handleDeleteManyRequest}
              onImport={handleImport}
              isImporting={isImporting}
            />
          )
        )}
      </Container>
      {idToDelete !== null && phoneToDelete && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          toggleModal={toggleDeleteOneModal}
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
      {idListToDelete !== null && (
        <ConfirmationModal
          isOpen={isDeleteManyModalOpen}
          toggleModal={toggleDeleteManyModal}
          onConfirm={confirmManyDeletion}
          title={`¿Seguro que desea eliminar ${idListToDelete.length} números?`}
          body={isDeleting && <Spinner fulfill />}
          buttonColor="danger"
          confirmationLabel="Eliminar para siempre"
        />
      )}
    </>
  )
}

export { SearchAndEdit }
