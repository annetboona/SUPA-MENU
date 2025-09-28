const express = require("express");
const {
  getAllOrders,
  getSingleOrder,
  createNewOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../Controller/Order");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing customer orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         menuItemId:
 *           type: string
 *           description: ID of the menu item
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: integer
 *         size:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 *     Order:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *         clientId:
 *           type: string
 *         tableId:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalAmount:
 *           type: number
 *         currency:
 *           type: string
 *         status:
 *           type: string
 *           enum: [New, Delivered, Rejected, In Progress, Ready]
 *         orderType:
 *           type: string
 *           enum: [delivery, takeaway, dine_in]
 *         paymentMethod:
 *           type: string
 *           enum: [Mobile Money, Cash, Card]
 *         paymentStatus:
 *           type: string
 *           enum: [Pending, Paid, Failed, Refunded]
 *         orderSteps:
 *           type: object
 *           properties:
 *             served: { type: boolean }
 *             callWaiter: { type: boolean }
 *             start: { type: boolean }
 *             review: { type: boolean }
 *             accept: { type: boolean }
 *         rating:
 *           type: integer
 *         review:
 *           type: string
 *         tableNumber:
 *           type: integer
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
router.get("/:id", getSingleOrder);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/", createNewOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [New, Delivered, Rejected, In Progress, Ready]
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 */
router.put("/:id/status", updateOrderStatus);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
router.delete("/:id", deleteOrder);

module.exports = router;
