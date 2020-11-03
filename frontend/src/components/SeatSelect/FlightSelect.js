import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ flightNumber, handleFlightSelect }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("/flights")
      .then((res) => res.json())
      .then((data) => {
        setFlights(...data.data);
      });
  }, []);

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
      <select onChange={handleFlightSelect}>
        <option value="" disabled selected>
          Select your flight
        </option>
        {flights.map((flightNum) => {
          return (
            <option value={flightNum} key={flightNum}>
              {flightNum}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

export default FlightSelect;
