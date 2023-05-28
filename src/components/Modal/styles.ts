import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 24px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(50, 50, 50, 0.5);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ModalContent = styled.div`
  position: relative;
  padding: 30px;
  background: #e1dfdf;
  width: 500px;
  height: 300px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const ModalClose = styled.div`
  position: absolute;
  cursor: pointer;
  right: 20px;
  top: 15px;
`;

export const Button = styled.button`
  width: 100px;
  padding: 8px;
  background: #23282d;
  color: #e1dfdf;
  border: none;
  border-radius: 5px;
  margin-top: 25px;
  cursor: pointer;
`;
