import express from "express";
const router = express.Router();
import { getAllMessage,getOneMessage,createMessage } from "../controllers/message.js"

/**
 * @swagger
 * components:
 *  schemas: 
 *    message:
 *      type: object
 *      required:
 *          - name
 *          - email
 *          - message
 *      properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the message
 *          name:
 *            type: string
 *            description: The name of The sender
 *          email:
 *            type: string
 *            description: The email of The sender
 *          message:
 *            type: string
 *            description: The message of The sender
 *          example:
 *            id: d5fe_asz
 *            name: yannick
 *            email: yannick23@gmail.com
 *            message: who is Yannick
 *            
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: The messages managing API
 *   
 */

/**
 * @swagger
 * /api/message:
 *    get:
 *      summary: Returns the list of all the messages
 *      tags: [ Messages ]
 *      responses:
 *         200:
 *           description: The list of the messages
 *           content:
 *              application/json:
 *                 schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/message'
 *                     
 */

 router.get('/', getAllMessage);

 /**
 * @swagger
 * /api/message/{id}:
 *    get:
 *      summary: Get the message by id
 *      tags: [ Messages ]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The message id
 *      responses:
 *          200:
 *            description: The message description by id  
 *            contents:
 *              application/json:
 *                schema:
 *                   $ref: '#/components/schemas/message'
 *          400:
 *            description: The message was not found         
 */
  router.get('/:id',getOneMessage);
/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: Create a new message
 *     tags: [ Messages ]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               $ref:'#/components/schemas/message'
 *     responses:
 *       200:
 *         description: The message was successfully created
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/message'
 *       500:
 *         description: some server error
 *       
 */

router.post('/', createMessage);
 
export default router;