import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Box, Container, Card, CardContent } from '@mui/material';
import Loading from '../atoms/Loading';
import DishDetails from '../molecules/DishDetails';
import DishImage from '../molecules/DishImage';
import IngredientList from '../molecules/IngredientList';
import { fetchDishDetails, fetchDishImage } from '../../services/dishService';

const Dish = () => {
  const { id } = useParams();
  const [dish, setDish] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dishPicture, setDishPicture] = useState(null);
  const history = useHistory();

  useEffect(() => {
    loadDishDetails();
  }, [id]);

  const loadDishDetails = async () => {
    try {
      const dishData = await fetchDishDetails(id);
      setDish(dishData);
      const imageUrl = await fetchDishImage(id);
      setDishPicture(imageUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const goBack = () => {
    history.push('/');
  };

  const goToEdit = () => {
    history.push(`/editDish/${id}`);
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <DishImage dishPicture={dishPicture} goBack={goBack} />
        <CardContent>
          <DishDetails dish={dish} goToEdit={goToEdit} />
          <IngredientList ingredients={dish.Ingredients} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dish;
