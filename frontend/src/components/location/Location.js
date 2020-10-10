import React, {useState, useRef, useEffect} from 'react';
import { Alert, Badge, Button, Col, Container, Row, Table } from "react-bootstrap";
import mapboxgl from 'mapbox-gl';
import Menu from "../menu/Menu";
import gmapsLogo from '../../res/img/googleMaps.png';
import './Location.css';

mapboxgl.accessToken = "pk.eyJ1IjoibWljaGFlbC1rMTAxIiwiYSI6ImNqajBkMXNmbDBnbzAza2x6Mnp1Mjl5YWIifQ.K5e1fvORu0_ZfSPH4cGlNA"

function Location(props) {
  const [location, setLocation] = useState({});
  const mapboxElRef = useRef(null);

  useEffect(() => {
    let locationId = localStorage.getItem("location_id");
    if (typeof props.location.location_id !== "undefined") {
      localStorage.setItem("location_id", props.location.location_id);
      locationId = localStorage.getItem("location_id");
    }

    fetch('/api/locations/' + locationId)
      .then(response => response.json())
      .then(data => {
        setLocation(data[0]);
        const map = new mapboxgl.Map({
          container: mapboxElRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [data[0].lon, data[0].lat],
          zoom: 11
        });
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(new mapboxgl.ScaleControl());
        const marker = new mapboxgl.Marker()
          .setLngLat([data[0].lon, data[0].lat])
          .addTo(map);
      });
  }, [props.location.data]);

  return (
    <div className="location">
      <Menu/>
      <Container id="locationContainer">
        <Row>
          <Col lg={4}>
            <h2 id="locationName">{location.name}</h2>
            <h6 id="locationAddress">{location.address}</h6>
            <div id="map" ref={mapboxElRef}/>
            <Button size="lg"
                    id="directionsButton"
                    variant="light"
                    href={"https://www.google.com/maps/dir/?api=1&destination="+location.lat+","+location.lon}
                    target="_blank">
              <img className="img-fluid" id="gmapsLogo" src={gmapsLogo} alt="Google maps logo"/>
              Get Directions
            </Button>
          </Col>
          <Col lg={4}>
            <h5>Current Times</h5>
            <div className="waitTimesCard">
              <h6>Current wait time</h6>
              <h1 id="timeLabel">24</h1>
              <h6>minutes</h6>
              <p id="lastUpdatedLabel">Last updated:</p>
            </div>
            <div className="waitTimesCard">
              <h4><Badge variant="success">Lowest Today</Badge></h4>
              <div>
                <h3>30 minutes</h3>
                <p>at 9:30 AM</p>
              </div>
            </div>
            <div className="waitTimesCard">
              <h4><Badge variant="danger">Highest Today</Badge></h4>
              <div>
                <h3>45 minutes</h3>
                <p>at 8:15 AM</p>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <h5>Predicted Times</h5>
            <Table bordered id="predictedTimes">
              <tbody>
                <tr>
                  <td>8AM - 9AM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>9AM - 10AM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>10AM - 11AM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>11AM - 12PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>12PM - 1PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>1PM - 2PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>2PM - 3PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>3PM - 4PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>4PM - 5PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>5PM - 6PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>6PM - 7PM</td>
                  <td>15 mins</td>
                </tr>
                <tr>
                  <td>7PM - 8PM</td>
                  <td>15 mins</td>
                </tr>
              </tbody>
            </Table>
            <Alert variant="warning">Polls close at 8 PM.</Alert>
            <Alert variant="info">
              <Alert.Link href="#/FAQ">How was this data calculated?</Alert.Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Location;
