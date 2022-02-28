import React from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

const input = {
  width: '60%',
  position: 'absolute',
  top: '25%',
  left: '0',
  right: '0',
  marginTop: '-9px',
};

export default function NotFound() {
  return (
    <>
      <Container style={{ ...input }}>
        <Row>
          <Col>
            <Alert variant='danger'>404 - Page not found!</Alert>
            <Button href='/' variant='primary'>
              Go Home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
