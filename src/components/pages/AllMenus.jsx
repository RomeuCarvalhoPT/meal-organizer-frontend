import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Card, CardContent, Container, Fab, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import Loading from '../atoms/Loading';
import MenuList from '../molecules/MenuList';
import { fetchAllMenus, deleteMenu } from '../../services/menuService';

const AllMenus = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    try {
      const data = await fetchAllMenus();
      setMenus(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleDelete = async (menuId) => {
    try {
      const isDeleted = await deleteMenu(menuId);
      if (isDeleted) {
        setMenus(menus.filter((menu) => menu.id !== menuId));
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
    history.push("/generateMenu");
  };

  if (isLoading) {
    return <Loading />;
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
            <Fab size="small" color="primary" aria-label="add" sx={{ position: 'absolute', top: 16, right: 15 }} onClick={generateMenu}>
              <AddIcon />
            </Fab>
            <Typography variant="h4" component="h3" style={{ textAlign: "center" }}>
              Saved Menus
            </Typography>
            <MenuList menus={menus} handleMenuClick={handleMenuClick} handleDelete={handleDelete} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AllMenus;
