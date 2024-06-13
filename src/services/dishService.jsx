import axios from "../api/axios";


export const fetchIngredients = async () => {
  try {
    const response = await axios.get("/ingredients");
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};

export const uploadDishImage = async (id, resizedImage) => {
  try {
    const formData = new FormData();
    formData.append("image", resizedImage, `dish_${id}.jpg`);
    const response = await axios.post(`/files/upload`, formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading dish image:", error);
    throw error;
  }
};

export const saveDish = async (id, dish) => {
  try {
    const url = `/dishes${id ? `/${id}` : ''}`;
    const method = id ? "PUT" : "POST";
    const response = await axios({
      url,
      method,
      headers: { "Content-Type": "application/json" },
      data: dish,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving dish:", error);
    throw error;
  }
};




export const fetchDishDetails = async (id) => {
  try {
    const response = await axios.get(`/dishes/${id}`, { method: "GET" });
    return response.data;
  } catch (error) {
    console.error("Error getting dish:", error);
    throw error;
  }
};

export const fetchDishImage = async (id) => {
  try {
    const response = await axios.get(`/files/dish_${id}`, {
      method: "GET",
      responseType: 'blob',
    });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error("Error getting dish image:", error);
   return null;
  }
};


export const fetchDishes = async () => {
  try {
    const response = await axios.get("/dishes");
    return response.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};

export const fetchDishesAndImages = async () => {
  try {
    const response = await axios.get("/dishes");
    const dishes = response.data;
    const dishesWithImages = await Promise.all(dishes.map(async (dish) => {
      const imageUrl = await fetchDishImage(dish.id);
      return { ...dish, imageUrl };
    }));
    return dishesWithImages;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};

export const deleteDish = async (id) => {
  try {
    await axios.delete(`/dishes/${id}`);
  } catch (error) {
    console.error("Error deleting dish:", error);
    throw error;
  }
};
