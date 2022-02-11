import express from "express";
const router = express.Router();
import { getAllArticles, createArticle,getOneArticle,modifyArticle,deleteArticle } from "../controllers/article.js";
import  {authMiddleware} from "../middleware/auth/index.js";



/**
 * @swagger
 * components:
 *  schemas: 
 *    post:
 *      type: object
 *      required:
 *          - title
 *          - content
 *          - imageUrl
 *          - userId
 *      properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the post
 *          title:
 *            type: string
 *            description: The title of The post
 *          content:
 *            type: string
 *            description: The content of The post
 *          imageUrl:
 *            type: string
 *            description: The image of The post
 *          userId:
 *            type: string
 *            description: The auto-generated userId of the post
 *          example:
 *            id: d5fe_asz
 *            title: why you
 *            content: skfjgksgkfsfkjf
 *            imageUrl: fisjgier.pg
 *            userId: 12324234_dskfk
 *            
 */
/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: The posts managing API
 *   
 */

/**
 * @swagger
 * /api/post:
 *    get:
 *      summary: Returns the list of all the articles
 *      tags: [ Articles ]
 *      responses:
 *         200:
 *           description: The list of the articles
 *           content:
 *              application/json:
 *                 schema:
 *                     type: array
 *                     items:
 *                        $ref: '#/components/schemas/post'
 *                     
 */
router.get('/', getAllArticles);



/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: Create a new Article
 *     tags: [ Articles ]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               $ref:'#/components/schemas/post'
 *     responses:
 *       200:
 *         description: The article was successfully created
 *         content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/post'
 *       500:
 *         description: some server error
 *       
 */

router.post('/',authMiddleware, createArticle);

 /**
 * @swagger
 * /api/post/{id}:
 *    get:
 *      summary: Get the article by id
 *      tags: [ Articles ]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The article id
 *      responses:
 *          200:
 *            description: The article description by id  
 *            contents:
 *              application/json:
 *                schema:
 *                   $ref: '#/components/schemas/post'
 *          400:
 *            description: The article was not found         
 */
router.get('/:id', getOneArticle);

/**
  * @swagger
  * /api/post/{id}:
  *   patch:
  *     summary: update the article by id
  *     tags: [Articles]
  *     parameters:
  *       - in: path
  *         name: id
  *         schema:
  *           type: string
  *         required: true
  *         description: The article id
  *     requestBody:
  *         required: true
  *         content:
  *          application/json:
  *            schema:
  *               $ref: '#/components/schemas/post'
  *     responses:
  *          201:
  *            description: The article was updated
  *            content:
  *              application/json:
  *               schema:
  *                 $ref: '#/components/schemas/post'
  *          404:
  *            description: The article was not found
  *          500:
  *            description: some error happened
  *          
  */
router.patch('/:id',authMiddleware, modifyArticle);

/**
 * @swagger
 * /api/post/{id}:
 *    delete:
 *      summary: Delete The article by id
 *      tags: [ Articles ]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The article id
 *      responses:
 *          200:
 *            description: The article was deleted 
 *           
 *          400:
 *            description: The article was not found         
 */
router.delete('/:id',authMiddleware, deleteArticle);




export default router;