import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronRight, 
  Home, 
  BrainCircuit, 
  Blocks, 
  Rocket, 
  Shield, 
  Activity, 
  Settings2, 
  Folder, 
  Layers,
  Cctv,
  Video,
  Settings,
  Bell,
  User,
  Sliders,
  Package,
  Wind
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface BreadcrumbStep {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Don't show on login page
  if (pathname === '/signin' || pathname === '/signup') {
    return null;
  }

  if (pathname.startsWith('/3d-visualizer')) {
    const tabs = [
      { id: 'cctv', label: 'CCTV', icon: <Video size={14} /> },
      { id: 'air', label: 'Air Quality', icon: <Wind size={14} /> },
      { id: 'lighting', label: 'Smart Lighting', icon: <Activity size={14} /> },
      { id: 'robots', label: 'Robots', icon: <Settings2 size={14} /> }
    ];

    const currentTab = new URLSearchParams(location.search).get('tab') || 'cctv';

    return (
      <div className="h-10 px-[30px] flex items-center bg-white/60 dark:bg-[#161616]/60 backdrop-blur-sm border-b border-gray-200/40 dark:border-[#2a2a2a]/30 text-xs font-medium text-gray-400 select-none z-40 shrink-0 gap-2">
        {tabs.map(tab => (
          <Link
            key={tab.id}
            to={`${pathname}?tab=${tab.id}`}
            className={cn(
              "px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold tracking-tight transition-colors",
              currentTab === tab.id
                ? "bg-[#7c3aed]/10 text-[#7c3aed]"
                : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
            )}
          >
            {tab.icon} {tab.label}
          </Link>
        ))}
      </div>
    );
  }

  // Icon maps for standard sections
  const trainIcon = <BrainCircuit size={12} className="text-[#52C5F3]" />;
  const developIcon = <Blocks size={12} className="text-[#52C5F3]" />;
  const deployIcon = <Rocket size={12} className="text-[#52C5F3]" />;
  const systemAdminIcon = <Shield size={12} className="text-[#52C5F3]" />;
  const orchestrationIcon = <Activity size={12} className="text-[#52C5F3]" />;
  const homeIcon = <Home size={12} className="text-gray-400 group-hover:text-[#52C5F3] transition-colors" />;

  // Precise navigation trail resolver
  const getBreadcrumbs = (): BreadcrumbStep[] => {
    const steps: BreadcrumbStep[] = [
      { label: 'Home', path: '/dashboard', icon: homeIcon }
    ];

    if (pathname === '/dashboard') {
      steps.push({ label: 'Overview' });
      return steps;
    }

    if (pathname === '/notifications') {
      steps.push({ label: 'Notification', icon: <Bell size={12} /> });
      return steps;
    }

    if (pathname === '/user-settings') {
      steps.push({ label: 'User Settings', icon: <User size={12} /> });
      return steps;
    }

    if (pathname === '/setup') {
      steps.push({ label: 'Setup Guide', icon: <Settings2 size={12} /> });
      return steps;
    }

    // Train Section
    if (pathname.startsWith('/train/')) {
      steps.push({ label: 'Train', icon: trainIcon });
      
      if (pathname === '/train/data-collection') {
        steps.push({ label: 'Data Collection', path: '/train/data-collection' });
      } else if (pathname === '/train/data-set') {
        steps.push({ label: 'Data Set', path: '/train/data-set' });
      } else if (pathname === '/train/image-annotation') {
        steps.push({ label: 'Image Annotation', path: '/train/image-annotation' });
      } else if (pathname === '/train/model-training') {
        steps.push({ label: 'Model Training', path: '/train/model-training' });
      } else if (pathname === '/train/ai-models') {
        steps.push({ label: 'AI Models', path: '/train/ai-models' });
      }
      return steps;
    }

    // Develop Section
    if (pathname.startsWith('/develop/')) {
      steps.push({ label: 'Develop', icon: developIcon });
      
      if (pathname === '/develop/building-blocks') {
        steps.push({ label: 'Building Blocks', path: '/develop/building-blocks' });
      } else if (pathname === '/develop/no-code-editor') {
        steps.push({ label: 'No Code Editor', path: '/develop/no-code-editor' });
      } else if (pathname === '/develop/applications') {
        steps.push({ label: 'Applications', path: '/develop/applications' });
      } else if (pathname === '/develop/video-generation') {
        steps.push({ label: 'Camera ROI Setup', path: '/develop/video-generation' });
      }
      return steps;
    }

    // Deploy Section
    if (pathname.startsWith('/deploy/')) {
      steps.push({ label: 'Deploy', icon: deployIcon });
      
      if (pathname === '/deploy/dashboard') {
        steps.push({ label: 'Overview', path: '/deploy/dashboard' });
      } else if (pathname === '/deploy/live-feed-camera') {
        steps.push({ label: 'Live Feed Camera', path: '/deploy/live-feed-camera' });
      } else if (pathname === '/deploy/detection-log') {
        steps.push({ label: 'Detection Log', path: '/deploy/detection-log' });
      } else if (pathname === '/deploy/report') {
        steps.push({ label: 'Report', path: '/deploy/report' });
      }
      return steps;
    }

    // System Admin Section
    if (pathname.startsWith('/system-admin/')) {
      steps.push({ label: 'System Admin', icon: systemAdminIcon });

      if (pathname === '/system-admin/dashboard') {
        steps.push({ label: 'Overview', path: '/system-admin/dashboard' });
      } else if (pathname === '/system-admin/network-management') {
        steps.push({ label: 'Network Management', path: '/system-admin/network-management' });
      } else if (pathname === '/system-admin/workstation-management') {
        steps.push({ label: 'Workstation Management', path: '/system-admin/workstation-management' });
      } else if (pathname === '/system-admin/camera-management') {
        steps.push({ label: 'Camera Management', path: '/system-admin/camera-management' });
      } else if (pathname.startsWith('/system-admin/channel-management')) {
        steps.push({ label: 'Channel Management', path: '/system-admin/channel-management' });
        const parts = pathname.split('/');
        if (parts.length > 3) {
          const subLabel = parts[3].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          steps.push({ label: subLabel });
        }
      } else if (pathname === '/system-admin/model-management') {
        steps.push({ label: 'Model Management', path: '/system-admin/model-management' });
      } else if (pathname === '/system-admin/model-deployment') {
        steps.push({ label: 'Model Deployment', path: '/system-admin/model-deployment' });
      } else if (pathname === '/system-admin/algorithm-context' || pathname === '/system-admin/package-management') {
        steps.push({ label: 'Algorithm Package', icon: <Package size={12} className="text-gray-400" /> });
        if (pathname === '/system-admin/algorithm-context') {
          steps.push({ label: 'Algorithm Context', path: '/system-admin/algorithm-context' });
        } else {
          steps.push({ label: 'Package Management', path: '/system-admin/package-management' });
        }
      } else if (pathname === '/system-admin/configuration' || pathname === '/system-admin/roles' || pathname === '/system-admin/users' || pathname === '/system-admin/role-modules') {
        steps.push({ label: 'Configuration', icon: <Sliders size={12} className="text-gray-400" /> });
        if (pathname === '/system-admin/configuration') {
          steps.push({ label: 'General', path: '/system-admin/configuration' });
        } else if (pathname === '/system-admin/roles') {
          steps.push({ label: 'Roles', path: '/system-admin/roles' });
        } else if (pathname === '/system-admin/users') {
          steps.push({ label: 'Users', path: '/system-admin/users' });
        } else {
          steps.push({ label: 'Role Modules', path: '/system-admin/role-modules' });
        }
      }
      return steps;
    }

    // Orchestration Platform Section
    if (pathname.startsWith('/orchestration/')) {
      steps.push({ label: 'Orchestration Platform', icon: orchestrationIcon });

      if (pathname === '/orchestration/dashboard') {
        steps.push({ label: 'Channels', path: '/orchestration/dashboard' });
      } else if (pathname === '/orchestration/detection-history') {
        steps.push({ label: 'Detection History', path: '/orchestration/detection-history' });
      } else if (pathname === '/orchestration/detection-evidence') {
        steps.push({ label: 'Detection Evidence', path: '/orchestration/detection-evidence' });
      } else if (pathname.startsWith('/orchestration/system-monitoring/')) {
        steps.push({ label: 'System Monitoring', icon: <Settings size={12} className="text-gray-400" /> });
        
        if (pathname === '/orchestration/system-monitoring/camera') {
          steps.push({ label: 'Camera', path: '/orchestration/system-monitoring/camera' });
        } else if (pathname === '/orchestration/system-monitoring/channels') {
          steps.push({ label: 'Channels', path: '/orchestration/system-monitoring/channels' });
        } else if (pathname === '/orchestration/system-monitoring/workstation') {
          steps.push({ label: 'Workstation', path: '/orchestration/system-monitoring/workstation' });
        } else if (pathname === '/orchestration/system-monitoring/system-health') {
          steps.push({ label: 'System Health', path: '/orchestration/system-monitoring/system-health' });
        }
      }
      return steps;
    }

    // Fallback parser for dynamic routes
    const segments = pathname.split('/').filter(Boolean);
    segments.forEach((seg, idx) => {
      const label = seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const path = '/' + segments.slice(0, idx + 1).join('/');
      steps.push({ label, path });
    });

    return steps;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <motion.nav 
      key={pathname}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="h-10 px-[30px] flex items-center bg-white/60 dark:bg-[#161616]/60 backdrop-blur-sm border-b border-gray-200/40 dark:border-[#2a2a2a]/30 text-xs font-medium text-gray-400 select-none z-40 shrink-0"
    >
      <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none w-full max-w-[1600px] mx-auto">
        {breadcrumbs.map((step, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          
          return (
            <React.Fragment key={`${step.label}-${idx}`}>
              {idx > 0 && (
                <ChevronRight size={12} className="text-gray-300 dark:text-gray-700/80 shrink-0" />
              )}
              
              <div className="flex items-center gap-1.5 shrink-0 group">
                {step.icon && (
                  <span className="flex items-center justify-center shrink-0">
                    {step.icon}
                  </span>
                )}
                
                {step.path && !isLast ? (
                  <Link 
                    to={step.path}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-[#52C5F3] transition-colors duration-200"
                  >
                    {step.label}
                  </Link>
                ) : (
                  <span className={cn(
                    "font-bold transition-colors", 
                    isLast 
                      ? "text-gray-900 dark:text-white" 
                      : "text-gray-500 dark:text-gray-400"
                  )}>
                    {step.label}
                  </span>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </motion.nav>
  );
};
