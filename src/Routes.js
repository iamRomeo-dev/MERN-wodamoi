import { withAuthenticationRequired } from "@auth0/auth0-react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared/Layout";
import { PageSkeleton } from "./shared/Page";

const DashboardScreen = lazy(() => import("./dashboard/DashboardScreen"));
const NotFoundScreen = lazy(() => import("./not-found/NotFoundScreen"));

export const AppRoutes = withAuthenticationRequired(() => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
});
