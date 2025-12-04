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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ZoneSave'
 *     responses:
 *       201:
 *         description: Zona salvata correttamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Zona salvata correttamente
 *       400:
 *         description: Campi mancanti o coordinate non valide (minimo 3 punti)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno
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
 *     description: Checks if a geographic point is contained in any zone of the authenticated municipality. Also returns the municipality name.
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               point:
 *                 type: array
 *                 items:
 *                   type: number
 *                 minItems: 2
 *                 maxItems: 2
 *                 example: [9.1905, 45.4647]
 *     responses:
 *       200:
 *         description: Risultato della verifica
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contains:
 *                   type: boolean
 *                   description: True se il punto è dentro o sul bordo della zona
 *                 comune:
 *                   type: string
 *                   description: Nome del comune di appartenenza (se presente)
 *       400:
 *         description: Campi mancanti o formato punto non valido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno
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
 *         description: Zone eliminate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Zone eliminate
 *       404:
 *         description: Nessuna zona trovata con gli id richiesti
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /zones/near-point:
 *   post:
 *     summary: Get zones near a point
 *     description: Returns all zones within a certain distance from the specified point.
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lng:
 *                 type: number
 *                 example: 9.1925
 *               lat:
 *                 type: number
 *                 example: 45.4665
 *               distance:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Zone trovate
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
 *         description: Parametri non validi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /zones/ids:
 *   get:
 *     summary: Get all zone ids of the authenticated municipality
 *     description: Returns an array of zone ids belonging to the authenticated municipality.
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: Id delle zone trovati
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
 *         description: Accesso riservato ai comuni autenticati
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /zones/geometry/{id}:
 *   get:
 *     summary: Get the geometry of a zone
 *     description: Returns the geometry (GeoJSON) of the zone with the specified id, only if it belongs to the authenticated municipality.
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id della zona
 *     responses:
 *       200:
 *         description: Geometria della zona trovata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 geometry:
 *                   type: object
 *                   description: Oggetto GeoJSON della geometria
 *       400:
 *         description: Id zona non valido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Zona non trovata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

module.exports = {};
