import React from 'react'
import { Breadcrumb as BBreadcrumb, BreadcrumbItem } from 'reactstrap'
import { RouterLink } from '.'
import { useConfig } from 'hooks'

interface BreadcrumbProps {
  items: Array<{
    title: string
    linkTo?: string
    onClick?: () => void
  }>
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { currentTerritory } = useConfig()

  return (
    <BBreadcrumb>
      {items.map(({ title, linkTo, onClick }, index) => (
        <BreadcrumbItem
          key={title}
          onClick={onClick}
          active={index === items.length - 1}
        >
          {linkTo ? (
            <RouterLink to={`/${currentTerritory.name}${linkTo}`} noPadding>
              {title}
            </RouterLink>
          ) : (
            title
          )}
        </BreadcrumbItem>
      ))}
    </BBreadcrumb>
  )
}

export { Breadcrumb }
