import { useEffect, useState } from "react";
import { Row, Col, Typography, Layout } from "antd";
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
    <>
      <Title level={3} style={{ textAlign: "center", color: "#1890ff" }}>
        El dengue en las noticias
      </Title>

      <Layout style={{ overflowY: "auto", overflowX: "hidden" }}>
        <Row gutter={[16, 16]} style={{ marginTop: "24px", rowGap: "10px" }}>
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
    </>
  );
};

export default NewsSection;
