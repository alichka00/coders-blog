import { ChangeEvent } from "react";
import * as S from "./styles";

interface I_InputProps {
  htmlFor: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ htmlFor, value, onChange }: I_InputProps) => {
  return (
    <>
      <S.Label htmlFor={htmlFor}>{htmlFor}</S.Label>
      <S.Input value={value} onChange={onChange} />
    </>
  );
};
