// LandOfficer.js
import React, { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import contractabi from './utils/Land.json'


const contractABI = contractabi.abi // Add your contract ABI here
const contractAddress = "0x81176a09B1fA497Eea08D295DA56139B17Df9a5F"; // Add your deployed contract address here

const LandOfficer = () => {
  const [formData, setFormData] = useState({
    owner_adhar: '',
    SurveyNo: '',
    HissNo: '',
    area: '',
    conventional: false,
    pincode: ''
  });

  useEffect(()=>{
    requestAccount();
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

  // // Function to get the smart contract with a signer
  // const getContractWithSigner = async () => {
  //   // Request MetaMask account access
  //  // await requestAccount();

  //   // Ensure provider is connected to MetaMask
  //   const provider = new ethers.BrowserProvider(window.ethereum);
    
  //   // Get signer from provider
  //   const signer = provider.getSigner();
    
  //   // Return contract instance connected with the signer
  //   return new ethers.Contract(contractAddress, contractABI, signer);
  // };

  // Function to add land to the blockchain
  const addLand = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
    const {ethereum}=window;
    const provider=new ethers.BrowserProvider(ethereum);
    const signer= await provider.getSigner();
    const contractInstance=new ethers.Contract(
      contractAddress,
      contractABI,
      signer
      );
    const { owner_adhar, SurveyNo, HissNo, area, conventional, pincode } = formData;
    
    try {
      const status=await  contractInstance.add_land(
        SurveyNo,
        HissNo,
        area,
        conventional,
        pincode,
        owner_adhar
      );
     
      alert("Land added successfully to the blockchain!");
    } catch (error) {
      console.error("Error adding land to the blockchain:", error);
      alert("Failed to add land to the blockchain.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addLand(); // Call the addLand function when form is submitted
  };

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
