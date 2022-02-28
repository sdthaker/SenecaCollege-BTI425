import React from 'react';
import { Form, Container, Row, Col, Stack, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const input = {
  width: '60%',
  position: 'absolute',
  top: '15%',
  left: '0',
  right: '0',
  marginTop: '-9px',
};

export default function SearchBar() {
  const [userInput, setUserInput] = React.useState('');

  const changeHandler = (event) => {
    event.preventDefault();
    setUserInput(event.target.value);
  };

  return (
    <>
      <Container style={{ ...input }}>
        <Row>
          <Col>
            <form onChange={changeHandler}>
              <Stack direction='horizontal' gap={3}>
                <Form.Control
                  type='search'
                  className='me-auto'
                  placeholder='City name, Country code'
                  defaultValue={userInput}
                />
                <Link to={`/search/${userInput}`}>
                  <Button type='submit' variant='primary'>
                    Search
                  </Button>
                </Link>
                {/* <div class='vr'></div> */}
                {/* <Button type='submit' variant='secondary'>
                  Clear
                </Button> */}
              </Stack>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
