/* eslint-disable react/prop-types */
import { Typography } from "antd";

const { Title } = Typography;

const PanelTitle = ({ level = 4, children, style }) => (
  <Title level={level} style={{ color: "#0B8043", ...style }}>
    {children}
  </Title>
);

export default PanelTitle;
