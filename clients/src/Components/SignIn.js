import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        adhar_no: '',
        age: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Sign up successful:', data);
                navigate('/userpage'); // Redirect to user page on successful sign-up
            } else {
                alert(data.message || 'Sign-up failed');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="adhar_no"
                    placeholder="Aadhar Number"
                    value={formData.adhar_no}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignIn;
