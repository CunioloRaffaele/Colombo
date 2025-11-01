const prisma = require('../../utils/prisma');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../utils/jwt');
const { parse } = require('dotenv');
const { DateTime } = require('luxon');

exports.createAirlineNewAccount = async (req, res) => {
    // This operation is only accessibe to admin
    const user = req.userToken;
    if (user.role !== 1) {
        return res.status(403).json({ 
            error: 'Only admin can create new airline accounts' 
        });
    }
    
    const { name } = req.body;
    // Validate required fields
    if (!name) {
        return res.status(400).json({ 
            error: 'Missing required fields: name' 
        });
    }

    // generate invitation code
    const invitationCode = Math.random().toString(36).substring(2, 15);

    try{
    // Check if airline already exists
    const existingAirline = await prisma.airlines.findUnique({
        where: {
            name: name
        }
    });
    if (existingAirline) {
        return res.status(400).json({ 
            error: 'Airline already exists with this name' 
        });
    }
    
    // First time the password is set to temporary password (on login, user will be asked to change it) 
    await prisma.airlines.create({
        data: {
            name: name,
            password: invitationCode,
            country: "Unknown",
            motto: "Unknown",
            enrolled: false, // Initially not enrolled
        }
    });

    return res.status(200).json({
        message: 'Airline account created successfully',
        name: name, // Return the name of the airline
        invitationCode: invitationCode // Return the invitation code for the airline to use
    });

    } catch (error) {
        console.error('Error creating airline account:', error);
        return res.status(500).json({ 
            error: 'Internal server error while creating airline account' 
        });
    }

}

exports.newAirlineAccountEnrollment = async (req, res) => {
    const invitationCode = req.params.invitationCode
    const airlineName = req.params.airlineName;
    const { password, country, motto } = req.body;
    if (!invitationCode || !password || !country || !motto) {
        return res.status(400).json({ 
            error: 'Missing required information: invitationCode, password, country, motto' 
        });
    }

    try {
        // Check if airline exists with the invitation code
        const airline = await prisma.airlines.findFirst({
            where: {
                name: airlineName,
                password: invitationCode,
                enrolled: false // Ensure the airline is not already enrolled
            }
        });
        if (!airline) {
            return res.status(400).json({ 
                error: 'Invalid invitation code or airline name for un-enrolled airline' 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Update the airline with the new password, country, and motto
        await prisma.airlines.update({
            where: {
                name: airlineName,
                password: invitationCode
            },
            data: {
                password: hashedPassword,
                country: country,
                motto: motto,
                enrolled: true
            }
        });

        return res.status(200).json({
            message: 'Airline account enrollment successful',
            name: airline.name // Return the name of the airline
        });

    } catch (error) {
        console.error('Error enrolling airline account:', error);
        return res.status(500).json({ 
            error: 'Internal server error while enrolling airline account' 
        });
    }
}

exports.logAirlineIn = async (req, res) => {
    const { name, password } = req.body;

    // Validate required fields
    if (!name || !password) {
        return res.status(400).json({ 
            error: 'Missing required fields: name, password' 
        });
    }

    // Check if airline exists
    const airline = await prisma.airlines.findUnique({
        where: {
            name: name,
            enrolled: true // Ensure the airline is enrolled
        }
    });
    if (!airline) {
        return res.status(400).json({ 
            error: 'Airline not found with this name' 
        });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, airline.password);
    if (!isPasswordValid) {
        return res.status(403).json({ 
            error: 'Invalid password' 
        });
    }

    // create JWT token
    const token = generateToken({
        airlineName: airline.name,
        country: airline.country,
        motto: airline.motto,
        role: 2
    });

    res.status(200).json({
        message: 'Airline logged in successfully',
        token: token
    });
};

exports.listAirlines = async (req, res) => {
    try {
        const airlines = await prisma.airlines.findMany({
            where: {
                enrolled: true // Only list enrolled airlines
            },
            select: {
                name: true,
                country: true,
                motto: true
            }
        });

        res.status(200).json({
            message: 'List of airlines retrieved successfully',
            airlines: airlines
        });
    } catch (error) {
        console.error('Error retrieving airlines:', error);
        res.status(500).json({ 
            error: 'Internal server error while retrieving airlines' 
        });
    }
}

exports.addAircraft = async (req, res) => {
    const user = req.userToken;
    const { aircraftType, capacity } = req.body;

    // Validate required fields
    const parsedCapacity = parseInt(capacity, 10);
    if (!aircraftType || isNaN(parsedCapacity)) {
        return res.status(400).json({ 
            error: 'Missing required fields: aircraftType, capacity' 
        });
    }

    try {
        // Create new aircraft
        await prisma.aircrafts.create({
            data: {
                model: aircraftType,
                seats_capacity: parsedCapacity,
                owner_name: user.airlineName // middleware verifies that user is an airline so it's safe to use user.name
            }
        });

        res.status(200).json({
            message: 'Aircraft added successfully',
            aircraftType: aircraftType,
            capacity: capacity
        });
    } catch (error) {
        console.error('Error adding aircraft:', error);
        res.status(500).json({ 
            error: 'Internal server error while adding aircraft' 
        });
    }
};

exports.listAircrafts = async (req, res) => {
    const airlineName = req.params.airlineName;

    // Validate required fields
    if (!airlineName) {
        return res.status(400).json({ 
            error: 'Missing required param: airlineName' 
        });
    }

    try {
        // List aircrafts for the specified airline
        const aircrafts = await prisma.aircrafts.findMany({
            where: {
                owner_name: airlineName
            },
            select: {
                id: true,
                model: true,
                seats_capacity: true
            }
        });

        res.status(200).json({
            message: 'List of aircrafts retrieved successfully',
            aircrafts: aircrafts
        });
    } catch (error) {
        console.error('Error retrieving aircrafts:', error);
        res.status(500).json({ 
            error: 'Internal server error while retrieving aircrafts' 
        });
    }
};

exports.deleteAircraft = async (req, res) => {
    const user = req.userToken;
    const aircraftId = req.params.aircraftId;

    // Validate required fields
    const parsedAircraftId = parseInt(aircraftId, 10);
    if (isNaN(parsedAircraftId)) {
        return res.status(400).json({ 
            error: 'Missing required param: aircraftId' 
        });
    }

    try {
        // Check if the aircraft belongs to the airline
        const aircraft = await prisma.aircrafts.findUnique({
            where: {
                id: parsedAircraftId,
                owner_name: user.airlineName // middleware verifies that user is an airline so it's safe to use user.name
            }
        });

        if (!aircraft) {
            return res.status(404).json({ 
                error: 'Aircraft not found or does not belong to this airline and cannot be deleted' 
            });
        }

        // Delete the aircraft
        await prisma.aircrafts.delete({
            where: {
                id: parseInt(aircraftId, 10)
            }
        });

        res.status(200).json({
            message: 'Aircraft deleted successfully',
            aircraftId: aircraftId
        });
    } catch (error) {
        console.error('Error deleting aircraft:', error);
        res.status(500).json({ 
            error: 'Internal server error while deleting aircraft' 
        });
    }
}

exports.enrollInRoute = async (req, res) => {
    const user = req.userToken;
    const { departure, destination } = req.body;

    if (!departure || !destination || isNaN(departure) || isNaN(destination)) {
        return res.status(400).json({ error: 'Missing required fields or wrong types: departure, destination' });
    }

    try {
        // Check if the route exists
        const route = await prisma.routes.findUnique({
            where: {
                departure_destination: {
                    departure: parseInt(departure, 10),
                    destination: parseInt(destination, 10)
                }
            }
        });

        if (!route) {
            return res.status(404).json({ 
                error: 'Route not found... Please create the route before enrolling' 
            });
        }

        // Check if the enrollment already exists
        const existingEnrollment = await prisma.uses.findFirst({
            where: {
                airline_name: user.airlineName,
                route_departure: parseInt(departure, 10),
                route_destination: parseInt(destination, 10)
            }
        });

        if (existingEnrollment) {
            return res.status(409).json({
                error: 'Airline is already enrolled in this route'
            });
        }

        // Enroll the airline in the route
        const newRoute = await prisma.uses.create({
            data: {
                airline_name: user.airlineName, // middleware verifies that user is an airline so it's safe to use user.name
                route_departure: parseInt(departure, 10),
                route_destination: parseInt(destination, 10)
            }
        });

        res.status(200).json({
            message: 'Successfully enrolled in route',
            routeId: newRoute.id
        });
    } catch (error) {
        console.error('Error enrolling in route:', error);
        res.status(500).json({ 
            error: 'Internal server error while enrolling in route' 
        });
    }
}

exports.unenrollFromRoute = async (req, res) => {
    const user = req.userToken;
    const routeId = req.params.routeId;

    // Validate required fields
    if (!routeId || isNaN(routeId)) {
        return res.status(400).json({ 
            error: 'Missing required param: routeId' 
        });
    }

    try {
        // Unenroll the airline from the route
        const result = await prisma.uses.deleteMany({
            where: {
                airline_name: user.airlineName,
                id: parseInt(routeId, 10) // Ensure the routeId is an integer
            }
        });

        if (result.count === 0) {
            return res.status(404).json({ 
                error: 'No enrollment found for this airline in the specified route. No action taken.' 
            });
        }

        res.status(200).json({
            message: 'Successfully unenrolled from route',
            routeId: routeId
        });
    } catch (error) {
        console.error('Error unenrolling from route:', error);
        res.status(500).json({ 
            error: 'Internal server error while unenrolling from route' 
        });
    }
}

exports.listRoutes = async (req, res) => {
    const user = req.userToken;

    try {
        // List routes for the airline
        const routes = await prisma.uses.findMany({
            where: {
                airline_name: user.airlineName // middleware verifies that user is an airline so it's safe to use user.name
            },
            select: {
                id: true,
                route_departure: true,
                route_destination: true
            }
        });
        // for each route get the details for departure and destination airports
        for (let route of routes) {
            const departureAirport = await prisma.airports.findUnique({
                where: {
                    id: route.route_departure
                },
                select: {
                    name: true,
                    city: true,
                    country: true
                }
            });
            const destinationAirport = await prisma.airports.findUnique({
                where: {
                    id: route.route_destination
                },
                select: {
                    name: true,
                    city: true,
                    country: true
                }
            });
            route.departure_details = departureAirport; // Add departure airport details to the route object
            route.destination_details = destinationAirport; // Add destination airport details to the route object
        }

        res.status(200).json({
            message: 'List of routes retrieved successfully',
            routes: routes
        });
    } catch (error) {
        console.error('Error retrieving routes:', error);
        res.status(500).json({ 
            error: 'Internal server error while retrieving routes' 
        });
    }
}

exports.listFlights = async (req, res) => {
    const user = req.userToken;

    try {
        // List flights for the airline
        const flights = await prisma.flights.findMany({
            where: {
                airline_name: user.airlineName // middleware verifies that user is an airline so it's safe to use user.name
            },
            select: {
                code: true,
                liftoff_date: true,
                duration: true,
                route_departure: true,
                route_destination: true,
                aircraft_id: true,
            }
        });
        // for each flight get the details for aircraft and localtimezone
        for (let flight of flights) {
            const aircraft = await prisma.aircrafts.findUnique({
                where: {
                    id: flight.aircraft_id
                },
                select: {
                    model: true,
                    seats_capacity: true
                }
            });

            // Get departure airport timezone
            const departureAirport = await prisma.airports.findUnique({
                where: {
                    id: flight.route_departure
                },
                select: {
                    time_zone: true
                }
            });

            // Convert UTC liftoff_date to local time at departure airport
            if (flight.liftoff_date && departureAirport?.time_zone) {
                flight.lifoffTimeZone = departureAirport.time_zone; // Store the timezone for reference
                flight.liftoff_dateLOCAL = DateTime
                    .fromJSDate(flight.liftoff_date, { zone: 'utc' })
                    .setZone(departureAirport.time_zone)
                    .toFormat("yyyy-MM-dd'T'HH:mm:ss");
            } else {
                flight.liftoff_dateLOCAL = null;
            }

            flight.aircraft_details = aircraft; // Add aircraft details to the flight object
        }

        res.status(200).json({
            message: 'List of flights retrieved successfully',
            flights: flights
        });
    } catch (error) {
        console.error('Error retrieving flights:', error);
        res.status(500).json({ 
            error: 'Internal server error while retrieving flights' 
        });
    }
};

exports.listActiveFlights = async (req, res) => {
    const user = req.userToken;

    try {
        // List active flights for the airline
        const flights = await prisma.flights.findMany({
            where: {
                airline_name: user.airlineName, // middleware verifies that user is an airline so it's safe to use user.name
                liftoff_date: {
                    gte: new Date() // Only get flights with liftoff date in the future
                }
            },
            select: {
                code: true,
                liftoff_date: true,
                duration: true,
                route_departure: true,
                route_destination: true,
                aircraft_id: true,
            }
        });
        // for each flight get the details for aircraft and localtimezone
        for (let flight of flights) {
            const aircraft = await prisma.aircrafts.findUnique({
                where: {
                    id: flight.aircraft_id
                },
                select: {
                    model: true,
                    seats_capacity: true
                }
            });

            // Get departure airport timezone
            const departureAirport = await prisma.airports.findUnique({
                where: {
                    id: flight.route_departure
                },
                select: {
                    time_zone: true
                }
            });

            // Convert UTC liftoff_date to local time at departure airport
            if (flight.liftoff_date && departureAirport?.time_zone) {
                flight.lifoffTimeZone = departureAirport.time_zone; // Store the timezone for reference
                flight.liftoff_dateLOCAL = DateTime
                    .fromJSDate(flight.liftoff_date, { zone: 'utc' })
                    .setZone(departureAirport.time_zone)
                    .toFormat("yyyy-MM-dd'T'HH:mm:ss");
            } else {
                flight.liftoff_dateLOCAL = null;
            }

            flight.aircraft_details = aircraft; // Add aircraft details to the flight object
        }

        res.status(200).json({
            message: 'List of active flights retrieved successfully',
            flights: flights
        });
    } catch (error) {
        console.error('Error retrieving active flights:', error);
        res.status(500).json({ 
            error: 'Internal server error while retrieving active flights' 
        });
    }
}

exports.createTicket = async (req, res) => {
    // tickets can be types
    // ECONOMY, BUSINESS, BASE, DELUXE, LUXURY
    const user = req.userToken;
    const { flightCode, ticketsArray } = req.body;

    // Validate required fields
    if (!flightCode || !Array.isArray(ticketsArray) || ticketsArray.length === 0) {
        return res.status(400).json({ 
            error: 'Missing required fields: flightCode, ticketsArray' 
        });
    }

    try {
        // Check if the flight exists
        const flight = await prisma.flights.findUnique({
            where: {
                code: flightCode,
                airline_name: user.airlineName // middleware verifies that user is an airline so it's safe to use user.name
            }
        });

        if (!flight) {
            return res.status(404).json({ 
                error: 'Flight not found for this airline' 
            });
        }

        let tickets = [];
        // validation for each ticket in the ticketsArray
        for (const ticket of ticketsArray) {
            const { type, price } = ticket;
            // Validate ticket type and price
            if (!type || !price || isNaN(price)) {
                return res.status(400).json({ 
                    error: 'Missing required fields in ticket: type, price' 
                });
            }
            // verify that ticket does not already exist
            const existingTicket = await prisma.tickets.findFirst({
                where: {
                    type: type,
                    fligt_code: flightCode
                }
            });
            if (existingTicket) {
                return res.status(409).json({ 
                    error: 'Ticket already exists with this type for the flight' 
                });
            }
        }
        // Create tickets for the flight
        for (const ticket of ticketsArray) {
            const { type, price } = ticket;
            // Create the ticket in the database
            const newTicket = await prisma.tickets.create({
                data: {
                    type: type,
                    price: parseFloat(price),
                    fligt_code: flightCode
                }
            });
            tickets.push(newTicket);
        }

        res.status(200).json({
            message: 'Tickets created successfully',
            ticketIds: tickets,
            flightCode: flightCode
        });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ 
            error: 'Internal server error while creating ticket' 
        });
    }
}

exports.deleteTicket = async (req, res) => {
    const user = req.userToken;
    const ticketUUID = req.params.ticketUUID;

    // Validate required fields
    if (!ticketUUID) {
        return res.status(400).json({ 
            error: 'Missing required param: ticketUUID' 
        });
    }

    try {
        // Check if the ticket belongs to the airline
        const ticket = await prisma.tickets.findUnique({
            where: {
                code: ticketUUID
            }, include: {
                flights: true // Include flight details to verify airline ownership
            }
        });

        if (!ticket) {
            return res.status(404).json({ 
                error: 'Ticket not found and cannot be deleted' 
            });
        }
        if (ticket.flights.airline_name !== user.airlineName) {
            return res.status(403).json({ 
                error: 'Ticket does not belong to this airline and cannot be deleted' 
            });
        }

        // Delete the ticket
        await prisma.tickets.delete({
            where: {
                code: ticketUUID
            }
        });

        res.status(200).json({
            message: 'Ticket deleted successfully',
            ticketId: ticket
        });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ 
            error: 'Internal server error while deleting ticket' 
        });
    }
}

exports.routesStats = async (req, res) => {
    const user = req.userToken;

    try {
        // Get the list of routes the airline is enrolled in
        const routes = await prisma.uses.findMany({
            where: {
                airline_name: user.airlineName
            },
            select: {
                route_departure: true,
                route_destination: true
            }
        });

        if (routes.length === 0) {
            return res.status(404).json({ 
                error: 'No routes found for this airline' 
            });
        }

        // Prepare the stats object
        const stats = {};

        // First, get the max bookingsCount among all routes for trend calculation
        let maxBookings = 0;
        const bookingsCounts = [];

        // Gather all bookingsCount first
        for (const route of routes) {
            const bookingsCount = await prisma.bookings.count({
                where: {
                    tickets: {
                        flights: {
                            route_departure: route.route_departure,
                            route_destination: route.route_destination,
                            airline_name: user.airlineName
                        }
                    }
                }
            });
            bookingsCounts.push(bookingsCount);
            if (bookingsCount > maxBookings) maxBookings = bookingsCount;
        }

        // For each route, get the number of flights, tickets sold, bookings, and trend percentage
        for (let i = 0; i < routes.length; i++) {
            const { route_departure, route_destination } = routes[i];

            // Count flights for this route
            const flightCount = await prisma.flights.count({
                where: {
                    route_departure: route_departure,
                    route_destination: route_destination,
                    airline_name: user.airlineName
                }
            });

            // Count tickets sold for this route
            const ticketCount = await prisma.tickets.count({
                where: {
                    flights: {
                        route_departure: route_departure,
                        route_destination: route_destination,
                        airline_name: user.airlineName
                    }
                }
            });

            // Bookings count already calculated
            const bookingsCount = bookingsCounts[i];

            // Calculate trend percentage (relative to the max bookingsCount)
            let trend = 0;
            if (maxBookings > 0) {
                trend = Math.round((bookingsCount / maxBookings) * 100);
            }

            // Add to stats object
            stats[`${route_departure}-${route_destination}`] = {
                flightCount,
                ticketCount,
                bookingsCount,
                trendPercentage: trend // 0-100, relative to the most booked route
            };
        }

        res.status(200).json({
            message: 'Routes stats retrieved successfully',
            stats: stats
        });
    } catch (error) {
        console.error('Error retrieving routes stats:', error);
        res.status(500).json({ 
            error: 'Internal server error while retrieving routes stats' 
        });
    }
}