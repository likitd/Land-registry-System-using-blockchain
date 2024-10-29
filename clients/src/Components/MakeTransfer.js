// MakeTransfer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  // Function to delete a transfer request
  const handleDelete = async (surveyNo, hissNo) => {
    try {
      await axios.delete(`http://localhost:5000/make_transfer/${surveyNo}/${hissNo}`);
      // Refresh the list after deletion
      setTransferRequests(prevRequests => 
        prevRequests.filter(request => request.SurveyNo !== surveyNo || request.HissNo !== hissNo)
      );
      alert("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting transfer request:", error);
      alert("Failed to delete the request");
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
                  <button onClick={() => handleDelete(request.SurveyNo, request.HissNo)}>Accept</button>
                  <button onClick={() => handleDelete(request.SurveyNo, request.HissNo)}>Reject</button>
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
