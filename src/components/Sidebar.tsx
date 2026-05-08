import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from './Logo';
import {
  LayoutDashboard,
  Bell,
  Database,
  Layers,
  Edit3,
  Cpu,
  Box,
  Layout,
  Code,
  Grid,
  ChevronDown,
  ChevronRight,
  LogOut,
  ChevronLeft,
  Aperture,
  Users,
  Camera,
  List,
  FileText,
  Network
} from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useAppStore } from "../store";

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard size={12} />,
  Notification: <Bell size={12} />,
  "Data Collection": <Database size={12} />,
  "Data Set": <Layers size={12} />,
  "Image Annotation": <Edit3 size={12} />,
  "Model Training": <Cpu size={12} />,
  "AI Models": <Box size={12} />,
  "Building Blocks": <Layout size={12} />,
  "No Code Editor": <Code size={12} />,
  Applications: <Grid size={12} />,
  "System Monitoring": <Cpu size={12} />,
  "Workstation Management": <Box size={12} />,
  "Camera Management": <Aperture size={12} />,
  "Channel Management": <Layers size={12} />,
  "Model Management": <Cpu size={12} />,
  "Model Deployment": <Cpu size={12} />,
  "Algorithm Package": <Code size={12} />,
  "Network Management": <Network size={12} />,
  "User Management": <Users size={12} />,
  "Roles": <Layers size={12} />,
  "Users": <Box size={12} />,
  "Role Modules": <Layers size={12} />,
  "Configuration": <Layout size={12} />,
  "Live Feed Camera": <Camera size={12} />,
  "Detection Log": <List size={12} />,
  "Report": <FileText size={12} />,
};

interface NavItemProps {
  icon: string;
  label: string;
  path: string;
  badge?: number;
  isCollapsed?: boolean;
}

interface SubItem {
  label: string;
  path: string;
}

interface NavItemType {
  label: string;
  path: string;
  subItems?: SubItem[];
  isDivider?: boolean;
}

const NavItem: React.FC<NavItemProps & { subItems?: SubItem[]; isOpen?: boolean; onToggle?: () => void }> = ({ icon, label, path, badge, isCollapsed, subItems, isOpen: isSubOpen, onToggle }) => {
  const location = useLocation();
  const active = location.pathname === path || (subItems && subItems.some(si => location.pathname === si.path));
  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div>
      <Link to={hasSubItems ? "#" : path} className="block" onClick={hasSubItems ? onToggle : undefined}>
        <div
          className={cn(
            "flex items-center py-2 cursor-pointer transition-all duration-300 group relative",
            isCollapsed
              ? "justify-center px-0 mx-4 rounded-xl"
              : "justify-between px-6",
            !isCollapsed && active
              ? "text-accent bg-accent/5 border-l-2 border-accent"
              : "",
            !isCollapsed && !active
              ? "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-white/[0.02] border-l-2 border-transparent"
              : "",
            isCollapsed && active
              ? "bg-accent/10 text-accent border border-accent/20"
              : "",
            isCollapsed && !active
              ? "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.02] border border-transparent"
              : "",
          )}
          title={isCollapsed ? label : undefined}
        >
          <div
            className={cn(
              "flex items-center",
              isCollapsed ? "justify-center" : "gap-3",
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center w-4 h-4 shrink-0 transition-colors duration-300",
                !isCollapsed && active
                  ? "text-accent"
                  : isCollapsed && active
                    ? "text-accent"
                    : "text-gray-500 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-200",
              )}
            >
              {iconMap[icon] || <Box size={12} />}
            </span>
            {!isCollapsed && (
              <span className={cn(
                "text-[12px] tracking-tight transition-all duration-300",
                active ? "font-medium text-gray-900 dark:text-white" : "font-normal text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
              )}>
                {label}
              </span>
            )}
          </div>
          {hasSubItems && !isCollapsed && (
             <ChevronDown size={12} className={cn("transition-transform duration-300 text-gray-400", isSubOpen ? "rotate-180" : "")} />
          )}
          {badge && !isCollapsed && (
            <span className="bg-secondary/10 text-secondary text-[9px] font-black px-2 py-0.5 rounded-md border border-secondary/20">
              {badge}
            </span>
          )}
          {badge && isCollapsed && (
            <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(236,50,146,0.5)]"></span>
          )}
        </div>
      </Link>
      {hasSubItems && !isCollapsed && isSubOpen && (
        <div className="ml-[32px] pl-3 border-l border-gray-200/70 dark:border-[#222] space-y-px mt-1 mb-2">
          {subItems!.map(sub => (
              <Link key={sub.path} to={sub.path} className={cn("block text-[11px] py-1.5 transition-colors pl-2", location.pathname === sub.path ? "text-accent font-medium bg-accent/5 rounded-md -ml-2" : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200")}>
                {sub.label}
              </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({
  isCollapsed,
  toggleSidebar,
  className
}: {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  className?: string;
}) => {
  const user = useAppStore(state => state.user);

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r border-gray-200/50 dark:border-[#262626]/50 bg-white/80 dark:bg-[#151515]/80 backdrop-blur-md transition-all duration-300 shrink-0 relative z-20",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="px-6 h-[55px] flex items-center">
        <Link to="/dashboard"
          className={cn(
            "flex items-center gap-2 group w-full",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <Logo className={cn("h-8 shrink-0", isCollapsed ? "w-8" : "w-8")} />
          {!isCollapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-lg tracking-tight text-gray-900 dark:text-white shrink-0">
                <span className="font-bold">panon</span><span className="font-normal">suite</span>
              </span>
              <span className="text-[8px] font-mono font-bold tracking-widest text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#222] px-1.5 py-[2px] rounded uppercase leading-none border border-gray-200 dark:border-[#333] shrink-0 transform translate-y-[2px]">
                v1.2.0
              </span>
            </div>
          )}
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pt-6">
        <Link
          to="/user-settings"
          className={cn(
            "px-4 mb-8 transition-all block",
            isCollapsed && "px-2 mb-6",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3 rounded-[11px] cursor-pointer transition-all group/profile",
              isCollapsed
                ? "flex-col justify-center py-2 hover:bg-gray-100 dark:hover:bg-[#1e1e1e] border border-gray-200 dark:border-[#222]"
                : "p-2 hover:bg-gray-100 dark:hover:bg-[#1e1e1e] border border-gray-200 dark:border-[#222]"
            )}
          >
            <div
              className={cn(
                "rounded-lg bg-accent/10 flex items-center justify-center p-0.5 overflow-hidden ring-1 ring-accent/20 group-hover/profile:scale-105 transition-transform",
                isCollapsed ? "w-10 h-10" : "w-9 h-9 shrink-0"
              )}
            >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200"
                  alt="avatar"
                  className="w-full h-full object-cover rounded shadow-sm"
                />
            </div>
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-[13px] font-bold tracking-tight text-gray-900 dark:text-white truncate leading-none mb-1">
                  {user ? user.name : "System User"}
                </p>
                <p className="text-[11px] font-medium text-gray-500 truncate leading-none mt-1">
                  {user ? user.email : "user@panon.ai"}
                </p>
              </div>
            )}
            {!isCollapsed && (
              <ChevronDown size={14} className="text-gray-400 shrink-0 opacity-0 group-hover/profile:opacity-100 transition-opacity" />
            )}
          </div>
        </Link>

        {/* Main Nav */}
        <div className="space-y-px mb-8">
          <NavItem
            icon="Dashboard"
            label="Dashboard"
            path="/dashboard"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon="Notification"
            label="Notification"
            path="/notifications"
            badge={99}
            isCollapsed={isCollapsed}
          />
        </div>


        {/* Dynamic Groups */}
        <div className="space-y-4 pb-20">
          <NavSection
            isCollapsed={isCollapsed}
            title="Train"
            items={[
              { label: "Data Collection", path: "/train/data-collection" },
              { label: "Data Set", path: "/train/data-set" },
              { label: "Image Annotation", path: "/train/image-annotation" },
              { label: "Model Training", path: "/train/model-training" },
              { label: "AI Models", path: "/train/ai-models" },
            ]}
          />

          <NavSection
            isCollapsed={isCollapsed}
            title="Develop"
            items={[
              { label: "Building Blocks", path: "/develop/building-blocks" },
              { label: "No Code Editor", path: "/develop/no-code-editor" },
              { label: "Applications", path: "/develop/applications" },
            ]}
          />

          <NavSection
            isCollapsed={isCollapsed}
            title="Deploy"
            items={[
              { label: "Dashboard", path: "/deploy/dashboard" },
              { label: "Live Feed Camera", path: "/deploy/live-feed-camera" },
              { label: "Detection Log", path: "/deploy/detection-log" },
              { label: "Report", path: "/deploy/report" },
            ]}
          />
          <NavSection
            isCollapsed={isCollapsed}
            title="System Admin"
            items={[
              { label: "Dashboard", path: "/system-admin/dashboard" },
              { label: "System Monitoring", path: "/system-admin/system-monitoring" },
              { label: "Network Management", path: "/system-admin/network-management" },
              { label: "Workstation Management", path: "/system-admin/workstation-management" },
              { label: "Camera Management", path: "/system-admin/camera-management" },
              {
                label: "Channel Management",
                path: "/system-admin/channel-management",
                subItems: [
                  { label: "Channel 1", path: "/system-admin/channel-management/channel-1" },
                  { label: "Channel 2", path: "/system-admin/channel-management/channel-2" },
                  { label: "Channel 3", path: "/system-admin/channel-management/channel-3" },
                  { label: "Channel 4", path: "/system-admin/channel-management/channel-4" },
                ],
              },
              { label: "Model Management", path: "/system-admin/model-management" },
              { label: "Model Deployment", path: "/system-admin/model-deployment" },
              {
                label: "Algorithm Package",
                path: "#",
                subItems: [
                  { label: "Algorithm Context", path: "/system-admin/algorithm-context" },
                  { label: "Package Management", path: "/system-admin/package-management" },
                ],
              },
              {
                label: "Configuration",
                path: "#",
                subItems: [
                  { label: "General", path: "/system-admin/configuration" },
                  { label: "Roles", path: "/system-admin/roles" },
                  { label: "Users", path: "/system-admin/users" },
                  { label: "Role Modules", path: "/system-admin/role-modules" },
                ],
              },
            ]}
          />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-[#2a2a2a] space-y-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 dark:bg-[#1e1e1e]/50 rounded-xl border border-gray-200 dark:border-[#2a2a2a] cursor-pointer group hover:bg-gray-200 dark:hover:bg-[#1e1e1e] transition-colors">
            <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center text-accent font-black text-sm shrink-0 shadow-[0_0_10px_rgba(82,197,243,0.3)]">
              4
            </div>
            <div className="shrink-0">
              <p className="text-[11px] font-bold text-gray-900 dark:text-white group-hover:text-accent transition-colors tracking-tight">
                Setup Panon Suite
              </p>
              <p className="text-[11px] text-gray-500 mt-1">4 Remaining Tasks</p>
            </div>
          </div>
        )}
        <div
          onClick={toggleSidebar}
          className={cn(
            "flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer group rounded-lg hover:bg-white/5",
            isCollapsed
              ? "justify-center p-2 mx-1"
              : "justify-between px-4 py-2",
          )}
        >
          <div className="flex items-center gap-3">
            <ChevronLeft
              size={14}
              className={cn(
                "transition-transform",
                isCollapsed
                  ? "rotate-180 group-hover:translate-x-1"
                  : "group-hover:-translate-x-1",
              )}
            />
            {!isCollapsed && (
              <span className="text-xs font-medium tracking-wide">
                Collapse
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

const NavSection = ({
  isCollapsed,
  title,
  items,
}: {
  isCollapsed: boolean;
  title: string;
  items: (NavItemType & { icon?: string })[];
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="space-y-1">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "px-6 flex items-center justify-between cursor-pointer group hover:text-gray-800 dark:hover:text-gray-400 mt-1 mb-1",
          isCollapsed && "justify-center px-0",
        )}
      >
        {!isCollapsed && <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500">{title}</span>}
        {!isCollapsed && (
          <motion.div
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400 dark:text-gray-500"
          >
            <ChevronDown size={12} />
          </motion.div>
        )}
        {isCollapsed && (
          <div className="w-4 h-[2px] bg-gray-300 dark:bg-[#333] rounded-full" />
        )}
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="space-y-px mt-0.5">
          {items.map((item, index) => item.isDivider ? (
            <div key={`divider-${index}`} className={cn("my-3 border-t border-gray-200 dark:border-[#2a2a2a]", isCollapsed ? "mx-4" : "mx-6")} />
          ) : (
            <NavItem
              key={item.label}
              icon={item.icon || item.label}
              label={item.label}
              path={item.path}
              subItems={item.subItems}
              isOpen={openSubMenus[item.label]}
              onToggle={() => toggleSubMenu(item.label)}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
