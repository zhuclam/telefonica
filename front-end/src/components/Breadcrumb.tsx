import React from 'react'
import { Breadcrumb as BBreadcrumb, BreadcrumbItem } from 'reactstrap'
import { RouterLink } from '.'

interface BreadcrumbProps {
  items: Array<{
    title: string
    linkTo?: string
    onClick?: () => void
  }>
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => (
  <BBreadcrumb>
    {items.map(({ title, linkTo, onClick }, index) => (
      <BreadcrumbItem
        key={title}
        onClick={onClick}
        active={index === items.length - 1}
      >
        {linkTo ? (
          <RouterLink to={linkTo} noPadding>
            {title}
          </RouterLink>
        ) : (
          title
        )}
      </BreadcrumbItem>
    ))}
  </BBreadcrumb>
)

export { Breadcrumb }
