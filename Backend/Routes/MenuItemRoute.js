const express = require("express");
const {
  getAllMenuItem,
  getSingleMenuItem,
  CreateMenuItem,
  UpdateMenuItem,
  deleteMenuItem,
} = require("../Controller/MenuItem");
const { authenticateToken } = require("../midleware/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MenuItems
 *   description: API for managing menu items
 */

/**
 * @swagger
 * /api/menuitems:
 *   get:
 *     summary: Get all menu items
 *     tags: [MenuItems]
 *     responses:
 *       200:
 *         description: List of menu items
 */
router.get("/", getAllMenuItem);

/**
 * @swagger
 * /api/menuitems/{id}:
 *   get:
 *     summary: Get a single menu item
 *     tags: [MenuItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu item ID
 *     responses:
 *       200:
 *         description: Menu item data found
 *       404:
 *         description: menu item not found
 */
router.get("/:id", getSingleMenuItem);

/**
 * @swagger
 * /api/menuitems:
 *   post:
 *     summary: Create a menu item
 *     tags: [MenuItems]
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
 *                 type: strng
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: strng
 *               description:
 *                 type: string
 *               image:
 *                type: String
 *               illustration:
 *                 type: String
 *               createdAt:
 *                 type: Date
 *               updatedAt:
 *                 type: Date
 *     responses:
 *       201:
 *         description: Menu item created
 */
router.post("/", authenticateToken, CreateMenuItem);

/**
 * @swagger
 * /api/menuitems/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [MenuItems]
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
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: strng
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: strng
 *               description:
 *                 type: string
 *               image:
 *                type: String
 *               illustration:
 *                 type: String
 *               createdAt:
 *                 type: Date
 *               updatedAt:
 *                 type: Date
 *     responses:
 *       200:
 *         description: Menu item updated
 */
router.put("/:id", UpdateMenuItem);

/**
 * @swagger
 * /api/menuitems/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [MenuItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item deleted
 */
router.delete("/:id", deleteMenuItem);

module.exports = router;
