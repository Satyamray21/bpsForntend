import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Admin/Dashboard';
import Users from '../Pages/Admin/Users';
import DashboardLayout from '../Layout/DashboardLayout';
import BookingCard from '../Pages/Admin/Booking/BookingCard';
import ContactCard from '../Pages/Admin/Contact/ContactCard';
import CustomerCard from '../Pages/Admin/Customer/CustomerCard';
import DeliveryCard from '../Pages/Admin/Delivery/DeliveryCard';
import DriverCard from '../Pages/Admin/Driver/DriverCard';
import VehicleCard from '../Pages/Admin/Vehicle/VehicleCard';
import TrackerCard from '../Pages/Admin/Tracker/TrackerCard';
import QuotationCard from '../Pages/Admin/Quotation/QuotationCard';
import LedgerCard from '../Pages/Admin/Ledger/LedgerCard';
import UserCard from '../Pages/Admin/Manage User/UserCard';
import StationCard from '../Pages/Admin/Manage Station/StationCard';
import StationForm from '../Pages/Admin/Manage Station/Form/StationForm';

const MainRoute = () => {
    const isAuthenticated = true; // Replace with real auth check

    return isAuthenticated ? (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path='/booking' element={<BookingCard />} />
                <Route path='/contact' element={<ContactCard />} />
                <Route path='/customer' element={<CustomerCard />} />
                <Route path='/delivery' element={<DeliveryCard />} />
                <Route path='/driver' element={<DriverCard />} />
                <Route path='/vehicle' element={<VehicleCard />} />
                <Route path='/customer' element={<CustomerCard />} />
                <Route path='/tracker' element={<TrackerCard />} />
                <Route path='/quotation' element={<QuotationCard />} />
                <Route path='/ladger' element={<LedgerCard />} />
                <Route path='/users' element={<UserCard />} />
                <Route path='/station' element={<StationCard />} />
                <Route path='/contact' element={<ContactCard />} />
                <Route path='/stationform' element={<StationForm />} />
            </Routes>
        </DashboardLayout>
    ) : (
        <Navigate to="/login" />
    );
};

export default MainRoute;
