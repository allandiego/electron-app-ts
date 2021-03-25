import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from '../components/Layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';

import { useAuth } from '../hooks/auth';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <DashboardLayout>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="profile" element={<Profile />} />

          <Route path="certificates/*" element={<CertificatesRoutes />} />

          <Route path="companies/*" element={<CompaniesRoutes />} />

          <Route path="users/*" element={<UsersRoutes />} /> */}
        </DashboardLayout>
      ) : (
        <>
          <DashboardLayout>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
            {/* <Route path="reset-password" element={<ResetPassword />} /> */}
          </DashboardLayout>
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
