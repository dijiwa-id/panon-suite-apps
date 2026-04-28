export interface NavItem {
  icon: string;
  label: string;
  badge?: number;
  active?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "TRAIN",
    items: [
      { icon: "Database", label: "Data Collection" },
      { icon: "Layers", label: "Data Aset" },
      { icon: "Edit3", label: "Image Annotation" },
      { icon: "Cpu", label: "Model Training" },
      { icon: "Box", label: "AI Models" },
    ],
  },
  {
    label: "DEVELOP",
    items: [
      { icon: "Layout", label: "Building Blocks" },
      { icon: "Code", label: "No Code Editor" },
      { icon: "Grid", label: "Applications" },
    ],
  },
  {
    label: "DEPLOY",
    items: [],
  },
  {
    label: "OPERATE",
    items: [],
  },
];
