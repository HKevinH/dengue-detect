/* eslint-disable react/prop-types */
import { Typography } from "antd";

const { Text } = Typography;

const PanelText = ({ children, style }) => (
  <Text style={{ ...style }}>{children}</Text>
);

export default PanelText;
