import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        adhar_no: '',
        age: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateInputs = () => {
        const { adhar_no, age } = formData;
        if (adhar_no.length !== 12) {
            alert("Aadhaar number should be 12 digits.");
            return false;
        }
        if (age < 18 || age > 100) {
            alert("Age should be between 18 and 100.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        setIsSubmitting(true);
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
                navigate('/login');
            } else {
                alert(data.message || 'Sign-up failed');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signin-container">
            <h2>Sign Up</h2>
            <form className="signin-form" onSubmit={handleSubmit}>
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
                    placeholder="Aadhaar Number"
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
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignIn;
