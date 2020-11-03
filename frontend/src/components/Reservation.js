import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";

const Reservation = () => {
  const [reservationMatch, setReservationMatch] = useState({});
  const [idEntry, setIdEntry] = useState("");
  const [isMatch, setIsMatch] = useState(false);

  const checkId = () => {
    fetch("/flights/reservations")
      .then((res) => res.json())
      .then((data) => {
        const reservationData = data.data;
        const match = reservationData.find((flight) => {
          return flight.id === idEntry;
        });
        setReservationMatch(match);
        if (match) {
          setIsMatch(true);
        }
      });
  };

  useEffect(() => {
    console.log(isMatch);
    console.log(reservationMatch.id);
  }, [isMatch, reservationMatch]);

  return (
    <Wrapper>
      <SearchWrapper>
        <label htmlFor="idEntry">Get your reservation info: </label>
        <InputWrapper>
          <Input
            name="idEntry"
            placeholder="copy your id here"
            onChange={(ev) => setIdEntry(ev.target.value)}
          />
          <Button onClick={checkId}>Submit</Button>
        </InputWrapper>
      </SearchWrapper>
      {isMatch && (
        <>
          <InfoWrapper>
            <Item>NAME: {reservationMatch.givenName}</Item>
            <Item>LAST NAME: {reservationMatch.surname} </Item>
            <Item>FLIGHT # : {reservationMatch.flight}</Item>
            <Item>SEAT # : {reservationMatch.seat}</Item>
            <Item>EMAIL : {reservationMatch.email}</Item>
          </InfoWrapper>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div``;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Input = styled.input`
  margin-left: 16px;
  width: 500px;
`;

const Button = styled.button`
  margin-left: 6px;
`;

const InfoWrapper = styled.div``;

const Item = styled.p`
  margin-top: 12px;
`;

export default Reservation;
