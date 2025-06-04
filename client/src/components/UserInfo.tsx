import { Member } from "../type";
import { Card, Row, Col } from "react-bootstrap";
import { Avatar } from "flowbite-react";

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
            <Card.Title className="mb-1">Welcome back!</Card.Title>
            <h5 className="mb-2">
              {user.firstName} {user.lastName}
            </h5>
            <p className="mb-1">
              <i className="fas fa-envelope me-2"></i>
              {user.email || "Not provided"}
            </p>
            <p className="mb-1">
              <i className="fas fa-phone me-2"></i>
              {user.phone || "Not provided"}
            </p>
            <span className="badge bg-light text-primary">
              {user.userAccount?.roles?.join(", ") || "Member"}
            </span>
          </Col>
          <Col md={4} className="text-center">
            <div className="w-40 h-40 mx-auto opacity-80">
              <Avatar
                img="/avatar.png"
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