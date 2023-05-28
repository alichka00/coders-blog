import { useEffect } from "react";
import { Header } from "components/Header";
import { Modal } from "components/Modal";
import { useAppDispatch, useAppSelector } from "store";
import { checkAuth } from "store/thunks";
import * as S from "./styles";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { email, isAuth, isLoading } = useAppSelector(
    (state) => state.authSlice
  );
  const { modal } = useAppSelector((state) => state.modalSlice);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <>
      <Header />
      <S.Container>
        {isLoading && "Loading..."}
        {modal && <Modal />}
        {isAuth ? (
          <h1>Вітаємо, {email}!</h1>
        ) : (
          <h1>Будь ласка, увійдіть в обліковий запис!</h1>
        )}
      </S.Container>
    </>
  );
};
