/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Toaster } from 'sonner';

import { ErrorBoundary } from './components/ErrorBoundary';
import { useAppStore } from './store';

import { SetupGuide } from './pages/SetupGuide';

const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const SignIn = lazy(() => import('./pages/SignIn').then(m => ({ default: m.SignIn })));
const SystemAdminDashboard = lazy(() => import('./pages/SystemAdminDashboard').then(m => ({ default: m.SystemAdminDashboard })));
const SystemMonitoring = lazy(() => import('./pages/SystemMonitoring').then(m => ({ default: m.SystemMonitoring })));
const NetworkManagement = lazy(() => import('./pages/NetworkManagement').then(m => ({ default: m.NetworkManagement })));
const WorkstationManagement = lazy(() => import('./pages/WorkstationManagement').then(m => ({ default: m.WorkstationManagement })));
const CameraManagement = lazy(() => import('./pages/CameraManagement').then(m => ({ default: m.CameraManagement })));
const ModelManagement = lazy(() => import('./pages/ModelManagement').then(m => ({ default: m.ModelManagement })));
const ModelDeployment = lazy(() => import('./pages/ModelDeployment').then(m => ({ default: m.ModelDeployment })));
const ChannelManagement = lazy(() => import('./pages/ChannelManagement').then(m => ({ default: m.ChannelManagement })));
const AlgorithmContext = lazy(() => import('./pages/AlgorithmContext').then(m => ({ default: m.AlgorithmContext })));
const PackageManagement = lazy(() => import('./pages/PackageManagement').then(m => ({ default: m.PackageManagement })));
const Roles = lazy(() => import('./pages/Roles').then(m => ({ default: m.Roles })));
const Users = lazy(() => import('./pages/Users').then(m => ({ default: m.Users })));
const RoleModules = lazy(() => import('./pages/RoleModules').then(m => ({ default: m.RoleModules })));
const UserSettings = lazy(() => import('./pages/UserSettings').then(m => ({ default: m.UserSettings })));
const Configuration = lazy(() => import('./pages/Configuration').then(m => ({ default: m.Configuration })));
const DataCollection = lazy(() => import('./pages/DataCollection').then(m => ({ default: m.DataCollection })));
const DataSet = lazy(() => import('./pages/DataSet').then(m => ({ default: m.DataSet })));
const ImageAnnotation = lazy(() => import('./pages/ImageAnnotation').then(m => ({ default: m.ImageAnnotation })));
const ModelTraining = lazy(() => import('./pages/ModelTraining').then(m => ({ default: m.ModelTraining })));
const AIModels = lazy(() => import('./pages/AIModels').then(m => ({ default: m.AIModels })));
const BuildingBlocks = lazy(() => import('./pages/BuildingBlocks').then(m => ({ default: m.BuildingBlocks })));
const NoCodeEditor = lazy(() => import('./pages/NoCodeEditor').then(m => ({ default: m.NoCodeEditor })));
const Applications = lazy(() => import('./pages/Applications').then(m => ({ default: m.Applications })));
const VideoGeneration = lazy(() => import('./pages/VideoGeneration').then(m => ({ default: m.VideoGeneration })));
const Notifications = lazy(() => import('./pages/Notifications').then(m => ({ default: m.Notifications })));
const DeployDashboard = lazy(() => import('./pages/DeployDashboard').then(m => ({ default: m.DeployDashboard })));
const DeployLiveFeedCamera = lazy(() => import('./pages/DeployLiveFeedCamera').then(m => ({ default: m.DeployLiveFeedCamera })));
const DeployDetectionLog = lazy(() => import('./pages/DeployDetectionLog').then(m => ({ default: m.DeployDetectionLog })));
const DeployReport = lazy(() => import('./pages/DeployReport').then(m => ({ default: m.DeployReport })));

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

const PageFallback = () => (
  <div className="flex-1 flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
  </div>
);

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
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center dark:bg-[#161616]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div></div>}>
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
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </>
  );
}
