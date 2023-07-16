import styled, { css } from 'styled-components'

interface I_SidebarProps {
  isCollapsed: boolean
}

export const SidebarWrapper = styled.div<I_SidebarProps & { $isMobile: boolean; $isOpen: boolean }>`
  z-index: 100;
  left: 0;
  top: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: space-between;
  position: fixed;
  height: 100vh;
  background-color: #23282d;
  color: #fffc;
  box-shadow: 3px 0 6px -5px #333;
  width: ${({ isCollapsed }) => (isCollapsed ? 88 : 240)}px;
  transition: width ease 0.5s, transform ease 0.5s;

  @media (max-width: 720px) {
    ${({ $isOpen }) =>
      css`
        transform: translateX(${$isOpen ? 0 : -240}px);
      `}
  }
`

export const SidebarInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  font-size: 16px;
`

export const SidebarHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 16px 0;
`

export const SidebarHeaderTitle = styled.span<I_SidebarProps>`
  position: absolute;
  width: 156px;
  font-weight: 600;
  text-transform: uppercase;
  transition: transform ease 0.5s;
  transform: translateX(${({ isCollapsed }) => (isCollapsed ? -240 : 0)}px);
`

export const SidebarCollapse = styled.span<I_SidebarProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 50px;
  border-radius: 8px;
  transition: color ease 0.5s, background-color ease 0.5s, transform ease 0.5s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.layoutTriggerBackground};
  }

  ${({ isCollapsed }) =>
    isCollapsed
      ? css`
          transform: translateX(0);
        `
      : css`
          transform: translateX(160px);
        `}
`

export const SidebarMenu = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: calc(100vh - 80px);
  padding-inline: 16px;
`

export const SidebarMenuItem = styled.li<{ isActive: boolean }>`
  position: relative;
  user-select: none;
  width: 100%;
  min-width: 56px;
  height: 50px;
  padding: 12px 16px;
  border-radius: 8px;
  transition: color ease 0.5s, background-color ease 0.5s;

  ${({ isActive }) =>
    isActive
      ? css`
          background-color: ${({ theme }) => theme.palette.primary};
          color: #fff;
        `
      : css`
          &:hover {
            color: #fff;

            background-color: ${({ theme }) => theme.palette.layoutTriggerBackground};
          }
        `}
`

export const SidebarMenuItemIcon = styled.span<I_SidebarProps>`
  position: absolute;
  transition: transform ease 0.5s;
  transform: translateX(${({ isCollapsed }) => (isCollapsed ? 4 : 0)}px);
`

export const SidebarMenuItemTextOverflow = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  margin-left: 24px;
`

export const SidebarMenuItemText = styled.span<I_SidebarProps>`
  position: absolute;
  overflow: hidden;
  width: 190px;
  transition: transform ease 0.5s;
  transform: translateX(${({ isCollapsed }) => (isCollapsed ? -240 : 0)}px);
`
export const SidebarOverlay = styled.div`
  position: fixed;
  z-index: 90;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.45);
`
