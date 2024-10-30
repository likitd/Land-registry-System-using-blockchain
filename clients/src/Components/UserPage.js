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
    const [landsForSale, setLandsForSale] = useState([]);
    const [sellingLandId, setSellingLandId] = useState(null);
    const [salePrice, setSalePrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            fetchLandForSale();
        } else {
            navigate('/');
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
            const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

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

    const fetchLandForSale = async () => {
        try {
            const response = await axios.get('http://localhost:5000/landforsale');
            setLandsForSale(response.data);
        } catch (error) {
            console.error("Error fetching lands for sale:", error);
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

    const submitLandForSale = async (land) => {
        const saleEntry = {
            SurveyNo: land.SurveyNo,
            HissNo: land.HissNo,
            area: land.area,
            conventional: land.conventional,
            pincode: land.pincode,
            name: user?.name,
            email: user?.email,
            price: Number(salePrice)
        };

        try {
            await axios.post('http://localhost:5000/landforsale', saleEntry);
            alert('Land added for sale successfully');
            setSellingLandId(null);
            setSalePrice('');
            fetchLandForSale();
        } catch (error) {
            console.error('Error adding land for sale:', error);
        }
    };

    const cancelLandForSale = async (land) => {
        try {
            await axios.delete(`http://localhost:5000/landforsale/${land.SurveyNo}/${land.HissNo}`);
            alert('Sale request canceled successfully');
            fetchLandForSale();
        } catch (error) {
            console.error('Error canceling sale request', error);
        }
    };

    const isLandForSale = (surveyNo, hissNo) =>
        landsForSale.some(land => land.SurveyNo === surveyNo && land.HissNo === hissNo);

    if (!user) return <p>Loading...</p>;

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
                                    {isLandForSale(land.SurveyNo, land.HissNo) ? (
                                        <button onClick={() => cancelLandForSale(land)}>Cancel Sale</button>
                                    ) : (
                                        <>
                                            <button onClick={() => setSellingLandId(land.land_id)}>Want to Sell Your Land</button>
                                            {sellingLandId === land.land_id && (
                                                <div>
                                                    <input
                                                        type="number"
                                                        placeholder="Enter Selling Price"
                                                        value={salePrice}
                                                        onChange={(e) => setSalePrice(e.target.value)}
                                                        required
                                                    />
                                                    <button onClick={() => submitLandForSale(land)}>Confirm Sale</button>
                                                </div>
                                            )}
                                        </>
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
