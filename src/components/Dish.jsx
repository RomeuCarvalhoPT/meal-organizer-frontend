import React ,{ useEffect, useState }from "react";
import { useParams,useHistory } from 'react-router-dom';
import {Box, Fab, Button, Container, Card, CardContent, CardMedia, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import Image_not_available from '../images/Image_not_available.png';
import axios from "../api/axios";




const Dish = () => {
  const { id } = useParams(); // Extract the id from the URL
  const [dish, setDish] = useState({}); // Initialize state with an empty object
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const history = useHistory();
  const apiEndpoint = window.ENV.API_ENDPOINT;

  

  const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };

  
  useEffect(() => {
     fetchDishDetails();
  }, [id]);

  
  const fetchDishDetails = async () => {
    try {

      const response = await axios.get(`/dishes/${id}`, {
        method: "GET",
      });
      const dishData = response.data;
      setDish(dishData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting dish:", error);
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  
  const goBack = () => {
     history.push('/');
  };

  const goToEdit = () => {
     history.push(`/editDish/${id}`);
  };


if(!isLoading){
return (
  <Container maxWidth="sm">
    <Card>
      <div style={{ position: "relative" }}>
      {dish.picture && (
         <CardMedia component="img" alt={dish.picture} height="140" image={dish.picture} sx={{ objectFit: "cover", h: '10%'  }}/>
      )}
        {!dish.picture && (
           <CardMedia component="img" alt={dish.picture ? dish.name : ""} height="140" sx={{ objectFit: "contain" }} image={dish.picture ? dish.picture : Image_not_available}/>
        )}
         <div style={{position: "absolute", color: "red",top: "50%",left: "8%",transform: "translateX(-50%)",}}>
            <Fab size="small" color="primary" aria-label="back">
               <ArrowBackIcon onClick={goBack} />
             </Fab>
         </div>
       </div>
      
      <CardContent>
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
        <Fab size="small" color="primary" aria-label="back">
          <EditIcon onClick={goToEdit}/>
        </Fab>

      </Box>
        <Typography variant="h6" component="h3">
          Ingredients:
        </Typography>

        <List sx={style}>
          {dish.Ingredients.map((Ingredient) => (
            <React.Fragment key={Ingredient.id}>
              <ListItem>
                <ListItemText primary={Ingredient.name} secondary={`Quantity: ${Ingredient.DishIngredient.quantity}`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  </Container>
 );
};
  }

export default Dish;
