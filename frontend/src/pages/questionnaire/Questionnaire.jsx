import { Layout, Form, Radio, Button, DatePicker } from "antd";
import { useState } from "react";

export const Questionnaire = () => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      label: "¿Tienes fiebre?",
      name: "fiebre",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes sarpullido?",
      name: "sarpullido",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Has experimentado dolor muscular o en las articulaciones?",
      name: "dolor",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label:
        "¿Has estado en una zona con brotes conocidos de dengue recientemente?",
      name: "exposicion",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "Fecha en la que comenzaron los síntomas",
      name: "fechaSintomas",
      component: <DatePicker />,
      rules: [{ required: true, message: "Por favor selecciona una fecha" }],
    },
  ];

  const onFinish = (values) => {
    console.log("Cuestionario enviado: ", values);
    setSubmitted(true);
  };

  return (
    <Layout style={{ padding: "24px" }}>
      <h2>Cuestionario para la detección de dengue</h2>

      {!submitted ? (
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {questions.map((pregunta) => (
            <Form.Item
              key={pregunta.name}
              label={pregunta.label}
              name={pregunta.name}
              rules={pregunta.rules}
            >
              {pregunta.component}
            </Form.Item>
          ))}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <h2>¡Gracias por completar el cuestionario!</h2>
      )}
    </Layout>
  );
};
