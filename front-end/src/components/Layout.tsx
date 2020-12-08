import React from 'react'
import styled from 'styled-components'
import { Navbar } from './Navbar'

const Layout: React.FC = ({ children }) => (
  <>
    <Navbar />
    <ContentContainer>{children}</ContentContainer>
  </>
)

const ContentContainer = styled.div`
  height: calc(100vh - ${({ theme }) => theme.navbarHeight}px);
`

export { Layout }
