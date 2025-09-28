const menuItem = require("../Models/MenuItemModel");
const Restaurant = require("../Models/CreateResturantModel");

//get all menu items

const getAllMenuItem = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { restaurant: req.params.restaurantId, isAvailable: true };
    if (category) {
      query.category = category;
    }
    const MenuItem = await menuItem.find(query).sort({ category: 1, name: 1 });
    res.json(MenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get menuitem ById
const getSingleMenuItem = async (req, res) => {
  try {
    const categories = await menuItem.distinct("category", {
      restaurant: req.params.restaurantId,
      isAvailable: true,
    });

    const standardCategories = [
      "Drink",
      "Starter",
      "Appetizer",
      "Dessert",
      "Main",
    ];
    const allCategories = [...new Set([...standardCategories, ...categories])];

    res.json({
      categories: allCategories,
      count: categories.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//create menuitem
const CreateMenuItem = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId || req.body.restaurantId;
    if (!restaurantId) {
      return res.status(400).json({ error: "restaurantId is required" });
    }
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: userId missing" });
    }
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      owner: req.user.userId,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ error: "Restaurant not found or unauthorized" });
    }
    const { name, category, price, ingredients } = req.body;
    const MenuItemDoc = new menuItem({
      restaurant: restaurantId,
      name,
      category,
      price: parseFloat(price),
      ingredients,
      illustration: req.file ? req.file.filename : null,
    });
    await MenuItemDoc.save();
    res.status(201).json({
      message: "Menu item added successfully",
      menuItem: MenuItemDoc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createMenuItemsBulk = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId || req.body.restaurantId;
    if (!restaurantId) {
      return res.status(400).json({ error: "restaurantId is required" });
    }
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: userId missing" });
    }
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      owner: req.user.userId,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ error: "Restaurant not found or unauthorized" });
    }

    const { menuItems } = req.body;
    const items = JSON.parse(menuItems);
    const createdItems = [];

    // Process each menu item
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const menuItemDoc = new menuItem({
        restaurant: restaurantId,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price),
        category: item.category,
        allergens: item.allergens || [],
        nutritionalInfo: item.nutritionalInfo || {},
      });

      // Find corresponding image file
      const imageFile = req.files.find((file) =>
        file.originalname.includes(`item-${i}`)
      );
      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        menuItem.images = [uploadResult];
      }

      await menuItemDoc.save();
      createdItems.push(menuItemDoc);
    }

    res.status(201).json({
      message: "Menu items created successfully",
      items: createdItems,
      count: createdItems.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// updating the menuitem
const UpdateMenuItem = async (req, res) => {
  try {
    if (req.file) {
      return (UpdateDate.illustration = req.file.filename);
    }
    const menuItemDoc = await menuItem
      .findById(req.params.itemId)
      .populate("restaurant");
    if (!menuItemDoc) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    if (!menuItemDoc.restaurant || !menuItemDoc.restaurant.owner) {
      return res
        .status(500)
        .json({ error: "Menu item's restaurant or owner is undefined" });
    }
    if (menuItemDoc.restaurant.owner.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { name, description, price, category, allergens, nutritionalInfo } =
      req.body;

    // Update fields
    if (name) menuItemDoc.name = name;
    if (description) menuItemDoc.description = description;
    if (price) menuItemDoc.price = parseFloat(price);
    if (category) menuItemDoc.category = category;
    if (allergens) menuItemDoc.allergens = allergens.split(",");
    if (nutritionalInfo)
      menuItemDoc.nutritionalInfo = JSON.parse(nutritionalInfo);
    await menuItemDoc.save();
    res.json({
      message: "Menu item updated successfully",
      menuItem: menuItemDoc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//deleting menu item
const deleteMenuItem = async (req, res) => {
  try {
    const menuItemDoc = await menuItem
      .findById(req.params.itemId)
      .populate("restaurant");
    if (!menuItemDoc) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    if (!menuItemDoc.restaurant || !menuItemDoc.restaurant.owner) {
      return res
        .status(500)
        .json({ error: "Menu item's restaurant or owner is undefined" });
    }
    if (menuItemDoc.restaurant.owner.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await menuItem.findOneAndDelete({ _id: req.params.itemId });
    res.json({
      message: "Menu item deleted successfully",
      menuItem: menuItemDoc,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllMenuItem,
  getSingleMenuItem,
  CreateMenuItem,
  createMenuItemsBulk,
  UpdateMenuItem,
  deleteMenuItem,
};
