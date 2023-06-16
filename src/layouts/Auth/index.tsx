import { Button, Form, Input } from "antd";
import { I_Response } from "models/responses";
import { I_LoginData } from "models/loginData";
import { useEffect } from "react";
import { useAppDispatch } from "store";
import { login } from "store/auth";
import { useSignInMutation } from "store/auth/authApi";
import * as S from "./styles";

export const Auth = () => {
  const [form] = Form.useForm<I_LoginData>();
  const dispatch = useAppDispatch();

  const [signIn, { data, isSuccess }] = useSignInMutation();

  const handleSubmit = (values: I_LoginData) => {
    signIn(values);
  };

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(login(data as I_Response));
    }
  }, [data, dispatch, isSuccess]);
  console.log(data);

  return (
    <S.Layout>
      <S.AuthForm>
        <Form
          layout="vertical"
          autoComplete="off"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Е-пошта"
            name="email"
            rules={[
              {
                required: true,
                message: "Будь ласка, введіть е-пошту!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Будь ласка, введіть пароль!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Увійти
            </Button>
          </Form.Item>
        </Form>
      </S.AuthForm>
    </S.Layout>
  );
};