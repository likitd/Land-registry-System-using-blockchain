import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import contractabi from './utils/Land.json';
import './MakeConvention.css'; // Import CSS for styling

const contractABI = contractabi.abi;
const contractAddress = "0x81176a09B1fA497Eea08D295DA56139B17Df9a5F";

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
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      await contractInstance.make_conventional(surveyNo, hissNo);
      alert("Land successfully converted to conventional on the blockchain!");

      await axios.delete(`http://localhost:5000/make_convention/${surveyNo}/${hissNo}`);
      setConventions(conventions.filter(convention => convention.SurveyNo !== surveyNo || convention.HissNo !== hissNo));
    } catch (error) {
      console.error("Error updating convention on blockchain:", error);
      alert("Failed to convert land to conventional on the blockchain.");
    }
  };

  // Handle reject action
  const handleReject = async (surveyNo, hissNo) => {
    try {
      await axios.delete(`http://localhost:5000/make_convention/${surveyNo}/${hissNo}`);
      setConventions(conventions.filter(convention => convention.SurveyNo !== surveyNo || convention.HissNo !== hissNo));
    } catch (error) {
      console.error('Error rejecting conventional request:', error);
    }
  };

  return (
    <div className="convention-container">
      <h2>Conventional Requests</h2>
      <table className="convention-table">
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
                <button className="accept-button" onClick={() => handleAccept(convention.SurveyNo, convention.HissNo)}>Accept</button>
                <button className="reject-button" onClick={() => handleReject(convention.SurveyNo, convention.HissNo)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MakeConvention;
