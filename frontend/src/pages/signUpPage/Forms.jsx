/* eslint-disable react/prop-types */
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

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
        <Input prefix={<UserOutlined />} placeholder="Ej: Juan Pérez" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Género"
        rules={[
          {
            required: true,
            message: "Por favor seleccione su género!",
          },
        ]}
      >
        <Select placeholder="Seleccione su género">
          <Option value="masculino">Masculino</Option>
          <Option value="femenino">Femenino</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="securityType"
        label="Tipo de Seguridad"
        rules={[
          {
            required: true,
            message: "Por favor seleccione el tipo de seguridad!",
          },
        ]}
      >
        <Select placeholder="Seleccione su tipo de seguridad">
          <Option value="contributivo">Contributivo</Option>
          <Option value="subsidiado">Subsidiado</Option>
          <Option value="otro">Otro</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="location"
        label="Ciudad y Municipio de Residencia"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su ubicación!",
          },
        ]}
      >
        <Input placeholder="Ej: Bogotá, Chapinero" />
      </Form.Item>

      <Form.Item
        name="ethnicity"
        label="Etnia"
        rules={[
          {
            required: true,
            message: "Por favor seleccione su etnia!",
          },
        ]}
      >
        <Select placeholder="Seleccione su etnia">
          <Option value="mestizo">Mestizo</Option>
          <Option value="indígena">Indígena</Option>
          <Option value="afrodescendiente">Afrodescendiente</Option>
          <Option value="otro">Otro</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="stratum"
        label="Estrato"
        rules={[
          {
            required: true,
            message: "Por favor seleccione su estrato!",
          },
        ]}
      >
        <Select placeholder="Seleccione su estrato">
          {Array.from({ length: 22 }, (_, i) => (
            <Option key={i + 1} value={`${i + 1}`}>
              {i + 1}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="email"
        label="Correo electrónico"
        rules={[
          {
            required: true,
            message: "Por favor ingrese un correo válido!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Ej: Juan Pérez" />
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
        <Input.Password placeholder="Ej: 123456" />
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
