// src/components/molecules/DishList.js
import React, { useState, useEffect } from 'react';
import { List, ListItemButton, ListItemAvatar, ListItemText, Avatar, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchDishImage } from '../../services/dishService';

const DishList = ({ dishes, handleShowDish, handleDelete }) => {
  const [images, setImages] = useState({});

  useEffect(() => {
    const updateImages = async () => {
      const newImages = {};
      for (const dish of dishes) {
        if (dish.picture) {
          newImages[dish.id] = await fetchDishImage(dish.id);
        }
      }
      setImages(newImages);
    };
    updateImages();
  }, [dishes]);

  return (
    <List sx={{ mb: 2 }}>
      {dishes.map(({ id, name, picture }) => {
        const imageUrl = images[id];
        return (
          <React.Fragment key={id}>
            <ListItemButton>
              <ListItemAvatar onClick={() => handleShowDish(id)}>
                <Avatar alt="Dish Picture" src={imageUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={name}
                onClick={() => handleShowDish(id)}
              />
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItemButton>
          </React.Fragment>
        );
      })}
    </List>
  );
};


export default DishList;
