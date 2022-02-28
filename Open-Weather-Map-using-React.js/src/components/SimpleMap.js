import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { Container, Row, Col } from 'react-bootstrap';
import Legend from './Legend';
import 'bootstrap/dist/css/bootstrap.css';

const input = {
  width: '90%',
  position: 'absolute',
  top: '25%',
  left: '0',
  right: '0',
  marginTop: '-9px',
};

const SimpleMap = (props) => {
  const [center, setCenter] = useState({
    lat: props.data?.length > 0 ? parseFloat(props.data[0].lat) : 0,
    lng: props.data?.length > 0 ? parseFloat(props.data[0].lon) : 0,
  });
  //props.data && props.data.length > 0 ?  : 1
  const [zoom, setZoom] = useState(1);

  const getMapOptions = (maps) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }],
        },
      ],
    };
  };

  useEffect(() => {
    if (props.data && props.data.length > 0) {
      setCenter({
        lat: parseFloat(props.data[0].lat),
        lng: parseFloat(props.data[0].lon),
      });
      //setZoom(1);
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        //setZoom(1);
      });
    }
  }, [props.data]);

  return (
    <>
      <Container fluid style={{ ...input }}>
        <Row>
          <Col>
            {props.recentlyViewed ? (
              <>
                <Legend /> <br />
              </>
            ) : null}
            <div
              style={{
                height: '65vh',
                width: '100%',
                margin: 'auto',
                border: 'solid 2px',
                borderRadius: '4px',
              }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: `${process.env.REACT_APP_GOOGLEAPIKEY}`,
                }}
                center={center}
                zoom={zoom}
                options={getMapOptions}
                layerTypes={['TrafficLayer', 'TransitLayer']}
                hoverDistance={10}
              >
                {props.data &&
                  props.data.map((item, index) => (
                    <Marker
                      key={index}
                      lat={parseFloat(item.lat)}
                      lng={parseFloat(item.lon)}
                      name={item.name + ', ' + item.country}
                      color='blue'
                    />
                  ))}
                {props.recentlyViewed && (
                  <Marker
                    key={0}
                    lat={center.lat}
                    lng={center.lng}
                    name={'Your Location'}
                    color='blue'
                  />
                )}
                {props.recentlyViewed &&
                  props.recentlyViewed.map((item, index) => (
                    <Marker
                      key={index}
                      lat={parseFloat(item.lat)}
                      lng={parseFloat(item.lon)}
                      name={item.name + ', ' + item.country}
                      color='maroon'
                    />
                  ))}
              </GoogleMapReact>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SimpleMap;
