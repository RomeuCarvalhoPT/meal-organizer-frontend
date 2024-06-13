import axios from "../api/axios";

export const fetchIngredients = async () => {
  try {
    const response = await axios.get(`/ingredients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
};

export const createIngredient = async (name) => {
  try {
    const response = await axios.post(`/ingredients`, { name });
    return response.data;
  } catch (error) {
    console.error("Error creating ingredient:", error);
    throw error;
  }
};

export const updateIngredient = async (id, name) => {
  try {
    await axios.put(`/ingredients/${id}`, { name });
  } catch (error) {
    console.error("Error updating ingredient:", error);
    throw error;
  }
};

export const deleteIngredient = async (id) => {
  try {
    await axios.delete(`/ingredients/${id}`);
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    throw error;
  }
};
