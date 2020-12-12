import React, { useEffect, useState } from 'react'

interface PhoneLinkProps {
  phone: string
}

const PhoneLink: React.FC<PhoneLinkProps> = ({ phone }) => {
  const [touchedCount, setTouchedCount] = useState<number>(0)

  const addTouched = () => setTouchedCount(touchedCount + 1)

  useEffect(() => {
    setTouchedCount(0)
  }, [phone])

  return (
    <>
      <a
        style={{ textDecoration: 'underline' }}
        href={`tel:${phone}`}
        onClick={addTouched}
      >
        {phone}
      </a>
      {Array(touchedCount)
        .fill(null)
        .map((_) => (
          <span className="d-block text-success">¡Tocado!</span>
        ))}
    </>
  )
}

export { PhoneLink }
