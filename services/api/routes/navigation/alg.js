const { PrismaClient } = require('../../prisma/generated/prisma');
const prisma = new PrismaClient()

// Utility to build the adjacency list (graph) from routes
async function buildGraph() {
    const routes = await prisma.routes.findMany({
        select: { departure: true, destination: true }
    });
    const graph = {};
    for (const route of routes) {
        if (!graph[route.departure]) graph[route.departure] = [];
        graph[route.departure].push(route.destination);
    }
    return graph;
}

// BFS to find a path from start to end
async function findRoutePath(startId, endId) {
    const graph = await buildGraph();
    const queue = [[startId]];
    const visited = new Set();

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];
        if (node === endId) return path; // Found a path!
        if (visited.has(node)) continue;
        visited.add(node);
        const neighbors = graph[node] || [];
        for (const neighbor of neighbors) {
            queue.push([...path, neighbor]);
        }
    }
    return null; // No path found
}

// Breadth-First Search (BFS)
async function findRoute(from, to) {
    try {
        const path = await findRoutePath(parseInt(from, 10), parseInt(to, 10));
        if (!path) {
            return 0;
        }

        // Optionally, get airport details for each stop
        const airports = await prisma.airports.findMany({
            where: { id: { in: path } },
            select: { id: true, name: true, city: true, country: true, time_zone: true }
        });
        // Sort airports in path order
        const airportMap = Object.fromEntries(airports.map(a => [a.id, a]));
        const orderedAirports = path.map(id => airportMap[id]);

        return orderedAirports;
    } catch (error) {
        return error;
    }
};

// Exports the function to be used in the route handler
module.exports = findRoute;