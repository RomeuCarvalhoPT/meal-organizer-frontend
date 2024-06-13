// src/components/molecules/IngredientList.js
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const IngredientList = ({ ingredients }) => {
  const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };

  return (
    <Box>
      <Typography variant="h6" component="h3">
        Ingredients:
      </Typography>
      <List sx={style}>
        {ingredients.map((ingredient) => (
          <React.Fragment key={ingredient.id}>
            <ListItem>
              <ListItemText
                primary={ingredient.name}
                secondary={`Quantity: ${ingredient.DishIngredient.quantity}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default IngredientList;
