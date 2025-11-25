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
 *         - id_comune
 *         - coordinates
 *       properties:
 *         id_comune:
 *           type: integer
 *           description: ISTAT code of the municipality
 *           example: 10010
 *         coordinates:
 *           type: array
 *           description: Array of coordinate pairs [longitude, latitude] defining the polygon (minimum 3 points)
 *           items:
 *             type: array
 *             items:
 *               type: number
 *             minItems: 2
 *             maxItems: 2
 *           example: [[7.45, 45.07], [7.46, 45.07], [7.46, 45.08], [7.45, 45.08]]
 *     ZoneContainsCheck:
 *       type: object
 *       required:
 *         - areaId
 *         - point
 *       properties:
 *         areaId:
 *           type: integer
 *           description: ID of the zone/area to check
 *           example: 1
 *         point:
 *           type: array
 *           description: Point coordinates [longitude, latitude]
 *           items:
 *             type: number
 *           minItems: 2
 *           maxItems: 2
 *           example: [7.455, 45.075]
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
 * /auth/comuni/subset:
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
 *                   example: Comuni trovati
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

// ==================== VEHICLE ENDPOINTS ====================

/**
 * @swagger
 * /auth/car:
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
 * /auth/car/info:
 *   get:
 *     summary: Get car information by VIN
 *     description: Retrieves detailed vehicle information using the VIN decoder
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
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
 *                 car:
 *                   $ref: '#/components/schemas/VehicleInfo'
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

// ==================== ZONE ENDPOINTS ====================

/**
 * @swagger
 * /zones:
 *   post:
 *     summary: Save a zone of interest
 *     description: Saves a geographic polygon zone associated with a municipality. Supports both JSON and Protocol Buffer responses.
 *     tags: [Zones]
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
 *           application/x-protobuf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing required fields or invalid coordinates (minimum 3 points required)
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
 * /zones/contains:
 *   post:
 *     summary: Check if a point is inside a zone
 *     description: Verifies whether a given geographic point falls within a specified zone. Supports both JSON and Protocol Buffer responses.
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZoneContainsCheck'
 *     responses:
 *       200:
 *         description: Point containment check completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contains:
 *                   type: boolean
 *                   description: Whether the point is inside the zone
 *                   example: true
 *           application/x-protobuf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing required fields or invalid point format
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
