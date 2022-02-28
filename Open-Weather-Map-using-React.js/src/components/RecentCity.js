import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import WeatherCard from './WeatherCard';

const input = {
  width: '60%',
  position: 'absolute',
  top: '25%',
  left: '0',
  right: '0',
  marginTop: '-9px',
};

export default function RecentCity({ recentlyViewed }) {
  const [item, setItem] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    if (recentlyViewed) {
      setItem(recentlyViewed.find((elem) => elem.id === id));
    }
  }, [recentlyViewed, id]);

  return (
    <Container fluid style={{ ...input }}>
      <Row>
        <Col>
          <WeatherCard cc={item} />
        </Col>
      </Row>
    </Container>
  );
}
