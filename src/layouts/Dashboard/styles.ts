import styled from 'styled-components'

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`

interface I_LayoutWrapperProps {
  isSidebarCollapsed: boolean
  isMobile: boolean
}
export const LayoutWrapper = styled.div<I_LayoutWrapperProps>`
  display: flex;
  flex: auto;
  flex-direction: column;
  width: 100%;
  transition: padding-left ease 0.5s;
  padding-left: ${({ isMobile, isSidebarCollapsed }) =>
    isMobile ? 0 : isSidebarCollapsed ? 88 : 240}px;
`

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`

export const LayoutContent = styled.div`
  height: fit-content;
`
