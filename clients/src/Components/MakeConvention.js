import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  // Handle accept/reject (delete) action
  const handleDelete = async (surveyNo, hissNo) => {
    try {
      await axios.delete(`http://localhost:5000/make_convention/${surveyNo}/${hissNo}`);
      // Update the UI after deleting
      setConventions(conventions.filter(convention => convention.SurveyNo !== surveyNo || convention.HissNo !== hissNo));
    } catch (error) {
      console.error('Error deleting conventional request:', error);
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
                <button onClick={() => handleDelete(convention.SurveyNo, convention.HissNo)}>Accept</button>
                <button onClick={() => handleDelete(convention.SurveyNo, convention.HissNo)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MakeConvention;
