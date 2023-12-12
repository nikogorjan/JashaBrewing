import React, { useEffect, useState } from 'react';
import './Items.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ItemChanger from './ItemChanger';
import AdminNavbar from '../AdminNavbar/AdminNavbar';

const Items = () => {
    const location = useLocation();
    const { category } = location.state || {};
    const [itemsData, setItemsData] = useState(null);
    const [newItem, setNewItem] = useState({
        ime: "",
        podnaslov: "",
        opisslo: "",
        opiseng: "",
        popust: 0,
        slika: null,
        category: category.name,
        cena: "",
        navoljo: false,
        enote: "",
        enoteSkupaj: false
    });

    const handleAddItem = () => {
        // Add the new item to itemsData array
        setItemsData(prevItemsData => [...prevItemsData, newItem]);

        // Clear the newItem state
        setNewItem({
            ime: "",
            podnaslov: "",
            opisslo: "",
            opiseng: "",
            popust: 0,
            slika: null,
            category: category.name,
            cena: "",
            navoljo: false,
            enote: "",
            enoteSkupaj: false


        });
    };

    const getItemsData = async () => {
        try {
            const response = await axios.get('https://api.jashabrewing.com/ItemsData');
            setItemsData(response.data);
        } catch (error) {
            console.error('Error fetching AdminData:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getItemsData();

        };
        fetchData();
    }, []);

    

    const updateItem = (index, updatedItem) => {
        // Update the itemsData array
        setItemsData((prevItemsData) => {
          const updatedData = [...prevItemsData];
          updatedData[index] = updatedItem;
          return updatedData;
        });

        
      };

      const saveItemData = async (itemsData) => {
        try {
          await axios.post('https://api.jashabrewing.com/SaveItemsData', { itemsData });
          console.log('Item data saved successfully');
        } catch (error) {
          console.error('Error saving item data:', error);
        }
      };

      const handleSaveItemData = async () => {
        // Save itemsData to the server
        await saveItemData(itemsData);
      };

      const handleDeleteItem = (index) => {
        // Use the callback form of setItemsData to ensure that we get the latest state
        
       
        setItemsData(prevItemsData => {
            // Use the filter method to create a new array excluding the item at the specified index
            const updatedItemsData = prevItemsData.filter((_, i) => i !== index);
            return updatedItemsData;
        });
    };

    

    return (
        <div className='items-main'>
            <AdminNavbar/>
            <div className='items-wrapper'>
                <h1 className='items-header'>{category.name}</h1>
                <div className='buttons-row'>
                    <button className='add-category-button' onClick={handleAddItem}>DODAJ IZDELEK</button>
                    <button className='save-category-button' onClick={handleSaveItemData}>SHRANI</button>
                </div>

                <div className='items-column'>
                    {itemsData &&
                        itemsData.map((item, index) => (
                            // Only render ItemChanger if the item's category matches the current category
                            item.category === category.name && (
                                <ItemChanger key={item.idItems} item={item} onUpdateItem={(updatedItem) => updateItem(index, updatedItem)} inputId={`imageInput_${index}`} index={index} onDeleteItem={handleDeleteItem}/>
                            )
                        ))}
                </div>
            </div>

        </div>
    )
}

export default Items
