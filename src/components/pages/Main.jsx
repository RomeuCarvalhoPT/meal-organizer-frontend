// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { CssBaseline, Container, Paper, Typography, Box } from "@mui/material";
import Dish from "./Dish";
import Loading from '../atoms/Loading';
import DishList from '../molecules/DishList';
import AppBarMenu from '../molecules/AppBarMenu';
import { fetchDishes, deleteDish, fetchDishesAndImages } from '../../services/dishService';

const Main = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    loadDishes();
  }, []);

  const loadDishes = async () => {
    try {
      setIsLoading(true);
      const dishes = await fetchDishesAndImages();
      setDishes(dishes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDish(id);
      setDishes(dishes.filter((dish) => dish.id !== id));
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  const handleShowDish = (id) => {
    history.push(`/dish/${id}`);
  };

  const handleAddDish = () => {
    history.push("/editDish");
  };

  const navigateToWeeklyMenu = () => {
    history.push("/allMenus");
  };

  const navigateToIngredients = () => {
    history.push("/ingredients");
  };

  const navigateToLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Paper square sx={{ pb: "50px" }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Dishes
        </Typography>
        <Container>
          <DishList dishes={dishes} handleShowDish={handleShowDish} handleDelete={handleDelete} />
        </Container>
      </Paper>
      <AppBarMenu
        navigateToWeeklyMenu={navigateToWeeklyMenu}
        navigateToIngredients={navigateToIngredients}
        navigateToLogout={navigateToLogout}
        handleAddDish={handleAddDish}
      />
    </Container>
  );
};

export default Main;
