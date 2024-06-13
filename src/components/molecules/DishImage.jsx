// src/components/molecules/DishImage.js
import React from 'react';
import { CardMedia, Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image_not_available from '../../images/Image_not_available.png';

const DishImage = ({ dishPicture, goBack }) => (
  <div style={{ position: "relative" }}>
    {dishPicture && (
      <CardMedia
        component="img"
        alt="Dish Image"
        height="140"
        image={dishPicture}
        sx={{ objectFit: "cover", h: '10%' }}
      />
    )}
    {!dishPicture && (
      <CardMedia
        component="img"
        alt="Image not available"
        height="140"
        sx={{ objectFit: "contain" }}
        image={Image_not_available}
      />
    )}
    <div style={{ position: "absolute", color: "red", top: "50%", left: "8%", transform: "translateX(-50%)" }}>
      <Fab size="small" color="primary" aria-label="back" onClick={goBack}>
        <ArrowBackIcon />
      </Fab>
    </div>
  </div>
);

export default DishImage;
