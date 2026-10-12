import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import Announcement from "./components/site/Announcement";
import Header from "./components/site/Header";
import Footer from "./components/site/Footer";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Download from "./pages/Download";
import NotFound from "./pages/NotFound";
import CheesyPrivacy from "./pages/cheesy/Privacy";
import CheesyTerms from "./pages/cheesy/Terms";
import meta from "./site-meta.json";

/** ページを移ったら、先頭へ戻してタブのタイトルも差し替える（SPA 内の遷移用。初回表示は HTML 側に焼き込み済み）。 */
function useRouteEffects() {
  const [location] = useLocation();
  useEffect(() => {
    const m = (meta.routes as Record<string, { title: string }>)[location];
    document.title = m?.title ?? "cheesy";
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, [location]);
}

function Router() {
  useRouteEffects();
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/company" component={Company} />
      <Route path="/cheesy/privacy" component={CheesyPrivacy} />
      <Route path="/cheesy/terms" component={CheesyTerms} />
      <Route path="/dl" component={Download} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="site">
        <Announcement />
        <Header />
        <main id="main" className="site-main">
          <Router />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
