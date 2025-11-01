const { parse } = require('dotenv');
const prisma = require('../../utils/prisma');
const { generateTicketPDF } = require('./ticket/ticketGenerator');
const { DateTime } = require('luxon');

exports.downloadBooking = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, 10))) {
        return res.status(400).json({ error: 'Missing ID parameter' });
    }
    const userId = req.userToken.userId;
    let ticketData;

    try {
        ticketData = await prisma.bookings.findUnique({
            where: {
                id: parseInt(id, 10)
            },
            include: {
                trips: {
                    include: {
                        users: true,
                    }
                },
                tickets: {
                    include: {
                        flights: {
                            include: {
                                routes: {
                                    include: {
                                        airports_routes_departureToairports: {
                                            select: {
                                                id: true,
                                                name: true,
                                                time_zone: true,
                                            }
                                        },
                                        airports_routes_destinationToairports: {
                                            select: {
                                                id: true,
                                                name: true,
                                                time_zone: true,
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    }
                },
                extras: true,
                seats: true
            }
        });

        const departureAirport = ticketData.tickets.flights.routes.airports_routes_departureToairports;
        const liftoffDateUTC = ticketData.tickets.flights.liftoff_date;
        ticketData.localDepartureDate = DateTime.fromJSDate(liftoffDateUTC).setZone(departureAirport.time_zone).toISO();

        // Validate that the ticket belongs to the user
        const trip = ticketData.trips;
        const user = trip && trip.users;

        if (!user || user.id !== userId) {
            return res.status(404).json({ error: 'Ticket not found or does not belong to this user' });
        }


        if (!ticketData) {
            return res.status(404).json({ error: 'Ticket not found or does not belong to this user' });
        }

    } catch (error) {
        console.error('Error fetching ticket data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    const pdfBuffer = await generateTicketPDF(ticketData);
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ticket.pdf"',
        'Content-Length': pdfBuffer.length
    });
    res.end(pdfBuffer);
};

exports.getBookingDetails = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, 10))) {
        return res.status(400).json({ error: 'Missing ID parameter' });
    }
    const userId = req.userToken.userId;
    let ticketData;

    try {
        ticketData = await prisma.bookings.findUnique({
            where : {
                id : parseInt(id, 10)
            },
            include : {
                trips: {
                    include: {
                        users: true,
                    }
                },
                tickets: {
                    include: {
                        flights: {
                            include: {
                                routes: {
                                    include: {
                                        airports_routes_departureToairports: {
                                            select: {
                                                id: true,
                                                name: true,
                                                time_zone: true,
                                            }
                                        },
                                        airports_routes_destinationToairports: {
                                            select: {
                                                id: true,
                                                name: true,
                                                time_zone: true,
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    }
                },
                extras: true,
                seats: true
            }
        });

        const departureAirport = ticketData.tickets.flights.routes.airports_routes_departureToairports;
        const liftoffDateUTC = ticketData.tickets.flights.liftoff_date;
        ticketData.localDepartureDate = DateTime.fromJSDate(liftoffDateUTC).setZone(departureAirport.time_zone).toISO();

        // Validate that the ticket belongs to the user
        const trip = ticketData.trips;
        const user = trip && trip.users;

        if (!user || user.id !== userId) {
            return res.status(404).json({ error: 'Ticket not found or does not belong to this user' });
        }
        

        if (!ticketData) {
            return res.status(404).json({ error: 'Ticket not found or does not belong to this user' });
        }
    } catch (error) {
        console.error('Error fetching ticket data:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(200).json(ticketData);
};

exports.listTickets = async (req, res) => {
    const { flightUUID } = req.params;
    if (!flightUUID) {
        return res.status(400).json({ error: 'Missing flight UUID parameter' });
    }

    try {
        const tickets = await prisma.tickets.findMany({
            where: {
                fligt_code: flightUUID
            }
        });

        if (tickets.length === 0) {
            return res.status(404).json({ error: 'No tickets found for this flight' });
        }

        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getFlightAvailableSeats = async (req, res) => {
    const { flightUUID } = req.params;
    if (!flightUUID) {
        return res.status(400).json({ error: 'Missing flight UUID parameter' });
    }

    try {
        // find the flight to get the aircraft_id
        const flight = await prisma.flights.findUnique({
            where: { code: flightUUID },
            select: { aircraft_id: true }
        });

        if (!flight) {
            return res.status(404).json({ error: 'Flight not found' });
        }

        // Find all seat_id already booked for this flight
        const bookedSeats = await prisma.bookings.findMany({
            include: {
                tickets: {
                    include: {
                        flights: {
                            where: { code: flightUUID }
                        }
                    }
                }
            }
        });
        const bookedSeatIds = bookedSeats.map(b => b.seat_id);

        // Find all seats of the aircraft that are NOT among those booked
        const availableSeats = await prisma.seats.findMany({
            where: {
                aircraft_id: flight.aircraft_id,
                id: { notIn: bookedSeatIds }
            }
        });

        res.status(200).json(availableSeats);
    } catch (error) {
        console.error('Error fetching available seats:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getFlightExtras = async (req, res) => {
    try {
        const extras = await prisma.extras.findMany();
        res.status(200).json(extras);
    } catch (error) {
        console.error('Error fetching flight extras:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createTrip = async (req, res) => {
    const userId = req.userToken.userId;
    const { tickets } = req.body;

    if (!tickets || !Array.isArray(tickets) || tickets.length === 0 ) {
        return res.status(400).json({ error: 'Invalid tickets or seats data' });
    }
    // Validate that each ticket has a ticketUUID and seatId
    for (const ticket of tickets) {
        if (!ticket.ticketUUID || !ticket.seatId) {
            return res.status(400).json({ error: 'Each ticket must have a ticketUUID and seatId' });
        }
    }

    // request should be like:
    /* 
    {
        "tickets": [
            {
                "ticketUUID": "t-uuid-1",
                "seatId": 1,
                "extras": [1, 2] // array of extras IDs
            },
            {
                "ticketUUID": "t-uuid-2",
                "seatId": 2
            }
        ]
    }
    */

    try{
        // check if all tickets are valid
        const ticketUUIDs = tickets.map(t => t.ticketUUID);
        const validTickets = await prisma.tickets.findMany({
            where: {
                code: { in: ticketUUIDs }
            }
        });
        const validTicketCodes = validTickets.map(t => t.code);

        // Check that every ticketUUID in the input exists in the DB result
        const allValid = ticketUUIDs.every(uuid => validTicketCodes.includes(uuid));
        if (!allValid) {
            return res.status(400).json({ error: 'Invalid ticket UUIDs provided' });
        }
        
        // check if the flight for each ticket is not already departed
        const currentDateTime = DateTime.utc();
        const flights = await prisma.flights.findMany({
            where: {
                code: { in: validTickets.map(t => t.fligt_code) },
                liftoff_date: {
                    gt: currentDateTime.toJSDate()
                }
            }
        });
        if (flights.length !== validTickets.length) {
            return res.status(400).json({ error: 'Some flights yout are trying to book have already departed' });
        }

        // check if all seats are valid (aircraft has the seats)
       const seats = await prisma.seats.findMany ({
            where: {
                AND: [
                    { id: { in: tickets.map(t => t.seatId) } },
                    { aircraft_id: { in: flights.map(f => f.aircraft_id) } }
                ]
            }
        });
        if (seats.length !== tickets.length) {
            return res.status(400).json({ error: 'Invalid seat IDs for the selected flights' });
        }
        // check if the seat is not already booked for the flight
        for (const ticket of tickets) {
            const seatBookings = await prisma.bookings.findMany({
                where: {
                    seat_id: ticket.seatId,
                    ticket_code: ticket.ticketUUID
                }
            });
            if (seatBookings.length > 0) {
                return res.status(400).json({ error: `Seat ${tickets.map(t => t.seatId)} is already booked for flight ${tickets.map(t => t.ticketUUID)}` });
            }
        }

        // check if all extras are valid
        const allExtras = await prisma.extras.findMany();
        const validExtras = allExtras.map(e => e.id);
        for (const ticket of tickets) {
            if (ticket.extras) {
                for (const extraId of ticket.extras) {
                    if (!validExtras.includes(extraId)) {
                        return res.status(400).json({ error: `Invalid extra ID ${extraId}` });
                    }
                }
            }
        }

        // Create the trip and associated bookings
        const trip = await prisma.trips.create({
            data: {
                creation_date: DateTime.utc(),
                user_id: userId,
                bookings: {
                    createMany: {
                        data: tickets.map(t => ({
                            ticket_code: t.ticketUUID,
                            seat_id: t.seatId, // this is an integer
                            extras_id: t.extras && t.extras.length > 0 ? parseInt(t.extras[0], 10) : null
                        }))
                    }
                }
            }
        });

        res.status(200).json({
            message: 'Trip created successfully',
            tripId: trip.id,
            tickets: tickets.map(t => ({
                ticketUUID: t.ticketUUID,
                seatId: t.seatId,
                extras: t.extras || []
            }))
        });
    } catch (error) {
    console.error('Error creating trip:', error);
    return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.listTrips = async (req, res) => {
    const userId = req.userToken.userId;

    try {
        let trips = await prisma.trips.findMany({
            where: {
                user_id: userId
            },
            include: {
                bookings: {
                    include: {
                        tickets: {
                            include : {
                                flights : true
                            }
                        }
                    }
                }
            }
        });

        // add field to specify if the trip is active
        trips.forEach(trip => {
            trip.isActive = trip.bookings.some(booking => {
                const flightLiftoffDate = booking.tickets.flights.liftoff_date;
                return DateTime.fromJSDate(flightLiftoffDate) > DateTime.utc();
            });
        });

        // return only trip id and isActive status
        trips = trips.map(trip => ({
            id: trip.id,
            isActive: trip.isActive
        }));

        if (trips.length === 0) {
            return res.status(404).json({ error: 'No trips found for this user' });
        }

        res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getTripDetails = async (req, res) => {
    const { tripId } = req.params;
    if (!tripId || isNaN(parseInt(tripId, 10))) {
        return res.status(400).json({ error: 'Missing or invalid trip ID parameter' });
    }
    const userId = req.userToken.userId;

    try {
        const trip = await prisma.trips.findUnique({
            where: {
                id: parseInt(tripId, 10)
            },
            include: {
                bookings: {
                    include: {
                        tickets: {
                            include : {
                                flights : true
                            }
                        },
                        extras: true,
                    }
                },
            }
        });

        if (!trip || trip.user_id !== userId) {
            return res.status(404).json({ error: 'Trip not found or does not belong to this user' });
        }

        // add field to specify if the trip is active
        trip.isActive = trip.bookings.some(booking => {
            const flightLiftoffDate = booking.tickets.flights.liftoff_date;
            return DateTime.fromJSDate(flightLiftoffDate) > DateTime.utc();
        });

        res.status(200).json(trip);
    } catch (error) {
        console.error('Error fetching trip details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}