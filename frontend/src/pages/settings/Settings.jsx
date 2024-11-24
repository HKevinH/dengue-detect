import { Layout, Form, Input, Button, message } from "antd";
import { useState } from "react";
import useUsers from "../../hooks/useUsers";

export const Settings = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { currentSession } = useUsers();
  console.log(currentSession);

  const user = {
    name: currentSession?.name ?? "sin usuario",
    email: currentSession?.email ?? "sin email",
  };

  const onFinish = (values) => {
    setLoading(true);
    console.log("Datos enviados: ", values);
    setTimeout(() => {
      message.success("Configuraciones actualizadas exitosamente.");
      setLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <h1>Configuraciones de la cuenta</h1>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: user.name,
          email: user.email,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Nombre de usuario"
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa tu nombre de usuario",
            },
          ]}
        >
          <Input placeholder="Ingrese su nombre de usuario" />
        </Form.Item>

        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Por favor, ingresa un correo electrónico válido",
            },
          ]}
        >
          <Input placeholder="Ingrese su correo electrónico" />
        </Form.Item>

        {/* Contraseña */}
        <Form.Item
          label="Nueva contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor, ingresa tu nueva contraseña",
            },
            {
              min: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          ]}
        >
          <Input.Password placeholder="Ingrese su nueva contraseña" />
        </Form.Item>

        <Form.Item
          label="Confirmar contraseña"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Por favor, confirma tu contraseña",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Las contraseñas no coinciden")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirma tu nueva contraseña" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Actualizar Configuraciones
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};
