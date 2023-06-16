import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "store";
import { logout } from "store/auth";
import { Dropdown } from "antd";
import { profileMenu } from "./data";

export const Header = () => {
  const { isAuth, email } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <S.Header>
      <p>Header</p>
      <S.WrapAuth>
        {isAuth && (
          <Dropdown
            menu={profileMenu({ onLogout: handleLogout })}
            trigger={["click"]}
          >
            <p>{email}</p>
          </Dropdown>
        )}
      </S.WrapAuth>
    </S.Header>
  );
};
