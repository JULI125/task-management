/**
 *@swagger
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
 *
 *
 *@swagger
 * components:
 *  schemas:
 *      task:
 *          type: object
 *          properties:
 *              image:
 *                  type: string
 *                  description: Image the users task
 *              nameOfTheHomework:
 *                  type: string
 *                  description: User task name
 *              priority:
 *                  type: string
 *                  description: User task priority
 *              date:
 *                  type: date
 *                  description: Assignment due date
 *          required:
 *                  - image
 *                  - nameOfTheHomework
 *                  - priority
 *                  - date
 *
 *
 *
 *
 *@swagger
 * /task:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring all users
 *      tags: [task the users]
 *      responses:
 *          200:
 *              description: Task successfuly
 *          500:
 *              description: Internal server error
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     $ref: '#/components/schemas/task'
 *
 *
 *@swagger
 * /task:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      summary: Creates a new task user
 *      tags: [metod post the task]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/task'
 *      responses:
 *          200:
 *              description: Task create successfully
 *          500:
 *              description: Failed to create a task
 *
 *
 *@swagger
 * /task/:id:
 *  put:
 *      security:
 *         - bearerAuth: []
 *      summary: Edit the user task
 *      tags: [update the user task]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: idenfication of the user task
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/task'
 *      responses:
 *          200:
 *              description: Successfully updated user no registered
 *          304:
 *              description: User no registered with id not updated
 *          400:
 *              description: Bad request
 *
 *@swagger
 * /task/:id:
 *  delete:
 *      security:
 *         - bearerAuth: []
 *      summary: Delete a task
 *      tags: [delete the task]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: idenfication of the task
 *      responses:
 *          202:
 *              description: Successfully removed task
 *          400:
 *              description: Failed to remove task
 *          404:
 *              description: User the task with id does not exist
 */
/**
 *
 *@swagger
 * /api/registro:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Bring all registrations
 *      tags: [registrations]
 *      responses:
 *          200:
 *              description: Brought all the registrations
 *          500:
 *              description: Internal server error
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Registration_postgres'
 *
 *
 *@swagger
 * /api/registro:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      summary: Creates a new user
 *      tags: [metod post the register]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/register'
 *      responses:
 *          200:
 *              description: User create successfully
 *          500:
 *              description: Failed to create user
 *
 *@swagger
 * /api/registro/:id:
 *  put:
 *      security:
 *         - bearerAuth: []
 *      summary: Edit the registration
 *      tags: [update the registration]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the registration
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/register'
 *      responses:
 *          200:
 *              description: Successfully updated register
 *          500:
 *              description: Internal server error
 *
 *@swagger
 * /api/registro/:id:
 *  delete:
 *      security:
 *         - bearerAuth: []
 *      summary: Delete user
 *      tags: [delete a user]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: idenfication of the user
 *      responses:
 *          202:
 *              description: User successfully removed
 *          400:
 *              description: Failed to remove user
 *          404:
 *              description: User the task with id does not exist
 *
 */
//# sourceMappingURL=task.docs.js.map