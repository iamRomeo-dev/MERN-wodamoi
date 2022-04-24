import { withAuthenticationRequired } from "@auth0/auth0-react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import { Layout } from "./shared/Layout";
import { PageSkeleton } from "./shared/Page";
import { SingleWodCreated } from "./singleWodCreated.js/SingleWodCreated";
import WodCreator from "./wodcreator/WodCreator";
import WodCreatorCreation from "./wodcreator/WodCreatorCreation";
import WodCreatorUpdate from "./wodcreator/WodCreatorUpdate";

const NotFoundScreen = lazy(() => import("./not-found/NotFoundScreen"));

export const AppRoutes = withAuthenticationRequired(() => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wod-creator/creation" element={<WodCreatorCreation />} />
            <Route path="/wod-creator/:wodId/update" element={<WodCreatorUpdate />} />
            <Route path="/wod-creator/:wodId" element={<SingleWodCreated />} />
            <Route path="/wod-creator" element={<WodCreator />} />
            <Route path="/rm-tracker" element={<WodCreator />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
});
