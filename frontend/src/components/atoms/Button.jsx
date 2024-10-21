/* eslint-disable react/prop-types */
import { Button } from "antd";

const PrimaryButton = ({ children, style, ...props }) => (
  <Button
    type="primary"
    style={{
      backgroundColor: "#0B8043",
      borderColor: "#0B8043",
      ...style,
    }}
    {...props}
  >
    {children}
  </Button>
);

export default PrimaryButton;
