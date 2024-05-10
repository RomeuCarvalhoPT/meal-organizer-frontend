import React from 'react';
import { Button, Typography } from '@material-ui/core';

const MenuGenerator = () => {
  const [randomDish, setRandomDish] = useState(null);

  const handleGenerateRandomDish = () => {
    fetch('/api/menu/random')
      .then(response => response.json())
      .then(data => setRandomDish(data));
  };

  const handleGenerateWeeklyMenu = () => {
    // TO DO: implement weekly menu generation
  };

  const handleGenerateCustomMenu = () => {
    // TO DO: implement custom menu generation
  };

  return (
    <div>
      <Typography variant="h5" component="h2">
        Menu Generator
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGenerateRandomDish}>
        Generate Random Dish
      </Button>
      <Button variant="contained" color="primary" onClick={handleGenerateWeeklyMenu}>
        Generate Weekly Menu
      </Button>
      <Button variant="contained" color="primary" onClick={handleGenerateCustomMenu}>
        Generate Custom Menu
      </Button>
      {randomDish && (
        <Typography variant="h5" component="h2">
          Random Dish: {randomDish.name}
        </Typography>
      )}
    </div>
  );
};

export default MenuGenerator;