import { useEffect, useState } from "react";
import { Layout, Row, Col, Typography } from "antd";
import NewsCard from "../molecules/NewsCard";
import { fetchDengueNews } from "../../api/newsApi";
import "../../styles/news.css";

const { Title } = Typography;

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await fetchDengueNews();
        setNewsData(news);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  return (
    <Layout
      style={{
        padding: "10px",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
        El dengue en las noticias
      </Title>
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <NewsCard loading={true} />
              </Col>
            ))
          : newsData.map((news, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <NewsCard
                  title={news.title}
                  description={news.description}
                  date={news.publishedAt}
                  image={news.urlToImage}
                  url={news.url}
                  loading={false}
                />
              </Col>
            ))}
      </Row>
    </Layout>
  );
};

export default NewsSection;
