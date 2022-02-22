import express from "express";
import multer from "multer";

import { getAllArticles, createArticle,getOneArticle,modifyArticle,deleteArticle, getArticle} from "../controllers/article.js";
import { fileFilter } from "../helpers/fileFilter.js";
import  {authMiddleware} from "../middleware/auth/index.js";



const router = express.Router();
const storageFile = multer.diskStorage({})
const upload = multer({
   storage: storageFile,
   file: fileFilter
})

// Blog CRUD Route 
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
 *          article: 
 *              type: object
 *              required: 
 *                  - title
 *                  - content
 *                  - imageUrl
 *                  - userId                 
 *              properties: 
 *                  id: 
 *                      type: string
 *                      description: Auto Generated Id Of The Blog Article
 *                  title: 
 *                      type: string
 *                      description: Title Of The Blog Article
 *                  content: 
 *                      type: string
 *                      description: Article Content
 *                  imageUrl: 
 *                      type: number
 *                      description: Date Article Was Created
 *                  userId: 
 *                      type: number
 *                      description: Date Article Was Created
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: Articles
 *      description: The posts managing API
 */

/**
 * @swagger
 * /api/post:
 *      get:
 *          tags: [Articles]
 *          summary: Returns A List Of All Articles
 *          responses: 
 *              200:
 *                  description: List of All Blog Articles
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/article'
 */
router.get('/', getAllArticles);



/**
   * @swagger
   * /api/post:
   *   post:
   *     summary: Create A New Article
   *     tags: [Articles]
   *     security:
   *        - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/article'
   *     responses:
   *       201:
   *         description: New Article Created Successfully 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/article'
   *       500:
   *         description: Server Error
   */

router.post('/', authMiddleware, upload.single('image') , createArticle);

  /**
   * @swagger
   * /api/post/{id}:
   *   get:
   *     summary: Get An Article By ID
   *     tags: [Articles]
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Article Id
   *     responses:
   *       200:
   *         description: Article
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/article'
   *       404:
   *         description: Message not found
   */
router.get('/:id', authMiddleware, getOneArticle);


  /**
   * @swagger
   * /api/post/{id}:
   *  patch:
   *    summary: Update Article By Id
   *    tags: [Articles]
   *    security:
   *        - bearerAuth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Article Id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/article'
   *    responses:
   *      204:
   *        description: Article Updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/article'
   *      404:
   *        description: Article Not Found
   *      500:
   *        description: Internal Server Error
   */
router.patch('/:id',authMiddleware, getArticle, modifyArticle);


/**
   * @swagger
   * /api/post/{id}:
   *  delete:
   *    summary: Delete Article By Id
   *    tags: [Articles]
   *    security:
   *        - bearerAuth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Article Id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/article'
   *    responses:
   *      200:
   *        description: Article Deleted 
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/article'
   *      404:
   *        description: Article Not Found
   *      401:
   *        description: Unauhtorized
   */
router.delete('/:id',authMiddleware, deleteArticle);



 






export default router;