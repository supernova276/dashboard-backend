import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Autocomplete , Alert  } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { useSignupUserMutation } from 'state/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    city: '',
    state: '',
    occupation: '',
    phoneNumber: ''
  });

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    // Union Territories
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];
  

  const navigate = useNavigate(); 
  const [signupUser, { isLoading, isError, error, isSuccess }] = useSignupUserMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the mutation function returned by the hook
      const response = await signupUser(formData).unwrap();
      console.log('Signup successful:', response);
      navigate('/login/')
      
    } catch (error) {
      console.error('Failed to signup:', error);
    }
  };

  const handleStateChange = (event, newValue) => {
    setFormData(prevData => ({
      ...prevData,
      state: newValue || ''
    }));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Signup
        </Typography>
        
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error?.data?.message || 'Failed to signup. Please try again.'}
          </Alert>
        )}

        {isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Signup successful!
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              disabled={isLoading}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              disabled={isLoading}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              disabled={isLoading}
            />

            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              disabled={isLoading}
            />

            <Autocomplete
              options={states}
              value={formData.state}
              onChange={handleStateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  fullWidth
                />
              )}
              freeSolo={false}
              disableClearable={false}
              autoComplete
              autoHighlight
              disabled={isLoading}
            />

            <TextField
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              fullWidth
              disabled={isLoading}
            />

            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              disabled={isLoading}
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Signup'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;