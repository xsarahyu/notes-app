/// <reference types="react" />
type PageViewsStats = {
    totalPageViews: number | undefined;
    prevDayViewsChangePercent: string | undefined;
};
declare const TotalPageViewsCard: ({ totalPageViews, prevDayViewsChangePercent }: PageViewsStats) => import("react").JSX.Element;
export default TotalPageViewsCard;
