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
import Image_not_available from '../images/Image_not_available.png';


const MenuDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //const apiEndpoint = config.API_ENDPOINT;
  const apiEndpoint = window.ENV.API_ENDPOINT;

  useEffect(() => {
    fetchMenuDetails();
  }, [id]);

  const fetchMenuDetails = async () => {
    try {
      const response = await fetch(apiEndpoint +
        `/menus/${id}`,
        {
          method: "GET",
          contentType: "application/json",
        }
      );
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
                        {dish.picture && (
                           <CardMedia 
                             component="img" 
                             alt={dish.picture} 
                             height="140" 
                             image={dish.picture} 
                             sx={{ objectFit: "cover", h: '10%'  }}/>
                        )}
                          {!dish.picture && (
                             <CardMedia 
                               component="img" 
                               alt={dish.picture ? dish.name : ""} 
                               height="140" 
                               sx={{ objectFit: "contain" }} 
                               image={Image_not_available}/>
                          )}
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
                <ListItem key={ingredientName} >
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
