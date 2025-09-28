const express = require("express");
const { authenticateToken } = require("../midleware/auth");
const { upload } = require("../midleware/upload");
const {
  getAllResturant,
  updateRestaurant,
  completeSetup,
  getSetupProgress,
  deleteRestaurant,
  AddRestaurant,
  getSingleRestaurant,
  GetSearch
} = require("../Controller/ResturantControllers");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurant management 
 */

/**
 * @swagger
 * /api/restaurant:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resturantName:
 *                 type: string
 *               resturantCompleteName:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               ownerNumber:
 *                 type: string
 *               ownerName:
 *                 type: string
 *               ownerEmail:
 *                 type: string
 *               RestaurantType:
 *                 type: string
 *               cuisine:
 *                 type: string
 *               openingHours:
 *                 type: object
 *                 properties:
 *                   from:
 *                     type: string
 *                   to:
 *                     type: string
 *               address:
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
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, upload.array("images", 5), AddRestaurant);

/**
 * @swagger
 * /api/restaurant:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of restaurants
 */
router.get("/", getAllResturant);

/**
 * @swagger
 * /api/restaurant/{id}:
 *   get:
 *     summary: Get restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant details
 *       404:
 *         description: Restaurant not found
 */
router.get("/:id", getSingleRestaurant);

/**
 * @swagger
 * /api/restaurant/{id}:
 *   put:
 *     summary: Update restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resturantName:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Restaurant not found
 */
router.put(
  "/:id",
  authenticateToken,
  upload.array("images", 5),
  updateRestaurant
);

/**
 * @swagger
 * /api/restaurant/{id}/complete-setup:
 *   patch:
 *     summary: Mark restaurant setup as complete
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Setup marked as complete
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id/complete-setup", authenticateToken, completeSetup);

/**
 * @swagger
 * /api/restaurant/{id}/setup-progress:
 *   get:
 *     summary: Get restaurant setup progress
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Setup progress retrieved
 *       401:
 *         description: Unauthorized
 */
router.get("/:id/setup-progress", authenticateToken, getSetupProgress);

/**
 * @swagger
 * /api/restaurant/{id}:
 *   delete:
 *     summary: Delete restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Restaurant not found
 */
router.delete("/:id", authenticateToken, deleteRestaurant);
router.get("/search",GetSearch)

module.exports = router;
