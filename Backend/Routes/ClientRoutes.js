// Routes/ClientRoutes.js
const express = require("express");
const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../Controller/ClientControllers");

const router = express.Router();
/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               representative:
 *                 type: string
 *               dateOfCreation:
 *                 type: string
 *                 format: date
 *               Address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipcode:
 *                     type: string
 *                   country:
 *                     type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               bankAccount:
 *                 type: object
 *                 properties:
 *                   iban:
 *                     type: string
 *                   accountNumber:
 *                     type: string
 *                   bankNamme:
 *                     type: string
 *                   swiftCode:
 *                     type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: object
 *                 properties:
 *                   isActive:
 *                     type: boolean
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */

router.post("/", createClient);
router.get("/", getAllClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client found
 *       404:
 *         description: Client not found
 *   put:
 *     summary: Update a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Client updated successfully
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           properties:
 *     responses:
 *       200:
 *         description: Client deleted successfully
 */
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
