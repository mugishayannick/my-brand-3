import express from "express";
const router = express.Router();
import { getAllMessage,getOneMessage,createMessage } from "../controllers/message.js"
import  {authMiddleware} from "../middleware/auth/index.js";

// Message CRUD Route 
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
 *          Message: 
 *              type: object
 *              required: 
 *                  - name
 *                  - email
 *                  - message             
 *              properties:
 *                id:
 *                    type: string
 *                    description: The auto-generated id of the message
 *                name:
 *                    type: string
 *                    description: The name of The sender
 *                email:
 *                    type: string
 *                    description: The email of The sender
 *                message:
 *                    type: string
 *                    description: The message of The sender
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: Messages
 *      description: The Messages managing API
 */

/**
 * @swagger
 * /api/message:
 *      get:
 *          tags: [Messages]
 *
 *          summary: Returns A List Of All Messages
 *          responses: 
 *              200:
 *                  description: List of All Messages
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Message'
 */
 router.get('/', getAllMessage);


/**
   * @swagger
   * /api/message/{id}:
   *   get:
   *     summary: Get Message By Id
   *     tags: [ Messages ]
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Message Id
   *     responses:
   *       200:
   *         description: Message
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   *       404:
   *         description: Message not found
   */
  router.get('/:id', authMiddleware, getOneMessage);



/**
   * @swagger
   * /api/message:
   *   post:
   *     summary: Create A New Message
   *     tags: [Messages]
   *     security:
   *        - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Message'
   *     responses:
   *       201:
   *         description: New Message Created Successfully 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   *       500:
   *         description: Server Error
   */

router.post('/', authMiddleware, createMessage);
 
export default router;