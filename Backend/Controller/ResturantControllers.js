const Resturant = require("../Models/CreateResturantModel");
const MenuItem = require("../Models/MenuItemModel");
const { populate } = require("../Models/UsersModel");
const cloudinary = require("cloudinary").v2;
const User = require("../Models/UsersModel");
// get all resturants
const getAllResturant = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, cuisine, search } = req.query;
    const query = { isActive: true };
    if (type && type == "all") query.type = type;
    if (cuisine && cuisine == "all") query.cuisine = cuisine;
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }
    const resturants = await Resturant.find(query)
      .populate(
        "resturantName,resturantCompleteName,contactNumber,ownerNumber,ownerName,ownerEmail"
      )
      .limit(limit * 1)
      .skip(page - 1)
      .sort({ createdAt: -1 });
    const total = await Resturant.countDocuments(query);
    res.json({
      resturants,
      totalPage: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// getting single resturant
const getSingleRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Resturant.findById(id);
    populate({
      path: "menuItems",
      match: { isActive: true },
      sort: { category: 1, name: 1 },
    });
    if (!restaurant) {
      return res.status(404).json({ error: error.message });
    }
    const menuByCategory = {};
    if (restaurant.menuItems) {
      restaurant.menuItems.forEach((item) => {
        if (!menuByCategory[item.category]) {
          menuByCategory[item.category] = [];
        }
        menuByCategory[item.category].push(item);
      });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//creating a restaurant
const AddRestaurant = async (req, res) => {
  try {
    const RestaurantData = {
      ...req.body,
      owner: { ...req.body.owner, userId: req.usr.userId },
    };
    const [fromHour, fromMinute] = openingHours.from.split(":");
    const [toHour, toMinute] = openingHours.to.split(":");
    ({
      openingHours: {
        from: `${fromHour.padStart(2, "0")}:${fromMinute.padStart(2, "0")}`,
        to: `${toHour.padStart(2, "0")}:${toMinute.padStart(2, "0")}`,
      },
    });
    if (req.files && req.files.length > 0) {
      const imageUploads = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "",
                resource_type: "auto",
              },
              (error, result) => {
                if (error) reject(error);
                else
                  resolve({
                    url: result.secure_url,
                    public_id: result.public_id,
                    type: "gallery",
                  });
              }
            )
            .end(file.buffer);
        });
      });
      const uploadedImages = await Promise.all(imageUploads);
      restaurant.images = uploadedImages;
      const restaurant = await Resturant.create(RestaurantData);
    }
    res.status(201).json({
      message: "Restaurant registered successfully",
      RestaurantData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//updating restaurant
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Resturant.findOne({
      _id: req.params.id,
      owner: req.user.userId,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ error: "Restaurant not found or unauthorized" });
    }

    // Update fields
    Object.keys(req.body).forEach((key) => {
      if (key !== "images" && req.body[key]) {
        if (key === "address" || key === "contact") {
          restaurant[key] = JSON.parse(req.body[key]);
        } else {
          restaurant[key] = req.body[key];
        }
      }
    });

    // Handle new image uploads
    if (req.files && req.files.length > 0) {
      const imageUploads = req.files.map((file) =>
        uploadImageToCloudinary(file, "restaurants")
      );
      const uploadedImages = await Promise.all(imageUploads);
      restaurant.images = [...restaurant.images, ...uploadedImages];
    }

    restaurant.updatedAt = new Date();
    await restaurant.save();

    res.json({
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const completeSetup = async (req, res) => {
  try {
    const restaurant = await Resturant.findOne({
      _id: req.params.restaurantId,
      owner: req.user.userId,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ error: "Restaurant not found or unauthorized" });
    }

    // Check if restaurant has at least one menu item
    const menuItemCount = await MenuItem.countDocuments({
      restaurant: req.params.restaurantId,
      isAvailable: true,
    });

    if (menuItemCount === 0) {
      return res.status(400).json({
        error: "Please add at least one menu item before completing setup",
      });
    }

    // Mark restaurant as active
    restaurant.isActive = true;
    restaurant.updatedAt = new Date();
    await restaurant.save();

    res.json({
      message: "Restaurant setup completed successfully",
      restaurant: {
        id: restaurant._id,
        resturantName: restaurant.resturantName,
        isActive: restaurant.isActive,
        menuItemCount,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//deleting restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = Resturant.findOne({
      id: req.params.id,
      owner: req.user.userId,
    });
    if (!restaurant) {
      return res
        .status(404)
        .json({ error: "restaurant not found or unauthorised" });
    }
    restaurant.isActive = false;
    await restaurant.save();
    await MenuItem.updateMany({ restaurant: id }, { isActive: false });
    res
      .status(201)
      .json({ message: "restaurant deleted successfully", deleteRestaurant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSetupProgress = async (req, res) => {
  try {
    const restaurant = await Resturant.findOne({
      _id: req.params.restaurantId,
      owner: req.user.userId,
    });

    if (!restaurant) {
      return res
        .status(404)
        .json({ error: "Restaurant not found or unauthorized" });
    }

    const menuItemCount = await MenuItem.countDocuments({
      restaurant: req.params.restaurantId,
    });

    const progress = {
      basicInfo: {
        completed: !!(
          restaurant.resturantName &&
          resturantCompleteName &&
          contactNumber &&
          ownerNumber &&
          ownerName &&
          ownerEmail &&
          restaurant.type &&
          restaurant.cuisine
        ),
        percentage: 33.33,
      },
      menuItems: {
        completed: menuItemCount > 0,
        count: menuItemCount,
        percentage: 33.33,
      },
      finalSetup: {
        completed: restaurant.isActive,
        percentage: 33.34,
      },
      overall: {
        percentage: 0,
        isComplete: restaurant.isActive,
      },
    };

    // Calculate overall progress
    let completedSteps = 0;
    if (progress.basicInfo.completed) completedSteps++;
    if (progress.menuItems.completed) completedSteps++;
    if (progress.finalSetup.completed) completedSteps++;

    progress.overall.percentage = (completedSteps / 3) * 100;

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const GetSearch = async(req,res) =>{
  try {
    const query = res.query.q?.trim || "";
    const result = await Restaurant.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ]
    })
    
    res.json(results);
  } catch (error) {
        console.error("Search error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
module.exports = {
  AddRestaurant,
  getSingleRestaurant,
  getAllResturant,
  updateRestaurant,
  completeSetup,
  deleteRestaurant,
  getSetupProgress,
  GetSearch,

};
