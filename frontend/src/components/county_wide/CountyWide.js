import React, { useEffect, useState } from 'react';
import { Dropdown, Container, Row, Col, Card, Form } from "react-bootstrap";
import {Link} from "react-router-dom";
import Menu from "../menu/Menu";
import './CountyWide.css';

function CountyWide() {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetical");

  useEffect(() => {
    fetch('/api/locations')
      .then(response => response.json())
      .then(locations => {
        setLocations(locations);
        setFilteredLocations(locations);
      })
  }, []);

  function handleFilter(e){
    let searchText = e.target.value.toLowerCase();
    let newData = locations.filter(location => match(searchText, location.name, location.address));
    setFilteredLocations(newData);
  }

  function match(filter, name, address) {
    let nameMatch = name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    let addressMatch = address.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    return nameMatch || addressMatch;
  }

  function sortCards(sort){
    let sorted;
    switch (sort) {
      case "Alphabetical":
        sorted = filteredLocations.sort((a, b) => (a.name > b.name) ? 1 : -1);
        setFilteredLocations(sorted);
        setSortBy("Alphabetical");
        break;
      case "Lowest wait time":
      //   sorted = filteredLocations.sort((a, b) => (a.wait_time > b.wait_time) ? 1 : -1);
      //   setFilteredLocations(sorted);
        setSortBy("Lowest wait time");
        break;
    }
  }

  return (
    <div className="countyWide">
      <Menu/>
      <Container id="countyWideContainer">
        <Row className="d-flex align-items-center">
          <Col>
            <h1>County Wide</h1>
          </Col>
          <Col id="dropdownColumn">
            <Dropdown id="sortDropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort By: {sortBy}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => sortCards("Alphabetical")}>Alphabetical</Dropdown.Item>
                <Dropdown.Item onClick={() => sortCards("Lowest wait time")}>Lowest wait time</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Form.Control id="countyWideFilter"
                        size="lg" type="search"
                        placeholder="Filter locations"
                        onChange={handleFilter}/>
        </Row>
        <Row id="cardsContainer">
          {filteredLocations.length > 0
            ? filteredLocations.map(location => (
                <Link to={{
                  pathname: '/location',
                  location_id: location.id
                }} key={location.id} className="countyWideCard text-center" >
                  <Card key={location.id}>
                    <Card.Header>{location.name}</Card.Header>
                    <Card.Body>
                      <Card.Title><h1>24</h1></Card.Title>
                      <Card.Text>
                        minutes
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              ))
            : <h5 id="countyWideNoLocationsFound">No locations found.</h5>
          }
        </Row>
      </Container>
    </div>
  );
}

export default CountyWide;
