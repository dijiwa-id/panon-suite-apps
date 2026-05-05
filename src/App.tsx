/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
const Dashboard = React.lazy(() => import('./components/Dashboard').then(module => ({ default: module.Dashboard })));
const SignIn = React.lazy(() => import('./pages/SignIn').then(module => ({ default: module.SignIn })));
const SignUp = React.lazy(() => import('./pages/SignUp').then(module => ({ default: module.SignUp })));
const SystemAdminDashboard = React.lazy(() => import('./pages/SystemAdminDashboard').then(module => ({ default: module.SystemAdminDashboard })));
const SystemMonitoring = React.lazy(() => import('./pages/SystemMonitoring').then(module => ({ default: module.SystemMonitoring })));
const NetworkManagement = React.lazy(() => import('./pages/NetworkManagement').then(module => ({ default: module.NetworkManagement })));
const WorkstationManagement = React.lazy(() => import('./pages/WorkstationManagement').then(module => ({ default: module.WorkstationManagement })));
const CameraManagement = React.lazy(() => import('./pages/CameraManagement').then(module => ({ default: module.CameraManagement })));
const ModelManagement = React.lazy(() => import('./pages/ModelManagement').then(module => ({ default: module.ModelManagement })));
const ModelDeployment = React.lazy(() => import('./pages/ModelDeployment').then(module => ({ default: module.ModelDeployment })));
const ChannelManagement = React.lazy(() => import('./pages/ChannelManagement').then(module => ({ default: module.ChannelManagement })));
const AlgorithmContext = React.lazy(() => import('./pages/AlgorithmContext').then(module => ({ default: module.AlgorithmContext })));
const PackageManagement = React.lazy(() => import('./pages/PackageManagement').then(module => ({ default: module.PackageManagement })));
const Roles = React.lazy(() => import('./pages/Roles').then(module => ({ default: module.Roles })));
const Users = React.lazy(() => import('./pages/Users').then(module => ({ default: module.Users })));
const RoleModules = React.lazy(() => import('./pages/RoleModules').then(module => ({ default: module.RoleModules })));
const UserSettings = React.lazy(() => import('./pages/UserSettings').then(module => ({ default: module.UserSettings })));
const Configuration = React.lazy(() => import('./pages/Configuration').then(module => ({ default: module.Configuration })));
const DataCollection = React.lazy(() => import('./pages/DataCollection').then(module => ({ default: module.DataCollection })));
const DataSet = React.lazy(() => import('./pages/DataSet').then(module => ({ default: module.DataSet })));
const ImageAnnotation = React.lazy(() => import('./pages/ImageAnnotation').then(module => ({ default: module.ImageAnnotation })));
const ModelTraining = React.lazy(() => import('./pages/ModelTraining').then(module => ({ default: module.ModelTraining })));
const AIModels = React.lazy(() => import('./pages/AIModels').then(module => ({ default: module.AIModels })));
const BuildingBlocks = React.lazy(() => import('./pages/BuildingBlocks').then(module => ({ default: module.BuildingBlocks })));
const NoCodeEditor = React.lazy(() => import('./pages/NoCodeEditor').then(module => ({ default: module.NoCodeEditor })));
const Applications = React.lazy(() => import('./pages/Applications').then(module => ({ default: module.Applications })));
const Notifications = React.lazy(() => import('./pages/Notifications').then(module => ({ default: module.Notifications })));
const DeployDashboard = React.lazy(() => import('./pages/DeployDashboard').then(module => ({ default: module.DeployDashboard })));
const DeployLiveFeedCamera = React.lazy(() => import('./pages/DeployLiveFeedCamera').then(module => ({ default: module.DeployLiveFeedCamera })));
const DeployDetectionLog = React.lazy(() => import('./pages/DeployDetectionLog').then(module => ({ default: module.DeployDetectionLog })));
const DeployReport = React.lazy(() => import('./pages/DeployReport').then(module => ({ default: module.DeployReport })));
import { Toaster } from 'sonner';

import { ErrorBoundary } from './components/ErrorBoundary';
import { DevelopProvider } from './context/DevelopContext';
import { TrainProvider } from './context/TrainContext';

const AppLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50 dark:bg-[#161616] relative">
      {/* Abstract Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gray-300/30 dark:bg-gray-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gray-400/30 dark:bg-gray-700/20 blur-[120px] pointer-events-none z-0" />
      
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="z-10" />
      <div className="flex-1 flex flex-col min-w-0 z-10 bg-transparent">
        <Header />
        <ErrorBoundary>
          <React.Suspense fallback={suspenseWrapper}>
            <Outlet />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

const suspenseWrapper = (
  <div className="flex items-center justify-center h-full w-full opacity-50">
    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <DevelopProvider>
        <TrainProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/signin" element={<React.Suspense fallback={suspenseWrapper}><SignIn /></React.Suspense>} />
              <Route path="/signup" element={<React.Suspense fallback={suspenseWrapper}><SignUp /></React.Suspense>} />
              
              <Route element={<AppLayout />}>
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
        </TrainProvider>
      </DevelopProvider>
    </ThemeProvider>
  );
}
