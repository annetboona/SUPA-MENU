const express = require("express");
const { CreateTable, getAllTables } = require("../Controller/TableController");
const router = express.Router();

/**
 * @swagger
 * tages:
 *   name: Tables
 *   description: Tamble Management
 */

/**
 * @swagger
 * /api/tables:
 *  post:
 *   summary: Creating a new table
 *   tags: [Tables]
 *   security:
 *     - bearerAuth: []
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             tableNumber:
 *               type: integer
 *             capacity:
 *               type: integer
 *             status:
 *               type:string
 *             location:
 *               type: string
 *             createdAt:
 *               type: Date
 *     response:
 *       200:
 *          description: Table created successfully
 *       401:
 *          description: unauthorized
 */
router.post("/", CreateTable);
/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Get all Tables
 *     tags: [Tables]
 *     responses:
 *       200:
 *         description: List of Tables
 */
router.get("/", getAllTables);
module.exports = router;
