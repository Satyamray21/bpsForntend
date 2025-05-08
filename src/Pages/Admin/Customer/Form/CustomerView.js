import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Avatar,
  Stack,
  Card,
  CardContent
} from '@mui/material';
import { Person, Home, InsertDriveFile } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewCustomerById, clearViewedCustomer } from  '../../../../features/customers/customerSlice'

const InfoRow = ({ label, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Typography variant="body2" fontWeight={600}>{label}</Typography>
    <Typography variant="body1" color="text.secondary">{value || '-'}</Typography>
  </Grid>
);

const CustomerView = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
  const form = useSelector((state) => state.customers.form);
  const loading = useSelector((state) => state.customers.loading);

  useEffect(() => {
    if (customerId) {
      dispatch(viewCustomerById(customerId));
    }
    return () => {
      dispatch(clearViewedCustomer());
    };
  }, [customerId, dispatch]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
          Customer Details
        </Typography>

        {loading ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <>
            <Card sx={{ mt: 3, p: 2 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Person color="primary" />
                  <Typography variant="h6">Personal Information</Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <InfoRow label="First Name" value={form.firstName} />
                  <InfoRow label="Middle Name" value={form.middleName} />
                  <InfoRow label="Last Name" value={form.lastName} />
                  <InfoRow label="Contact Number" value={form.contactNumber} />
                  <InfoRow label="Email" value={form.email} />
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
                  <InfoRow label="Address" value={form.address} />
                  <InfoRow label="State" value={form.state} />
                  <InfoRow label="City" value={form.city} />
                  <InfoRow label="District" value={form.district} />
                  <InfoRow label="Pincode" value={form.pincode} />
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
                  <InfoRow label="ID Proof Type" value={form.idProof} />
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="body2" fontWeight={600}>ID Photo</Typography>
                    <Avatar
                      src={form.idPhoto}
                      variant="rounded"
                      sx={{ width: 100, height: 100, mt: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Typography variant="body2" fontWeight={600}>Customer Photo</Typography>
                    <Avatar
                      src={form.customerProfilePhoto}
                      variant="rounded"
                      sx={{ width: 100, height: 100, mt: 1 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default CustomerView;
