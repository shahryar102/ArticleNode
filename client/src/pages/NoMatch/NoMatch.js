import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Link } from "react-router-dom";
const NoMatch = () => (
  <Container fluid>
    <Row>
      <Col size="md-2" />
      <Col size="md-8">
        <h1>404 Page Not Found</h1>
        <h1>
          <span
            role="img"
            aria-label="Face With Rolling Eyes Emoji"
            className="emoji-span"
          >
            Sorry Body🙄
          </span>
        </h1>
      </Col>
      <Col size="md-2" />
    </Row>
    <Row>
      <Col size="md-11">
        <Link to="/" className="pageLink">
          <i className="fa fa-search"></i> Back to Home
        </Link>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
