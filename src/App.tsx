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
import { Notifications } from './pages/Notifications';
import { DeployDashboard } from './pages/DeployDashboard';
import { DeployLiveFeedCamera } from './pages/DeployLiveFeedCamera';
import { DeployDetectionLog } from './pages/DeployDetectionLog';
import { DeployReport } from './pages/DeployReport';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-gray-50 dark:bg-[#161616] relative">
      {/* Abstract Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gray-300/30 dark:bg-gray-600/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gray-400/30 dark:bg-gray-700/20 blur-[120px] pointer-events-none z-0" />
      
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="z-10" />
      <div className="flex-1 flex flex-col min-w-0 z-10 bg-transparent">
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
          <Route path="/notifications" element={<AppLayout><Notifications /></AppLayout>} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/system-admin/dashboard" element={<AppLayout><SystemAdminDashboard /></AppLayout>} />
          <Route path="/system-admin/system-monitoring" element={<AppLayout><SystemMonitoring /></AppLayout>} />
          <Route path="/system-admin/network-management" element={<AppLayout><NetworkManagement /></AppLayout>} />
          <Route path="/system-admin/workstation-management" element={<AppLayout><WorkstationManagement /></AppLayout>} />
          <Route path="/system-admin/camera-management" element={<AppLayout><CameraManagement /></AppLayout>} />
          <Route path="/system-admin/model-management" element={<AppLayout><ModelManagement /></AppLayout>} />
          <Route path="/system-admin/model-deployment" element={<AppLayout><ModelDeployment /></AppLayout>} />
          <Route path="/train/data-collection" element={<AppLayout><DataCollection /></AppLayout>} />
          <Route path="/train/data-set" element={<AppLayout><DataSet /></AppLayout>} />
          <Route path="/train/image-annotation" element={<AppLayout><ImageAnnotation /></AppLayout>} />
          <Route path="/train/model-training" element={<AppLayout><ModelTraining /></AppLayout>} />
          <Route path="/train/ai-models" element={<AppLayout><AIModels /></AppLayout>} />
          <Route path="/develop/building-blocks" element={<AppLayout><BuildingBlocks /></AppLayout>} />
          <Route path="/develop/no-code-editor" element={<AppLayout><NoCodeEditor /></AppLayout>} />
          <Route path="/develop/applications" element={<AppLayout><Applications /></AppLayout>} />
          <Route path="/deploy/dashboard" element={<AppLayout><DeployDashboard /></AppLayout>} />
          <Route path="/deploy/live-feed-camera" element={<AppLayout><DeployLiveFeedCamera /></AppLayout>} />
          <Route path="/deploy/detection-log" element={<AppLayout><DeployDetectionLog /></AppLayout>} />
          <Route path="/deploy/report" element={<AppLayout><DeployReport /></AppLayout>} />
          <Route path="/system-admin/channel-management/*" element={<AppLayout><ChannelManagement /></AppLayout>} />
          <Route path="/system-admin/algorithm-context" element={<AppLayout><AlgorithmContext /></AppLayout>} />
          <Route path="/system-admin/package-management" element={<AppLayout><PackageManagement /></AppLayout>} />
          <Route path="/system-admin/roles" element={<AppLayout><Roles /></AppLayout>} />
          <Route path="/system-admin/users" element={<AppLayout><Users /></AppLayout>} />
          <Route path="/system-admin/role-modules" element={<AppLayout><RoleModules /></AppLayout>} />
          <Route path="/user-settings" element={<AppLayout><UserSettings /></AppLayout>} />
          <Route path="/system-admin/configuration" element={<AppLayout><Configuration /></AppLayout>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
