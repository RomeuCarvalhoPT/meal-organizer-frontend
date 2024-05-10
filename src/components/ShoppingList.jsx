import React from 'react';
import { List, ListItem, Typography } from '@material-ui/core';

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    fetch('/api/shopping-list')
      .then(response => response.json())
      .then(data => setShoppingList(data));
  }, []);

  return (
    <List>
      {shoppingList.map(item => (
        <ListItem key={item.id}>
          <Typography variant="body1">
            {item.name} ({item.quantity})
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default ShoppingList;