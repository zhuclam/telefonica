import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { ErrorDisplay, Spinner } from 'components'
import { Fetch } from 'services'
import { Phone, PhoneResponse } from './types'

const Telefonica: React.FC = () => {
  const [phone, setPhone] = useState<Phone | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const fetchPhone = async () => {
    try {
      const [err, newPhone] = await new Fetch().get<PhoneResponse>('next')

      if (err) throw err

      setPhone(newPhone.phone)
      // TODO: use original data
    } catch {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPhone()
  }, [])

  if (error) return <ErrorDisplay />

  if (isLoading) return <Spinner fulfill />

  return (
    <Container>
      <h4>Phone is: {JSON.stringify(phone, null, 2)}</h4>
    </Container>
  )
}

export { Telefonica }
