import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import contractabi from './utils/Land.json'

const contractABI = contractabi.abi // Add your contract ABI here
const contractAddress = "0x81176a09B1fA497Eea08D295DA56139B17Df9a5F"; // Add your deployed contract address here
function MakeConvention() {
  const [conventions, setConventions] = useState([]);

  // Fetch all conventional requests
  useEffect(() => {
    const fetchConventions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/make_convention');
        setConventions(response.data);
      } catch (error) {
        console.error('Error fetching conventional requests:', error);
      }
    };
    fetchConventions();
  }, []);

  // Handle accept action
  const handleAccept = async (surveyNo, hissNo) => {
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
 //   const { owner_adhar, SurveyNo, HissNo, area, conventional, pincode } = formData;
    
    try {
      const status=await  contractInstance.make_conventional(
        surveyNo,hissNo
      );
     
      alert("convention successfully to the blockchain!");
    } catch (error) {
      console.error("Error adding land to the blockchain:", error);
      alert("Failed to convention land to the blockchain.");
    }




    try {
      // You can add any additional code here for the accept action
      console.log("Accepting request for Survey No:", surveyNo, "Hiss No:", hissNo);

      // Delete the accepted item from the backend
      await axios.delete(`http://localhost:5000/make_convention/${surveyNo}/${hissNo}`);
      
      // Update the UI after deleting
      setConventions(conventions.filter(convention => convention.SurveyNo !== surveyNo || convention.HissNo !== hissNo));
    } catch (error) {
      console.error('Error accepting conventional request:', error);
    }
  };

  // Handle reject action
  const handleReject = async (surveyNo, hissNo) => {
    try {
      // You can add any additional code here for the reject action
      console.log("Rejecting request for Survey No:", surveyNo, "Hiss No:", hissNo);

      // Delete the rejected item from the backend
      await axios.delete(`http://localhost:5000/make_convention/${surveyNo}/${hissNo}`);
      
      // Update the UI after deleting
      setConventions(conventions.filter(convention => convention.SurveyNo !== surveyNo || convention.HissNo !== hissNo));
    } catch (error) {
      console.error('Error rejecting conventional request:', error);
    }
  };

  return (
    <div>
      <h2>Conventional Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Survey No</th>
            <th>Hiss No</th>
            <th>Owner Adhar</th>
            <th>Area</th>
            <th>Pincode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {conventions.map((convention) => (
            <tr key={`${convention.SurveyNo}-${convention.HissNo}`}>
              <td>{convention.SurveyNo}</td>
              <td>{convention.HissNo}</td>
              <td>{convention.owner_adhar}</td>
              <td>{convention.area}</td>
              <td>{convention.pincode}</td>
              <td>
                <button onClick={() => handleAccept(convention.SurveyNo, convention.HissNo)}>Accept</button>
                <button onClick={() => handleReject(convention.SurveyNo, convention.HissNo)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MakeConvention;
