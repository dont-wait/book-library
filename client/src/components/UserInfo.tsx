import { User } from "../type";
import { Card, Row, Col } from "react-bootstrap";

// User Info Component
const UserInfo = ({ user }: { user: User }) => {
  return (
    <Card className='user-info-card text-white mb-4'>
      <Card.Body>
        <Row className='row align-items-center'>
          <Col md={8}>
            <Card.Title className='mb-1'>Welcome back!</Card.Title>
            <h5 className='mb-2'>
              {user?.firstName} {user?.lastName}
            </h5>
            <p className='mb-1'>
              <i className='fas fa-envelope me-2'></i>
              {user?.email || "Not provided"}
            </p>
            <p className='mb-1'>
              <i className='fas fa-phone me-2'></i>
              {user?.phone || "Not provided"}
            </p>
            <span className='badge bg-light text-primary'>
              {user?.userAccount?.roles.join(", ")}
            </span>
          </Col>
          <Col md={4} className='text-center'>
            <i
              className='fas fa-user-circle'
              style={{ fontSize: "4rem", opacity: 0.8 }}></i>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserInfo;
