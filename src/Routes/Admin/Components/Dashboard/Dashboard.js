import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar/AdminNavbar';



const Dashboard = () => {
  const [categoryData, setCategoryData] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryNameEng, setNewCategoryNameEng] = useState('');
  const navigate = useNavigate();

  

  const getCategoryData = async () => {
    try {
      const response = await axios.get('https://api.jashabrewing.com/CategoryData');
      setCategoryData(response.data);
    } catch (error) {
      console.error('Error fetching AdminData:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCategoryData();

    };
    fetchData();
  }, []);

  

  const handleAddCategoryClick = () => {
    const addCategoryOverlay = document.querySelector('.add-category-overlay');
    addCategoryOverlay.classList.add('show-add-category');
  };

  const handleAddCategoryClose = () => {
    const addCategoryOverlay = document.querySelector('.add-category-overlay');
    addCategoryOverlay.classList.remove('show-add-category');
  };

  const addNewCategory = () => {
    // Create a new category object
    const newCategory = {
      name: newCategoryName,
      nameEng: newCategoryNameEng
      // Add other properties as needed
    };

    // Update categoryData state with the new category
    setCategoryData((prevCategoryData) => [...prevCategoryData, newCategory]);

    // Clear the input field
    setNewCategoryName('');
    setNewCategoryNameEng('');
    handleAddCategoryClose();
  };

  const saveCategoryData = async () => {
    try {
      // Send a POST request to your server with categoryData
      await axios.post('https://api.jashabrewing.com/SaveCategoryData', { categoryData });
      console.log('Category data saved successfully!');
    } catch (error) {
      console.log('Error details:', error.response); // Log the detailed error response
      console.error('Error saving category data:', error);
    }
  };

  const handleSaveCategoryClick = () => {
    // Call the saveCategoryData function when the "SHRANI" button is clicked
    saveCategoryData();
  };

  const handleCategoryClick = (category) => {
    // Handle category click
    navigate(`/Items/${category.name}`, { state: { category } });


  };
  
  const handleMenuBarClick = (e, category) => {
    e.stopPropagation();

    const updatedCategoryData = categoryData.filter((item) => item !== category);
    
    // Update the state with the new categoryData
    setCategoryData(updatedCategoryData);
  };

  return (
    <div className='dashboard-main'>
      <AdminNavbar/>
      <div className='dashboard-wrapper'>
      <h1 className='items-header'>TRGOVINA</h1> 
        <div className='buttons-row'>
          <button className='add-category-button' onClick={handleAddCategoryClick}>DODAJ MENI</button>
          <button className='save-category-button' onClick={handleSaveCategoryClick}>SHRANI</button>
        </div>

        <div className='categories'>
          {categoryData &&
            categoryData.map((category, index) => (
              <div key={index} className='category' onClick={() => handleCategoryClick(category)}>
                <h2>{category.name}</h2>
                <div className='menu-icon3' onClick={(e) => handleMenuBarClick(e, category)}>
                  <div className="menu-bar3 bar1 whitebar"></div>
                  <div className="menu-bar3 bar2 whitebar"></div>
                </div>
              </div>
            ))}
        </div>


        <div className='add-category-overlay'>
          <div className='menu-icon2' onClick={handleAddCategoryClose}>
            <div className="menu-bar2 bar1"></div>
            <div className="menu-bar2 bar2"></div>
          </div>
          <input
            type='text'
            placeholder='Ime novega menija'
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Ime v angleščini'
            value={newCategoryNameEng}
            onChange={(e) => setNewCategoryNameEng(e.target.value)}
          />

          <button className='add-category-button' onClick={addNewCategory}>DODAJ</button>
        </div>


      </div>
    </div>
  )
}

export default Dashboard
