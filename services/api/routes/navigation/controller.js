const { parse } = require('dotenv');
const prisma = require('../../utils/prisma');
const findRoute = require('./alg');
const { DateTime } = require('luxon');

exports.createRoute = async (req, res) => {
    const { origin, destination } = req.body;

    // Validate required fields
    if (!origin || !destination) {
        return res.status(400).json({ 
            error: 'Missing required fields: origin, destination' 
        });
    }

    // middleware already checks if operator is an airline

    try {
        // check if the origin and destination airports exist
        const originAirport = await prisma.airports.findUnique({
            where: {
                id: parseInt(origin, 10)
            }
        });
        const destinationAirport = await prisma.airports.findUnique({
            where: {
                id: parseInt(destination, 10)
            }
        });
        if (!originAirport || !destinationAirport) {
            return res.status(404).json({ 
                error: 'Origin or destination airport not found' 
            });
        }
        // check if the route already exists
        const existingRoute = await prisma.routes.findFirst({
            where: {
                departure: parseInt(origin, 10),
                destination: parseInt(destination, 10)
            }
        });
        if (existingRoute) {
            return res.status(400).json({
                error: 'Route already exists between these airports'
            });
        }
        // Create new route
        const newRoute = await prisma.routes.create({
            data: {
                departure: parseInt(origin, 10),
                destination: parseInt(destination, 10),
            }
        });

        return res.status(201).json({
            message: 'Route created successfully',
            route: newRoute
        });
    } catch (error) {
        console.error('Error creating route:', error);
        return res.status(500).json({ 
            error: 'Internal server error while creating route' 
        });
    }
}

exports.listRoutes = async (req, res) => {
    try {
        // List all routes
        const routes = await prisma.routes.findMany({
            include: {
                airports_routes_departureToairports : true,
                airports_routes_destinationToairports: true
            },
        });       

        return res.status(200).json({
            message: 'List of routes retrieved successfully',
            routes: routes
        });
    } catch (error) {
        console.error('Error retrieving routes:', error);
        return res.status(500).json({ 
            error: 'Internal server error while retrieving routes' 
        });
    }
}

exports.getAirportsDesinations = async (req, res) => {
    const departure = req.params.departure;

    // Validate required fields
    if (isNaN(departure) || !departure) {
        return res.status(400).json({ 
            error: 'Missing required field: departure' 
        });
    }

    try {
        // Get all routes for the given departure airport
        const routes = await prisma.routes.findMany({
            where: {
                departure: parseInt(departure, 10)
            },
            select: {
                destination: true
            }
        });

       for (const route of routes) {
            // get airport details for each destination
           const airports = await prisma.airports.findFirst({
                where: {
                    id: route.destination
                },
                select: {
                    name: true,
                    city: true,
                    country: true,
                    time_zone: true
                }
            });
           route.destinationAirport = airports;
        }

        return res.status(200).json({
            message: 'List of destinations retrieved successfully',
            airports: routes
        });
    } catch (error) {
        console.error('Error retrieving destinations:', error);
        return res.status(500).json({ 
            error: 'Internal server error while retrieving destinations' 
        });
    }
}

exports.getAirportsDepartures = async (req, res) => {
    const destination = req.params.destination;

    // Validate required fields
    if (isNaN(destination) || !destination) {
        return res.status(400).json({ 
            error: 'Missing required field: destination' 
        });
    }

    try {
        // Get all routes for the given destination airport
        const routes = await prisma.routes.findMany({
            where: {
                destination: parseInt(destination, 10)
            },
            select: {
                departure: true
            }
        });

        for (const route of routes) {
            // get airport details for each departure
            const airports = await prisma.airports.findFirst({
                where: {
                    id: route.departure
                },
                select: {
                    name: true,
                    city: true,
                    country: true,
                    time_zone: true
                }
            });
            route.departureAirport = airports;
        }

        return res.status(200).json({
            message: 'List of departures retrieved successfully',
            id: destination,
            airports: routes
        });
    } catch (error) {
        console.error('Error retrieving departures:', error);
        return res.status(500).json({ 
            error: 'Internal server error while retrieving departures' 
        });
    }
}

exports.getAirports = async (req, res) => {
    const { query } = req.query;

    let airports = [];
    try {
        if (query) {
            // search airports by name
            airports = await prisma.airports.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                startsWith: query,
                                mode: 'insensitive'
                            }
                        },
                        {
                            city: {
                                startsWith: query,
                                mode: 'insensitive'
                            }
                        },
                        {
                            country: {
                                startsWith: query,
                                mode: 'insensitive'
                            }
                        }
                    ]
                },
                select: {
                    id: true,
                    name: true,
                    city: true,
                    country: true,
                    time_zone: true
                }
            });
        } else {
            // Get all airports
            airports = await prisma.airports.findMany({
                select: {
                    id: true,
                    name: true,
                    city: true,
                    country: true,
                    time_zone: true,
                    lan: true,
                    lat: true
                }
            });
        }

        return res.status(200).json({
            message: 'List of airports retrieved successfully',
            airports: airports
        });
    } catch (error) {
        console.error('Error retrieving airports:', error);
        return res.status(500).json({ 
            error: 'Internal server error while retrieving airports' 
        });
    }
}

exports.getAirportDetails = async (req, res) => {
    const airportId = req.params.airportId;

    // Validate required fields
    if (isNaN(airportId) || !airportId) {
        return res.status(400).json({ 
            error: 'Missing required field: airportId' 
        });
    }

    try {
        // Get airport details
        const airport = await prisma.airports.findUnique({
            where: {
                id: parseInt(airportId, 10)
            },
            select: {
                id: true,
                name: true,
                city: true,
                country: true,
                time_zone: true,
                lan: true,
                lat: true
            }
        });

        if (!airport) {
            return res.status(404).json({ 
                error: 'Airport not found' 
            });
        }

        return res.status(200).json({
            message: 'Airport details retrieved successfully',
            airport: airport
        });
    } catch (error) {
        console.error('Error retrieving airport details:', error);
        return res.status(500).json({ 
            error: 'Internal server error while retrieving airport details' 
        });
    }
}

exports.getRouteBetweenAirports = async (req, res) => {
    const { from, to } = req.query; // e.g. /routes/path?from=1&to=10
    if (!from || !to) {
        return res.status(400).json({ error: 'Missing required query params: from, to' });
    }
    try {
        const path = await findRoute(from, to);
        if (!path || path.length === 0) {
            return res.status(404).json({ error: 'No route found between these airports' });
        }
        // Format the response with path information
        return res.status(200).json({
            message: 'Route found',
            stepsCount: path.length,
            steps: path.map(step => step.id || step),
            from: parseInt(from, 10),
            to: parseInt(to, 10),
            path: path
        });
    } catch (error) {
        console.error('Error finding route:', error);
        return res.status(500).json({ error: 'Internal server error while finding route' });
    }
};

exports.getRouteByAirline = async (req, res) => {
    const { airlineName } = req.params;
    if (!airlineName) {
        return res.status(400).json({ error: 'Missing required parameter: airlineName' });
    }
    try {
        // Get all routes operated by the airline
        const routes = await prisma.uses.findMany({
            where: {
                airline_name: {
                    contains: airlineName,
                    mode: 'default'
                }
            },
            select: {
                route_departure: true,
                route_destination: true,
            }
        });

        if (routes.length === 0) {
            return res.status(404).json({ error: 'Airline is not enrolled in any routes' });
        }

        return res.status(200).json({
            message: 'Routes found for airline',
            routes: routes
        });
    } catch (error) {
        console.error('Error retrieving routes by airline:', error);
        return res.status(500).json({ 
            error: 'Internal server error while retrieving routes by airline' 
        });
    }
}

exports.newFlight = async (req, res) => {
    const { liftOffDateLOCAL, duration, routeDeparture, routeDestination, aircraftId } = req.body;
    const airlineName = req.userToken.airlineName;

    // Validate required fields
    if (!liftOffDateLOCAL || !duration || isNaN(duration) || !routeDeparture || isNaN(routeDeparture) || !routeDestination || isNaN(routeDestination) || !aircraftId || isNaN(aircraftId)) {
        return res.status(400).json({ 
            error: 'Missing required fields: liftOffDateLOCAL, duration, routeDeparture, routeDestination, aircraftId' 
        });
    }
    try {
        // check if the aircraft exists and belongs to the airline
        const aircraft = await prisma.aircrafts.findUnique({
            where: {
                id: parseInt(aircraftId, 10),
                owner_name: airlineName
            }
        });
        if (!aircraft) {
            return res.status(404).json({
                error: 'Aircraft not found or does not belong to the airline'
            });
        }
        // check if the route exists and if the airline is enrolled in it
        const route = await prisma.routes.findFirst({
            where: {
                departure: parseInt(routeDeparture, 10),
                destination: parseInt(routeDestination, 10)
            }
        });
        if (!route) {
            return res.status(404).json({
                error: 'Route not found between the specified airports'
            });
        }
        const isEnrolled = await prisma.uses.findFirst({
            where: {
                airline_name: airlineName,
                route_departure: parseInt(routeDeparture, 10),
                route_destination: parseInt(routeDestination, 10)
            }
        });
        if (!isEnrolled) {
            return res.status(403).json({
                error: 'Airline is not enrolled in the specified route'
            });
        }

        // Validate liftOffDateLOCAL format
        const liftOffDate = new Date(liftOffDateLOCAL);
        if (isNaN(liftOffDate.getTime())) {
            return res.status(400).json({
            error: 'Invalid liftOffDateLOCAL format. Expected ISO date string.'
            });
        }
        
        // Convert date to UTC based on the route's departure airport time zone
        const departureAirport = await prisma.airports.findUnique({
            where: { id: parseInt(routeDeparture, 10) },
            select: { time_zone: true }
        });

        const liftOffDateUTC = DateTime.fromISO(liftOffDateLOCAL, { zone: departureAirport.time_zone }).toUTC().toJSDate();

        // verify liftOffDateUTC is in the future
        if (liftOffDateUTC <= new Date()) {
            return res.status(400).json({
                error: 'Lift-off date must be in the future'
            });
        }
        // Verify if the aircraft is available for the specified lift-off date
        const existingFlight = await prisma.flights.findFirst({
            where: {
            aircraft_id: parseInt(aircraftId, 10),
            OR: [
                // Check if new flight starts during an existing flight
                {
                liftoff_date: {
                    lte: liftOffDateUTC,
                },
                AND: {
                    liftoff_date: {
                    gte: new Date(new Date(liftOffDateUTC).getTime() - parseInt(duration, 10) * 60000)
                    }
                }
                },
                // Check if an existing flight starts during the new flight
                {
                liftoff_date: {
                    gte: liftOffDateUTC,
                    lte: new Date(new Date(liftOffDateUTC).getTime() + parseInt(duration, 10) * 60000)
                }
                }
            ]
            }
        });
        if (existingFlight) {
            return res.status(400).json({
                error: 'Aircraft is already scheduled for a flight at the specified lift-off date'
            });
        }

        // Create new flight
        const flight = await prisma.flights.create({
            data: {
                liftoff_date: liftOffDateUTC,
                duration: parseInt(duration, 10),
                route_departure: parseInt(routeDeparture, 10),
                route_destination: parseInt(routeDestination, 10),
                aircraft_id: parseInt(aircraftId, 10),
                airline_name: airlineName
            }
        });

        return res.status(201).json({
            message: 'New flight created successfully',
            flight: flight
        });
    } catch (error) {
        console.error('Error creating new flight:', error);
        return res.status(500).json({ 
            error: 'Internal server error while creating new flight' 
        });
    }
}

exports.deleteFlight = async (req, res) => {
    const flightUUID = req.params.flightUUID;
    const airlineName = req.userToken.airlineName;
    // Validate required fields
    if (!flightUUID) {
        return res.status(400).json({
            error: 'Missing required parameter: flightUUID'
        });
    }
    try {
        // Check if the flight exists and belongs to the airline
        const flight = await prisma.flights.findUnique({
            where: {
                code: flightUUID,
                airline_name: airlineName
            }
        });
        if (!flight) {
            return res.status(404).json({
                error: 'Flight not found or does not belong to the airline'
            });
        }
        // Delete the flight
        await prisma.flights.delete({
            where: {
                code: flightUUID
            }
        });
        return res.status(200).json({
            message: 'Flight deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting flight:', error);
        return res.status(500).json({
            error: 'Internal server error while deleting flight'
        });
    }
}

exports.listFlights = async (req, res) => {
    // get from json
    // array of routes [{departure, destination}]
    // searchStartDate
    // searchEndDate
    // number of passengers
    // class
    const { routes, searchStartDateLOCAL, searchEndDateLOCAL, passengers, classType } = req.body;
    if (!routes || !searchStartDateLOCAL || !searchEndDateLOCAL || !passengers || !classType) {
        return res.status(400).json({ 
            error: 'Missing required query parameters: routes, searchStartDateLOCAL, searchEndDateLOCAL, passengers, classType' 
        });
    }
    try {
        // get routes
        for (const route of routes) {
            if (!route.departure || !route.destination) {
                return res.status(400).json({ 
                    error: 'Each route must have a departure and destination' 
                });
            }
        }
        if (routes.length === 0) {
            return res.status(400).json({ 
                error: 'At least one route must be provided' 
            });
        }

        // validate if routes are present in routes table
        const validRoutes = await prisma.routes.findMany({
            where: {
                OR: routes.map(route => ({
                    departure: parseInt(route.departure, 10),
                    destination: parseInt(route.destination, 10)
                }))
            },
            select: {
                departure: true,
                destination: true
            }
        });
        if (validRoutes.length !== routes.length) {
            return res.status(400).json({ 
                error: 'One or more routes are invalid or do not exist' 
            });
        }

        // Validate date formats
        const startDate = new Date(searchStartDateLOCAL).toISOString();
        const endDate = new Date(searchEndDateLOCAL).toISOString();
        if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime()) || new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ 
                error: 'Invalid date format for searchStartDateLOCAL or searchEndDateLOCAL' 
            });
        }

        // Convert local date to UTC based on the route's departure airport time zone
        const departureAirport = await prisma.airports.findUnique({
            where: { id: parseInt(routes[0].departure, 10) },
            select: { time_zone: true }
        });
        const startDateUtc = DateTime.fromISO(startDate, { zone: departureAirport.time_zone }).toUTC().toJSDate();
        const endDateUtc = DateTime.fromISO(endDate, { zone: departureAirport.time_zone }).toUTC().toJSDate();
        // verify startDateUtc < endDateUtc amd startDateUtc > current date
        if (startDateUtc >= endDateUtc || startDateUtc < new Date()) {
            return res.status(400).json({ 
                error: 'Invalid date range for searchStartDateLOCAL and searchEndDateLOCAL' 
            });
        }

        // For single-leg, just return matching flights
        if (routes.length === 1) {
            const flights = await prisma.flights.findMany({
                where: {
                    liftoff_date: { gte: startDateUtc, lte: endDateUtc },
                    route_departure: routes[0].departure,
                    route_destination: routes[0].destination
                },
                include: {
                    aircrafts: true,
                    routes: {
                        include: {
                            airports_routes_departureToairports: true,
                            airports_routes_destinationToairports: true
                        }
                    }
                }
            });

            // for each flight add the LOCAL departure time based on the airport's time zone
            for (const flight of flights) {
                const airport = await prisma.airports.findUnique({
                    where: { id: flight.route_departure },
                    select: { time_zone: true }
                });
                flight.liftoff_date_LOCAL = DateTime.fromJSDate(flight.liftoff_date).setZone(airport.time_zone).toISO();
            }
            return res.status(200).json({ message: 'Flights for single leg retrieved successfully', startDateUtc, endDateUtc, departureAirport, flights });
        }

        // For multi-leg, build valid combinations
        let validCombinations = [];
        // Fetch flights for the first leg
        let prevFlights = await prisma.flights.findMany({
            where: {
                liftoff_date: { gte: startDateUtc, lte: endDateUtc },
                route_departure: routes[0].departure,
                route_destination: routes[0].destination
            },
            include: { 
                aircrafts: true, 
                routes: {
                    include: {
                        airports_routes_departureToairports: true,
                        airports_routes_destinationToairports: true
                    }
                }
            }
        });

        for (const firstFlight of prevFlights) {
            let lastArrival = new Date(firstFlight.liftoff_date);
            lastArrival.setMinutes(lastArrival.getMinutes() + firstFlight.duration);

            // Fetch flights for the second leg that depart after the first flight's arrival
            let nextFlights = await prisma.flights.findMany({
                where: {
                    liftoff_date: { gte: lastArrival, lte: endDateUtc },
                    route_departure: routes[1].departure,
                    route_destination: routes[1].destination
                },
                include: { 
                    aircrafts: true, 
                    routes: {
                        include: {
                            airports_routes_departureToairports: true,
                            airports_routes_destinationToairports: true
                        }
                    }
                }
            });

            for (const secondFlight of nextFlights) {
                validCombinations.push([firstFlight, secondFlight]);
            }
        }

        // Fetch flights for the third leg
        if (routes.length > 2) {
            for (const combination of validCombinations) {
                const [firstFlight, secondFlight] = combination;
                let lastArrival = new Date(secondFlight.liftoff_date);
                lastArrival.setMinutes(lastArrival.getMinutes() + secondFlight.duration);

                // Fetch flights for the third leg that depart after the second flight's arrival
                let thirdLegFlights = await prisma.flights.findMany({
                    where: {
                        liftoff_date: { gte: lastArrival, lte: endDateUtc },
                        route_departure: routes[2].departure,
                        route_destination: routes[2].destination
                    },
                    include: { 
                        aircrafts: true, 
                        routes: {
                            include: {
                                airports_routes_departureToairports: true,
                                airports_routes_destinationToairports: true
                            }
                        }
                    }
                });

                for (const thirdFlight of thirdLegFlights) {
                    validCombinations.push([firstFlight, secondFlight, thirdFlight]);
                }
            }
        }

        return res.status(200).json({
            message: 'Flights with multiple legs retrieved successfully',
            startDateUtc,
            endDateUtc,
            departureAirport,
            flights: validCombinations
        });
    } catch (error) {
        console.error('Error retrieving flights:', error);
        return res.status(500).json({ 
            error: 'Internal server error while retrieving flights' 
        });
    }
}

exports.getFlightDetails = async (req, res) => {
    const flightUUID = req.params.flightUUID;

    // Validate required fields
    if (!flightUUID) {
        return res.status(400).json({ 
            error: 'Missing required parameter: flightUUID' 
        });
    }

    try {
        // Get flight details
        const flight = await prisma.flights.findUnique({
            where: {
                code: flightUUID
            },
            include: {
                aircrafts: true,
                routes: {
                    include: {
                        airports_routes_departureToairports: true,
                        airports_routes_destinationToairports: true
                    }
                }
            }
        });

        if (!flight) {
            return res.status(404).json({ 
                error: 'Flight not found' 
            });
        }

        // Convert liftoff_date to local time based on departure airport's time zone
        const departureAirport = await prisma.airports.findUnique({
            where: { id: flight.route_departure },
            select: { time_zone: true }
        });
        flight.liftoff_date_LOCAL = DateTime.fromJSDate(flight.liftoff_date).setZone(departureAirport.time_zone).toISO();

        return res.status(200).json({
            message: 'Flight details retrieved successfully',
            flight: flight
        });
    } catch (error) {
        console.error('Error retrieving flight details:', error);
        return res.status(500).json({ 
            error: 'Internal server error while retrieving flight details' 
        });
    }
}