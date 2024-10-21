/* eslint-disable react/prop-types */
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

export const FormRegister = ({ onFinish }) => {
  return (
    <Form name="register" onFinish={onFinish} layout="vertical">
      <Form.Item
        name="fullname"
        label="Nombre completo"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su nombre completo!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Ej: juan perez" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Correo electronico"
        rules={[
          {
            required: true,
            type: "email",
            message: "Por favor ingrese un correo válido!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Ej: juangomez@gmail.com"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su contraseña!",
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Ej: 123456" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          + Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
};

export const FormLogin = ({ onFinish }) => {
  return (
    <Form name="login" onFinish={onFinish} layout="vertical">
      <Form.Item
        name="email"
        label="Correo electronico"
        rules={[
          {
            required: true,
            type: "email",
            message: "Por favor ingrese un correo válido!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Ej: juangomez@gmail.com"
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su contraseña!",
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Ej: 123456" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Iniciar Sesion
        </Button>
      </Form.Item>
    </Form>
  );
};
