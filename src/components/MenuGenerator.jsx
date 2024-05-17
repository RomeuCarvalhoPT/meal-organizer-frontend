import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Divider,
  Typography
} from "@mui/material";
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const GenerateMenu = () => {
  const [numDishes, setNumDishes] = useState(5); // Default number of dishes
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateMenu = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev/menus/generate-menu/${numDishes}`, {
          method: "POST",
        }
      );
      const menuData = await response.json();
      setMenu(menuData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating menu:", error);
      setIsLoading(false);
    }
  };

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
            <NumberInput aria-label="Num Dishes" min={1} max={10} value={numDishes} onChange={(event, val) => setNumDishes(val)}/>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateMenu}
              disabled={isLoading}
            >
              Generate
            </Button>
          </CardContent>
        </Card>
        {isLoading && <div>Loading...</div>}
        {menu && (
          <Card sx={{ mt: 2 }}>
            <Typography variant="h4" component="h3">
              Generated Menu
            </Typography>
            <CardContent>
             
              <List >
                {menu.Dishes.map((dish) => (
             <React.Fragment >
                  <ListItem key={dish.id}>
                    <ListItemText
                      primary={dish.name}
                      secondary={
                        <div>
                          <CardMedia
                            component="img"
                            height="140"
                            image={dish.picture}
                            alt={dish.name}
                          />
                          <ul>
                            {dish.Ingredients.map((ingredient) => (
                              <li key={ingredient.id}>
                                {ingredient.name} - {ingredient.DishIngredient.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      }
                    />
                  </ListItem>
               <Divider />
               </React.Fragment>
                ))}           
              </List>
            </CardContent>
          </Card>
        )}
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



const listStyle = {
  py: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

export default GenerateMenu;
