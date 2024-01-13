import { MenuOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'

import * as S from './styles'

import { useMediaQuery } from 'hooks/useMediaQuery'
import { I_MenuItem } from 'layouts/Dashboard/data'

import { useAppDispatch, useAppSelector } from 'store'
import { closeSidebar, toggleSidebarCollapse } from 'store/sidebar'
import { E_MediaQuery } from 'styles/theme'

interface I_SidebarProps {
  items: I_MenuItem[]
  selectedItem: string
}

export const Sidebar = ({ items, selectedItem }: I_SidebarProps) => {
  const { isCollapsed, isOpen } = useAppSelector((state) => state.sidebarSlice)
  const dispatch = useAppDispatch()
  const isMobile = useMediaQuery(E_MediaQuery.md)

  const handleToggleSidebar = () => {
    dispatch(toggleSidebarCollapse())
  }

  const handleClose = () => {
    dispatch(closeSidebar())
  }

  return (
    <>
      <S.SidebarWrapper $isOpen={isOpen} $isMobile={isMobile} $isCollapsed={isCollapsed}>
        <S.SidebarInner>
          <S.SidebarHeader>
            <S.SidebarHeaderTitle $isCollapsed={isCollapsed}>Coders blog</S.SidebarHeaderTitle>
            <S.SidebarCollapse $isCollapsed={isCollapsed} onClick={handleToggleSidebar}>
              <MenuOutlined />
            </S.SidebarCollapse>
          </S.SidebarHeader>
          <S.SidebarMenu>
            {items.map((item) => (
              <Link to={item.to} key={item.key}>
                <Tooltip placement='right' title={isCollapsed && item.label}>
                  <S.SidebarMenuItem $isActive={item.key === selectedItem}>
                    <S.SidebarMenuItemIcon $isCollapsed={isCollapsed}>
                      {item.icon}
                    </S.SidebarMenuItemIcon>
                    <S.SidebarMenuItemTextOverflow>
                      <S.SidebarMenuItemText $isCollapsed={isCollapsed}>
                        {item.label}
                      </S.SidebarMenuItemText>
                    </S.SidebarMenuItemTextOverflow>
                  </S.SidebarMenuItem>
                </Tooltip>
              </Link>
            ))}
          </S.SidebarMenu>
        </S.SidebarInner>
      </S.SidebarWrapper>
      {isMobile && isOpen && <S.SidebarOverlay onClick={handleClose} />}
    </>
  )
}
