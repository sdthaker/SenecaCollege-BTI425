import { Card, Alert, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../accordion.css';
import moment from 'moment';
import { DateTime } from 'luxon';
import React from 'react';
import { RiWindyLine } from 'react-icons/ri';
import { AiFillCloud } from 'react-icons/ai';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import { FiSunset, FiSunrise } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { FaTemperatureLow, FaTemperatureHigh } from 'react-icons/fa';
import { gsap, Power3 } from 'gsap';
import '../gsap.css';

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
    }}
  />
);

function createWeatherCard(item, index, check, handleClick) {
  check
    ? gsap.to('.city-div', {
        duration: 1,
        opacity: 1,
        y: -20,
        ease: Power3.easeOut,
      })
    : setTimeout(() => {
        gsap.to('.city-div', {
          duration: 1,
          opacity: 1,
          y: -20,
          ease: Power3.easeOut,
        });
      }, 500);

  return item ? (
    <Accordion
      flush
      key={index}
      className={handleClick ? null : 'city-div'}
      //className='city-div'
    >
      <Accordion.Item eventKey='0'>
        <Accordion.Header
          onClick={(e) => (handleClick ? handleClick(e, item) : null)}
        >
          <i>
            <span style={{ color: '#0d6efd', fontSize: '150%' }}>
              <img
                src={
                  'https://flagcdn.com/' +
                  (check
                    ? item.country.toLowerCase()
                    : item.sys.country.toLowerCase()) +
                  '.svg'
                }
                alt={`${item.country}`}
                width='60'
              />
              &nbsp; {item.name}, {check ? item.country : item.sys.country}
            </span>
            <br></br>
            <br></br>
            <span style={{ fontSize: '150%' }}>
              Feels like {check ? item.feelsLike : item.main.feels_like} &deg;C,{' '}
              {check ? item.weatherCondition : item.weather[0].description}.{' '}
              {check ? item.windCondition : item.weather[0].main}.
            </span>
            <br></br>
            <img
              src={
                'https://openweathermap.org/img/wn/' +
                (check ? item.weatherIcon : item.weather[0].icon) +
                '@2x.png'
              }
              alt='Weather Icon'
            />
            &nbsp; &nbsp;
            <span style={{ color: 'maroon', fontSize: '150%' }}>
              {check ? item.temp : item.main.temp}
            </span>
          </i>
        </Accordion.Header>
        <Accordion.Body>
          <Card className='text-left'>
            <Card.Body bg='success'>
              <Card.Text>
                <span style={{ fontSize: '20px' }}>
                  <i>
                    <b>Expect weather from:</b>
                  </i>{' '}
                  <br />
                  <FaTemperatureLow size={30} />
                  &nbsp;&nbsp;
                  {check ? item.min : item.main.temp_min} &deg;C{' '}
                  <i>
                    <b>to</b>
                  </i>{' '}
                  <br />
                  <FaTemperatureHigh size={30} />
                  &nbsp;&nbsp;
                  {check ? item.max : item.main.temp_max} &deg;C
                  <ColoredLine color='red' />
                  <i>
                    <b>
                      <FiSunrise size={30} />
                      &nbsp;&nbsp;Sunrise :
                    </b>
                  </i>{' '}
                  {check
                    ? moment(item.rise + '.000Z').format('DD/MM/YY HH:mm:ss')
                    : moment(item.sys.sunrise * 1000).format(
                        'DD/MM/YY HH:mm:ss'
                      )}{' '}
                  {DateTime.local().toFormat('ZZZZ')} <br />
                  <i>
                    <FiSunset size={30} />
                    &nbsp;&nbsp;<b>Sunset :</b>
                  </i>{' '}
                  {check
                    ? moment(item.set + '.000Z').format('DD/MM/YY HH:mm:ss')
                    : moment(item.sys.sunset * 1000).format(
                        'DD/MM/YY HH:mm:ss'
                      )}{' '}
                  {DateTime.local().toFormat('ZZZZ')}
                  <ColoredLine color='red' />
                  <i>
                    <b>
                      <AiFillCloud size={30} />
                      &nbsp;&nbsp;Clouds :
                    </b>
                  </i>{' '}
                  {check
                    ? item.cloudCondition
                    : item.weather[0].description}{' '}
                  <br />
                  <i>
                    <b>
                      <WiHumidity size={30} />
                      &nbsp;&nbsp;Humidity :
                    </b>
                  </i>{' '}
                  {check ? item.humidity : item.main.humidity}% <br />
                  <i>
                    <b>
                      <WiBarometer size={30} />
                      &nbsp;&nbsp;Pressure:
                    </b>
                  </i>{' '}
                  {check ? item.pressure : item.main.pressure} hPa
                  <ColoredLine color='red' />
                  <i>
                    <b>
                      <RiWindyLine size={30} />
                      &nbsp;&nbsp;Wind :
                    </b>
                  </i>{' '}
                  {check ? item.speed : item.wind.speed} m/s{' '}
                  {check ? item.directionDesc : ''}{' '}
                  {check ? '(' + item.code + ')' : ''}
                  <ColoredLine color='red' />
                  <i>
                    <b>
                      <GoLocation size={30} />
                      &nbsp;&nbsp;Geo Location:{' '}
                    </b>
                  </i>{' '}
                  {check ? item.lat : item.coord.lat},{' '}
                  {check ? item.lon : item.coord.lon}
                  <ColoredLine color='red' />
                  <i>
                    <b>&nbsp;&nbsp;City ID: </b>
                  </i>{' '}
                  {item.id}
                </span>
              </Card.Text>
            </Card.Body>
            <Card.Footer className='text-muted'>
              Last updated:{' '}
              {check
                ? new Date(item.lastupdateUNIX * 1000).toLocaleString()
                : new Date(item.dt * 1000).toLocaleString()}{' '}
              {DateTime.local().toFormat('ZZZZ')}
            </Card.Footer>
          </Card>
        </Accordion.Body>
      </Accordion.Item>
      <br />
    </Accordion>
  ) : (
    <Alert variant='danger'>
      Weather information is not available! Sorry for the trouble!
    </Alert>
  );
}

export default function WeatherCard({ cc, handleClick, isID }) {
  if (cc && Array.isArray(cc) && cc.length > 0) {
    return cc.map((item, index) => {
      return createWeatherCard(item, index, true, handleClick);
    });
  } else if (isID && !Array.isArray(cc) && typeof cc === 'object') {
    return createWeatherCard(cc, 1, false, null);
  } else if (cc && !Array.isArray(cc) && typeof cc === 'object') {
    return createWeatherCard(cc, 1, true, null);
  } else {
    return createWeatherCard(null, null, null);
  }
}
