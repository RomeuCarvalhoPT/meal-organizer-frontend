import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Button,
  Fab,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from '../atoms/Loading';
import DishDialog from '../molecules/DishDialog';
import MenuDishesList from '../molecules/MenuDishesList';
import { fetchAvailableDishes, generateMenu, saveMenu } from '../../services/menuService';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const GenerateMenu = () => {
  const history = useHistory();
  const [numDishes, setNumDishes] = useState(5);
  const [menuDishes, setMenuDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [availableDishes, setAvailableDishes] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const loadAvailableDishes = async () => {
      try {
        const data = await fetchAvailableDishes();
        setAvailableDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    loadAvailableDishes();
  }, []);

  const handleGenerateMenu = async () => {
    setIsLoading(true);
    try {
      const menuData = await generateMenu(numDishes);
      setMenuDishes(menuData.dishes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleSaveMenu = async () => {
    setIsLoading(true);
    try {
      await saveMenu(menuDishes);
      setIsLoading(false);
      history.push(`/allMenus`);
    } catch (error) {
      console.error("Error saving menu:", error);
      alert("Error saving menu. Please try again later.");
      setIsLoading(false);
    }
  };

  const goBack = () => {
    history.goBack();
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

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
        <Card sx={{ position: 'relative' }}>
          <div style={{ position: "relative" }}>
            <Typography variant="h6" component="h3" style={{ textAlign: "center" }}>
              Compose Menu
            </Typography>
            <Fab size="small" color="primary" aria-label="back" style={{ position: "absolute", top: "50%", left: "8%", transform: "translateX(-50%)" }}>
              <ArrowBackIcon onClick={goBack} />
            </Fab>
          </div>
          <CardContent sx={{ position: 'relative' }}>
            <Box>
              <NumberInput
                label="Required"
                aria-label="Num Dishes"
                min={1}
                max={10}
                value={numDishes}
                sx={{ width: "13ch", marginLeft: '15%', position: 'relative' }}
                onChange={(event, val) => setNumDishes(val)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleGenerateMenu}
                disabled={isLoading}
                sx={{ marginLeft: '15%', marginRight: '10px', width: "13ch" }}
              >
                Randomize
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: '15px', width: "20ch" }}
                onClick={handleAddDish}
              >
                <AddIcon /> Add Dish
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <MenuDishesList menuDishes={menuDishes} handleRemoveDish={handleRemoveDish} />
          </CardContent>
        </Card>
        <DishDialog
          isDialogOpen={isDialogOpen}
          availableDishes={availableDishes}
          handleSelectDish={handleSelectDish}
          handleCloseDialog={handleCloseDialog}
        />
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
