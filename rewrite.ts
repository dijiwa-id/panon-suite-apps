import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const imports = [
  'Dashboard', 'SignIn', 'SignUp', 'SystemAdminDashboard', 'SystemMonitoring',
  'NetworkManagement', 'WorkstationManagement', 'CameraManagement',
  'ModelManagement', 'ModelDeployment', 'ChannelManagement', 'AlgorithmContext',
  'PackageManagement', 'Roles', 'Users', 'RoleModules', 'UserSettings',
  'Configuration', 'DataCollection', 'DataSet', 'ImageAnnotation',
  'ModelTraining', 'AIModels', 'BuildingBlocks', 'NoCodeEditor',
  'Applications', 'Notifications', 'DeployDashboard', 'DeployLiveFeedCamera',
  'DeployDetectionLog', 'DeployReport'
];

imports.forEach(i => {
  const compMatch = content.match(new RegExp(`import { ${i} } from '\\.\\/(components|pages)\\/${i}';`));
  if (compMatch) {
    content = content.replace(compMatch[0], `const ${i} = React.lazy(() => import('./${compMatch[1]}/${i}').then(module => ({ default: module.${i} })));`);
  }
});

const suspenseWrapper = `<div className="flex items-center justify-center h-full w-full opacity-50"><div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div></div>`;

content = content.replace(/element={<AppLayout><([A-Za-z0-9_]+) \/><\/AppLayout>}/g, `element={<AppLayout><React.Suspense fallback={${suspenseWrapper}}><$1 /></React.Suspense></AppLayout>}`);

content = content.replace(/element={<SignIn \/>}/g, `element={<React.Suspense fallback={${suspenseWrapper}}><SignIn /></React.Suspense>}`);
content = content.replace(/element={<SignUp \/>}/g, `element={<React.Suspense fallback={${suspenseWrapper}}><SignUp /></React.Suspense>}`);

fs.writeFileSync('src/App.tsx', content);
