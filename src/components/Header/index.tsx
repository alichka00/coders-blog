import { ExclamationCircleOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { App, Dropdown, Button } from 'antd'

import { profileMenu, headerTitles } from './data'
import * as S from './styles'

import { useCurrentPath } from 'hooks/useCurrentPath'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { useAppDispatch, useAppSelector } from 'store'
import { logout } from 'store/auth'
import { openSidebar } from 'store/sidebar'
import { E_MediaQuery } from 'styles/theme'

export const Header = () => {
  const { isAuth, email } = useAppSelector((state) => state.authSlice)
  const dispatch = useAppDispatch()
  const currentPath = useCurrentPath()
  const isMobile = useMediaQuery(E_MediaQuery.md)
  const { notification, modal } = App.useApp()

  const handleLogout = () => {
    modal.confirm({
      title: 'Вихід з облікового запису',
      icon: <ExclamationCircleOutlined />,
      content: 'Ви дійсно бажаєте вийти з облікового запису?',
      okText: 'Вийти',
      cancelText: 'Скасувати',
      maskClosable: true,
      onOk() {
        dispatch(logout())
        notification.success({
          message: 'Ви вийшли з облікового запису',
        })
      },
    })
  }

  const handleOpenSidebar = () => {
    dispatch(openSidebar())
  }

  return (
    <S.HeaderWrapper>
      <S.HeaderLeftSection>
        {isMobile && <Button onClick={handleOpenSidebar} shape='circle' icon={<MenuOutlined />} />}
        <span>{headerTitles[currentPath]}</span>
      </S.HeaderLeftSection>
      {isAuth && (
        <Dropdown menu={profileMenu({ onLogout: handleLogout })} trigger={['click']}>
          <S.HeaderRightSection>
            <S.HeaderProfileInfo>
              <UserOutlined />
              <span>{email}</span>
            </S.HeaderProfileInfo>
          </S.HeaderRightSection>
        </Dropdown>
      )}
    </S.HeaderWrapper>
  )
}
