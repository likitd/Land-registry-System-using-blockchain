import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ethers } from 'ethers';
import contractabi from './utils/Land.json';

const contractABI = contractabi.abi;
const contractAddress = "0x81176a09B1fA497Eea08D295DA56139B17Df9a5F";

const UserPage = () => {
    const [user, setUser] = useState(null);
    const [landDetails, setLandDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        } else {
            navigate('/'); // Redirect to login if no user is logged in
        }
    }, [navigate]);

    useEffect(() => {
        if (user) {
            fetchLandDetails(user.adhar_no);
        }
    }, [user]);

    const fetchLandDetails = async (adharNumber) => {
        try {
            const { ethereum } = window;
            const provider = new ethers.BrowserProvider(ethereum);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );

            const result = await contractInstance.display_land_of_user(adharNumber);

            const formattedLandDetails = result.map(land => ({
                owner_adhar: parseInt(land[0].toString()),
                land_id: parseInt(land[1].toString()),
                SurveyNo: parseInt(land[2].toString()),
                HissNo: land[3],
                area: parseInt(land[4].toString()),
                conventional: land[5],
                pincode: parseInt(land[6].toString())
            }));

            setLandDetails(formattedLandDetails);
        } catch (error) {
            console.error("Error fetching land details:", error);
        }
    };

    const submitConventionalRequest = async (land) => {
        const conventionalData = {
            requestType: 'conventional',
            owner_adhar: land.owner_adhar,
            SurveyNo: land.SurveyNo,
            HissNo: land.HissNo,
            area: land.area,
            conventional: true,
            pincode: land.pincode
        };

        try {
            await axios.post('http://localhost:5000/userpage', conventionalData);
            alert('Conventional request submitted successfully');
        } catch (error) {
            console.error('Error submitting conventional request', error);
        }
    };

    const submitTransferRequest = async (land) => {
        const transferData = {
            requestType: 'transfer',
            owner_adhar: land.owner_adhar,
            buyer_adhar: prompt("Enter buyer's Aadhaar number"),
            SurveyNo: land.SurveyNo,
            HissNo: land.HissNo,
            area: land.area,
            conventional: land.conventional,
            pincode: land.pincode
        };

        if (!transferData.buyer_adhar) {
            alert("Transfer request canceled.");
            return;
        }

        try {
            await axios.post('http://localhost:5000/userpage', transferData);
            alert('Transfer request submitted successfully');
        } catch (error) {
            console.error('Error submitting transfer request', error);
        }
    };

    if (!user) return null;

    return (
        <div>
            <h2>Welcome, {user.name}</h2>
            <p>Aadhaar Number: {user.adhar_no}</p>

            {landDetails.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Owner Aadhaar</th>
                            <th>Land ID</th>
                            <th>Survey No</th>
                            <th>Hiss No</th>
                            <th>Area</th>
                            <th>Conventional</th>
                            <th>Pincode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {landDetails.map((land, index) => (
                            <tr key={index}>
                                <td>{land.owner_adhar}</td>
                                <td>{land.land_id}</td>
                                <td>{land.SurveyNo}</td>
                                <td>{land.HissNo}</td>
                                <td>{land.area}</td>
                                <td>{land.conventional ? "Yes" : "No"}</td>
                                <td>{land.pincode}</td>
                                <td>
                                    <button onClick={() => submitTransferRequest(land)}>Transfer Request</button>
                                    {land.conventional ? (
                                        <span>Already Conventioned</span>
                                    ) : (
                                        <button onClick={() => submitConventionalRequest(land)}>Conventional Request</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserPage;
