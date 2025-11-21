# colombo

Colombo api infrastructure per hosting su VPS.


# Backend Documentation

## Starting the Node.js Server

1. Navigate to the server directory:
```bash
cd services/api
```

2. Install dependencies:
```bash
npm install
```

3. Generate Prisma schema (if needed):
```bash
npx prisma db pull
```

4. Generate Prisma client locally (actually this is done automatically by the easyStart script, but you can run it manually if needed):
```bash
npx prisma generate
```

5. Start the server:
```bash
npm run easyStart
```
or
```bash
npm run debug
```
This will start the server in debug mode with hot reloading enabled.

The Express server will be running on http://localhost:3000 by default.
The swagger documentation will be available at http://localhost:3000/api-docs.
