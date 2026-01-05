/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Health check endpoints
 *   - name: Users
 *     description: Citizen user management and authentication
 *   - name: Comuni
 *     description: Municipality management and authentication
 *   - name: Vehicles
 *     description: Vehicle management
 *   - name: Zones
 *     description: Geographic zone management
 *   - name: Reports
 *     description: Ecoscore reports and analytics
 *   - name: Sessions
 *     description: Telemetry session management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: Missing required fields
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Account created successfully
 *         token:
 *           type: string
 *           description: JWT authentication token
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     UserRegistration:
 *       type: object
 *       required:
 *         - nome
 *         - cognome
 *         - email
 *         - password
 *         - residenza
 *       properties:
 *         nome:
 *           type: string
 *           description: User's first name
 *           example: Marco
 *         cognome:
 *           type: string
 *           description: User's last name
 *           example: Rossi
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: marco@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *           example: securePassword123
 *         residenza:
 *           type: integer
 *           description: ISTAT code of the user's municipality of residence
 *           example: 18007
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: marco@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *           example: securePassword123
 *     UserInfo:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           description: User's first name
 *           example: Marco
 *         cognome:
 *           type: string
 *           description: User's last name
 *           example: Rossi
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: marco@gmail.com
 *         residenza:
 *           type: integer
 *           description: ISTAT code of the user's municipality
 *           example: 18007
 *     ComuneRegistration:
 *       type: object
 *       required:
 *         - comune
 *         - email
 *         - password
 *       properties:
 *         comune:
 *           type: integer
 *           description: ISTAT code of the municipality
 *           example: 10010
 *         email:
 *           type: string
 *           format: email
 *           description: Municipality's email address
 *           example: comune.italiano@email.com
 *         password:
 *           type: string
 *           format: password
 *           description: Municipality's password
 *           example: securePassword123
 *     ComuneLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Municipality's email address
 *           example: comune.italiano@email.com
 *         password:
 *           type: string
 *           format: password
 *           description: Municipality's password
 *           example: securePassword123
 *     ComuneInfo:
 *       type: object
 *       properties:
 *         comune:
 *           type: integer
 *           description: ISTAT code of the municipality
 *           example: 10010
 *         email:
 *           type: string
 *           format: email
 *           description: Municipality's email address
 *           example: comune.italiano@email.com
 *     ComuneSearchResult:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ISTAT code of the municipality
 *           example: 10010
 *         name:
 *           type: string
 *           description: Municipality name
 *           example: Bagnolo Piemonte
 *     VehicleAdd:
 *       type: object
 *       required:
 *         - vin
 *       properties:
 *         vin:
 *           type: string
 *           description: Vehicle Identification Number (VIN) - must be exactly 17 characters
 *           minLength: 17
 *           maxLength: 17
 *           example: WVWZZZ3CZWE123456
 *     VehicleInfo:
 *       type: object
 *       properties:
 *         vin:
 *           type: string
 *           description: Vehicle Identification Number
 *           example: WVWZZZ3CZWE123456
 *         details:
 *           type: object
 *           description: Decoded vehicle details from VIN
 *     ZoneSave:
 *       type: object
 *       required:
 *         - coordinates
 *       properties:
 *         coordinates:
 *           type: array
 *           description: Array of coordinate pairs [longitude, latitude] defining the polygon (minimum 3 points, closed)
 *           items:
 *             type: array
 *             items:
 *               type: number
 *             minItems: 2
 *             maxItems: 2
 *           example: [[9.1900, 45.4642], [9.1910, 45.4642], [9.1910, 45.4652], [9.1900, 45.4652], [9.1900, 45.4642]]
 *         tipologia:
 *           type: string
 *           description: Zone type (optional, default 'generica')
 *           example: generica
 *     ZoneContainsCheck:
 *       type: object
 *       required:
 *         - point
 *       properties:
 *         point:
 *           type: array
 *           description: Point coordinates [longitude, latitude]
 *           items:
 *             type: number
 *           minItems: 2
 *           maxItems: 2
 *           example: [9.1905, 45.4647]
 *     ZoneDelete:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: array
 *           description: Array of zone ids to delete
 *           items:
 *             type: integer
 *           example: [3, 5]
 *     ZoneNearPoint:
 *       type: object
 *       required:
 *         - lng
 *         - lat
 *         - distance
 *       properties:
 *         lng:
 *           type: number
 *           description: Longitude of the point
 *           example: 9.1925
 *         lat:
 *           type: number
 *           description: Latitude of the point
 *           example: 45.4665
 *         distance:
 *           type: number
 *           description: Distance in meters
 *           example: 50
 *     ZoneIdsResponse:
 *       type: object
 *       properties:
 *         ids:
 *           type: array
 *           description: Array of zone ids
 *           items:
 *             type: integer
 *           example: [1, 2, 3]
 *     ZoneGeometryResponse:
 *       type: object
 *       properties:
 *         geometry:
 *           type: object
 *           description: GeoJSON geometry object
 *     EcoscoreResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Status message
 *           example: Ecoscore retrieved successfully
 *         ecoscore:
 *           type: number
 *           description: The ecoscore value (-1 if no data available)
 *           example: 85.5
 *     SessionStart:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Status message
 *           example: Session started
 *         sessionId:
 *           type: integer
 *           description: The ID of the newly created session
 *           example: 42
 *     TelemetryReadingsResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Status message
 *           example: Rilevazioni scaricate con successo
 *         sessionId:
 *           type: integer
 *           description: The session ID
 *           example: 42
 *         rilevazioni:
 *           type: array
 *           description: Array of telemetry readings with GeoJSON points and scores
 *           items:
 *             type: object
 *             properties:
 *               punto:
 *                 type: object
 *                 description: GeoJSON point object
 *               punteggio:
 *                 type: number
 *                 description: Score for this reading
 *                 example: 85.5
 */

// ==================== HEALTH ENDPOINTS ====================

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a pong message to verify the API is running correctly
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: pong
 */

// ==================== USER (CITIZEN) ENDPOINTS ====================

/**
 * @swagger
 * /auth/user:
 *   post:
 *     summary: Register a new citizen
 *     description: Creates a new citizen account with the provided information
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: Citizen account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid input - missing fields, invalid email format, or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Get authenticated citizen account info
 *     description: Returns the account information for the authenticated citizen
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Citizen account information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInfo'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update citizen account information
 *     description: Updates the account information for the authenticated citizen
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User information updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/UserInfo'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete citizen account
 *     description: Deletes the authenticated citizen's account permanently
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User account deleted successfully
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/login/user:
 *   post:
 *     summary: Login a citizen
 *     description: Authenticates a citizen and returns a JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *       400:
 *         description: Invalid credentials or input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// ==================== MUNICIPALITY (COMUNE) ENDPOINTS ====================

/**
 * @swagger
 * /auth/comune:
 *   post:
 *     summary: Register a municipality
 *     description: Creates a new municipality account using its ISTAT code
 *     tags: [Comuni]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComuneRegistration'
 *     responses:
 *       201:
 *         description: Municipality registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid input - missing fields, invalid email format, or municipality already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Municipality ISTAT code not found in database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   get:
 *     summary: Get authenticated municipality account info
 *     description: Returns the account information for the authenticated municipality
 *     tags: [Comuni]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Municipality account information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComuneInfo'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Municipality not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/login/comune:
 *   post:
 *     summary: Login a municipality
 *     description: Authenticates a municipality and returns a JWT token
 *     tags: [Comuni]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ComuneLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *       400:
 *         description: Invalid credentials or input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/comuni:
 *   get:
 *     summary: Get all registered municipalities
 *     description: Returns a list of all registered municipalities
 *     tags: [Comuni]
 *     responses:
 *       200:
 *         description: List of registered municipalities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ComuneInfo'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/comuni/search:
 *   get:
 *     summary: Search municipalities by name prefix
 *     description: Returns municipalities whose names start with the provided query string (case-insensitive, max 20 results)
 *     tags: [Comuni]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Start of the municipality name to search for
 *         example: Bagn
 *     responses:
 *       200:
 *         description: Matching municipalities found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Municipalities found
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ComuneSearchResult'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /auth/comune/{istat}:
 *   get:
 *     summary: Get municipality information by ISTAT code
 *     description: Returns municipality details including whether it's registered in the system
 *     tags: [Comuni]
 *     parameters:
 *       - in: path
 *         name: istat
 *         schema:
 *           type: integer
 *         required: true
 *         description: ISTAT code of the municipality
 *         example: 10010
 *     responses:
 *       200:
 *         description: Municipality information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 istat:
 *                   type: integer
 *                   description: ISTAT code of the municipality
 *                   example: 10010
 *                 nome:
 *                   type: string
 *                   description: Name of the municipality
 *                   example: Bagnolo Piemonte
 *                 registrato:
 *                   type: boolean
 *                   description: Whether the municipality is registered in the system
 *                   example: true
 *       400:
 *         description: Invalid ISTAT parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Municipality not found with the provided ISTAT code
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// ==================== VEHICLE ENDPOINTS ====================

/**
 * @swagger
 * /vehicles/car:
 *   post:
 *     summary: Add a car to user account
 *     description: Associates a vehicle with the authenticated user's account using its VIN
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleAdd'
 *     responses:
 *       201:
 *         description: Car added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car added successfully
 *                 car:
 *                   type: object
 *                   properties:
 *                     proprietario:
 *                       type: string
 *                       description: Owner's email
 *                     vin:
 *                       type: string
 *                       description: Vehicle Identification Number
 *       400:
 *         description: Invalid VIN length (must be 17 characters)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /vehicles/cars:
 *   get:
 *     summary: List all user's cars
 *     description: Retrieves all vehicles associated with the authenticated user's account
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User cars retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User cars retrieved successfully
 *                 cars:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       proprietario:
 *                         type: string
 *                         description: Owner's email
 *                         example: marco@gmail.com
 *                       vin:
 *                         type: string
 *                         description: Vehicle Identification Number
 *                         example: WVWZZZ3CZWE123456
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /vehicles/car/details/{vin}:
 *   get:
 *     summary: Get car information by VIN
 *     description: Retrieves detailed vehicle information using the VIN decoder
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vin
 *         schema:
 *           type: string
 *         required: true
 *         description: Vehicle Identification Number (VIN) - must be exactly 17 characters
 *         example: WVWZZZ3CZWE123456
 *     responses:
 *       200:
 *         description: Car information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car info retrieved successfully via VIN
 *                 result:
 *                   type: object
 *                   description: Decoded vehicle details from VIN
 *       400:
 *         description: Invalid or missing VIN
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No cars found with the provided VIN
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /vehicles/car/{vin}:
 *   delete:
 *     summary: Remove a car from user account
 *     description: Removes a vehicle from the authenticated user's account using its VIN
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vin
 *         schema:
 *           type: string
 *         required: true
 *         description: Vehicle Identification Number (VIN) - must be exactly 17 characters
 *         example: WVWZZZ3CZWE123456
 *     responses:
 *       200:
 *         description: Car removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car removed successfully
 *       400:
 *         description: Invalid VIN length (must be 17 characters)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Car not found or does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// ==================== ZONE ENDPOINTS ====================

/**
 * @swagger
 * /zones:
 *   post:
 *     summary: Save a zone of interest
 *     description: Saves a geographic polygon zone associated with the authenticated municipality.
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZoneSave'
 *     responses:
 *       201:
 *         description: Zone saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Zona salvata correttamente
 *       400:
 *         description: Missing fields or invalid coordinates (minimum 3 points required)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: coordinates deve essere un array di almeno 3 coppie [lng, lat] numeriche
 *       403:
 *         description: Forbidden - Access reserved for authenticated municipalities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Accesso riservato ai comuni autenticati
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Errore nel salvataggio della zona
 *                 details:
 *                   type: string
 *                   example: Database error details
 */

/**
 * @swagger
 * /zones/contains/{lat}/{lng}:
 *   get:
 *     summary: Check if a point is inside a zone
 *     description: Checks if a geographic point is contained in any zone. Also returns the municipality name if found.
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lat
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitude of the point
 *         example: 45.4647
 *       - in: path
 *         name: lng
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitude of the point
 *         example: 9.1905
 *     responses:
 *       200:
 *         description: Verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contains:
 *                   type: boolean
 *                   description: True if the point is inside or on the border of the zone
 *                 comune:
 *                   type: string
 *                   description: Name of the municipality (if present)
 *                   nullable: true
 *       400:
 *         description: Invalid latitude or longitude parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /zones:
 *   delete:
 *     summary: Delete one or more zones
 *     description: Deletes the specified zones by id, only if they belong to the authenticated municipality.
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [3, 5]
 *     responses:
 *       200:
 *         description: Zones deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Zone eliminate
 *       404:
 *         description: No zones found with the requested ids
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nessuna zona trovata con gli id richiesti
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Errore nell'eliminazione delle zone
 *                 details:
 *                   type: string
 *                   example: Database error details
 */

/**
 * @swagger
 * /zones/near-point:
 *   post:
 *     summary: Get zones near a point
 *     description: Returns all zones within a certain distance from the specified point.
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lat
 *               - lng
 *               - distance
 *             properties:
 *               lat:
 *                 type: number
 *                 example: 45.4665
 *               lng:
 *                 type: number
 *                 example: 9.1925
 *               distance:
 *                 type: number
 *                 description: Distance in meters
 *                 example: 50
 *     responses:
 *       200:
 *         description: Zones found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 zones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       comune:
 *                         type: string
 *                       tipologia:
 *                         type: string
 *       400:
 *         description: Invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: lat, lng e distance devono essere numeri (distance in metri)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Errore nel recupero delle zone vicine
 *                 details:
 *                   type: string
 *                   example: Database error details
 */

/**
 * @swagger
 * /zones/ids:
 *   get:
 *     summary: Get all zone ids of the authenticated municipality
 *     description: Returns an array of zone ids belonging to the authenticated municipality.
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Zone ids found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ids:
 *                   type: array
 *                   items:
 *                     type: integer
 *       403:
 *         description: Access reserved for authenticated municipalities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Accesso riservato ai comuni autenticati
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Errore nel recupero degli id delle zone
 *                 details:
 *                   type: string
 *                   example: Database error details
 */

/**
 * @swagger
 * /zones/geometry/{id}:
 *   get:
 *     summary: Get the geometry of a zone
 *     description: Returns the geometry (GeoJSON) of the zone with the specified id, only if it belongs to the authenticated municipality.
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Zone ID
 *     responses:
 *       200:
 *         description: Zone geometry found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 geometry:
 *                   type: object
 *                   description: GeoJSON geometry object
 *       400:
 *         description: Invalid zone id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: id zona non valido
 *       404:
 *         description: Zone not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Zona non trovata
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Errore nel recupero della geometria della zona
 *                 details:
 *                   type: string
 *                   example: Database error details
 */

/**
 * @swagger
 * /zones/map/{istat}:
 *   get:
 *     summary: Get all zones for a municipality
 *     description: Returns all zones (geometries and metadata) for a specific municipality identified by its ISTAT code. Used by the client app to display zones on the map. Requires user authentication and checks that the user's municipality of residence is registered.
 *     tags: [Zones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: istat
 *         schema:
 *           type: integer
 *         required: true
 *         description: ISTAT code of the municipality
 *         example: 10010
 *     responses:
 *       200:
 *         description: Zones retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 zones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Zone ID
 *                         example: 1
 *                       geometry:
 *                         type: object
 *                         description: GeoJSON geometry object
 *                       tipologia:
 *                         type: string
 *                         description: Zone type
 *                         example: generica
 *       400:
 *         description: Invalid ISTAT code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: istat comune richiesto
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: User's municipality of residence is not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Il tuo comune di residenza non è registrato alla piattaforma. Non è possibile visualizzare le zone
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Utente non trovato
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Errore nel recupero delle zone del comune
 *                 details:
 *                   type: string
 *                   example: Database error details
 */

// ==================== REPORTS ENDPOINTS ====================

/**
 * @swagger
 * /reports/comune/{istat}/ecoscore:
 *   get:
 *     summary: Get ecoscore for a municipality
 *     description: Retrieves the aggregated ecoscore for a specific municipality using its ISTAT code. Requires municipality authentication.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: istat
 *         schema:
 *           type: integer
 *         required: true
 *         description: ISTAT code of the municipality
 *         example: 18007
 *     responses:
 *       200:
 *         description: Ecoscore retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EcoscoreResponse'
 *       400:
 *         description: Invalid ISTAT code format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Municipality with this email and/or istat doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /reports/comune/{id}/summary:
 *   get:
 *     summary: Get zone summary for a municipality
 *     description: Retrieves the average ecoscore, PM, and CO2 values for a specific zone. Only accessible by municipalities, and only for zones they own.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Zone ID
 *         example: 5
 *     responses:
 *       200:
 *         description: Zone summary retrieved successfully or no readings found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Summary retrieved successfully
 *                 ecoscore:
 *                   type: number
 *                   description: Average ecoscore for the zone (-1 if no readings)
 *                   example: 85.5
 *                 pm:
 *                   type: number
 *                   description: Average PM value for the zone
 *                   example: 12.5
 *                 co2:
 *                   type: number
 *                   description: Average CO2 value for the zone
 *                   example: 150.3
 *       400:
 *         description: Invalid zone ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Access reserved for municipalities or zone doesn't belong to the municipality
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Accesso riservato ai comuni
 *       404:
 *         description: Municipality or zone not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /reports/session/{id}/summary:
 *   get:
 *     summary: Get ecoscore for a session
 *     description: Retrieves the ecoscore for a specific telemetry session
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Session ID
 *         example: 42
 *     responses:
 *       200:
 *         description: Ecoscore retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EcoscoreResponse'
 *       400:
 *         description: Invalid session ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /reports/user/summary:
 *   get:
 *     summary: Get ecoscore for a user
 *     description: Retrieves the aggregated ecoscore for a specific user. Users can only access their own ecoscore.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ecoscore retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ecoscore retrieved successfully
 *                 ecoscore:
 *                   type: number
 *                   description: The ecoscore value (-1 if no data available)
 *                   example: 85.5
 *                 numeroRilevazioni:
 *                   type: integer
 *                   description: Total number of telemetry readings for the user
 *                   example: 1250
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - You can only access your own ecoscore
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User with this email doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /reports/user/sessions:
 *   get:
 *     summary: Get user's total session count
 *     description: Returns the total number of telemetry sessions registered by the authenticated user
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Session count retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numeroSessioni:
 *                   type: integer
 *                   description: Total number of sessions for the user
 *                   example: 42
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /reports/user/sessions/{mm}/{aaaa}:
 *   get:
 *     summary: Get user's sessions for a specific month and year
 *     description: Returns a detailed list of all telemetry sessions for the authenticated user in the specified month and year, including ecoscore for each session
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mm
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         required: true
 *         description: Month (1-12)
 *         example: 3
 *       - in: path
 *         name: aaaa
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year (e.g., 2024)
 *         example: 2024
 *     responses:
 *       200:
 *         description: Sessions list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessioni:
 *                   type: array
 *                   description: Array of session details
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Session ID
 *                         example: 42
 *                       vettura:
 *                         type: string
 *                         description: Vehicle VIN
 *                         example: WVWZZZ3CZWE123456
 *                       data:
 *                         type: integer
 *                         description: Session start time (Unix timestamp in seconds)
 *                         example: 1709251200
 *                       ecoscore:
 *                         type: number
 *                         description: Ecoscore for this session
 *                         example: 85.5
 *       400:
 *         description: Invalid month or year parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// ==================== SESSION (TELEMETRY) ENDPOINTS ====================

/**
 * @swagger
 * /telemetry/sessions/start/{vin}:
 *   post:
 *     summary: Start a new telemetry session
 *     description: Initiates a new telemetry session for a specific vehicle identified by its VIN. The vehicle must be associated with the authenticated user.
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vin
 *         schema:
 *           type: string
 *         required: true
 *         description: Vehicle Identification Number (VIN) - must be exactly 17 characters
 *         example: WVWZZZ3CZWE123456
 *     responses:
 *       201:
 *         description: Session started successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SessionStart'
 *       400:
 *         description: Invalid VIN length or missing email in token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found or car not found/does not belong to the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /telemetry/sessions/end/{id}:
 *   post:
 *     summary: End a telemetry session
 *     description: Ends a telemetry session and updates its total kilometers traveled. Also calculates and stores CO2 and PM emissions based on the vehicle's model year.
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Session ID
 *         example: 42
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - km
 *             properties:
 *               km:
 *                 type: number
 *                 description: Total kilometers traveled during the session (must be non-negative)
 *                 example: 15.5
 *     responses:
 *       200:
 *         description: Session ended and kilometers updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session ended and km updated
 *       400:
 *         description: Invalid session ID, email in token, or km value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found or session not found/not associated with user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /telemetry/sessions/{id}/readings:
 *   post:
 *     summary: Send telemetry readings to a session
 *     description: Sends telemetry data readings to an active session. Accepts both JSON and Protobuf formats. Calculates scores, saves readings, and returns processing results.
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Session ID
 *         example: 42
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               session_id:
 *                 type: integer
 *                 description: Session ID (optional, usually in path)
 *                 example: 42
 *               readings:
 *                 type: array
 *                 description: Array of telemetry readings
 *                 items:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                       example: 45.4642
 *                     longitude:
 *                       type: number
 *                       example: 9.1900
 *                     available_vitals:
 *                       type: object
 *                       additionalProperties:
 *                         type: boolean
 *                       example: { "pm": true, "co2": true }
 *                     rpm:
 *                       type: integer
 *                       example: 1500
 *                     speed:
 *                       type: integer
 *                       example: 50
 *                     throttle_position:
 *                       type: number
 *                       example: 30.5
 *                     coolant_temp:
 *                       type: integer
 *                       example: 90
 *                     fuel_rate:
 *                       type: number
 *                       example: 1.2
 *                     odometer:
 *                       type: number
 *                       example: 12345.6
 *                     engine_exhaust_flow:
 *                       type: number
 *                       example: 0.8
 *                     fuel_tank_level:
 *                       type: number
 *                       example: 60.0
 *         application/octet-stream:
 *           schema:
 *             type: string
 *             format: binary
 *           description: Protobuf TelemetryBatchRequest (see proto/common/types.proto)
 *     responses:
 *       200:
 *         description: Readings processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Readings processed
 *                 readings_processed:
 *                   type: integer
 *                   example: 1
 *                 readings_tot_score:
 *                   type: array
 *                   items:
 *                     type: number
 *                   example: [85.5]
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *             description: Empty body, 200 OK
 *       400:
 *         description: Invalid or missing parameters, unsupported content type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /telemetry/sessions/{id}:
 *   get:
 *     summary: Download telemetry readings from a session
 *     description: Retrieves all telemetry readings from a specific session. Returns GeoJSON points with associated scores.
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Session ID
 *         example: 42
 *     responses:
 *       200:
 *         description: Readings retrieved successfully or no readings found
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/TelemetryReadingsResponse'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: No readings for this session (session empty or deleted)
 *       400:
 *         description: Invalid session ID or missing email in token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

module.exports = {};
