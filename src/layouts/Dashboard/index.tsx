import { ReactNode } from 'react'

import { useLocation } from 'react-router-dom'

import { menuItems } from './data'
import * as S from './styles'

import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useAppSelector } from 'store'
import { E_MediaQuery } from 'styles/theme'

interface I_DashboardLayout {
  children: ReactNode
}

export const Dashboard = ({ children }: I_DashboardLayout) => {
  const location = useLocation()
  const { isCollapsed } = useAppSelector((state) => state.sidebarSlice)
  const isMobile = useMediaQuery(E_MediaQuery.md)

  return (
    <S.Layout>
      <Sidebar items={menuItems} selectedItem={location.pathname.split('/')[1]} />
      <S.LayoutWrapper $isSidebarCollapsed={isCollapsed} $isMobile={isMobile}>
        <Header />
        <S.LayoutContainer>
          <S.LayoutContent>{children}</S.LayoutContent>
        </S.LayoutContainer>
      </S.LayoutWrapper>
    </S.Layout>
  )
}
