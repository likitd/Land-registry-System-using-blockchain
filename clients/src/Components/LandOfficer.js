// LandOfficer.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandOfficer = () => {
  const [formData, setFormData] = useState({
    owner_adhar: '',
    land_id: '',
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

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we'll just log the data to the console.
    console.log("Form Data:", formData);
    // Here you can add blockchain interaction logic in the future.
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
          <label>Land ID:</label>
          <input
            type="number"
            name="land_id"
            value={formData.land_id}
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
