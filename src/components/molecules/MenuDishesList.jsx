// src/components/molecules/MenuDishesList.js
import React from 'react';
import { List, ListItem, ListItemText, CardMedia, IconButton, Divider } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import Image_not_available from '../../images/Image_not_available.png';

const MenuDishesList = ({ menuDishes, handleRemoveDish }) => (
  <List>
    {menuDishes.map((dish, index) => (
      <React.Fragment key={dish.id}>
        <ListItem>
          <ListItemText
            primary={dish.name}
            secondary={
              <div>
                {dish.picture ? (
                  <CardMedia
                    component="img"
                    alt={dish.name}
                    height="140"
                    image={dish.picture}
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    alt=""
                    height="140"
                    sx={{ objectFit: "contain" }}
                    image={Image_not_available}
                  />
                )}
                <ul>
                  {dish.ingredients && dish.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.name} - {ingredient.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
          <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDish(index)}>
            <RemoveIcon />
          </IconButton>
        </ListItem>
        <Divider />
      </React.Fragment>
    ))}
  </List>
);

export default MenuDishesList;
