import { ReactNode } from 'react';
interface SidebarLinkGroupProps {
    children: (handleClick: () => void, open: boolean) => ReactNode;
    activeCondition: boolean;
}
declare const SidebarLinkGroup: ({ children, activeCondition, }: SidebarLinkGroupProps) => import("react").JSX.Element;
export default SidebarLinkGroup;
