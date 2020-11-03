import React from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";
import tombstone from "../assets/tombstone.png";

const Confirmation = ({
  userReservation: { id, flight, seat, givenName, surname, email },
}) => {
  return (
    <Wrapper>
      <h1>
        The flight has been booked{" "}
        <strong>
          {givenName} {surname}
        </strong>{" "}
        !
      </h1>
      <InfoDiv>
        <Info>Flight : {flight}</Info>
        <Info>Seat : {seat}</Info>

        <Info>Below is the ticket ID, write it down for future use: </Info>
        <Info>{id}</Info>
        <Info>An e-mail confirmation will be sent to : </Info>
        <Info>{email}</Info>
      </InfoDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoDiv = styled.div`
  margin-top: 80px;
  text-align: center;
  padding: 20px;
  border: 5px solid ${themeVars.alabamaCrimson};
  max-width: 800px;
  min-width: 200px;
`;

const Info = styled.p`
  font-family: ${themeVars.contentFont};
  margin-top: 10px;
`;

export default Confirmation;
