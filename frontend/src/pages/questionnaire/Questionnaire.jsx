import {
  Layout,
  Form,
  Radio,
  DatePicker,
  Button,
  Card,
  Typography,
  Modal,
} from "antd";
import { useState } from "react";
import "../../styles/questionnaire.css";
import dayjs from "dayjs";
import { useQuestions } from "../../hooks/useQuestions";
import { ConfettiComponent } from "../../components/atoms/Confetti";
const { Title } = Typography;

export const Questionnaire = () => {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { sendQuestion, responseLabel } = useQuestions();

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
      label: "¿Tienes dolor de cabeza (cefalea)?",
      name: "cefalea",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes dolor detrás de los ojos (dolor retro-ocular)?",
      name: "dolor_retro_ocular",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Has experimentado dolores musculares (mialgias)?",
      name: "malgias",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes dolor en las articulaciones (artralgia)?",
      name: "artralgia",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes erupciones en la piel?",
      name: "erupcion",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes dolor abdominal?",
      name: "dolor_abdominal",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Has tenido vómitos?",
      name: "vomito",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Has tenido diarrea?",
      name: "diarrea",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Te sientes somnoliento?",
      name: "somnolencia",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes presión baja (hipotensión)?",
      name: "hipotension",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes agrandamiento del hígado (hepatomegalia)?",
      name: "hepatomegalia",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes hemorragias en las mucosas?",
      name: "hem_mucosa",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes hipotermia?",
      name: "hipotermia",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes un aumento en el hematocrito?",
      name: "aum_hemato",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes una caída en el número de plaquetas?",
      name: "caida_plaquetas",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes acumulación de líquidos?",
      name: "acumulacion_liquidos",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes extravasación de líquidos?",
      name: "extravasacion",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Has tenido hemorragias?",
      name: "hemorragia",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Has experimentado un choque?",
      name: "choque",
      component: (
        <Radio.Group>
          <Radio value="si">Sí</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      ),
      rules: [{ required: true, message: "Por favor selecciona una opción" }],
    },
    {
      label: "¿Tienes algún daño en órganos?",
      name: "daño_organo",
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
      component: (
        <DatePicker
          format="MM/DD/YYYY"
          defaultValue={dayjs("10/12/2024", "MM/DD/YYYY")}
        />
      ),
      rules: [{ required: true, message: "Por favor selecciona una fecha" }],
    },
  ];

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = (values) => {
    sendQuestion(values);
    setSubmitted(true);
  };

  return (
    <Layout style={{ padding: "24px", backgroundColor: "#f0f2f5", marginTop: "50px" }}>
      <Card
        className="questionnaire-card"
        bodyStyle={{
          padding: "50px",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", color: "#1890ff", height: 100 }}
        >
          Cuestionario para la detección de dengue
        </Title>

        {!submitted ? (
          <>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="questionnaire-form"
            >
              {questions.map((question, index) => (
                <Form.Item
                  key={question.name}
                  label={question.label}
                  name={question.name}
                  rules={question.rules}
                  style={{ display: index === currentStep ? "block" : "none" }}
                >
                  {question.component}
                </Form.Item>
              ))}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {currentStep > 0 && (
                  <Button onClick={prevStep} style={{ width: "45%" }}>
                    Anterior
                  </Button>
                )}
                {currentStep < questions.length - 1 && (
                  <Button
                    type="primary"
                    onClick={() => {
                      form
                        .validateFields([questions[currentStep].name])
                        .then(() => nextStep())
                        .catch(() => {});
                    }}
                    style={{ width: currentStep > 0 ? "45%" : "100%" }}
                  >
                    Siguiente
                  </Button>
                )}
                {currentStep === questions.length - 1 && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Enviar
                  </Button>
                )}
              </div>
            </Form>
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Title level={4} style={{ color: "#52c41a" }}>
              ¡Gracias por completar el cuestionario!
            </Title>
            <Typography.Text style={{ fontSize: "16px" }}>
              Tus respuestas han sido enviadas exitosamente.
            </Typography.Text>
          </div>
        )}
      </Card>

      {responseLabel &&
        responseLabel.prediction_label.includes("sin signos") && (
          <ConfettiComponent />
        )}
      {responseLabel &&
        responseLabel.prediction_label.includes("con signos") && (
          <Modal
            title="Advertencia"
            visible={true}
            onCancel={() => {}}
            closable={false}
            centered
            footer={null}
          >
            <Title level={4} style={{ color: "#f5222d" }}>
              ¡Lo sentimos, pero parece que tienes síntomas de dengue!
            </Title>

            <Button type="primary" onClick={() => setSubmitted(false)}>
              Ir a el bot de ayuda
            </Button>
          </Modal>
        )}
    </Layout>
  );
};
