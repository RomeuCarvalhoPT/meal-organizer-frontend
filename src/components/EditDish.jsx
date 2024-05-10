  import React, { useState, useEffect } from 'react';
  import { useParams, useHistory } from 'react-router-dom';
  import { Box, CardContent,Fab,Card,Container, TextField, Button, List, ListItem, ListItemText, IconButton, Autocomplete } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
//import * as ImagePicker from 'expo-image-picker';

  const EditDish = () => {
    const { id } = useParams();
    const history = useHistory();
    const [dish, setDish] = useState({ name: '', picture: '', Ingredients: [] });
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [isAdding, setIsAdding] = useState(false); // State to track if the "+" button is pressed
    const isMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    useEffect(() => {
      if (id) {
        fetchDishDetails();
      } else {
        setIsLoading(false); // No need to fetch details for a new dish
      }
      fetchIngredients();
    }, [id]);

    const fetchDishDetails = async () => {
      try {
        const response = await fetch(`https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev/dishes/${id}`);
        const dishData = await response.json();
        setDish(dishData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dish details:", error);
        setIsLoading(false);
      }
    };

    const fetchIngredients = async () => {
      try {
        const response = await fetch('https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev/ingredients');
        const ingredientData = await response.json();
        setIngredients(ingredientData);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const handleSave = async (e) => {
      e.preventDefault();
      try {
        const url = `https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev/dishes`;
        const method = id? 'PUT' : 'POST';
        const response = await fetch(id? `${url}/${id}` : url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dish),
        });
        if (response.ok) {
          history.push('/');
        } else {
          console.error("Error saving dish:", response.statusText);
        }
      } catch (error) {
        console.error("Error saving dish:", error);
      }
    };

  const removeIngredient = (index) => {
    const newIngredients = [...dish.Ingredients];
    newIngredients.splice(index, 1);
    setDish({...dish, Ingredients: newIngredients });
  };





    const handleInputChange = (event, newInputValue) => {
      setInputValue(newInputValue);
    };

    const handleSelect = (event, newValue) => {
      setSelectedIngredient(newValue);
    };

    const handleAddIngredient = () => {
      // Check if the selected ingredient exists in the ingredients array
      let existingIngredient = null;
      if(selectedIngredient){
        existingIngredient = ingredients.find(ingredient => ingredient.id === selectedIngredient.id);
      }
      if (!existingIngredient) {
        // If not found, use the input value as the ingredient name
        setDish({
        ...dish,
          Ingredients: [...dish.Ingredients, { name: inputValue, DishIngredient: { quantity: '' } }],
        });
      } else {
        // If found, use the existing ingredient object
        setDish({
        ...dish,
          Ingredients: [...dish.Ingredients, { name: inputValue, DishIngredient: { quantity: '' } }],
        });
      }
      // Clear the input value and selected ingredient after adding
      setInputValue("");
      setSelectedIngredient(null);
      setIsAdding(false); // Reset the isAdding state
    };
    const goBack = () => {
       history.push('/');
    };

    return (
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
        <Card>
          <Fab size="small" color="secondary" aria-label="back">
            <ArrowBackIcon onClick={goBack} />
          </Fab>
        <form onSubmit={handleSave}>
          <CardContent>
          <TextField
            label="Dish Name"
            value={dish.name}
            onChange={(e) => setDish({...dish, name: e.target.value })}
          />
          <TextField
            label="Picture URL"
            value={dish.picture}
            onChange={(e) => setDish({...dish, picture: e.target.value })}
          />
          <Autocomplete
            freeSolo
            value={selectedIngredient}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleSelect}
            options={ingredients}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Add Ingredient" />}
          />
          <Fab size="small" color="secondary" aria-label="back">
            <AddIcon onClick={handleAddIngredient} />
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
                    setDish({...dish, Ingredients: newIngredients });
                  }}
                  sx={{
                    width: '50px',
                    textAlign: 'right', // Align text to the right
                    '&.MuiInputBase-input': {
                      paddingRight: '1px', // Add padding to the right of the input to accommodate the adornment
                    },
                  }}
                />
                <IconButton onClick={() => removeIngredient(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button type="submit">Save</Button>
            </CardContent>
        </form>
          
          </Card>

      </Box>
    );
};

export default EditDish;
