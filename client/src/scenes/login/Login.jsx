import React, { useState} from 'react';
import { Box, Typography, TextField, Button, Stack, Autocomplete , Alert , Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { useLoginUserMutation } from 'state/api';
import { setCredentials } from 'state/user';
import {useDispatch} from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });
  const dispatch=useDispatch()
  const navigate = useNavigate(); 
  const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation();

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
      const response = await loginUser(formData).unwrap();
      console.log('Login successful:', response);
      dispatch(setCredentials({
        user: response
    }));
    sessionStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard/')
      
    } catch (error) {
      console.error('Failed to Login:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error?.data?.message || 'Failed to Login. Please try again.'}
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

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Loging up...' : 'Login'}
            </Button>
             
            <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/signup/" underline="hover" color="primary">
        New User? Signup!
      </Link>
    </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;