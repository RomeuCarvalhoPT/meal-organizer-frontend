import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Loading from '../atoms/Loading';
import IngredientListForEdit from '../molecules/IngredientListForEdit';
import {
  fetchIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient
} from '../../services/ingredientService';

const Ingredients = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [ingredientToEdit, setIngredientToEdit] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    try {
      setIsLoading(true);
      const data = await fetchIngredients();
      setIngredients(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleEditOpen = (ingredient) => {
    setEditOpen(true);
    setIngredientToEdit(ingredient);
    setEditName(ingredient.name);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setIngredientToEdit({});
    setEditName("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEditNameChange = (event) => {
    setEditName(event.target.value);
  };

  const handleDelete = async (ingredient) => {
    try {
      await deleteIngredient(ingredient.id);
      setIngredients(ingredients.filter((i) => i.id !== ingredient.id));
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const data = await createIngredient(name);
      setIngredients([...ingredients, data]);
      handleClose();
    } catch (error) {
      console.error("Error creating ingredient:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await updateIngredient(id, editName);
      setIngredients(ingredients.map((i) => (i.id === id ? { ...i, name: editName } : i)));
      handleEditClose();
    } catch (error) {
      console.error("Error editing ingredient:", error);
    }
  };

  const goBack = () => {
    history.push('/');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Fab size="small" color="primary" aria-label="back" onClick={goBack}>
            <ArrowBackIcon />
          </Fab>
          <Typography variant="h4" component="h2" sx={{ textAlign: 'center' }}>
            Ingredients
          </Typography>
          <IngredientListForEdit
            ingredients={ingredients}
            ingredientToEdit={ingredientToEdit}
            editName={editName}
            handleEditNameChange={handleEditNameChange}
            handleDelete={handleDelete}
            handleEditOpen={handleEditOpen}
            handleEdit={handleEdit}
          />
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
          <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleOpen}>
            Add new ingredient
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Ingredient</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new ingredient, please enter the name here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Ingredient Name"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Add</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Container>
  );
};

export default Ingredients;
