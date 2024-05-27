    import React, { useState, useEffect } from "react";
    import { useParams, useHistory } from "react-router-dom";
    import {
      CardMedia,
      Box,
      CardContent,
      Fab,
      Card,
      Container,
      TextField,
      Button,
      List,
      ListItem,
      ListItemText,
      IconButton,
      Autocomplete,
    } from "@mui/material";
    import DeleteIcon from "@mui/icons-material/Delete";
    import ArrowBackIcon from "@mui/icons-material/ArrowBack";
    import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
    import AddIcon from "@mui/icons-material/Add";
    import InputAdornment from "@mui/material/InputAdornment";
    import SaveIcon from '@mui/icons-material/Save';
    import Resizer from "./Resizer"; // Import Resizer
    import CircularProgress from '@mui/material/CircularProgress';
import Image_not_available from '../images/Image_not_available.png';

    

    const EditDish = () => {
      const { id } = useParams();
      const history = useHistory();
      const [dish, setDish] = useState({ name: "", picture: "", Ingredients: [] });
      const [ingredients, setIngredients] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [inputValue, setInputValue] = useState("");
      const [selectedIngredient, setSelectedIngredient] = useState(null);
      const [isAdding, setIsAdding] = useState(false); // State to track if the "+" button is pressed
      const [image, setImage] = useState("");
      const apiEndpoint = window.ENV.API_ENDPOINT
      const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      };

      useEffect(() => {
        if (id) {
          fetchDishDetails();
        } else {
          setIsLoading(false); // No need to fetch details for a new dish
        }
        fetchIngredients();
      }, [id]);

      

      // Function to resize an image using React Image File Resizer
      const resizeImage = (file) => {
        return new Promise((resolve, reject) => {
          Resizer.imageFileResizer(file, 600, 600, "JPEG", 100, 0, (uri) => {
            resolve(uri); // Returns the data URL of the resized image
          }, "file"); // Define the data type and quality for the resized image
        });
      };

      
      const handleCapture = async (target) => {
        if (target.files) {
          if (target.files.length !== 0) {
            const file = target.files[0];
            const resizedImage = await resizeImage(file);

            if (resizedImage) {
              const formData = new FormData();
              // Add a new image name
              formData.append("image", resizedImage, `dish_${id}.jpg`); 
              try {
                setIsLoading(true);
                const response = await fetch(apiEndpoint +
                  `/files/upload`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );
                setIsLoading(false);
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }

                const data = await response.json(); // Assuming the server responds with JSON containing the URL or identifier of the uploaded image
                const newUrl = data.url; // Adjust according to the actual response structure
// Force reload of the image, even if the URL is the same
                setDish({ ...dish, picture: `${newUrl}?${Date.now()}`});

                //setDish({...dish, picture: `${newUrl}?${Date.now()}` });
            
                setImage(dish.picture);
               
                //setDish({...dish, picture: newUrl });
              
                
              } catch (error) {
                console.error(
                  "There was a problem with the fetch operation:",
                  error
                );
              }
            }
          }
        }
      };

      const fetchDishDetails = async () => {
        try {
          const response = await fetch(apiEndpoint +
            `/dishes/${id}`
          );
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
          const response = await fetch(apiEndpoint +
            "/ingredients"
          );
          const ingredientData = await response.json();
          setIngredients(ingredientData);
        } catch (error) {
          console.error("Error fetching ingredients:", error);
        }
      };

      if (isLoading) {
        return (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        );
      }

      const handleSave = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
          const url = apiEndpoint + `/dishes`;
          const method = id ? "PUT" : "POST";
          const response = await fetch(id ? `${url}/${id}` : url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dish),
          });
          if (response.ok) {
            setIsLoading(false);
            const data = await response.json();
            history.push(`/dish/${data.id}`);
          } else {
            setIsLoading(false);
            console.error("Error saving dish:", response.statusText);
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Error saving dish:", error);
        }
      };

      const removeIngredient = (index) => {
        const newIngredients = [...dish.Ingredients];
        newIngredients.splice(index, 1);
        setDish({ ...dish, Ingredients: newIngredients });
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
        if (selectedIngredient) {
          existingIngredient = ingredients.find(
            (ingredient) => ingredient.id === selectedIngredient.id
          );
        }
        if (!existingIngredient) {
          // If not found, use the input value as the ingredient name
          setDish({
            ...dish,
            Ingredients: [
              ...dish.Ingredients,
              { name: inputValue, DishIngredient: { quantity: "" } },
            ],
          });
        } else {
          // If found, use the existing ingredient object
          setDish({
            ...dish,
            Ingredients: [
              ...dish.Ingredients,
              { name: inputValue, DishIngredient: { quantity: "" } },
            ],
          });
        }
        // Clear the input value and selected ingredient after adding
        setInputValue("");
        setSelectedIngredient(null);
        setIsAdding(false); // Reset the isAdding state
      };
      const goBack = () => {
        history.goBack();
      };

      if (isLoading) {
        return (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        );
      }

      return (
        <Container maxWidth="sm">
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ position: "relative" }}>

            {dish.picture && (
               <CardMedia component="img" alt={dish.picture} height="140" image={dish.picture} sx={{ objectFit: "cover", h: '10%'  }} onChange={(e) => setDish({...dish, picture: e.target.value })}/>
            )}
              {!dish.picture && (
                 <CardMedia component="img" alt={dish.picture ? dish.name : ""} height="140" sx={{ objectFit: "contain" }} image={dish.picture ? dish.picture : Image_not_available}/>
              )}
              <div style={{position: "absolute", color: "red",top: "50%",left: "50%",transform: "translateX(-50%)",}}>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  capture="environment"
                  style={{ display: "none" }}
                  onChange={(e) => handleCapture(e.target)}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCameraRoundedIcon fontSize="large" color="primary" />
                  </IconButton>
                </label>
              </div>
            <div style={{position: "absolute", color: "red",top: "50%",left: "8%",transform: "translateX(-50%)",}}>
              <Fab size="small" color="primary" aria-label="back">
                <ArrowBackIcon onClick={goBack} />
              </Fab>
            </div>
          </div>
           
          <Card>

            <form onSubmit={handleSave}>
              <CardContent>
                <TextField
                  label="Dish Name"
                  value={dish.name}
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
                <Fab size="small" color="primary" aria-label="back">
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
                          newIngredients[index].DishIngredient.quantity =
                            e.target.value;
                          setDish({ ...dish, Ingredients: newIngredients });
                        }}
                        style={{ width: "13ch" }}
                        sx={{
                           textAlign: "right", // Align text to the right
                          "&.MuiInputBase-input": {
                            paddingRight: "1px", // Add padding to the right of the input to accommodate the adornment
                            // Add a right border to visually separate the input field from the icon
                            borderRight: "1px solid #ccc",
                            // Adjust the margin to create a small gap between the input and the icon
                            marginRight: "10px", 
                            width: "1ch"
                          },
                        }}
                       
                      />
                      <IconButton onClick={() => removeIngredient(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
                <Fab size="small" color="primary" aria-label="back" type="submit">
                  <SaveIcon />
                </Fab>

              </CardContent>
            </form>
          </Card>
        </Box>
        </Container>
      );
    };

    export default EditDish;
