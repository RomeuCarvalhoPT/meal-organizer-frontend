// src/components/molecules/ShoppingList.js
import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const ShoppingList = ({ ingredients }) => (
  <>
    <Typography variant="h5" component="h2">
      Shopping List
    </Typography>
    <List>
      {Object.keys(ingredients).map((ingredientName) => (
        <ListItem key={ingredientName}>
          <ListItemText
            primary={ingredientName}
            secondary={`Quantity: ${ingredients[ingredientName].quantity}`}
          />
        </ListItem>
      ))}
    </List>
  </>
);

export default ShoppingList;
