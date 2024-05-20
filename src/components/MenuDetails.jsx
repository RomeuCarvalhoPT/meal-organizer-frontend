import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from '@mui/material/CircularProgress';

const MenuDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMenuDetails();
  }, [id]);

  const fetchMenuDetails = async () => {
    try {
      const response = await fetch(
        `https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev/menus/${id}`,
        {
          method: "GET",
          contentType: "application/json",
        }
      );;
      const menuData = await response.json();
      setMenu(menuData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching menu details:", error);
      setIsLoading(false);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Aggregate ingredients from all dishes in the menu to form a shopping list
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

  // Sort the shopping list by ingredient name
  const sortedShoppingList = Object.entries(shoppingList).sort((a, b) => a[0].localeCompare(b[0]))
  .reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  
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
            <List>
              {menu.Dishes.map((dish) => (
                <ListItem key={dish.id}>
                  <ListItemText
                    primary={dish.name}
                    secondary={
                      <div>
                        <CardMedia
                          component="img"
                          height="140"
                          image={dish.picture}
                          alt={dish.name}
                        />
                        <ul>
                          {dish.Ingredients.map((ingredient) => (
                            <li key={ingredient.id}>
                              {ingredient.name} - {ingredient.DishIngredient.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h5" component="h2">
              Shopping List
            </Typography>
            <List >
              {Object.keys(sortedShoppingList).map((ingredientName) => (
                <ListItem key={ingredientName} alignItems="flex-end">
                  <ListItemText
                    primary={ingredientName}
                  />     
                  <ListItemText 
                    secondary={`Quantity: ${sortedShoppingList[ingredientName].quantity}`} 
                  />
                </ListItem>
        
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default MenuDetails;
