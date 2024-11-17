import { Layout } from "antd";
import NewsSection from "../../components/organisms/NewsSection";

export const Dashboard = () => {
  return (
    <Layout style={{ padding: "24px", backgroundColor: "#f0f2f5", marginTop: "50px" }}>
      <h1 style={{ color: "#1890ff", textAlign: "center" }}>Dashboard</h1>
      <NewsSection />
    </Layout>
  );
};
