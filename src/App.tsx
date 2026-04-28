/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { SystemAdminDashboard } from './pages/SystemAdminDashboard';
import { SystemMonitoring } from './pages/SystemMonitoring';
import { WorkstationManagement } from './pages/WorkstationManagement';
import { CameraManagement } from './pages/CameraManagement';
import { ModelManagement } from './pages/ModelManagement';
import { ChannelManagement } from './pages/ChannelManagement';
import { AlgorithmContext } from './pages/AlgorithmContext';
import { PackageManagement } from './pages/PackageManagement';
import { Roles } from './pages/Roles';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/system-admin/dashboard" element={<AppLayout><SystemAdminDashboard /></AppLayout>} />
          <Route path="/system-admin/system-monitoring" element={<AppLayout><SystemMonitoring /></AppLayout>} />
          <Route path="/system-admin/workstation-management" element={<AppLayout><WorkstationManagement /></AppLayout>} />
          <Route path="/system-admin/camera-management" element={<AppLayout><CameraManagement /></AppLayout>} />
          <Route path="/system-admin/model-management" element={<AppLayout><ModelManagement /></AppLayout>} />
          <Route path="/system-admin/channel-management/*" element={<AppLayout><ChannelManagement /></AppLayout>} />
          <Route path="/system-admin/algorithm-context" element={<AppLayout><AlgorithmContext /></AppLayout>} />
          <Route path="/system-admin/package-management" element={<AppLayout><PackageManagement /></AppLayout>} />
          <Route path="/system-admin/roles" element={<AppLayout><Roles /></AppLayout>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
