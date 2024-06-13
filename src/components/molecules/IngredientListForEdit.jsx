// src/components/molecules/IngredientList.js
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const IngredientListForEdit = ({
  ingredients,
  ingredientToEdit,
  editName,
  handleEditNameChange,
  handleDelete,
  handleEditOpen,
  handleEdit,
  setEditName
}) => (
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
);

export default IngredientListForEdit;
