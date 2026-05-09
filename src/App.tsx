/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SignIn } from './pages/SignIn';
import { SystemAdminDashboard } from './pages/SystemAdminDashboard';
import { SystemMonitoring } from './pages/SystemMonitoring';
import { NetworkManagement } from './pages/NetworkManagement';
import { WorkstationManagement } from './pages/WorkstationManagement';
import { CameraManagement } from './pages/CameraManagement';
import { ModelManagement } from './pages/ModelManagement';
import { ModelDeployment } from './pages/ModelDeployment';
import { ChannelManagement } from './pages/ChannelManagement';
import { AlgorithmContext } from './pages/AlgorithmContext';
import { PackageManagement } from './pages/PackageManagement';
import { Roles } from './pages/Roles';
import { Users } from './pages/Users';
import { RoleModules } from './pages/RoleModules';
import { UserSettings } from './pages/UserSettings';
import { Configuration } from './pages/Configuration';
import { DataCollection } from './pages/DataCollection';
import { DataSet } from './pages/DataSet';
import { ImageAnnotation } from './pages/ImageAnnotation';
import { ModelTraining } from './pages/ModelTraining';
import { AIModels } from './pages/AIModels';
import { BuildingBlocks } from './pages/BuildingBlocks';
import { NoCodeEditor } from './pages/NoCodeEditor';
import { Applications } from './pages/Applications';
import { VideoGeneration } from './pages/VideoGeneration';
import { Notifications } from './pages/Notifications';
import { DeployDashboard } from './pages/DeployDashboard';
import { DeployLiveFeedCamera } from './pages/DeployLiveFeedCamera';
import { DeployDetectionLog } from './pages/DeployDetectionLog';
import { DeployReport } from './pages/DeployReport';
import { Toaster } from 'sonner';

import { ErrorBoundary } from './components/ErrorBoundary';
import { useAppStore } from './store';

import { SetupGuide } from './pages/SetupGuide';

const RouteSync = () => {
  const location = useLocation();
  const setActivePath = useAppStore(state => state.setActivePath);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname, setActivePath]);

  return null;
};

const ThemeSync = () => {
  const theme = useAppStore(state => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return null;
}

const AppLayout = () => {
  const isSidebarOpen = useAppStore(state => state.isSidebarOpen);
  const toggleSidebar = useAppStore(state => state.toggleSidebar);
  const isAuthenticated = useAppStore(state => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50 dark:bg-[#161616] relative">
      <ThemeSync />
      <RouteSync />
      {/* Abstract Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gray-300/30 dark:bg-gray-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gray-400/30 dark:bg-gray-700/20 blur-[120px] pointer-events-none z-0" />
      
      <Sidebar isCollapsed={!isSidebarOpen} toggleSidebar={toggleSidebar} className="z-10" />
      <div className="flex-1 flex flex-col min-w-0 z-10 bg-transparent">
        <Header />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<Navigate to="/signin" replace />} />
              
              <Route element={<AppLayout />}>
                <Route path="/setup" element={<SetupGuide />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/system-admin/dashboard" element={<SystemAdminDashboard />} />
                <Route path="/system-admin/system-monitoring" element={<SystemMonitoring />} />
                <Route path="/system-admin/network-management" element={<NetworkManagement />} />
                <Route path="/system-admin/workstation-management" element={<WorkstationManagement />} />
                <Route path="/system-admin/camera-management" element={<CameraManagement />} />
                <Route path="/system-admin/model-management" element={<ModelManagement />} />
                <Route path="/system-admin/model-deployment" element={<ModelDeployment />} />
                <Route path="/train/data-collection" element={<DataCollection />} />
                <Route path="/train/data-set" element={<DataSet />} />
                <Route path="/train/image-annotation" element={<ImageAnnotation />} />
                <Route path="/train/model-training" element={<ModelTraining />} />
                <Route path="/train/ai-models" element={<AIModels />} />
                <Route path="/develop/building-blocks" element={<BuildingBlocks />} />
                <Route path="/develop/no-code-editor" element={<NoCodeEditor />} />
                <Route path="/develop/applications" element={<Applications />} />
                <Route path="/develop/video-generation" element={<VideoGeneration />} />
                <Route path="/deploy/dashboard" element={<DeployDashboard />} />
                <Route path="/deploy/live-feed-camera" element={<DeployLiveFeedCamera />} />
                <Route path="/deploy/detection-log" element={<DeployDetectionLog />} />
                <Route path="/deploy/report" element={<DeployReport />} />
                <Route path="/system-admin/channel-management/*" element={<ChannelManagement />} />
                <Route path="/system-admin/algorithm-context" element={<AlgorithmContext />} />
                <Route path="/system-admin/package-management" element={<PackageManagement />} />
                <Route path="/system-admin/roles" element={<Roles />} />
                <Route path="/system-admin/users" element={<Users />} />
                <Route path="/system-admin/role-modules" element={<RoleModules />} />
                <Route path="/user-settings" element={<UserSettings />} />
                <Route path="/system-admin/configuration" element={<Configuration />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </>
  );
}
