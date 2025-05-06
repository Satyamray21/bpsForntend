import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { AdsClick, Search } from '@mui/icons-material';
import { ReactComponent as CustomCarIcon } from '../../../assets/station/car.svg';
import StationForm from '../Manage Station/Form/StationForm';

import { useDispatch, useSelector } from 'react-redux';
import { fetchStations,deleteStation,searchStationByName } from '../../../features/stations/stationSlice';

const StationCard = () => {
  const dispatch = useDispatch();
  const { list: stations, loading, error } = useSelector((state) => state.stations);

  const [showForm, setShowForm] = useState(false);
  const [currentStation, setCurrentStation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const[searchStation,setSearchStation]=useState('');

  useEffect(() => {
    dispatch(fetchStations());
  }, [dispatch]);
  useEffect(()=>{
    if(searchStation.trim() === '')
    {
      dispatch(fetchStations())
    }
  },[searchStation,dispatch]);
  const handleEdit = (station) => {
    setCurrentStation(station);
    setIsEditing(true);
    setShowForm(true);
  };
  const handleDelete = (stationId)=>{
    if(window.confirm("Are you sure you want to delete this station ?"))
    {
      dispatch(deleteStation(stationId));
    }
  }
  const handleAdd = () => {
    setCurrentStation(null);
    setIsEditing(false);
    setShowForm(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ m: 2 }}>
          Manage Station
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AdsClick />}
          onClick={handleAdd}
          sx={{
            textTransform: 'none',
            padding: '6px 20px',
            backgroundColor: '#0155a5',
            '&:hover': { backgroundColor: '#013f71' },
          }}
        >
          <Typography variant="h6" sx={{ color: 'white' }}>Add</Typography>
        </Button>
      </Box>

      <Card sx={{ m: 2, boxShadow: 3, p: 2, backgroundColor: '#0155a5', color: '#ffffff' }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <CustomCarIcon width={74} height={77} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h6" fontWeight="600">{stations.length}</Typography>
              <Typography variant="body2" sx={{ color: '#ffffffa0' }}>Total stations</Typography>
              <Typography variant="h6">(30 days)</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchStation}
          onChange={(e)=>setSearchStation(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === 'Enter')
            {
              dispatch(searchStationByName(searchStation.trim()))
            }
          }}
          sx={{
            width: '300px',
            '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff', borderRadius: '20px' },
            '& .MuiInputLabel-root': { color: '#0155a5' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#0155a5' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#013f71' },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: '#0155a5',cursor:'pointer' }}
                onClick={()=>dispatch(searchStationByName(searchStation.trim()))} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ margin: '0 auto', mt: 2, maxWidth: '97%' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#0155a5' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>S. No</TableCell>
              <TableCell sx={{ color: 'white' }}>Station ID</TableCell>
              <TableCell sx={{ color: 'white' }}>Station Name</TableCell>
              <TableCell sx={{ color: 'white' }}>Contact</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Loading...</TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center">{error}</TableCell>
              </TableRow>
            ) : stations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">No stations found</TableCell>
              </TableRow>
            ) : (  
              
              Array.isArray(stations) &&stations.map((station, index) => (
                <TableRow key={station._id || station.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{station.stationId || station.id}</TableCell>
                  <TableCell>{station.stationName}</TableCell>
                  <TableCell>{station.contactNumber}</TableCell>
                 
                  
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleEdit(station)}
                      sx={{
                        color: '#0155a5',
                        borderColor: '#0155a5',
                        '&:hover': {
                          backgroundColor: '#0155a510',
                          borderColor: '#013f71',
                        }
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleDelete(station.stationId)}
                      sx={{
                        color: '#0155a5',
                        borderColor: '#0155a5',
                        '&:hover': {
                          backgroundColor: '#0155a510',
                          borderColor: '#013f71',
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <StationForm 
        open={showForm} 
        onClose={() => {
          setShowForm(false);
          setCurrentStation(null);
          setIsEditing(false);
        }} 
        onSubmit={() => {}} // Form handling via Redux (you can dispatch createStation here)
        initialValues={currentStation}
        isEditing={isEditing}
      />
    </>
  );
};

export default StationCard;
