// src/components/molecules/DishDialog.js
import React from 'react';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const DishDialog = ({ isDialogOpen, availableDishes, handleSelectDish, handleCloseDialog }) => (
  <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
    <DialogTitle>Select a Dish</DialogTitle>
    <DialogContent>
      <List>
        {availableDishes.map((dish) => (
          <ListItem button onClick={() => handleSelectDish(dish)} key={dish.id}>
            <ListItemText primary={dish.name} />
          </ListItem>
        ))}
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

export default DishDialog;
