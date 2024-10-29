import React, { useState } from 'react';
import axios from 'axios';

function UserPage() {
  // State for conventional request form
  const [conventionalData, setConventionalData] = useState({
    requestType: 'conventional',
    owner_adhar: '',
    SurveyNo: '',
    HissNo: '',
    area: '',
    conventional: false,
    pincode: ''
  });

  // State for transfer request form
  const [transferData, setTransferData] = useState({
    requestType: 'transfer',
    owner_adhar: '',
    buyer_adhar: '',
    SurveyNo: '',
    HissNo: '',
    area: '',
    conventional: false,
    pincode: ''
  });

  // Handle changes for conventional form inputs
  const handleConventionalChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConventionalData({
      ...conventionalData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle changes for transfer form inputs
  const handleTransferChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTransferData({
      ...transferData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Submit conventional request
  const submitConventional = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/userpage', conventionalData);
      alert('Conventional request submitted successfully');
      setConventionalData({
        requestType: 'conventional',
        owner_adhar: '',
        SurveyNo: '',
        HissNo: '',
        area: '',
        conventional: false,
        pincode: ''
      });
    } catch (error) {
      console.error('Error submitting conventional request', error);
    }
  };

  // Submit transfer request
  const submitTransfer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/userpage', transferData);
      alert('Transfer request submitted successfully');
      setTransferData({
        requestType: 'transfer',
        owner_adhar: '',
        buyer_adhar: '',
        SurveyNo: '',
        HissNo: '',
        area: '',
        conventional: false,
        pincode: ''
      });
    } catch (error) {
      console.error('Error submitting transfer request', error);
    }
  };

  return (
    <div>
      <h2>Conventional Request</h2>
      <form onSubmit={submitConventional}>
        <input type="number" name="owner_adhar" value={conventionalData.owner_adhar} onChange={handleConventionalChange} placeholder="Owner Adhar" required />
        <input type="number" name="SurveyNo" value={conventionalData.SurveyNo} onChange={handleConventionalChange} placeholder="Survey Number" required />
        <input type="text" name="HissNo" value={conventionalData.HissNo} onChange={handleConventionalChange} placeholder="Hiss Number" required />
        <input type="number" name="area" value={conventionalData.area} onChange={handleConventionalChange} placeholder="Area" required />
        <input type="checkbox" name="conventional" checked={conventionalData.conventional} onChange={handleConventionalChange} /> Conventional
        <input type="number" name="pincode" value={conventionalData.pincode} onChange={handleConventionalChange} placeholder="Pincode" required />
        <button type="submit">Submit Conventional Request</button>
      </form>

      <h2>Transfer Request</h2>
      <form onSubmit={submitTransfer}>
        <input type="number" name="owner_adhar" value={transferData.owner_adhar} onChange={handleTransferChange} placeholder="Owner Adhar" required />
        <input type="number" name="buyer_adhar" value={transferData.buyer_adhar} onChange={handleTransferChange} placeholder="Buyer Adhar" required />
        <input type="number" name="SurveyNo" value={transferData.SurveyNo} onChange={handleTransferChange} placeholder="Survey Number" required />
        <input type="text" name="HissNo" value={transferData.HissNo} onChange={handleTransferChange} placeholder="Hiss Number" required />
        <input type="number" name="area" value={transferData.area} onChange={handleTransferChange} placeholder="Area" required />
        <input type="checkbox" name="conventional" checked={transferData.conventional} onChange={handleTransferChange} /> Conventional
        <input type="number" name="pincode" value={transferData.pincode} onChange={handleTransferChange} placeholder="Pincode" required />
        <button type="submit">Submit Transfer Request</button>
      </form>
    </div>
  );
}

export default UserPage;
