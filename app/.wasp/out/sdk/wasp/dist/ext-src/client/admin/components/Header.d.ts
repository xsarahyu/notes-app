/// <reference types="react" />
import { type AuthUser } from 'wasp/auth/types';
declare const Header: (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
    user?: AuthUser | null;
}) => import("react").JSX.Element;
export default Header;
