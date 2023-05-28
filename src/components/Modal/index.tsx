import { Input } from "../Input";
import * as S from "./styles";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "store";
import { login } from "store/thunks";
import { I_LoginData } from "models/loginData";
import { MdClose } from "react-icons/md";
import { closeModal } from "store/modal";

export const Modal = () => {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const dispatch = useAppDispatch();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasssword(e.target.value);
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleSubmit = () => {
    handleCloseModal();
    dispatch(login(loginData));
  };

  const loginData: I_LoginData = {
    email,
    password,
  };

  return (
    <S.Modal>
      <S.ModalOverlay onClick={handleCloseModal} />
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalClose>
          <MdClose onClick={handleCloseModal} />
        </S.ModalClose>
        <Input value={email} htmlFor="Email" onChange={handleChangeEmail} />
        <Input
          value={password}
          htmlFor="Password"
          onChange={handleChangePassword}
        />
        <S.Button onClick={handleSubmit}>Submit</S.Button>
      </S.ModalContent>
    </S.Modal>
  );
};
