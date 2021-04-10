import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useFetch } from 'hooks'
import { Breadcrumb, ErrorDisplay, Spinner } from 'components'
import { Statistics } from './types'

const breadcrumbItems = [
  {
    title: 'Panel de Administración',
    linkTo: '/admin-panel',
  },
  {
    title: 'Estadísticas',
  },
]

const StatisticsPanel: React.FC = () => {
  const [data, setData] = useState<Statistics | null>(null)
  const [noData, setNoData] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const Fetch = useFetch()

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(false)
      const [err, statistics] = await Fetch().get<Statistics | ''>('statistics')

      if (err) throw err

      if (statistics === '') {
        setNoData(true)
        setData(null)
      } else {
        setData(statistics)
        setNoData(false)
      }
    } catch (e) {
      console.log({ e })
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }, [Fetch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useMemo(() => {
    data?.perMonthData.months.sort((a, b) => {
      const [am, ay] = a.date.split('/')
      const [bm, by] = b.date.split('/')

      const ydiff = Number(by) - Number(ay)

      if (ydiff !== 0) return ydiff
      return Number(bm) - Number(am)
    })
  }, [data?.perMonthData.months])

  if (error) return <ErrorDisplay />
  if (noData)
    return (
      <ErrorDisplay message="Sin estadísticas. Aún no hay números cargados para este territorio." />
    )
  if (isLoading || !data) return <Spinner fulfill container />

  const { generalData, perMonthData, perDayData } = data

  const formatDecimals = (n: number) => n.toFixed(2)

  return (
    <div className="container pt-3">
      <Breadcrumb items={breadcrumbItems} />
      <h4 className="mb-4">General</h4>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Números guardados</th>
              <th>No visitar</th>
              <th>Inexistentes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{generalData.totalNumbers}</td>
              <td>
                {generalData.noCall} (
                {formatDecimals(
                  (generalData.noCall * 100) / generalData.totalNumbers
                )}
                %)
              </td>
              <td>
                {generalData.nonExistent} (
                {formatDecimals(
                  (generalData.nonExistent * 100) / generalData.totalNumbers
                )}
                %)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr />

      <h4 className="mb-4">Estadísticas por mes</h4>

      <small>
        El TA se calcula haciendo: Números únicos existentes / Números totales
        existentes.
      </small>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Llamadas</th>
              <th>Números únicos</th>
              <th>Números únicos existentes</th>
              <th>Atendieron</th>
              <th>Territorio abarcado</th>
            </tr>
          </thead>
          <tbody>
            {perMonthData.months.map((row, i) =>
              row.date === '07/2020' ? (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.total + 2088}</td>
                  <td>{row.different + 2088}</td>
                  <td>{row.different + 2088 - row.inexistent}</td>
                  <td>
                    {row.answered} (
                    {formatDecimals(
                      (row.answered * 100) /
                        (row.different + 2088 - row.inexistent)
                    )}
                    %)
                  </td>
                  <td>
                    {formatDecimals(
                      ((row.different + 2088 - row.inexistent) * 100) /
                        perMonthData.totalValidNumbers
                    )}
                    %
                  </td>
                </tr>
              ) : (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.total}</td>
                  <td>{row.different}</td>
                  <td>{row.different - row.inexistent}</td>
                  <td>
                    {row.answered} (
                    {formatDecimals(
                      (row.answered * 100) / (row.different - row.inexistent)
                    )}
                    %)
                  </td>
                  <td>
                    {formatDecimals(
                      ((row.different - row.inexistent) * 100) /
                        perMonthData.totalValidNumbers
                    )}
                    %
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <hr />

      <h4 className="mb-4">Estadísticas por día</h4>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Total de llamadas</th>
              <th>Números únicos</th>
              <th>Atendieron</th>
              <th>No visitar</th>
              <th>Números inexistentes</th>
              <th>Porcentaje de inexistentes</th>
            </tr>
          </thead>
          <tbody>
            {perDayData.map((row, i) => (
              <tr key={i}>
                <td>{row.date ?? 'Nunca llamados'}</td>
                <td>{row.totalCalls}</td>
                <td>{row.different}</td>
                <td>{row.answered}</td>
                <td>{row.noCall ?? '-'}</td>
                <td>{row.nonExistent ?? '-'}</td>
                <td>
                  {row.date
                    ? Math.round((row.nonExistent * 100) / row.different) + '%'
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { StatisticsPanel }
