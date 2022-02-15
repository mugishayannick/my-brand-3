import  express  from 'express';
import {login, signup} from '../controllers/auth.js';
const router = express.Router()



// User Auth Route 
/**
 * @swagger
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      responses: 
 *          UnauthorizedError:
 *              description: User does not have access to perform the action
 *              content: 
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                              message:
 *                                  type: string
 *                                  example: 'Unauthorized'
 *          NotFoundError:
 *              description: Not Found
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          type: object
 *                          properties: 
 *                              message: 
 *                                  type: string 
 *                                  example: 'Not Found'
 *      schemas:
 *          User: 
*              type: object
*              required: 
*                  - id
*                  - firstName
*                  - lastName
*                  - email
*                  - password                  
*                  - confirmPssword                  
*              properties: 
*                  id: 
*                      type: string
*                      description: Auto Generated User Id 
*                  firstName: 
*                      type: string
*                      description: First Name Of The User
*                  lastName: 
*                      type: string
*                      description: Last Name Of The User
*                  email: 
*                      type: string
*                      description: User Email
*                  password: 
*                      type: string
*                      description: User Password
*                  confirmPassword: 
*                      type: string
*                      description: User Password Confirmation
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: Authentication & Authorization
*      description: User Roles, User Authentication & Authorisation  
 */

/**
  * @swagger
  * /api/auth/signup:
  *   post:
  *     summary: New User Registration
  *     tags: [Authentication & Authorization]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/User'
  *     responses:
  *       201:
  *         description: User Created Successfully 
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/User'
  *       400:
  *         description: Bad Request
  */
router.post('/signup', signup);


/**
  * @swagger
  * /api/auth/login:
  *   post:
  *     summary: User Login
  *     tags: [Authentication & Authorization]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/User'
  *     responses:
  *       201:
  *         description: User Logged In Successfully 
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/User'
  *       400:
  *         description: Bad Request
  */
// login Route
router.post('/login', login);

export default router;