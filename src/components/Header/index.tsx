import { Dropdown } from 'antd'

import { profileMenu, headerTitles } from './data'
import * as S from './styles'

import { useCurrentPath } from 'hooks/useCurrentPath'
import { useAppDispatch, useAppSelector } from 'store'
import { logout } from 'store/auth'

export const Header = () => {
  const { isAuth, email } = useAppSelector((state) => state.authSlice)
  const dispatch = useAppDispatch()
  const currentPath = useCurrentPath()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <S.HeaderWrapper>
      <S.HeaderLeftSection>
        <span>{headerTitles[currentPath]}</span>
      </S.HeaderLeftSection>
      {isAuth && (
        <Dropdown menu={profileMenu({ onLogout: handleLogout })} trigger={['click']}>
          <S.HeaderRightSection>
            <span>{email}</span>
          </S.HeaderRightSection>
        </Dropdown>
      )}
    </S.HeaderWrapper>
  )
}
