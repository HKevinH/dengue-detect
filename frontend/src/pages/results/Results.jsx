import { Layout, Table } from "antd";

const dataSource = [
  {
    key: "1",
    username: "juanperez123",
    fechaSintomas: "2024-10-10",
    fiebre: "Sí",
    sarpullido: "No",
    dolor: "Sí",
    exposicion: "Sí",
  },
  {
    key: "2",
    username: "mariagomez456",
    fechaSintomas: "2024-10-12",
    fiebre: "No",
    sarpullido: "Sí",
    dolor: "No",
    exposicion: "No",
  },
  {
    key: "3",
    username: "luisrodriguez789",
    fechaSintomas: "2024-10-11",
    fiebre: "Sí",
    sarpullido: "Sí",
    dolor: "Sí",
    exposicion: "No",
  },
];

const columns = [
  {
    title: "Usuario",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Fecha de inicio de síntomas",
    dataIndex: "fechaSintomas",
    key: "fechaSintomas",
  },
  {
    title: "¿Tiene fiebre?",
    dataIndex: "fiebre",
    key: "fiebre",
  },
  {
    title: "¿Tiene sarpullido?",
    dataIndex: "sarpullido",
    key: "sarpullido",
  },
  {
    title: "¿Dolor muscular o articular?",
    dataIndex: "dolor",
    key: "dolor",
  },
  {
    title: "¿Exposición reciente al dengue?",
    dataIndex: "exposicion",
    key: "exposicion",
  },
];

export const Results = () => {
  return (
    <Layout style={{ padding: "24px" }}>
      <h1>Resultados de los Cuestionarios</h1>

      <Table dataSource={dataSource} columns={columns} />
    </Layout>
  );
};
