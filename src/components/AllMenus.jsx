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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from '@mui/material/CircularProgress';

const AllMenus = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await fetch(
        "https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev/menus/all"
      );
      const menusData = await response.json();
      setMenus(menusData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching menus:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (menuId) => {
    try {
      const response = await fetch(
        `https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev/menus/${menuId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
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
  }

  const generateMenu = () => {
    history.push("/menuGenerator");
  }

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
          <CardContent>
            <Fab size="small" color="primary" aria-label="back" onClick={goBack}>
              <ArrowBackIcon />
            </Fab>
            <Button
              variant="contained"
              color="primary"
              onClick={generateMenu}
              disabled={isLoading}
              style={{display: 'block', margin: 'auto'}} // Added style for center alignment
            >
              Generate
            </Button>
            <Typography variant="h4" component="h3">
              Saved Menus
            </Typography>
            <List>
              {menus.map((menu) => (
                <ListItem
                  key={menu.id}
                  button
                  onClick={() => handleMenuClick(menu.id)}
                >                
                  <ListItemText
                    primary=<ul>
                      {menu.Dishes?.map((dish) => (
                          <li key={dish.name}>
                            {dish.name}
                          </li>
                      ))}
                    </ul>
                    secondary={`Created at ${new Date(
                      menu.createdAt
                    ).toLocaleString()}`}
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
