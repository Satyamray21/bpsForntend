import React, { useState } from 'react';
import {
  Box, Typography, Paper, Grid, TextField, Button, Divider, Stack, Avatar, Card, CardContent
} from '@mui/material';
import { Person, Home, InsertDriveFile } from '@mui/icons-material';

const initialCustomer = {
  firstName: 'Rohit',
  middleName: 'Kumar',
  lastName: 'Sharma',
  contactNumber: '9876543210',
  email: 'rohit@example.com',
  address: '123, Sector 15',
  state: 'Uttar Pradesh',
  city: 'Noida',
  district: 'Gautam Buddha Nagar',
  pincode: '201301',
  idProof: 'Aadhar Card',
  idPhoto: '/uploads/id-photo.png',
  customerPhoto: '/uploads/customer-photo.png'
};

const CustomerUpdate = () => {
  const [customer, setCustomer] = useState(initialCustomer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated customer:', customer);
    alert('Customer updated successfully!');
    // Make your API call or Redux dispatch here
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
          Update Customer
        </Typography>

        <form onSubmit={handleSubmit}>
          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Person color="primary" />
                <Typography variant="h6">Personal Information</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {['firstName', 'middleName', 'lastName', 'contactNumber', 'email'].map((field) => (
                  <Grid item xs={12} sm={6} md={4} key={field}>
                    <TextField
                      fullWidth
                      label={field.replace(/([A-Z])/g, ' $1')}
                      name={field}
                      value={customer[field]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Home color="primary" />
                <Typography variant="h6">Address Information</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                {['address', 'state', 'city', 'district', 'pincode'].map((field) => (
                  <Grid item xs={12} sm={6} md={4} key={field}>
                    <TextField
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={customer[field]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <InsertDriveFile color="primary" />
                <Typography variant="h6">Documents</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    label="ID Proof"
                    name="idProof"
                    value={customer.idProof}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="body2" fontWeight={600}>ID Photo</Typography>
                  <Avatar
                    src={customer.idPhoto}
                    variant="rounded"
                    sx={{ width: 100, height: 100, mt: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="body2" fontWeight={600}>Customer Photo</Typography>
                  <Avatar
                    src={customer.customerPhoto}
                    variant="rounded"
                    sx={{ width: 100, height: 100, mt: 1 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Save Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CustomerUpdate;