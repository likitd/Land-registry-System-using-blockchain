// LandOfficer.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

// Replace with your actual contract ABI and address
const contractABI = "YOUR_CONTRACT_ABI"; // Add your contract ABI here
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Add your deployed contract address here

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Function to initialize MetaMask and connect to the blockchain
  const requestAccount = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error("User denied MetaMask access");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  // Function to get the smart contract
  // const getContract = () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   return new ethers.Contract(contractAddress, contractABI, signer);
  // };

  // // Function to add land to the blockchain
  // const addLand = async () => {
  //   if (!window.ethereum) {
  //     alert("Please install MetaMask");
  //     return;
  //   }

  //   const { owner_adhar, SurveyNo, HissNo, area, conventional, pincode } = formData;
    
  //   try {
  //     await requestAccount();
  //     const contract = getContract();
  //     const transaction = await contract.add_land(
  //       SurveyNo,
  //       HissNo,
  //       area,
  //       conventional,
  //       pincode,
  //       owner_adhar
  //     );
  //     await transaction.wait();
  //     alert("Land added successfully to the blockchain!");
  //   } catch (error) {
  //     console.error("Error adding land to the blockchain:", error);
  //     alert("Failed to add land to the blockchain.");
  //   }
  // };

  // // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
   // addLand(); // Call the addLand function when form is submitted
  };
  requestAccount();
  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Land</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Owner Adhar:</label>
          <input
            type="number"
            name="owner_adhar"
            value={formData.owner_adhar}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Survey Number:</label>
          <input
            type="number"
            name="SurveyNo"
            value={formData.SurveyNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Hiss Number:</label>
          <input
            type="text"
            name="HissNo"
            value={formData.HissNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Area:</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Conventional:</label>
          <input
            type="checkbox"
            name="conventional"
            checked={formData.conventional}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Pincode:</label>
          <input
            type="number"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate('/make_convention')}>Go to Make Convention</button>
        <button onClick={() => navigate('/make_transfer')}>Go to Make Transfer</button>
      </div>
    </div>
  );
};

export default LandOfficer;
