import React, { useEffect, useState } from 'react';
import './UserSpending.css';
import axios from 'axios';

const UserSpending = () => {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.jashabrewing.com/CustomerData');
        // Sort customerData based on spending in descending order
        const sortedData = response.data.slice().sort((a, b) => b.spending - a.spending);
        setCustomerData(sortedData);
      } catch (error) {
        console.error('Error fetching AdminData:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className='user-spending-main'>
      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Priimek</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Nakup</th>
          </tr>
        </thead>
        <tbody>
          {customerData &&
            customerData.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.spending}€</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSpending;