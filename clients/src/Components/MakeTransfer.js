// MakeTransfer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import contractabi from './utils/Land.json'

const contractABI = contractabi.abi // Add your contract ABI here
const contractAddress = "0x81176a09B1fA497Eea08D295DA56139B17Df9a5F"; 
const MakeTransfer = () => {
  const [transferRequests, setTransferRequests] = useState([]);

  // Fetch the transfer requests from the server
  useEffect(() => {
    fetchTransferRequests();
  }, []);

  const fetchTransferRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/make_transfer');
      setTransferRequests(response.data);
    } catch (error) {
      console.error("Error fetching transfer requests:", error);
    }
  };

  // Function to handle accept action
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
      const status=await  contractInstance.transfer_land(
        surveyNo,hissNo
      );
     
      alert("transfer successfully to the blockchain!");
    } catch (error) {
      console.error("Error adding land to the blockchain:", error);
      alert("Failed to tarnsfer land to the blockchain.");
    }

    try {
      // Add any additional logic specific to the accept action here
      console.log("Accepting request for Survey No:", surveyNo, "Hiss No:", hissNo);
      
      // Delete the accepted item from the backend
      await axios.delete(`http://localhost:5000/make_transfer/${surveyNo}/${hissNo}`);
      
      // Update the UI after deletion
      setTransferRequests(prevRequests => 
        prevRequests.filter(request => request.SurveyNo !== surveyNo || request.HissNo !== hissNo)
      );
      alert("Request accepted and deleted successfully");
    } catch (error) {
      console.error("Error accepting transfer request:", error);
      alert("Failed to accept the request");
    }
  };

  // Function to handle reject action
  const handleReject = async (surveyNo, hissNo) => {
    try {
      // Add any additional logic specific to the reject action here
      console.log("Rejecting request for Survey No:", surveyNo, "Hiss No:", hissNo);
      
      // Delete the rejected item from the backend
      await axios.delete(`http://localhost:5000/make_transfer/${surveyNo}/${hissNo}`);
      
      // Update the UI after deletion
      setTransferRequests(prevRequests => 
        prevRequests.filter(request => request.SurveyNo !== surveyNo || request.HissNo !== hissNo)
      );
      alert("Request rejected and deleted successfully");
    } catch (error) {
      console.error("Error rejecting transfer request:", error);
      alert("Failed to reject the request");
    }
  };

  return (
    <div>
      <h2>Transfer Requests</h2>
      {transferRequests.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Owner Adhar</th>
              <th>Buyer Adhar</th>
              <th>Survey No</th>
              <th>Hiss No</th>
              <th>Area</th>
              <th>Conventional</th>
              <th>Pincode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transferRequests.map((request) => (
              <tr key={`${request.SurveyNo}-${request.HissNo}`}>
                <td>{request.owner_adhar}</td>
                <td>{request.buyer_adhar}</td>
                <td>{request.SurveyNo}</td>
                <td>{request.HissNo}</td>
                <td>{request.area}</td>
                <td>{request.conventional ? "Yes" : "No"}</td>
                <td>{request.pincode}</td>
                <td>
                  <button onClick={() => handleAccept(request.SurveyNo, request.HissNo)}>Accept</button>
                  <button onClick={() => handleReject(request.SurveyNo, request.HissNo)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transfer requests available</p>
      )}
    </div>
  );
};

export default MakeTransfer;
