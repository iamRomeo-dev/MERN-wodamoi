import { withAuthenticationRequired } from "@auth0/auth0-react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared/Layout";
import { PageSkeleton } from "./shared/Page";
import { WodCreatedById } from "./WodCreatedById/WodCreatedById";

const NotFoundScreen = lazy(() => import("./not-found/NotFoundScreen"));
const RmTrackerList = lazy(() => import("./rmTracker/RmTrackerList"));
const RmTrackerByMovment = lazy(() => import("./rmTracker/RmTrackerByMovment"));
const WodCreatorUpdate = lazy(() => import("./wodcreator/WodCreatorUpdate"));
const WodCreatorCreation = lazy(() => import("./wodcreator/WodCreatorCreation"));
const WodCreator = lazy(() => import("./wodcreator/WodCreator"));
const RmTrackerCreation = lazy(() => import("./rmTracker/RmTrackerCreation"));
const Home = lazy(() => import("./home/Home"));

export const AppRoutes = withAuthenticationRequired(() => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wod-creator/creation" element={<WodCreatorCreation />} />
            <Route path="/wod-creator/:wodId/update" element={<WodCreatorUpdate />} />
            <Route path="/wod-creator/:wodId" element={<WodCreatedById />} />
            <Route path="/wod-creator" element={<WodCreator />} />
            <Route path="/rm-tracker/creation" element={<RmTrackerCreation />} />
            <Route path="/rm-tracker/:movment" element={<RmTrackerByMovment />} />
            <Route path="/rm-tracker" element={<RmTrackerList />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
});
