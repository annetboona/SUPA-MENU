const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  static async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  }

  static async login(loginData) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });
  }
  static async createRestaurant(restaurantData) {
    // Handle FormData for file uploads
    const formData = new FormData();

    // Map and append restaurant data
    if (restaurantData.restaurantName) {
      formData.append("resturantName", restaurantData.restaurantName);
    }
    if (restaurantData.restaurantCompleteName) {
      formData.append(
        "resturantCompleteName",
        restaurantData.restaurantCompleteName
      );
    }
    if (restaurantData.contactNumber) {
      formData.append("contactNumber", restaurantData.contactNumber);
    }
    if (restaurantData.ownerName) {
      formData.append("ownerName", restaurantData.ownerName);
    }
    if (restaurantData.ownerEmail) {
      formData.append("ownerEmail", restaurantData.ownerEmail);
    }
    if (restaurantData.ownerPhone) {
      formData.append("ownerNumber", restaurantData.ownerPhone);
    }
    if (restaurantData.restaurantType) {
      formData.append("type", restaurantData.restaurantType);
    }
    if (restaurantData.cuisineType) {
      formData.append("cuisine", restaurantData.cuisineType);
    }

    // Handle opening hours
    if (restaurantData.openingTime && restaurantData.closingTime) {
      const openingHours = {
        from: restaurantData.openingTime,
        to: restaurantData.closingTime,
      };
      formData.append("openingHours", JSON.stringify(openingHours));
    }

    // Handle owner object
    const owner = {
      name: restaurantData.ownerName,
      email: restaurantData.ownerEmail,
      phone: restaurantData.ownerPhone,
    };
    formData.append("owner", JSON.stringify(owner));

    // Handle multiple image files
    if (restaurantData.images && restaurantData.images.length > 0) {
      Array.from(restaurantData.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    return this.request("/restaurant", {
      method: "POST",
      headers: {
        // Remove Content-Type to let browser set it with boundary for FormData
      },
      body: formData,
    });
  }

  static async getAllRestaurants(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/restaurant?${queryString}` : "/restaurant";
    return this.request(endpoint);
  }

  static async getRestaurantById(id) {
    return this.request(`/restaurant/${id}`);
  }

  static async updateRestaurant(id, updateData) {
    const formData = new FormData();

    Object.keys(updateData).forEach((key) => {
      if (key === "images" && updateData[key]) {
        Array.from(updateData[key]).forEach((file) => {
          formData.append("images", file);
        });
      } else if (
        typeof updateData[key] === "object" &&
        updateData[key] !== null
      ) {
        formData.append(key, JSON.stringify(updateData[key]));
      } else if (updateData[key] !== null && updateData[key] !== undefined) {
        formData.append(key, updateData[key]);
      }
    });

    return this.request(`/restaurant/${id}`, {
      method: "PUT",
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  }

  static async completeRestaurantSetup(restaurantId) {
    return this.request(`/restaurant/${restaurantId}/complete-setup`, {
      method: "PATCH",
    });
  }

  static async getRestaurantSetupProgress(restaurantId) {
    return this.request(`/restaurant/${restaurantId}/setup-progress`);
  }

  static async deleteRestaurant(id) {
    return this.request(`/restaurant/${id}`, {
      method: "DELETE",
    });
  }

  // Menu Item methods
  static async createMenuItem(menuItemData) {
    const formData = new FormData();

    // Append menu item data
    Object.keys(menuItemData).forEach((key) => {
      if (key === "image" && menuItemData[key]) {
        formData.append("image", menuItemData[key]);
      } else if (
        menuItemData[key] !== null &&
        menuItemData[key] !== undefined
      ) {
        formData.append(key, menuItemData[key]);
      }
    });

    return this.request("/menu", {
      method: "POST",
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  }

  static async getMenuByRestaurant(restaurantId) {
    return this.request(`/menu/restaurant/${restaurantId}`);
  }

  static async updateMenuItem(id, updateData) {
    const formData = new FormData();

    Object.keys(updateData).forEach((key) => {
      if (key === "image" && updateData[key]) {
        formData.append("image", updateData[key]);
      } else if (updateData[key] !== null && updateData[key] !== undefined) {
        formData.append(key, updateData[key]);
      }
    });

    return this.request(`/menu/${id}`, {
      method: "PUT",
      headers: {}, // Remove Content-Type for FormData
      body: formData,
    });
  }

  static async deleteMenuItem(id) {
    return this.request(`/menu/${id}`, {
      method: "DELETE",
    });
  }
}

export default ApiService;
