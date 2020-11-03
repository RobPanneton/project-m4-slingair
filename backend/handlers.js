"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = (req, res) => {
  const flightNums = [];
  flightNums.push(Object.keys(flights));

  res.status(200).json({
    status: 200,
    data: flightNums,
    message: "flight list fetched successfully",
  });
};

const getFlight = (req, res) => {
  const flightId = req.params.id;
  const flightData = flights[flightId];

  if (flightData === undefined) {
    res.status(400).json({
      status: 400,
      data: flightId,
      message: `there is no flight with the flight id ${flightId}`,
    });
  } else {
    res.status(200).json({
      status: 200,
      data: flightData,
      message: "flight data fetched successfully",
    });
  }
};

const getReservations = (req, res) => {
  const reservationList = reservations;
  res.status(200).json({
    status: 200,
    data: reservationList,
    message: "reservation list fetched successfully",
  });
};

const getSingleReservation = (req, res) => {
  const reservationId = req.params.id;

  const requestedReservation = reservations.find((reservation) => {
    return reservation.id === reservationId;
  });

  if (requestedReservation === undefined) {
    res.status(400).json({
      status: 400,
      data: reservationId,
      message: `there is no flight with reservation id ${reservationId}`,
    });
  } else {
    res.status(200).json({
      status: 200,
      body: requestedReservation,
      message: "info request completed successfully",
    });
  }
};

const addReservations = (req, res) => {
  const { flight, seat, givenName, surname, email } = req.body;

  const newReservation = {
    flight,
    seat,
    givenName,
    surname,
    email,
  };

  newReservation.id = uuidv4();
  console.log(newReservation.seat);

  reservations.push(newReservation);

  let i = 0;
  for (i = 0; i < flights[flight].length; i++) {
    if (flights[flight][i].id === seat) {
      flights[flight][i] = {
        id: seat,
        isAvailable: false,
      };
      break;
    }
  }

  if (
    flight === undefined ||
    seat === undefined ||
    givenName === undefined ||
    surname === undefined ||
    email === undefined
  ) {
    res.status(400).json({
      status: 400,
      data: newReservation,
      message: "there is data missing in the form",
    });
  } else {
    res.status(200).json({
      status: 200,
      data: newReservation,
      message: `client has been added with the following information:         id: ${newReservation.id}     flight: ${newReservation.flight}           seat: ${newReservation.seat}        givenName: ${newReservation.givenName}      surname: ${newReservation.surname}      email: ${newReservation.email} `,
    });
  }
};

const deleteReservation = (req, res) => {
  const reservationId = req.params.id;
  let reservationRemoved = false;
  const targetedReservation = reservations.find((reservation) => {
    if (reservation.id === reservationId) return reservation;
  });

  const { id, flight, seat, givenName, surname, email } = targetedReservation;

  for (let i = 0; i < flights[flight].length; i++) {
    if (flights[flight][i].id === seat) {
      flights[flight][i] = {
        id: seat,
        isAvailable: true,
      };
      break;
    }
  }

  for (let j = 0; j < reservations.length; j++) {
    if (id === reservations[j].id) {
      reservations.splice(j, 1);
      reservationRemoved = true;
      break;
    }
  }

  if (!reservationRemoved) {
    res.status(400).json({
      status: 400,
      data: reservationId,
      message: "there are no reservations under the specified Id",
    });
  } else {
    res.status(200).json({
      status: 200,
      data: targetedReservation,
      message: "the targeted reservation has been successfully deleted",
    });
  }
};

const updateReservation = (req, res) => {
  const newFlight = req.params.flight;
  const newSeat = req.params.seat;
  const id = req.params.id;
  const flightData = reservations.find((ticket) => {
    return id === ticket.id;
  });
  const oldFlight = flightData.flight;
  const oldSeat = flightData.seat;
  console.log(oldSeat);
  console.log(flights[oldFlight][1]);

  for (let i = 0; i < flights[oldFlight].length; i++) {
    if (flights[oldFlight][i].id === oldSeat) {
      console.log(flights[oldFlight][i].id);
      flights[oldFlight][i] = {
        id: oldSeat,
        isAvailable: true,
      };
      break;
    }
  }

  for (let i = 0; i < flights[newFlight].length; i++) {
    if (flights[newFlight][i].id === newSeat) {
      console.log(flights[newFlight][i].id);
      flights[newFlight][i] = {
        id: newSeat,
        isAvailable: false,
      };
      break;
    }
  }

  res.status(200).json({
    status: 200,
    data: newFlight,
    message: `Your flight has been modified to flight: ${newFlight} seat: ${newSeat} `,
  });
  // use url query to get data key and value to be modified
  // get the reservation with the data given
  // change the data
  // log it / send status update
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
