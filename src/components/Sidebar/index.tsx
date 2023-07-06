import { Tooltip } from 'antd'
import { RiMenuFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import * as S from './styles'

import { I_MenuItem } from 'layouts/Dashboard/data'

import { useAppDispatch, useAppSelector } from 'store'
import { toggleSidebarCollapse } from 'store/sidebar'

interface I_SidebarProps {
  items: I_MenuItem[]
  selectedItem: string
}

export const Sidebar = ({ items, selectedItem }: I_SidebarProps) => {
  const { isCollapsed } = useAppSelector((state) => state.sidebarSlice)
  const dispatch = useAppDispatch()

  const handleToggleSidebar = () => {
    dispatch(toggleSidebarCollapse())
  }

  console.log(selectedItem)

  return (
    <S.SidebarWrapper isCollapsed={isCollapsed}>
      <S.SidebarInner>
        <S.SidebarHeader>
          <S.SidebarHeaderTitle isCollapsed={isCollapsed}>Coders blog</S.SidebarHeaderTitle>
          <S.SidebarCollapse isCollapsed={isCollapsed} onClick={handleToggleSidebar}>
            <RiMenuFill cursor={'pointer'} />
          </S.SidebarCollapse>
        </S.SidebarHeader>
        <S.SidebarMenu>
          {items.map((item) => (
            <Link to={item.to} key={item.key}>
              <Tooltip placement='right' title={isCollapsed && item.label}>
                <S.SidebarMenuItem isActive={item.key === selectedItem}>
                  <S.SidebarMenuItemIcon isCollapsed={isCollapsed}>
                    {item.icon}
                  </S.SidebarMenuItemIcon>
                  <S.SidebarMenuItemTextOverflow>
                    <S.SidebarMenuItemText isCollapsed={isCollapsed}>
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
  )
}
