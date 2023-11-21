import React, {  useState, useEffect } from 'react';
import './Admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = ({ onLogin }) => {
  // State variables to store ID and password values
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate(); // Hook for navigation


  const getLoginData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/AdminData');
      setAdminData(response.data);
    } catch (error) {
      console.error('Error fetching AdminData:', error);
    }
  };

  const login = async () =>{
    if(adminData[0].username===id && adminData[0].password===password){
      onLogin();
      navigate('/Dashboard');
      
    }else{
      console.log("The data is not correct");
      alert("Invalid username or password"); 

    }
    

  }

  useEffect(() => {
    const fetchData = async () => {
      await getLoginData();
      
    };
    fetchData();
  }, []); // Adding adminData as a dependency to the useEffect


  return (
    <div className='admin-main'>
      <div className='login-container'>
        {/* Input field for ID */}
        <input
          type='text'
          placeholder='ID'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        {/* Input field for password */}
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button className='login-button' onClick={login}>Login</button>

      </div>
    </div>
  );
};

export default Admin;
