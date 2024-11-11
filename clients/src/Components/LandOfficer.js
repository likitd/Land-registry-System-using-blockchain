// LandOfficer.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import contractabi from './utils/Land.json';
import './LandOfficer.css'; // Add a CSS file for styling

const contractABI = contractabi.abi;
const contractAddress = "0x81176a09B1fA497Eea08D295DA56139B17Df9a5F";

const LandOfficer = () => {
  const [formData, setFormData] = useState({
    owner_adhar: '',
    SurveyNo: '',
    HissNo: '',
    area: '',
    conventional: false,
    pincode: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    requestAccount();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const requestAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error("User denied MetaMask access");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const addLand = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
    const { ethereum } = window;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    const { owner_adhar, SurveyNo, HissNo, area, conventional, pincode } = formData;

    try {
      await contractInstance.add_land(SurveyNo, HissNo, area, conventional, pincode, owner_adhar);
      alert("Land added successfully to the blockchain!");
    } catch (error) {
      console.error("Error adding land to the blockchain:", error);
      alert("Failed to add land to the blockchain.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLand();
  };

  return (
    <div className="land-officer-container">
      <h2 className="form-title">Add New Land</h2>
      <form onSubmit={handleSubmit} className="land-officer-form">
        <div className="form-group">
          <label>Owner Aadhaar:</label>
          <input
            type="number"
            name="owner_adhar"
            value={formData.owner_adhar}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Survey Number:</label>
          <input
            type="number"
            name="SurveyNo"
            value={formData.SurveyNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hiss Number:</label>
          <input
            type="text"
            name="HissNo"
            value={formData.HissNo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Area:</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group checkbox-group">
          <label>Conventional:</label>
          <input
            type="checkbox"
            name="conventional"
            checked={formData.conventional}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Pincode:</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      <div className="navigation-buttons">
        <button onClick={() => navigate('/make_convention')} className="nav-button">Go to Make Convention</button>
        <button onClick={() => navigate('/make_transfer')} className="nav-button">Go to Make Transfer</button>
      </div>
    </div>
  );
};

export default LandOfficer;
