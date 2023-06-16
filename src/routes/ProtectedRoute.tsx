import { Auth } from "layouts/Auth";
import { useAppSelector } from "store";
import { Outlet } from "react-router-dom";
import { Header } from "components/Header";
import * as S from "pages/styles";

export const ProtectedRoute = () => {
  const { isAuth } = useAppSelector((state) => state.authSlice);

  if (isAuth) {
    return (
      <>
        <Header />
        <S.Container>
          <Outlet />
        </S.Container>
      </>
    );
  }
  return <Auth />;
};
