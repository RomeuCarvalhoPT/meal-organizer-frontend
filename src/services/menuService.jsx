import axios from "../api/axios";

export const fetchAllMenus = async () => {
  try {
    const response = await axios.get("/menus/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};

export const deleteMenu = async (menuId) => {
  try {
    const response = await axios.delete(`/menus/${menuId}`);
    if (response.status === 200) {
      return true;
    } else {
      console.error("Error deleting menu:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};

export const fetchMenuDetails = async (id) => {
  try {
    const response = await axios.get(`/menus/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu details:", error);
    throw error;
  }
};

export const fetchAvailableDishes = async () => {
  try {
    const response = await axios.get(`/dishes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    throw error;
  }
};

export const generateMenu = async (numDishes) => {
  try {
    const response = await axios.post(`/menus/generate-menu/${numDishes}`);
    return response.data;
  } catch (error) {
    console.error("Error generating menu:", error);
    throw error;
  }
};

export const saveMenu = async (menuDishes) => {
  try {
    const response = await axios.post(`/menus/save`, { dishes: menuDishes });
    return response.data;
  } catch (error) {
    console.error("Error saving menu:", error);
    throw error;
  }
};