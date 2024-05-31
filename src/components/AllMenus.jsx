import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Fab,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import axios from "../api/axios";

const AllMenus = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get("/menus/all");
      setMenus(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching menus:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (menuId) => {
    try {
      const response = await axios.delete(`/menus/${menuId}`);
      if (response.status === 200) {
        setMenus(menus.filter((menu) => menu.id !== menuId));
      } else {
        console.error("Error deleting menu:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  const handleMenuClick = (menuId) => {
    history.push(`/menuDetails/${menuId}`);
  };

  const goBack = () => {
    history.goBack();
  };

  const generateMenu = () => {
    history.push("/menuGenerator");
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
        <Card>
          <CardContent sx={{ position: 'relative' }}>
            <Fab size="small" color="primary" aria-label="back" onClick={goBack}>
              <ArrowBackIcon />
            </Fab>
            <Fab size="small" color="primary" aria-label="back" sx={{ position: 'absolute', top: 16, right: 15 }}>
              <AddIcon onClick={generateMenu} />
            </Fab>
            <Typography variant="h4" component="h3" style={{ textAlign: "center" }}>
              Saved Menus
            </Typography>
            <List>
              {menus.map((menu) => (
                <ListItem key={menu.id} button onClick={() => handleMenuClick(menu.id)}>
                  <ListItemText
                    primary={
                      <ul>
                        {menu.Dishes?.map((dish) => (
                          <li key={dish.name}>{dish.name}</li>
                        ))}
                      </ul>
                    }
                    secondary={`Created at ${new Date(menu.createdAt).toLocaleString()}`}
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(menu.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Divider />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AllMenus;
