import { ReactNode } from 'react'

import { useLocation } from 'react-router-dom'

import { menuItems } from './data'
import * as S from './styles'

import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import { useAppSelector } from 'store'

interface I_DashboardLayout {
  children: ReactNode
}

export const Dashboard = ({ children }: I_DashboardLayout) => {
  const location = useLocation()
  const { isCollapsed } = useAppSelector((state) => state.sidebarSlice)

  return (
    <S.Layout>
      <Sidebar items={menuItems} selectedItem={location.pathname.split('/')[1]} />
      <S.LayoutWrapper isSidebarCollapsed={isCollapsed}>
        <Header />
        <S.LayoutContainer>
          <S.LayoutContent>{children}</S.LayoutContent>
        </S.LayoutContainer>
      </S.LayoutWrapper>
    </S.Layout>
  )
}
