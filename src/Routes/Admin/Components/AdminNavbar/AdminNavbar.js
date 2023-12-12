import React from 'react'
import './AdminNavbar.css'
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const goTrgovina = () => {
        navigate("/Dashboard");
    }

    const goUser = () => {
        navigate("/User");
    }

    return (
        <div className='admin-navbar-main'>
            <div className='admin-navigations-row'>
                <p className='admin-navigation-link' onClick={goTrgovina}>TRGOVINA</p>
                <p className='admin-navigation-link' onClick={goUser}>UPORABNIK</p>
            </div>
        </div>
    )
}

export default AdminNavbar
