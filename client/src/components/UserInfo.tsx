import { Member } from "../type";
import { Card, Row, Col } from "react-bootstrap";
import { Avatar } from "flowbite-react";
import './UserInfo.css';

// User Info Component
const UserInfo = ({ user }: { user: Member | null }) => {
  // Nếu không có dữ liệu user, hiển thị thông báo hoặc skeleton
  if (!user) {
    return (
      <Card className="user-info-card text-white mb-4">
        <Card.Body>
          <div className="text-center p-4">
            <p>Loading user information...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="user-info-card text-white mb-4">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={8}>
            <Card.Title className="mb-1 userInfo-title">Welcome back!</Card.Title>
            <h5 className="mb-2 userInfo-name">
              {user.firstName} {user.lastName}
            </h5>
            <p className="mb-1 userInfo-detail">
              <i className="fas fa-envelope me-2"></i>
              {user.email || "Not provided"}
            </p>
            <p className="mb-1 userInfo-detail">
              <i className="fas fa-phone me-2"></i>
              {user.phone || "Not provided"}
            </p>
            <span className="userInfo-badge">
              {user.userAccount?.roles?.join(", ") || "Member"}
            </span>
          </Col>
          <Col md={4} className="text-center">
            <div className="userInfo-avatar-wrapper">
              <Avatar
                img={"/avatar.png"}
                rounded
                bordered
                color="pink"
                className="w-full h-full"
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
