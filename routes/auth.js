import  express  from 'express';
import {login, signup} from '../controllers/auth.js';

const router = express.Router()
/** 
@swagger
* components:
*      securitySchemes:
*          bearerAuth:
*              type: http
*              scheme: bearer
*              bearerFormat: JWT
*      schemas:
*          dbUsers: 
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
  *             $ref: '#/components/schemas/dbUsers'
  *     responses:
  *       201:
  *         description: User Created Successfully 
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/dbUsers'
  *       500:
  *         description: Server Error
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
   *             $ref: '#/components/schemas/dbUsers'
   *     responses:
   *       201:
   *         description: User Logged In 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/dbUsers'
   *       500:
   *         description: Server Error
   */
// login Route
router.post('/login', login);

export default router;