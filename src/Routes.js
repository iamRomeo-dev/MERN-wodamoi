/** @jsxImportSource @emotion/react */
import "twin.macro";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./shared/Layout";
import { Page, PageContent } from "./shared/Page";
import { Spinner } from "./shared/Spinner";

const Home = lazy(() => import("./home/Home"));
const NotFoundScreen = lazy(() => import("./not-found/NotFoundScreen"));

const RmTrackerList = lazy(() => import("./rmTracker/RmTrackerList"));
const RmTrackerByMovment = lazy(() => import("./rmTracker/RmTrackerByMovment"));
const RmTrackerCreation = lazy(() => import("./rmTracker/RmTrackerCreation"));

const WodCreatorUpdate = lazy(() => import("./wodcreator/WodCreatorUpdate"));
const WodCreatorCreation = lazy(() => import("./wodcreator/WodCreatorCreation"));
const WodCreatedById = lazy(() => import("./WodCreatedById/WodCreatedById"));
const WodCreator = lazy(() => import("./wodcreator/WodCreator"));

const FullTrainingList = lazy(() => import("./fullTraining/FullTrainingList"));
const FullTrainingByIdUpdate = lazy(() => import("./fullTraining/FullTrainingByIdUpdate"));
const FullTrainingById = lazy(() => import("./fullTraining/FullTrainingById"));
const FullTrainingCreation = lazy(() => import("./fullTraining/FullTrainingCreation"));

export const AppRoutes = withAuthenticationRequired(() => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense
          fallback={
            <Page>
              <PageContent tw="h-screen">
                <Spinner tw="h-10 w-10 fixed left-1/2 top-1/2" />
              </PageContent>
            </Page>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/full-training" element={<FullTrainingList />} />
            <Route path="/full-training/creation" element={<FullTrainingCreation />} />
            <Route path="/full-training/:fullTrainingId" element={<FullTrainingById />} />
            <Route
              path="/full-training/:fullTrainingId/update"
              element={<FullTrainingByIdUpdate />}
            />
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
