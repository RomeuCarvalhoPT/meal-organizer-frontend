// src/components/DishList.js
import React, { useState, useEffect } from 'react';
import DishForm from './DishForm';
import { Link } from 'react-router-dom';

const DishList = () => {
 const [dishes, setDishes] = useState([]);

 useEffect(() => {
    fetchDishes();
 }, []);

 const fetchDishes = async () => {
    try {
      const response = await fetch('https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev/dishes');
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
 };

 const handleDelete = async (id) => {
    try {
      await fetch(`https://b9dc757f-9d7d-4606-bcdd-6b1a7ecc5dfb-00-2x24kmucxylkj.worf.replit.dev/dishes/${id}`, {
        method: 'DELETE',
      });
      setDishes(dishes.filter(dish => dish.id !== id));
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
 };

 return (
    <div>
      <h2>Dishes</h2>
      <Link to="/add-dish">Add New Dish</Link>
      <ul>
        {dishes.map(dish => (
          <li key={dish.id}>
            {dish.name}
            <button onClick={() => handleDelete(dish.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
 );
};

export default DishList;
