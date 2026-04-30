import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { Producers } from './pages/Producers';
import { Certificates } from './pages/Certificates';
import { Market } from './pages/Market';
import { Reports } from './pages/Reports';
import { Registration } from './pages/Registration';
import { RegisterAsset } from './pages/RegisterAsset';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { AssetDetails } from './pages/AssetDetails';
import { AssetHistory } from './pages/AssetHistory';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/producers" element={<Producers />} />
          <Route path="/assets/:id" element={<AssetDetails />} />
          <Route path="/assets/:id/history" element={<AssetHistory />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/market" element={<Market />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/register-asset" element={<RegisterAsset />} />
          {/* Fallback to Dashboard/Overview */}
          <Route path="*" element={<Overview />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

