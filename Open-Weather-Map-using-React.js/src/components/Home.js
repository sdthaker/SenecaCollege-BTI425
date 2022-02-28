import React, { useEffect, useState, useRef } from 'react';
import { Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaCity } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';
import { WiThermometer, WiDaySnowThunderstorm } from 'react-icons/wi';
import { BsThermometerLow, BsThermometerHigh } from 'react-icons/bs';
import { CgFormatSlash } from 'react-icons/cg';
import '../home.css';
import 'bootstrap/dist/css/bootstrap.css';
import { gsap, Power3 } from 'gsap';
import '../gsap.css';

const input = {
  width: '60%',
  position: 'absolute',
  top: '25%',
  left: '0',
  right: '0',
  marginTop: '-9px',
};

export default function Home() {
  const [data, setData] = useState([]);

  //const card = useRef();

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await fetch(
            `https://pro.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APIKEY}&units=metric`
          )
            .then((response) => response.json())
            .then((json) => {
              setData(json);
            })
            .catch((error) => console.log(error));
        },
        (err) => {
          console.log(err);
        },
        { timeout: 10000 }
      );
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   gsap.to(card.current, {
  //     duration: 1,
  //     opacity: 1,
  //     y: -20,
  //     ease: Power3.easeOut,
  //   });
  // });

  setTimeout(() => {
    gsap.to('.city-div', {
      duration: 1,
      opacity: 1,
      y: -20,
      ease: Power3.easeOut,
    });
  }, 500);

  return (
    <>
      <Container style={{ ...input }}>
        <Row>
          <Col>
            {data.main ? (
              <Card
                className='text-center city-div'
                // ref={card}
              >
                <Card.Header>Weather in your city</Card.Header>
                <Card.Body bg='success'>
                  <Card.Title>
                    <i>
                      <span style={{ fontSize: '125%' }}>
                        <FaCity size={40} /> {data.name}, {data.sys.country}
                        <br></br>
                      </span>
                    </i>
                  </Card.Title>
                  <Card.Text>
                    <i>
                      <span style={{ fontSize: '125%' }}>
                        <AiOutlineCalendar size={40} />{' '}
                        {new Date().toDateString()}
                        <br></br>
                        <WiThermometer size={50} /> {data.main.temp} &deg;C
                        <br></br>
                        <WiDaySnowThunderstorm size={50} />{' '}
                        {data.weather[0].description}
                        <br></br>
                        <BsThermometerLow size={40} /> {data.main.temp_min}{' '}
                        &deg;C {'   '} <CgFormatSlash size={50} />
                        <BsThermometerHigh size={40} /> {data.main.temp_max}{' '}
                        &deg;C
                      </span>
                    </i>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>
                  Last updated: {new Date(data.dt * 1000).toLocaleString()}
                </Card.Footer>
              </Card>
            ) : (
              <Alert variant='warning'>
                Weather information is not available for your current location!
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
