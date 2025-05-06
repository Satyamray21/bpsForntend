import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box, Button, Grid, TextField, InputAdornment, Dialog,
  DialogTitle, DialogContent, DialogActions, IconButton,
  Typography, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { Close, LocalPhone, Email, Home, LocationOn, PinDrop } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStates,
  fetchCities,
  clearCities
} from '../../../../features/Location/locationSlice';
import {
  createStation,
  fetchStations,
  clearCurrentStation
} from '../../../../features/stations/stationSlice';

const StationForm = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { states, cities } = useSelector((state) => state.location);
  const { currentStation } = useSelector((state) => state.stations);

  const validationSchema = Yup.object().shape({
    stationName: Yup.string().required('Station name is required'),
    contact: Yup.string().matches(/^[0-9]{10}$/, 'Must be 10 digits').required('Contact is required'),
    emailId: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    street: Yup.string(),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().matches(/^\d{6}$/, 'Must be 6 digits').required('PIN Code is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      stationName: currentStation?.stationName || '',
      contact: currentStation?.contact || '',
      emailId: currentStation?.emailId || '',
      address: currentStation?.address || '',
      street: currentStation?.street || '',
      state: currentStation?.state || '',
      city: currentStation?.city || '',
      pincode: currentStation?.pincode || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(createStation(values)).unwrap(); // change to updateStation if editing
        await dispatch(fetchStations());
        formik.resetForm();
        handleClose();
      } catch (err) {
        console.error('Error creating/updating station:', err);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    dispatch(clearCurrentStation());
    onClose();
  };

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  useEffect(() => {
    if (formik.values.state) {
      dispatch(fetchCities(formik.values.state));
    } else {
      dispatch(clearCities());
    }
  }, [formik.values.state, dispatch]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            {currentStation ? 'Edit Station' : 'Add New Station'}
          </Typography>
          <IconButton onClick={handleClose}><Close /></IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Station Name" name="stationName"
                value={formik.values.stationName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stationName && Boolean(formik.errors.stationName)}
                helperText={formik.touched.stationName && formik.errors.stationName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Contact" name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhone color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Email" name="emailId" type="email"
                value={formik.values.emailId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                helperText={formik.touched.emailId && formik.errors.emailId}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth label="Address" name="address" multiline rows={2}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={formik.touched.state && Boolean(formik.errors.state)}
              >
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  id="state"
                  name="state"
                  label="State"
                  labelId="state-label"
                  value={formik.values.state}
                  onChange={(e) => {
                    const selectedState = e.target.value;
                    formik.setFieldValue('state', selectedState);
                    formik.setFieldValue('city', '');
                    dispatch(fetchCities(selectedState));
                  }}
                  onBlur={formik.handleBlur}
                >
                  {Array.isArray(states) && states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.state && formik.errors.state && (
                  <Typography variant="caption" color="error">
                    {formik.errors.state}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={formik.touched.city && Boolean(formik.errors.city)}
              >
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  id="city"
                  name="city"
                  label="City"
                  labelId="city-label"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={!formik.values.state}
                >
                  {Array.isArray(cities) && cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.city && formik.errors.city && (
                  <Typography variant="caption" color="error">
                    {formik.errors.city}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="PIN Code" name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinDrop color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} variant="outlined">Cancel</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {currentStation ? 'Update Station' : 'Save Station'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StationForm;
