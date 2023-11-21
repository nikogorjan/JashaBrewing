import React, { useEffect, useState } from 'react';
import './ItemChanger.css';
import noimg from '../../../../Resources/Images/noimg.png'
import { Buffer } from 'buffer';
import TwoColumnSpreadsheet from './TwoColumnSpreadsheet';

const ItemChanger = ({ item, onUpdateItem, inputId, onDeleteItem, index }) => {
    const [imageSrc, setImageSrc] = useState(noimg);
    const [ime, setIme] = useState(item.ime);
    const [podnaslov, setPodnaslov] = useState(item.podnaslov);
    const [popust, setPopust] = useState(item.popust);
    const [opisslo, setOpisslo] = useState(item.opisslo);
    const [opiseng, setOpiseng] = useState(item.opiseng);
    const [cena, setCena] = useState(item.cena);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(item.cena && item.cena.includes(";"));

    const handleDeleteItemClick = () => {
        // Notify the parent component to delete the item with the specified index
        onDeleteItem(index);
      };

    const handleCheckboxChange = () => {
        // Toggle the checked state
        setIsCheckboxChecked((prevChecked) => !prevChecked);
        
        setCena('')
    };

    // Update the local state if the 'cena' prop changes
    useEffect(() => {
        setIsCheckboxChecked(item.cena && item.cena.includes(";"));
        
    }, [item.cena]);

    

    useEffect(() => {
        const loadImage = async () => {
            // Check if item has slika and it is not null
            if (item.slika) {
                // Convert the binary data to Base64
                const base64Image = Buffer.from(item.slika, 'binary').toString('base64');
                const src = `data:image/jpeg;base64,${base64Image}`;
                setImageSrc(src);
            }
        };

        loadImage();
    }, [item.slika]);

    const handleNameChange = (e) => {
        // Update the local state
        setIme(e.target.value);
        // Notify the parent component to update the item
        onUpdateItem({ ...item, ime: e.target.value });
    };

    const handlePodnaslovChange = (e) => {
        // Update the local state
        setPodnaslov(e.target.value);
        // Notify the parent component to update the item
        onUpdateItem({ ...item, podnaslov: e.target.value });
    };

    const handlePopustChange = (e) => {
        // Update the local state
        setPopust(e.target.value);
        // Notify the parent component to update the item
        onUpdateItem({ ...item, popust: e.target.value });
    };

    const handleOpissloChange = (e) => {
        // Update the local state
        setOpisslo(e.target.value);
        // Notify the parent component to update the item
        onUpdateItem({ ...item, opisslo: e.target.value });
    };

    const handleOpisengChange = (e) => {
        // Update the local state
        setOpiseng(e.target.value);
        // Notify the parent component to update the item
        onUpdateItem({ ...item, opiseng: e.target.value });
    };

    

    const handleCenaChangeWrapper = (updatedData) => {
        // Update the state or perform an action when the data changes
        
      
        // Use the callback function to log the updated cena
        setCena(updatedData)
      };

      useEffect(()=>{
        
        onUpdateItem({ ...item, cena: cena });
      },[cena])

   



    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert data URL to Buffer-like object
                const dataURLtoBuffer = (dataURL) => {
                    const base64 = dataURL.split(',')[1];
                    const buffer = Buffer.from(base64, 'base64');
                    return {
                        type: 'Buffer',
                        data: Array.from(buffer),
                    };
                };

                const bufferLikeObject = dataURLtoBuffer(reader.result);

                // Notify the parent component to update the item with the Buffer-like object
                onUpdateItem({ ...item, slika: bufferLikeObject });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='item-changer-main'>
            <div className='menu-icon3' onClick={handleDeleteItemClick}>
                <div className="menu-bar3 bar1 whitebar"></div>
                <div className="menu-bar3 bar2 whitebar"></div>
            </div>


            <div className='image-column'>
                <div className='image-holder' onClick={() => document.getElementById(inputId).click()}>
                    <input
                        type="file"
                        id={inputId}
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    <img src={imageSrc} alt='missing' className='items-image' />
                </div>
            </div>
            <div className='data-column'>
                <div className='data-column-row'>
                    <div className='names-column'>
                        <input
                            type="text"
                            placeholder='ime'
                            value={ime}
                            onChange={handleNameChange}
                        />

                        <input
                            type="text"
                            placeholder='podnaslov'
                            value={podnaslov}
                            onChange={handlePodnaslovChange}
                        />

                        <input
                            type="text"
                            placeholder='popust'
                            value={popust}
                            onChange={handlePopustChange}
                        />
                    </div>
                    <div className='descriptions-column'>
                        <textarea
                            placeholder='opis slo'
                            value={opisslo}
                            onChange={handleOpissloChange}
                            className='bigtext'
                        />
                        <textarea
                            placeholder='opis eng'
                            value={opiseng}
                            onChange={handleOpisengChange}
                            className='bigtext'
                        />
                    </div>
                </div>
                <div className='data-column-row alignrow'>

                    <div className='checkbox-column'>

                        <input
                            type="checkbox"
                            checked={isCheckboxChecked}
                            onChange={handleCheckboxChange}
                        />

                    </div>
                    <p className='checkparagraph'>Več ponudb</p>


                </div>

                <div className='data-column-row alignrow'>
                    {isCheckboxChecked ? (
                            <TwoColumnSpreadsheet initialData={cena} onDataChange={handleCenaChangeWrapper} />

                    ) : (
                        <TwoColumnSpreadsheet initialData={cena} onDataChange={handleCenaChangeWrapper} />
                        
                    
                    )}

                </div>

            </div>
        </div>
    )
}

export default ItemChanger
