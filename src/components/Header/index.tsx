import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "store";
import { logout } from "store/auth";
import { openModal } from "store/modal";

export const Header = () => {
  const { isAuth } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <S.Header>
      <p>Header</p>
      <S.WrapAuth>
        {isAuth ? (
          <p onClick={handleLogout}>Log out</p>
        ) : (
          <p onClick={handleOpenModal}>Login</p>
        )}
      </S.WrapAuth>
    </S.Header>
  );
};
