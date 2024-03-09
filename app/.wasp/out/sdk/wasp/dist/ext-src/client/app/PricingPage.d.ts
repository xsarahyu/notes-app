/// <reference types="react" />
import { TierIds } from '../../shared/constants';
export declare const tiers: ({
    name: string;
    id: TierIds;
    priceMonthly: string;
    description: string;
    features: string[];
    bestDeal?: undefined;
} | {
    name: string;
    id: TierIds;
    priceMonthly: string;
    description: string;
    features: string[];
    bestDeal: boolean;
})[];
declare const PricingPage: () => import("react").JSX.Element;
export default PricingPage;
