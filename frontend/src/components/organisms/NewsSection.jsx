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
      "https://tnonline.uol.com.br/themes/portal-tno-deploy/assets/img/default.jpg",
    category: "general",
    language: "pt",
    country: "br",
    published_at: "2024-11-11T23:02:42+00:00",
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
