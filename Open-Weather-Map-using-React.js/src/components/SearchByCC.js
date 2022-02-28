import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import XMLParser from 'react-xml-parser';
import objectify from '../objectify';
import WeatherCard from './WeatherCard';
import Paginate from './Paginate';
import SimpleMap from './SimpleMap';

const inputWithMap = {
  width: '60%',
  position: 'absolute',
  top: '90%',
  left: '0',
  right: '0',
  marginTop: '-9px',
};

const inputWithoutMap = {
  width: '60%',
  position: 'absolute',
  top: '25%',
  left: '0',
  right: '0',
  marginTop: '-9px',
};

export default function SearchByCC({ handleClick }) {
  const { value } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.REACT_APP_APIKEY}&units=metric&cnt=50&mode=xml`
      )
        .then((response) => {
          if (response.ok) return response.text();
          else throw new Error('Network response was not ok.');
        })
        .then((xmlData) => {
          if (xmlData) {
            var xml = new XMLParser().parseFromString(xmlData);
            setData(objectify(xml));
          }
        })
        .catch((err) => {
          setData([]);
          console.log(err);
        });
    };

    fetchData();
  }, [value]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {data.length > 0 ? <SimpleMap data={data} /> : null}
      <Container
        fluid
        style={data.length > 0 ? { ...inputWithMap } : { ...inputWithoutMap }}
      >
        <Row>
          <Col>
            <br />
            <Paginate
              cardsPerPage={cardsPerPage}
              totalCards={data.length}
              paginate={paginate}
            />
            <WeatherCard cc={currentCards} handleClick={handleClick} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
