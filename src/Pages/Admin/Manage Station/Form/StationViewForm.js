import React, { useEffect } from 'react';
import {
  Box, Dialog, DialogTitle, DialogContent, DialogActions, Grid,
  TextField, Typography, IconButton, InputAdornment, Button
} from '@mui/material';
import {
  Close, Home, LocalPhone, Email, LocationOn, PinDrop
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStationById } from '../../../../features/stations/stationSlice'; // adjust path if needed

const StationViewForm = ({ open, onClose, stationId }) => {
  const dispatch = useDispatch();
  const { currentStation, status } = useSelector(state => state.stations);

  useEffect(() => {
    if (open && stationId) {
      dispatch(fetchStationById(stationId));
    }
  }, [dispatch, open, stationId]);

  const station = currentStation;

  if (!station) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">View Station Details</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth label="Station Name" value={station.stationName || ''}
              disabled
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
              fullWidth label="Contact" value={station.contact || ''}
              disabled
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
              fullWidth label="Email" value={station.emailId || ''}
              disabled
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
              fullWidth label="Address" multiline rows={2}
              value={station.address || ''}
              disabled
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
            <TextField
              fullWidth label="State" value={station.state || ''}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="City" value={station.city || ''}
              disabled
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth label="PIN Code" value={station.pincode || ''}
              disabled
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
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StationViewForm;
