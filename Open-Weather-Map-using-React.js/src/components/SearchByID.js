import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import WeatherCard from './WeatherCard';

const input = {
  width: '60%',
  position: 'absolute',
  top: '25%',
  left: '0',
  right: '0',
  marginTop: '-9px',
};

export default function SearchByID() {
  const [item, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/group?id=${id}&appid=${process.env.REACT_APP_APIKEY}&units=metric&cnt=50`
      )
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error('Network response was not ok.');
        })
        .then((data) => {
          setData(data.list[0]);
        })
        .catch((err) => {
          setData(null);
          console.log(err);
        });
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Container fluid style={{ ...input }}>
        <Row>
          <Col>
            <WeatherCard cc={item} isID={true} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
