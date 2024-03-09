import './Main.css';
import { ReactNode } from 'react';
/**
 * use this component to wrap all child components
 * this is useful for templates, themes, and context
 */
export default function App({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
