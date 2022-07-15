/**
 * @swagger
 * components:
 *  schemas:
 *      register:
 *          type: object
 *          properties:
 *              names:
 *                  type: string
 *                  description: names the users
 *              lastName:
 *                  type: string
 *                  description: last name the users
 *              email:
 *                  type: string
 *                  description: email the users
 *              password:
 *                  type: string
 *                  description: unique user password
 *          required:
 *                  - names
 *                  - lastName
 *                  - email
 *                  - password
 */
/**
 *
 * @swagger
 * /mongo:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring all users
 *      tags: [users no registered]
 *      responses:
 *          200:
 *              description: Brought all the users no registered
 *          500:
 *              description: Internal server error
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     $ref: '#/components/schemas/User_no_registered'
 */
//# sourceMappingURL=tarea.docs.js.map