import React, { useEffect, useState } from 'react';
import './UserData.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import UserSpending from './UserSpending';
import axios from 'axios';
import { Buffer } from 'buffer';

const UserData = () => {
    const [customerData, setCustomerData] = useState(null);
    const [shippingData, setShippingData] = useState(null);
    const [shippingValue, setShippingValue] = useState('');
    const [shippingTresholdValue, setShippingTresholdValue] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [pubImages, setPubImages] = useState();
    const [pubImage1, setPubImage1] = useState();
    const [pubImage2, setPubImage2] = useState();
    const [pubImage3, setPubImage3] = useState();
    const [breweryImages, setBreweryImages] = useState();
    const [breweryImage1, setBreweryImage1] = useState();
    const [breweryImage2, setBreweryImage2] = useState();
    const [breweryImage3, setBreweryImage3] = useState();
    const [locked, setLocked] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch CustomerData
                const customerResponse = await axios.get('https://api.jashabrewing.com/CustomerData');
                const sortedCustomerData = customerResponse.data.slice().sort((a, b) => b.spending - a.spending);
                setCustomerData(sortedCustomerData);

                // Fetch ShippingData
                const shippingResponse = await axios.get('https://api.jashabrewing.com/ShippingData');
                const [firstShippingData] = shippingResponse.data;
                setShippingData(firstShippingData);
                setShippingValue(firstShippingData.value);

                // Fetch PhoneData
                const phoneResponse = await axios.get('https://api.jashabrewing.com/PhoneData');

                // Assuming phoneResponse.data is an array
                if (phoneResponse.data && phoneResponse.data.length > 0) {
                    const [firstPhoneNumber] = phoneResponse.data;
                    setMobileNumber(firstPhoneNumber.mobile);
                    setPhoneNumber(firstPhoneNumber.phone);
                }

                const pubImagesResponse = await axios.get('https://api.jashabrewing.com/PubData');

                setPubImages(pubImagesResponse.data);

                if (pubImagesResponse.data && pubImagesResponse.data.length > 0) {
                    const [pubImageData] = pubImagesResponse.data;

                    // Convert blob to base64 for each image
                    if (pubImageData.image1) {
                        const base64Image1 = Buffer.from(pubImageData.image1, 'binary').toString('base64');
                        setPubImage1(`data:image/jpeg;base64,${base64Image1}`);
                    }

                    if (pubImageData.image2) {
                        const base64Image2 = Buffer.from(pubImageData.image2, 'binary').toString('base64');
                        setPubImage2(`data:image/jpeg;base64,${base64Image2}`);
                    }

                    if (pubImageData.image3) {
                        const base64Image3 = Buffer.from(pubImageData.image3, 'binary').toString('base64');
                        setPubImage3(`data:image/jpeg;base64,${base64Image3}`);
                    }
                }



                const breweryImagesResponse = await axios.get('https://api.jashabrewing.com/BreweryData');

                setBreweryImages(breweryImagesResponse.data);

                if (breweryImagesResponse.data && breweryImagesResponse.data.length > 0) {
                    const [breweryImageData] = breweryImagesResponse.data;

                    // Convert blob to base64 for each image
                    if (breweryImageData.image1) {
                        const base64Image1 = Buffer.from(breweryImageData.image1, 'binary').toString('base64');
                        setBreweryImage1(`data:image/jpeg;base64,${base64Image1}`);
                    }

                    if (breweryImageData.image2) {
                        const base64Image2 = Buffer.from(breweryImageData.image2, 'binary').toString('base64');
                        setBreweryImage2(`data:image/jpeg;base64,${base64Image2}`);
                    }

                    if (breweryImageData.image3) {
                        const base64Image3 = Buffer.from(breweryImageData.image3, 'binary').toString('base64');
                        setBreweryImage3(`data:image/jpeg;base64,${base64Image3}`);
                    }
                }

                const lockResponse = await axios.get('https://api.jashabrewing.com/LockData');

                if (lockResponse.data.length > 0 && lockResponse.data[0].locked === 1) {
                    setLocked(true);
                } else {
                    setLocked(false);
                }

                const shippingTresholdResponse = await axios.get('https://api.jashabrewing.com/ShippingTresholdData');
                setShippingTresholdValue(shippingTresholdResponse.data[0].treshold);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    

    const copiedEmails = customerData ? customerData.map((customer) => customer.email).join(', ') : '';

    // Function to handle changes in the shipping value
    const handleShippingValueChange = (event) => {
        setShippingValue(event.target.value);
    };

    const handleShippingTresholdValueChange = (event) => {
        setShippingTresholdValue(event.target.value);
    };

    const handleMobileValueChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handlePhoneValueChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const saveShippingValue = async () => {
        try {
            // Make a POST request to update the shipping value
            await axios.post('https://api.jashabrewing.com/UpdateShippingValue', {
                idDostava: 1, // Assuming 1 is the ID you want to update
                value: shippingValue,
            });

            // Optionally, you can re-fetch the data to update the state with the new values
            // await fetchData();
        } catch (error) {
            console.error('Error saving shipping value:', error);
        }
    };

    const saveShippingTresholdValue = async () => {
        try {
            // Make a POST request to update the shipping value
            await axios.post('https://api.jashabrewing.com/UpdateShippingTresholdValue', {
                idShippingTreshold: 1, // Assuming 1 is the ID you want to update
                treshold: shippingTresholdValue,
            });

            // Optionally, you can re-fetch the data to update the state with the new values
            // await fetchData();
        } catch (error) {
            console.error('Error saving shipping value:', error);
        }
    };

    const savePhoneValue = async () => {
        try {
            // Make a POST request to update the shipping value
            await axios.post('https://api.jashabrewing.com/UpdatePhoneValue', {
                idTelefon: 1, // Assuming 1 is the ID you want to update
                mobile: mobileNumber,
                phone: phoneNumber,

            });

            // Optionally, you can re-fetch the data to update the state with the new values
            // await fetchData();
        } catch (error) {
            console.error('Error saving shipping value:', error);
        }
    };

    const savePubImagesValues = async () => {
        try {
            // Make a POST request to update the shipping value
            await axios.post('https://api.jashabrewing.com/UpdatePubImagesValues', {
                idPubPhotos: 1, // Assuming 1 is the ID you want to update
                images: pubImages,


            });

            // Optionally, you can re-fetch the data to update the state with the new values
            // await fetchData();
        } catch (error) {
            console.error('Error saving shipping value:', error);
        }
    };

    const saveBreweryImagesValues = async () => {
        try {
            // Make a POST request to update the shipping value
            await axios.post('https://api.jashabrewing.com/UpdateBreweryImagesValues', {
                idBreweryImages: 1, // Assuming 1 is the ID you want to update
                images: breweryImages,


            });

            // Optionally, you can re-fetch the data to update the state with the new values
            // await fetchData();
        } catch (error) {
            console.error('Error saving shipping value:', error);
        }
    };

    const saveLockValues = async () => {
        try {
            // Make a POST request to update the shipping value
            await axios.post('https://api.jashabrewing.com/UpdateLockValues', {
                idLock: 1, // Assuming 1 is the ID you want to update
                locked: locked,


            });

            // Optionally, you can re-fetch the data to update the state with the new values
            // await fetchData();
        } catch (error) {
            console.error('Error saving shipping value:', error);
        }
    };


    const clickSave = () => {
        saveShippingValue();
        savePhoneValue();
        savePubImagesValues();
        saveBreweryImagesValues();
        saveLockValues();
        saveShippingTresholdValue();
    }

    const handleImageUpload1 = (e) => {
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

                setPubImages((prevPubImages) => {
                    const updatedPubImages = [...prevPubImages];
                    if (updatedPubImages.length > 0) {
                        updatedPubImages[0].image1 = bufferLikeObject;
                    }
                    return updatedPubImages;
                });

                // Convert Buffer-like object back to data URL
                const bufferToDataURL = (bufferLikeObject) => {
                    const base64 = Buffer.from(bufferLikeObject.data).toString('base64');
                    return `data:${bufferLikeObject.type};base64,${base64}`;
                };

                const dataURL = bufferToDataURL(bufferLikeObject);

                // Notify the parent component to update the item with the data URL
                setPubImage1(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload2 = (e) => {
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

                setPubImages((prevPubImages) => {
                    const updatedPubImages = [...prevPubImages];
                    if (updatedPubImages.length > 0) {
                        updatedPubImages[0].image2 = bufferLikeObject;
                    }
                    return updatedPubImages;
                });

                // Convert Buffer-like object back to data URL
                const bufferToDataURL = (bufferLikeObject) => {
                    const base64 = Buffer.from(bufferLikeObject.data).toString('base64');
                    return `data:${bufferLikeObject.type};base64,${base64}`;
                };

                const dataURL = bufferToDataURL(bufferLikeObject);

                // Notify the parent component to update the item with the data URL
                setPubImage2(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload3 = (e) => {
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

                setPubImages((prevPubImages) => {
                    const updatedPubImages = [...prevPubImages];
                    if (updatedPubImages.length > 0) {
                        updatedPubImages[0].image3 = bufferLikeObject;
                    }
                    return updatedPubImages;
                });

                // Convert Buffer-like object back to data URL
                const bufferToDataURL = (bufferLikeObject) => {
                    const base64 = Buffer.from(bufferLikeObject.data).toString('base64');
                    return `data:${bufferLikeObject.type};base64,${base64}`;
                };

                const dataURL = bufferToDataURL(bufferLikeObject);

                // Notify the parent component to update the item with the data URL
                setPubImage3(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload4 = (e) => {
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

                setBreweryImages((prevPubImages) => {
                    const updatedPubImages = [...prevPubImages];
                    if (updatedPubImages.length > 0) {
                        updatedPubImages[0].image1 = bufferLikeObject;
                    }
                    return updatedPubImages;
                });

                // Convert Buffer-like object back to data URL
                const bufferToDataURL = (bufferLikeObject) => {
                    const base64 = Buffer.from(bufferLikeObject.data).toString('base64');
                    return `data:${bufferLikeObject.type};base64,${base64}`;
                };

                const dataURL = bufferToDataURL(bufferLikeObject);

                // Notify the parent component to update the item with the data URL
                setBreweryImage1(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload5 = (e) => {
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

                setBreweryImages((prevPubImages) => {
                    const updatedPubImages = [...prevPubImages];
                    if (updatedPubImages.length > 0) {
                        updatedPubImages[0].image2 = bufferLikeObject;
                    }
                    return updatedPubImages;
                });

                // Convert Buffer-like object back to data URL
                const bufferToDataURL = (bufferLikeObject) => {
                    const base64 = Buffer.from(bufferLikeObject.data).toString('base64');
                    return `data:${bufferLikeObject.type};base64,${base64}`;
                };

                const dataURL = bufferToDataURL(bufferLikeObject);

                // Notify the parent component to update the item with the data URL
                setBreweryImage2(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload6 = (e) => {
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

                setBreweryImages((prevPubImages) => {
                    const updatedPubImages = [...prevPubImages];
                    if (updatedPubImages.length > 0) {
                        updatedPubImages[0].image3 = bufferLikeObject;
                    }
                    return updatedPubImages;
                });

                // Convert Buffer-like object back to data URL
                const bufferToDataURL = (bufferLikeObject) => {
                    const base64 = Buffer.from(bufferLikeObject.data).toString('base64');
                    return `data:${bufferLikeObject.type};base64,${base64}`;
                };

                const dataURL = bufferToDataURL(bufferLikeObject);

                // Notify the parent component to update the item with the data URL
                setBreweryImage3(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCheckboxChange = () => {
        // Toggle the locked state when the checkbox is clicked
        setLocked((prevLocked) => !prevLocked);
        // Here you can also make a request to update the locked status on the server
        // For example:
        // updateLockStatus(!locked);
    };

    return (
        <div className='user-data-main'>
            <AdminNavbar />
            <div className='user-data-wrapper'>
                <h1 className='items-header'>UPORABNIK</h1>
                <div className='buttons-row'>
                    <button className='save-category-button' onClick={clickSave}>SHRANI</button>
                </div>



                <div className='user-layout'>
                    <div className='wser-leyout-left'>
                        <div className='user-data-wrapper2'>

                            <div className='lock-wrapper'>
                                <input type='checkbox' checked={locked} onChange={handleCheckboxChange} className='locked-checkbox'/>
                                <p className='lock-paragraph'>ZAKLENI</p>                            
                            </div>

                            <p className='shipping-paragraph'>Dostava (€)</p>
                            <input
                                type='text'
                                value={shippingValue}
                                onChange={handleShippingValueChange}
                                placeholder='Enter Shipping Value'
                            />

                            <p className='shipping-paragraph'> Zastonj dostava (€) Vnesi "null" če ne ponujaš zastonj dostave</p>
                            <input
                                type='text'
                                value={shippingTresholdValue}
                                onChange={handleShippingTresholdValueChange}
                                placeholder='Enter Shipping treshold Value'
                            />

                            <p className='shipping-paragraph'>Mobitel</p>
                            <input
                                type='text'
                                value={mobileNumber}
                                onChange={handleMobileValueChange}
                                placeholder='Enter Shipping Value'
                            />

                            <p className='shipping-paragraph'>Telefon</p>
                            <input
                                type='text'
                                value={phoneNumber}
                                onChange={handlePhoneValueChange}
                                placeholder='Enter Shipping Value'
                            />

                            <p className='shipping-paragraph'>Pivnica (slike formata .webp)</p>

                            <div className='pivnica-row'>
                                <div className='pivnica-img-holder' onClick={() => document.getElementById("pivnicaimg1").click()}>
                                    <input
                                        type="file"
                                        id='pivnicaimg1'
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload1}
                                    />
                                    <img src={pubImage1} className='pivnica-img' />
                                </div>

                                <div className='pivnica-img-holder' onClick={() => document.getElementById("pivnicaimg2").click()}>
                                    <input
                                        type="file"
                                        id='pivnicaimg2'
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload2}
                                    />
                                    <img src={pubImage2} className='pivnica-img' />
                                </div>

                                <div className='pivnica-img-holder' onClick={() => document.getElementById("pivnicaimg3").click()}>
                                    <input
                                        type="file"
                                        id='pivnicaimg3'
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload3}
                                    />
                                    <img src={pubImage3} className='pivnica-img' />
                                </div>
                            </div>


                            <p className='shipping-paragraph'>Pivovarna (slike formata .webp)</p>

                            <div className='pivnica-row'>
                                <div className='pivnica-img-holder' onClick={() => document.getElementById("pivovarnaimg1").click()}>
                                    <input
                                        type="file"
                                        id='pivovarnaimg1'
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload4}
                                    />
                                    <img src={breweryImage1} className='pivnica-img' />
                                </div>

                                <div className='pivnica-img-holder' onClick={() => document.getElementById("pivovarnaimg2").click()}>
                                    <input
                                        type="file"
                                        id='pivovarnaimg2'
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload5}
                                    />
                                    <img src={breweryImage2} className='pivnica-img' />
                                </div>

                                <div className='pivnica-img-holder' onClick={() => document.getElementById("pivovarnaimg3").click()}>
                                    <input
                                        type="file"
                                        id='pivovarnaimg3'
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload6}
                                    />
                                    <img src={breweryImage3} className='pivnica-img' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='wser-leyout-right'>
                        <div className='spending-wrapper'>
                            <UserSpending />
                        </div>

                        <div className='copy-emails-wrapper'>
                            <textarea value={copiedEmails} readOnly className='users-text-area' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserData;