import React, { useEffect, useState } from 'react'
import './ShopItems.css'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../StateManagement/reducers';
import Footer from '../../Footer/Footer';





const ShopItems = () => {
    const { t } = useTranslation();
    const [itemsDatabase, setItemsDatabase] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getItemsData = async () => {
        try {
            const response = await axios.get('https://api.jashabrewing.com/ItemsData');
            setItemsDatabase(response.data);
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

    const [firstSelect, setFirstSelect] = useState(true);

    useEffect(() => {
        if (firstSelect && categoryData && categoryData.length > 0) {
            setSelectedCategory(categoryData[0].name);
            setFirstSelect(false);
        }
       

    }, [firstSelect, categoryData]);




    const handleDropDownHover = (index, subIndex) => {
        const newSelectedItems = [...selectedItems];
        newSelectedItems[index] = subIndex;
        setSelectedItems(newSelectedItems);
    };

    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const toggleDropDown = (index) => {
        if (selectedItemIndex === index) {
            setSelectedItemIndex(null); // Close the dropdown if it's already open

        } else {
            setSelectedItemIndex(index); // Open the dropdown for the selected item

        }
    };

    const revealItems = () => {
        const shopItems = document.querySelectorAll('.shop-item');
        shopItems.forEach(item => {
            item.classList.add('revealItem');
        });

    }

    const hidelItems = () => {
        const shopItems = document.querySelectorAll('.shop-item');
        shopItems.forEach(item => {
            item.classList.remove('revealItem');
        });

    }

    

    const handleCategoryClick = (index) => {
        setSelectedItems(new Array(200).fill(0));
        setSelectedCategory(categoryData[index].name);

    };

    



    ///////////////////////////////////////////////////////////////////////////////////////////////
    const [transformedData, setTransformedData] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Array(200).fill(0));

    const convertImageToBase64 = (item) => {
        if (item.slika) {
            const base64Image = Buffer.from(item.slika, 'binary').toString('base64');
            const src = `data:image/jpeg;base64,${base64Image}`;
            return src;
        }
        return null;
    };

    const convertCenaToArray = (cena) => {
        if (cena && cena.includes(';')) {
            const children = cena.split('|');
            return children.map((child) => {
                const [name, price,enote,enoteNavoljo] = child.split(';');
                return { name: name.trim(), price: price.trim(),enote: enote.trim(),enoteNavoljo: enoteNavoljo.trim() };
            });
        } else {
            // If cena doesn't contain "|", create a single child with name as null
            return [{ name: "", price: cena }];
        }
    };

    const transformItem = (item) => {
        const imageSrc = convertImageToBase64(item);
        const cenaArray = convertCenaToArray(item.cena);

        // Convert popust to a numeric value
        const popust = parseFloat(item.popust);

        // Apply the discount to each item in cenaArray
        const discountedCenaArray = cenaArray.map((item) => {
            // Convert price to a numeric value
            const originalPrice = parseFloat(item.price);

            // Calculate the discounted price
            const discountedPrice = popust !== 0 ? (originalPrice - (originalPrice * popust / 100)).toFixed(2) : originalPrice.toFixed(2);

            // Return the updated item
            return { ...item, price: discountedPrice.toString() };
        });

        return {
            id: item.idItems,
            ime: item.ime,
            podnaslov: item.podnaslov,
            opisslo: item.opisslo,
            opiseng: item.opiseng,
            Image: imageSrc,
            category: item.category,
            cena: discountedCenaArray,
            popust: item.popust,
            navoljo: item.navoljo
        };
    };


    useEffect(() => {
        // Check if itemsDatabase is not null before mapping
        if (itemsDatabase !== null) {
            const transformedItemsData = itemsDatabase.map(transformItem);
            setTransformedData(transformedItemsData);

        }
        
    }, [itemsDatabase]);

    

    const [showFooter, setShowFooter] = useState(false);
    useEffect(() => {
        // Introduce a 500ms delay before showing the Footer
        const delay = setTimeout(() => {
          setShowFooter(true);
        }, 500);
    
        // Clear the timeout if the component unmounts before the delay is completed
        return () => clearTimeout(delay);
      }, [transformedData]); 



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleImageClick = (item) => {
        // Construct the new route with the item's name as a parameter
        const route = `/shop/${item.ime.replace(/\s+/g, '-')}`;  // Replace spaces with dashes
        hidelItems()
        // Navigate to the new route and pass the item as state
        setTimeout(() => {
            window.scrollTo({ top: 0, });
            navigate(route, { state: { item } });

        }, 1100);


    };

    const handleAddToCart = (item, cenaIndex) => {
        dispatch(addToCart({ ime: item.ime, cenaIndex, item }));

        document.querySelector('.item-added-div').classList.add("show-added-item-div");

        setTimeout(() => {
            document.querySelector('.item-added-div').classList.remove("show-added-item-div");

        }, 1000)

    };

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    useEffect(() => {
        hidelItems();
        setTimeout(() => {
            revealItems();

        }, 100)
        

    }, [transformedData,handleCategoryClick])

    return (
        <>
        <div className='shop-items-main'>

            <div className='item-added-div'>
                ITEM ADDED
                <div className='progress-bar'></div>
            </div>

            {categoryData && categoryData.length > 1 ? (
                <div className='category-menu'>
                    {categoryData.map((category, index) => (
                        <p className='category-name' key={`${category.id}_${index}`} onClick={() => handleCategoryClick(index)}>
                            {category.name}
                        </p>
                    ))}
                </div>
            ) : (
                <div className='category-menu2'></div>
            )}

            <div className='shop-items-wrapper'>


                {transformedData.filter(item => item.category === selectedCategory).map((item, index) => (

                    <div className='shop-item' key={index} >
                        <div className='shop-img-div'>
                            <img src={item.Image} alt={item.ime} className='shop-item-img' onClick={() => handleImageClick(item)} />
                            {item.popust !== "0" && <div className='popust'>-{item.popust}%</div>}
                            {item.navoljo === 0 && <div className='ninavoljo'>{t('nizaloge')}</div>}
                        </div>

                        <p className='beer-name'>{item.ime}</p>
                        <p className='beer-description'>{item.podnaslov}</p>



                        <div className={`beer-drop-down ${selectedItemIndex === index ? 'show-dropdown' : ''}`} onClick={() => toggleDropDown(index)}>
                            <div className='drop-down-row'>
                                <div className='dropdown-title'>{item.cena[selectedItems[index]].name}</div>
                                <div className='drop-down-arrow'>
                                    <i className="arrow down"></i>
                                </div>
                            </div>
                            {/*{selectedItemIndex === index && (*/}
                            <div className={`drop-down-menu ${selectedItemIndex === index ? 'show-dropdown' : ''}`}>
                                {item.cena.map((item, subIndex) => (
                                    <div key={subIndex} onClick={() => handleDropDownHover(index, subIndex)}>
                                        <p className='item-name'>{item.name}</p>
                                    </div>
                                ))}
                            </div>
                            {/*} )}*/}
                        </div>
                        <p className='beer-price'>{item.cena[selectedItems[index]].price}€</p>



                        <button className='add-to-cart-button' onClick={() => handleAddToCart(item, selectedItems[index])}   disabled={item.navoljo === 0}>{t('addCart')}</button>
                    </div>
                ))}

            </div>

                                    
        </div >

        {transformedData.length > 0 && showFooter && <Footer />}

        </>
    )
}



export default ShopItems;
