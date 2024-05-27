import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Divider,
  Fab,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from "@mui/material";
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from '@mui/material/CircularProgress';
import Image_not_available from '../images/Image_not_available.png';

const GenerateMenu = () => {
  const history = useHistory();
  const [numDishes, setNumDishes] = useState(5);
  const [menuDishes, setMenuDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableDishes, setAvailableDishes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const apiEndpoint = window.ENV.API_ENDPOINT;

  useEffect(() => {
    const fetchAvailableDishes = async () => {
      try {
        const response = await fetch(apiEndpoint + `/dishes`);
        const data = await response.json();
        setAvailableDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchAvailableDishes();
  }, [apiEndpoint]);

  const handleGenerateMenu = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiEndpoint + `/menus/generate-menu/${numDishes}`, {
        method: "POST"
      });
      const menuData = await response.json();
      setMenuDishes(menuData.dishes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSaveMenu = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(apiEndpoint + `/menus/save`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dishes: menuDishes })
      });
      const responseText = await response.json();
      setIsLoading(false);
      history.push(`/allMenus`);
    } catch (error) {
      console.error("Error saving menu:", error);
      alert("Error saving menu. Please try again later.");
      setIsLoading(false);
    }
  };

  const goBack = () => {
    history.back();
  };

  const handleAddDish = () => {
    setIsDialogOpen(true);
  };

  const handleSelectDish = (dish) => {
    setMenuDishes([...menuDishes, dish]);
    setIsDialogOpen(false);
  };

  const handleRemoveDish = (index) => {
    const newMenuDishes = menuDishes.slice();
    newMenuDishes.splice(index, 1);
    setMenuDishes(newMenuDishes);
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
          <div style={{ position: "relative" }}>
            <Typography  variant="h6" component="h3" style={{textAlign: "center"}}>
              Compose Menu
            </Typography>
               <div style={{position: "absolute", color: "red",top: "50%",left: "8%",transform: "translateX(-50%)",}}>
                  <Fab size="small" color="primary" aria-label="back">
                     <ArrowBackIcon onClick={goBack} />
                   </Fab>
               </div>
             </div>

          <CardContent>
<Box>
            <NumberInput
              label="Required"
              aria-label="Num Dishes"
              min={1}
              max={10}
              value={numDishes}
              style={{ width: "13ch", marginLeft: '40px', marginRight: '15px' }}
              onChange={(event, val) => setNumDishes(val)}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateMenu}
              disabled={isLoading}
              style={{  marginLeft: '40px', marginRight: '40px' }}
            >
              Randomize
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddDish}
            >
              <AddIcon /> Add Dish
            </Button>
  </Box>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>

          <CardContent>
            <List>
              {menuDishes && menuDishes.map((dish, index) => (
                <React.Fragment key={dish.id}>
                  <ListItem>
                    <ListItemText
                      primary={dish.name}
                      secondary={
                        <div>
                          {dish.picture ? (
                            <CardMedia
                              component="img"
                              alt={dish.name}
                              height="140"
                              image={dish.picture}
                              sx={{ objectFit: "cover" }}
                            />
                          ) : (
                            <CardMedia
                              component="img"
                              alt=""
                              height="140"
                              sx={{ objectFit: "contain" }}
                              image={Image_not_available}
                            />
                          )}
                          <ul>
                            {dish.ingredients &&   dish.ingredients.map((ingredient) => (
                              <li key={ingredient.id}>
                                {ingredient.name} - {ingredient.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                    />
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDish(index)}>
                      <RemoveIcon />
                    </IconButton>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>

          </CardContent>
        </Card>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Select a Dish</DialogTitle>
          <DialogContent>
            <List>
              {availableDishes.map((dish) => (
                <ListItem button onClick={() => handleSelectDish(dish)} key={dish.id}>
                  <ListItemText primary={dish.name} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveMenu}
          disabled={isLoading}
        >
          Save
        </Button>
      </Box>
    </Container>
  );
};

const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default GenerateMenu;
