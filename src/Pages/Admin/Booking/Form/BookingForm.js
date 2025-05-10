import React, { useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates, fetchCities, clearCities } from '../../../../features/Location/locationSlice';
import { createBooking } from '../../../../features/booking/bookingSlice';

const stationOptions = ["Kanpur", "Station B", "Station C"];
const toPay = ['pay', 'paid','none'];

const initialValues = {
  startStation: "",
  endStation: "",
  bookingDate: null,
  deliveryDate: null,
  customerSearch: "",
  firstName: "",
  middleName: "",
  lastName: "",
  mobile: "",
  email: "",
  senderName: "",
  senderLocality: "",
  fromCity: "",
  senderGgt: "",
  fromState: "",
  senderPincode: "",
  receiverName: "",
  receiverLocality: "",
  receiverGgt: "",
  toState: "",
  toCity: "",
  toPincode: "",
  items: [
    {
      receiptNo: "",
      refNo: "",
      insurance: "",
      vppAmount: "",
      toPayPaid: "",
      weight: "",
      amount: "",
    },
  ],
  addComment: "",
  freight: "",
  ins_vpp: "",
  billTotal: "",
  cgst: "",
  sgst: "",
  igst: "",
  grandTotal: "",
};

const BookingForm = () => {
  const dispatch = useDispatch();
  const { states, cities } = useSelector((state) => state.location);

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          try {
            await dispatch(createBooking(values)).unwrap();
            formikHelpers.resetForm();
          } catch (error) {
            console.log("Error while adding booking", error);
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <EffectSyncCities values={values} dispatch={dispatch} />
            {/* ... all your form fields go here ... */}
            <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Start Station"
                    name="startStation"
                    value={values.startStation}
                    onChange={handleChange}
                  >
                    {stationOptions.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="Destination Station"
                    name="endStation"
                    value={values.endStation}
                    onChange={handleChange}
                  >
                    {stationOptions.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Booking Date"
                    value={values.bookingDate}
                    onChange={(val) => setFieldValue("bookingDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="bookingDate" />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DatePicker
                    label="Proposed Delivery Date"
                    value={values.deliveryDate}
                    onChange={(val) => setFieldValue("deliveryDate", val)}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} name="deliveryDate" />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 9 }}>
                  <Typography fontWeight="bold">
                    Customer Name/Number
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Search for customer"
                    name="customerSearch"
                    value={values.customerSearch}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 3 }}
                  sx={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddIcon />}
                    type="submit"
                  >
                    Register
                  </Button>
                </Grid>

                {["firstName", "middleName", "lastName"].map((name) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={name}>
                    <TextField
                      fullWidth
                      label={name.replace(/([A-Z])/g, " $1")}
                      name={name}
                      value={values[name]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">From (Address)</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="senderName"
                    value={values.senderName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="senderGgt"
                    value={values.senderGgt}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="senderLocality"
                    value={values.senderLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="State"
                    name="fromState"
                    value={values.fromState}
                    onChange={handleChange}
                  >
                    {states.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="City"
                    name="fromCity"
                    value={values.fromCity}
                    onChange={handleChange}
                  >
                    {cities.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="senderPincode"
                    value={values.senderPincode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">To (Address)</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="receiverName"
                    value={values.receiverName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="GST Number"
                    name="receiverGgt"
                    value={values.receiverGgt}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Locality / Street"
                    name="receiverLocality"
                    value={values.receiverLocality}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="State"
                    name="toState"
                    value={values.toState}
                    onChange={handleChange}
                  >
                    {states.map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    select
                    fullWidth
                    label="City"
                    name="toCity"
                    value={values.toCity}
                    onChange={handleChange}
                  >
                    {cities.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Pin Code"
                    name="toPincode"
                    value={values.toPincode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6">Product Details</Typography>
                </Grid>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      {values.items.map((_, index) => (
                        <Grid
                          container
                          spacing={2}
                          key={index}
                          alignItems="center"
                          sx={{ mb: 2 }}
                        >
                          <Grid size={{ xs: 0.5 }}>
                            <Typography>{index + 1}.</Typography>
                          </Grid>
                          {[
                            "receiptNo",
                            "refNo",
                            "insurance",
                            "vppAmount",
                            "weight",
                            "amount",
                          ].map((field) => (
                            <Grid size={{ xs: 6, sm: 3, md: 1.5 }} key={field}>
                              <Field
                                as={TextField}
                                fullWidth
                                size="small"
                                label={field.replace(/([A-Z])/g, " $1")}
                                name={`items[${index}].${field}`}
                              />
                            </Grid>
                          ))}
                          <Grid size={{ xs: 6, sm: 3, md: 1.5 }}>
                            <TextField
                              select
                              fullWidth
                              size="small"
                              label="To Pay/Paid"
                              name={`items[${index}].toPay`}
                              value={values.items[index].toPay}
                              onChange={handleChange}
                            >
                              {toPay.map((p) => (
                                <MenuItem key={p} value={p}>
                                  {p}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid size={{ xs: 6, sm: 3, md: 1 }}>
                            <Button
                              color="error"
                              onClick={() => remove(index)}
                              variant="outlined"
                              fullWidth
                            >
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      ))}

                      <Grid size={{ xs: 12 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() =>
                            push({
                              receiptNo: "",
                              refNo: "",
                              insurance: "",
                              vppAmount: "",
                              toPayPaid: "",
                              weight: "",
                              amount: "",
                            })
                          }
                        >
                          + Add Item
                        </Button>
                      </Grid>
                    </>
                  )}
                </FieldArray>

                <Grid size={{ xs: 12, md: 9 }}>
                  <TextField
                    name="addComment"
                    label="Additional addComment"
                    multiline
                    minRows={10}
                    fullWidth
                    value={values.addComment}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Grid container spacing={2}>
                    {[
                      ["freight", "FREIGHT"],
                      ["ins_vpp", "INS/VPP"],
                      ["billTotal", "Bill Total"],
                      ["cgst", "CGST%"],
                      ["sgst", "SGST%"],
                      ["igst", "IGST%"],
                      ["grandTotal", "Grand Total"],
                    ].map(([name, label]) => (
                      <Grid size={{ xs: 6 }} key={name}>
                        <TextField
                          name={name}
                          label={label}
                          value={values[name]}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit All
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

const EffectSyncCities = ({ values, dispatch }) => {
  useEffect(() => {
    if (values.fromState) {
      dispatch(fetchCities(values.fromState));
    } else {
      dispatch(clearCities());
    }
  }, [values.fromState, dispatch]);

  useEffect(() => {
    if (values.toState) {
      dispatch(fetchCities(values.toState));
    } else {
      dispatch(clearCities());
    }
  }, [values.toState, dispatch]);

  return null;
};

export default BookingForm;
