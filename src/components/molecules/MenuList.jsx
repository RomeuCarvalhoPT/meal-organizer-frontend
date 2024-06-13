// src/components/molecules/MenuList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MenuList = ({ menus, handleMenuClick, handleDelete }) => (
  <List>
    {menus.map((menu) => (
      <ListItem key={menu.id} button onClick={() => handleMenuClick(menu.id)}>
        <ListItemText
          primary={
            <ul>
              {menu.Dishes?.map((dish) => (
                <li key={dish.name}>{dish.name}</li>
              ))}
            </ul>
          }
          secondary={`Created at ${new Date(menu.createdAt).toLocaleString()}`}
        />
        <IconButton
          aria-label="delete"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(menu.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
        <Divider />
      </ListItem>
    ))}
  </List>
);

export default MenuList;
