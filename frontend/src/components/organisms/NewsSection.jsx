import { Layout, Row, Col, Typography } from "antd";
import NewsCard from "../molecules/NewsCard";
import "../../styles/news.css";

const { Title } = Typography;

const newsData = [
  {
    author: null,
    title:
      "Regional de Saúde de Londrina continua a liderar casos de dengue no Paraná, com 936",
    description:
      "Regional de Saúde de Londrina continua a liderar casos de dengue no Paraná, com 936",
    url: "https://www.bonde.com.br/bondenews/parana/regional-de-saude-de-londrina-continua-a-liderar-casos-de-dengue-no-parana-com-936",
    source: "bonde",
    image:
      "https://s3.amazonaws.com/producao.spayce.com.br/1722360476024_dengue2_1.jpg",
    category: "general",
    language: "pt",
    country: "br",
    published_at: "2024-11-12T13:51:46+00:00",
  },
  {
    author: null,
    title: "Câmara de Vereadores avalia aumento da dengue em Apucarana",
    description:
      "Problema foi discutido na sessão ordinária desta segunda-feira...",
    url: "https://tnonline.uol.com.br/noticias/apucarana/camara-de-vereadores-avalia-aumento-da-dengue-em-apucarana-933651",
    source: "tnonline",
    image:
      "https://s3.amazonaws.com/producao.spayce.com.br/1722360476024_dengue2_1.jpg",
    category: "general",
    language: "pt",
    country: "br",
    published_at: "2024-11-11T23:02:42+00:00",
  },
  {
    author: "Diario La Nación",
    title: "Alertan sobre aumento de casos de dengue en San José",
    description:
      "Las autoridades de salud de San José reportan un incremento significativo en los casos de dengue en las últimas semanas.",
    url: "https://www.lanacion.com.py/pais/2024/11/10/alertan-sobre-aumento-de-casos-de-dengue-en-san-jose/",
    source: "lanacion",
    image:
      "https://s3.amazonaws.com/producao.spayce.com.br/1722360476024_dengue2_1.jpg",
    category: "general",
    language: "es",
    country: "py",
    published_at: "2024-11-10T10:30:00+00:00",
  },
  {
    author: "El Universal",
    title: "Crecen los casos de dengue en zonas urbanas de México",
    description:
      "El aumento de la temperatura ha provocado un incremento en los casos de dengue en varias ciudades de México.",
    url: "https://www.eluniversal.com.mx/nacion/crecen-los-casos-de-dengue-en-zonas-urbanas-de-mexico",
    source: "eluniversal",
    image:
      "https://s3.amazonaws.com/producao.spayce.com.br/1722360476024_dengue2_1.jpg",
    category: "general",
    language: "es",
    country: "mx",
    published_at: "2024-11-09T14:15:00+00:00",
  },
  {
    author: "Diario Clarín",
    title: "Preocupación en Argentina por brote de dengue en el norte",
    description:
      "Un brote de dengue ha encendido las alertas en las provincias del norte de Argentina, donde se registran varios casos graves.",
    url: "https://www.clarin.com/sociedad/preocupacion-argentina-brote-dengue-norte_0.html",
    source: "clarin",
    image:
      "https://s3.amazonaws.com/producao.spayce.com.br/1722360476024_dengue2_1.jpg",
    category: "general",
    language: "es",
    country: "ar",
    published_at: "2024-11-08T08:45:00+00:00",
  },
  {
    author: "El País",
    title: "Uruguay refuerza la prevención del dengue en zonas fronterizas",
    description:
      "El Ministerio de Salud Pública de Uruguay ha lanzado una campaña para prevenir el dengue en áreas cercanas a la frontera con Brasil.",
    url: "https://www.elpais.com.uy/vida-actual/uruguay-refuerza-prevencion-dengue-zonas-fronterizas",
    source: "elpais",
    image:
      "https://s3.amazonaws.com/producao.spayce.com.br/1722360476024_dengue2_1.jpg",
    category: "general",
    language: "es",
    country: "uy",
    published_at: "2024-11-07T12:20:00+00:00",
  },
  {
    author: "El Tiempo",
    title: "Colombia: Bogotá en alerta por aumento de casos de dengue",
    description:
      "El aumento de la temperatura en Bogotá ha llevado a un incremento de casos de dengue, lo que preocupa a las autoridades sanitarias.",
    url: "https://www.eltiempo.com/salud/bogota-en-alerta-por-aumento-de-casos-de-dengue-761820",
    source: "eltiempo",
    image:
      "https://s3.amazonaws.com/producao.spayce.com.br/1722360476024_dengue2_1.jpg",
    category: "general",
    language: "es",
    country: "co",
    published_at: "2024-11-06T17:00:00+00:00",
  },
];

const NewsSection = () => (
  <Layout style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
    <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
      Noticias sobre el Dengue
    </Title>
    <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
      {newsData.map((news, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <NewsCard
            title={news.title}
            description={news.description}
            date={news.date}
            image={news.image}
          />
        </Col>
      ))}
    </Row>
  </Layout>
);

export default NewsSection;
