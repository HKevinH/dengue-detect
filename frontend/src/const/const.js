import { Radio, DatePicker } from "antd";
import "../../styles/questionnaire.css";
import dayjs from "dayjs";

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

export { questions };
