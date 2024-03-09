import React from 'react';
interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}
declare const Sidebar: ({ sidebarOpen, setSidebarOpen }: SidebarProps) => React.JSX.Element;
export default Sidebar;
