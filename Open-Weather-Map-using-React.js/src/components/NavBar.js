import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  Button,
  FormControl,
  Container,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { AiFillHome } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import '../navbar.css';

export default function NavBar({ recentlyViewed }) {
  const [userInput, setUserInput] = React.useState('');
  const [data, setData] = useState([]);

  const changeHandler = (event) => {
    event.preventDefault();
    setUserInput(event.target.value);
  };

  useEffect(() => {
    setData(recentlyViewed);
  }, [recentlyViewed]);

  return (
    <Navbar bg='dark' expand='sm' style={{ fontSize: '18px' }}>
      <Container fluid>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <i>
              <Nav.Link style={{ color: 'lightblue' }} href='/'>
                <AiFillHome />
                &nbsp;Home
              </Nav.Link>
            </i>

            <i>
              <Nav.Link style={{ color: 'lightblue' }} href='/world'>
                <BiWorld />
                &nbsp;World
              </Nav.Link>
            </i>

            <i>
              <NavDropdown
                title='Previously Viewed'
                id='navbarScrollingDropdown'
                style={{ color: 'lightblue' }}
              >
                {data.map((elem) => {
                  return (
                    <NavDropdown.Item href={`/recent/${elem.id}`} key={elem.id}>
                      City: &nbsp;
                      {elem.name}, {elem.country}&nbsp; &nbsp;
                    </NavDropdown.Item>
                  );
                })}{' '}
              </NavDropdown>
            </i>
          </Nav>
          <Form className='d-flex' onChange={changeHandler}>
            <FormControl
              type='search'
              placeholder='City ID'
              className='me-2'
              aria-label='Search'
            />
            <Link to={`/id/${userInput}`}>
              <Button type='submit' variant='primary'>
                Search
              </Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
