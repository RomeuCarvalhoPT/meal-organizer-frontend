import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Fab,
  Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from '../atoms/Loading';
import DishList from '../molecules/MenuDishList';
import ShoppingList from '../molecules/ShoppingList';
import { fetchMenuDetails } from '../../services/menuService';

const MenuDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMenuDetails();
  }, [id]);

  const loadMenuDetails = async () => {
    try {
      const data = await fetchMenuDetails(id);
      setMenu(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  if (isLoading) {
    return <Loading />;
  }

  const shoppingList = {};
  menu.Dishes.forEach((dish) => {
    dish.Ingredients.forEach((ingredient) => {
      if (shoppingList[ingredient.name]) {
        shoppingList[ingredient.name].quantity += `, ${ingredient.DishIngredient.quantity}`;
      } else {
        shoppingList[ingredient.name] = {
          quantity: ingredient.DishIngredient.quantity,
        };
      }
    });
  });

  const sortedShoppingList = Object.entries(shoppingList).sort((a, b) => a[0].localeCompare(b[0]))
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Card>
          <CardContent>
            <Fab size="small" color="primary" aria-label="back" onClick={goBack}>
              <ArrowBackIcon />
            </Fab>
            <Typography variant="h4" component="h3">
              Menu Details
            </Typography>
            <DishList dishes={menu.Dishes} />
            <ShoppingList ingredients={sortedShoppingList} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default MenuDetails;
