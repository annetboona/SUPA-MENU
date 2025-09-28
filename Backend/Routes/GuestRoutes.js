const express = require("express");
const {
  getAllGuest,
  CreateGuest,
  UpdateGuest,
} = require("../Controller/Guest");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Guests
 *   description: Guest reservation management API
 */

/**
 * @swagger
 * /api/guests:
 *   post:
 *     summary: Creating guests
 *     tags: [Guests]
 *     security:
 *       - bearAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               party:
 *                 type: integer
 *               restaurantId:
 *                 type: string
 *               tableId:
 *                 type: string
 *               reservationDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [Delivered, waiting, Rejected, All]
 *                 default: waiting
 *               specialRequests:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: guest item created
 */
router.post("/", CreateGuest);
/**
 * @swagger
 * /api/guests:
 *   get:
 *     summary: Listing all guests
 *     tags: [Guests]
 *     responses:
 *       200:
 *         description: List of restaurants
 */
router.get("/", getAllGuest);

/**
 * @swagger
 * /api/guests/{id}:
 *   put:
 *     summary: Update a guest reservation
 *     tags: [Guests]
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
 *             $ref: '#/components/schemas/Guest'
 *     responses:
 *       200:
 *         description: Guest updated successfully
 *       404:
 *         description: Guest not found
 */
router.put("/:id", UpdateGuest);

module.exports = router;
