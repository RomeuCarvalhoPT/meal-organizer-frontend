// src/components/molecules/DishForm.js
import React from 'react';
import {
  CardContent,
  TextField,
  Fab,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Autocomplete
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const DishForm = ({
  dish,
  ingredients,
  inputValue,
  selectedIngredient,
  handleInputChange,
  handleSelect,
  handleAddIngredient,
  handleRemoveIngredient,
  handleSave,
  setDish
}) => (
  <form onSubmit={handleSave}>
    <CardContent>
      <TextField
        label="Dish Name"
        value={dish.name}
        required
        onChange={(e) => setDish({ ...dish, name: e.target.value })}
      />

      <Autocomplete
        freeSolo
        value={selectedIngredient}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleSelect}
        options={ingredients}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Add Ingredient" />
        )}
      />
      <Fab size="small" color="primary" aria-label="add" onClick={handleAddIngredient}>
        <AddIcon />
      </Fab>

      <List>
        {dish.Ingredients.map((ingredient, index) => (
          <ListItem key={ingredient.id}>
            <ListItemText primary={ingredient.name} />
            <TextField
              label="Quantity"
              value={ingredient.DishIngredient.quantity}
              onChange={(e) => {
                const newIngredients = [...dish.Ingredients];
                newIngredients[index].DishIngredient.quantity = e.target.value;
                setDish({ ...dish, Ingredients: newIngredients });
              }}
              style={{ width: "13ch" }}
              sx={{
                textAlign: "right",
                "&.MuiInputBase-input": {
                  paddingRight: "1px",
                  borderRight: "1px solid #ccc",
                  marginRight: "10px",
                  width: "1ch"
                },
              }}
            />
            <IconButton onClick={() => handleRemoveIngredient(index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Fab size="small" color="primary" aria-label="save" type="submit">
        <SaveIcon />
      </Fab>
    </CardContent>
  </form>
);

export default DishForm;
