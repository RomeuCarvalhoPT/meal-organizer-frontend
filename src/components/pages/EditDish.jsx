import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  CardMedia,
  Box,
  Card,
  Container,
  IconButton,
  Fab,
  CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import AddIcon from "@mui/icons-material/Add";
import Image_not_available from '../../images/Image_not_available.png';
import DishForm from '../molecules/DishForm';
import Loading from '../atoms/Loading';
import Resizer from "../../services/Resizer"; // Import Resizer
import { fetchDishDetails, fetchIngredients, uploadDishImage, saveDish, fetchDishImage } from '../../services/dishService';

const EditDish = () => {
  const { id } = useParams();
  const history = useHistory();
  const [dish, setDish] = useState({ name: "", picture: "", Ingredients: [] });
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (id) {
      loadDishDetails();
    } else {
      setIsLoading(false);
    }
    loadIngredients();
  }, [id]);

  const loadDishDetails = async () => {
    try {
      const data = await fetchDishDetails(id);
      const dishImage = await fetchDishImage(id);
      setImage(dishImage);
      setDish(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const loadIngredients = async () => {
    try {
      const data = await fetchIngredients();
      setIngredients(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(file, 600, 600, "JPEG", 100, 0, (uri) => {
        resolve(uri);
      }, "file");
    });
  };

  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const resizedImage = await resizeImage(file);

        if (resizedImage) {
          try {
            setIsImageLoading(true);
            const data = await uploadDishImage(id, resizedImage);
            const newUrl = data.url;
            setDish({ ...dish, picture: `${newUrl}?${Date.now()}` });
            setImage(await fetchDishImage(dish.id));
            setIsImageLoading(false);
          } catch (error) {
            setIsImageLoading(false);
          }
        }
      }
    }
  };

  const handleSave = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const data = await saveDish(id, dish);
      setIsLoading(false);
      history.push(`/dish/${data.id}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleSelect = (event, newValue) => {
    setSelectedIngredient(newValue);
  };

  const handleAddIngredient = () => {
    const existingIngredient = ingredients.find(ingredient => ingredient.id === selectedIngredient?.id);
    const newIngredient = existingIngredient || { name: inputValue, DishIngredient: { quantity: "" } };
    setDish({
      ...dish,
      Ingredients: [
        ...dish.Ingredients,
        newIngredient
      ]
    });
    setInputValue("");
    setSelectedIngredient(null);
    setIsAdding(false);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...dish.Ingredients];
    newIngredients.splice(index, 1);
    setDish({ ...dish, Ingredients: newIngredients });
  };

  const goBack = () => {
    history.goBack();
  };

  if (isLoading) {
    return <Loading />;
  }

                   return (
                     <Container maxWidth="sm">
                       <Box sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" }}} noValidate autoComplete="off">
                         <div style={{ position: "relative" }}>
                           {dish.picture && (
                             <CardMedia
                               component="img"
                               alt={dish.picture}
                               height="140"
                               image={image}
                               sx={{ objectFit: "cover", h: '10%' }}
                             />
                           )}
                           {isImageLoading && (
                             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '140px' }}>
                               <CircularProgress />
                             </Box>
                           )}
                           {!dish.picture && (
                             <CardMedia
                               component="img"
                               alt={dish.picture ? dish.name : ""}
                               height="140"
                               sx={{ objectFit: "contain" }}
                               image={dish.picture ? image : Image_not_available}
                             />
                           )}
                           <div style={{ position: "absolute", color: "red", top: "50%", left: "50%", transform: "translateX(-50%)" }}>
                             <input
                               accept="image/*"
                               id="icon-button-file"
                               type="file"
                               capture="environment"
                               style={{ display: "none" }}
                               onChange={(e) => handleCapture(e.target)}
                             />
                             <label htmlFor="icon-button-file">
                               <IconButton color="primary" aria-label="upload picture" component="span">
                                 <PhotoCameraRoundedIcon fontSize="large" color="primary" />
                               </IconButton>
                             </label>
                           </div>
                           <div style={{ position: "absolute", color: "red", top: "50%", left: "8%", transform: "translateX(-50%)" }}>
                             <Fab size="small" color="primary" aria-label="back" onClick={goBack}>
                               <ArrowBackIcon />
                             </Fab>
                           </div>
                         </div>
                         <Card>
                           <DishForm
                             dish={dish}
                             ingredients={ingredients}
                             inputValue={inputValue}
                             selectedIngredient={selectedIngredient}
                             handleInputChange={handleInputChange}
                             handleSelect={handleSelect}
                             handleAddIngredient={handleAddIngredient}
                             handleRemoveIngredient={handleRemoveIngredient}
                             handleSave={handleSave}
                             setDish={setDish}
                           />
                         </Card>
                       </Box>
                     </Container>
                   );
                   };

                   export default EditDish;