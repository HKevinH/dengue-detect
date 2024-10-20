import { Row, Col } from "antd";
import { PanelTitle } from "../atoms/PanelTitle";
import { ProfileCard } from "./ProfileCard";
import { NotificationCard } from "./NotificationCard";
import { LastQuestionnaireCard } from "./LastQuestionnaireCard";

export const UserInformation = () => {
  return (
    <>
      <PanelTitle level={2} style={{ color: "#0B8043", marginBottom: "20px" }}>
        Tu Panel
      </PanelTitle>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <ProfileCard />
        </Col>
        <Col xs={24} sm={12}>
          <NotificationCard />
        </Col>
        <Col xs={24}>
          <LastQuestionnaireCard />
        </Col>
      </Row>
    </>
  );
};
