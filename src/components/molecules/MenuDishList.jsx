// src/components/molecules/DishList.js
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  CardMedia
} from '@mui/material';
import Image_not_available from '../../images/Image_not_available.png';

const MenuDishList = ({ dishes }) => (
  <List>
    {dishes.map((dish) => (
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
                  sx={{ objectFit: "cover", h: '10%' }}
                />
              )}
              {!dish.picture && (
                <CardMedia
                  component="img"
                  alt={dish.picture ? dish.name : ""}
                  height="140"
                  sx={{ objectFit: "contain" }}
                  image={Image_not_available}
                />
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
);

export default MenuDishList;
