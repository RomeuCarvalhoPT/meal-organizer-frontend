import React, { useEffect, useState } from "react";
import { useParams,useHistory } from 'react-router-dom';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Container,Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';

const Ingredients = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [ingredientToEdit, setIngredientToEdit] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const apiEndpoint = window.ENV.API_ENDPOINT;

  const fetchIngredients = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(apiEndpoint + `/ingredients`);
      setIngredients(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting ingredients:", error);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

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
      await axios.delete(apiEndpoint + `/ingredients/${ingredient.id}`);
      setIngredients(ingredients.filter((i) => i.id !== ingredient.id));
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(apiEndpoint + `/ingredients`, { name });
      setIngredients([...ingredients, response.data]);
      handleClose();
    } catch (error) {
      console.error("Error creating ingredient:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(apiEndpoint + `/ingredients/${id}`, { name: editName });
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
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
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

        <List>
          {ingredients.map((ingredient) => (
            <React.Fragment key={ingredient.id}>
              <ListItem disablePadding>
                <ListItemText>
                  {ingredientToEdit.id === ingredient.id ? (
                    <TextField
                      value={editName}
                      onChange={handleEditNameChange}
                      fullWidth
                    />
                  ) : (
                    ingredient.name
                  )}
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(ingredient)}>
                    <DeleteIcon />
                  </IconButton>
                  {ingredientToEdit.id === ingredient.id ? (
                    <IconButton edge="end" aria-label="save" onClick={() => handleEdit(ingredient.id)}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditOpen(ingredient)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
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
