import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';

export default function ManageFoodItem() {
  // State to hold food items
  const [foodItems, setFoodItems] = useState([]);

  // Effect to fetch food items from the database
  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Function to fetch food items from the database
  const fetchFoodItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodItem");
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  // Function to add a new food item
  const addFoodItem = async (newFoodItem) => {
    try {
      const response = await fetch("http://localhost:5000/api/foodItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newFoodItem)
      });
      const data = await response.json();
      setFoodItems([...foodItems, data]); // Add the new food item to the existing list
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  // Function to delete a food item
  const deleteFoodItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/foodItem/${id}`, {
        method: "DELETE"
      });
      setFoodItems(foodItems.filter(item => item._id !== id)); // Filter out the deleted item
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  // Function to update a food item
  const updateFoodItem = async (updatedFoodItem) => {
    try {
      const response = await fetch(`http://localhost:5000/api/foodItem/${updatedFoodItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFoodItem)
      });
      const data = await response.json();
      setFoodItems(foodItems.map(item => (item._id === updatedFoodItem._id ? data : item))); // Update the food item in the list
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  return (
    <div>
      <AdminNavbar />

      {/* List of existing food items */}
      <div>
        <h2>Existing Food Items</h2>
        <ul>
          {foodItems.map(item => (
            <li key={item._id}>
              <strong>Name:</strong> {item.name}<br />
              <strong>Category Name:</strong> {item.CategoryName}<br />
              <strong>Image:</strong> <img src={item.img} alt={item.name} /><br />
              <strong>Description:</strong> {item.description}<br />
              {/* Display options if available */}
              {item.options && item.options.length > 0 && (
                <div>
                  <strong>Options:</strong>
                  <ul>
                    {item.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Buttons for updating and deleting food item */}
              <button onClick={() => deleteFoodItem(item._id)}>Delete</button>
              <button onClick={() => updateFoodItem(item)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
