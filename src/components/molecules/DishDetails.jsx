// src/components/molecules/DishDetails.js
import React from 'react';
import { Box, Typography, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const DishDetails = ({ dish, goToEdit }) => (
  <Box>
    <Typography variant="h5" component="h2">
      {dish.name}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Created at: {new Date(dish.createdAt).toLocaleDateString()}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Updated at: {new Date(dish.updatedAt).toLocaleDateString()}
    </Typography>
    <Fab size="small" color="primary" aria-label="edit" onClick={goToEdit}>
      <EditIcon />
    </Fab>
  </Box>
);

export default DishDetails;
