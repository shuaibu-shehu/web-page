import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AnalyticsBeacon from "@/components/analytics-beacon";

/** Public site chrome — header and footer wrap every (site) page. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <AnalyticsBeacon />
    </>
  );
}
