/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Link } from "react-router-dom";
import { WodamoiIcon } from "../shared/Icons";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet title={t("Dashboard.title")} />
      <Page tw="relative overflow-hidden">
        <PageContent>
          <div tw="grid grid-cols-1 gap-y-4 md:gap-x-2 w-full min-h-screen">
            <Link to="/full-training">
              <div tw="relative overflow-hidden bg-gray-100 rounded-md p-8 shadow-sm h-full">
                <WodamoiIcon tw="absolute -right-10 w-64 h-auto opacity-50" bgColor={"#0c4a6e"} />
                <div tw="relative w-full h-full">
                  <div tw="w-4/6 md:w-3/6 lg:w-4/6 xl:w-3/6">
                    <span tw="text-2xl text-gray-800 font-bold">SEANCE</span>
                    <p tw="text-base text-gray-500 font-medium">Crée ta propre séance</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={`/wod-creator`}>
              <div tw="relative overflow-hidden bg-gray-100 rounded-md p-8 shadow-sm h-full">
                <WodamoiIcon tw="absolute -right-10 w-64 h-auto opacity-50" bgColor={"#075985"} />
                <div tw="relative w-full h-full">
                  <div tw="w-4/6 md:w-3/6 lg:w-4/6 xl:w-3/6">
                    <span tw="text-2xl text-gray-800 font-bold">WOD CREATOR</span>
                    <p tw="text-base text-gray-500 font-medium">Crée tes propre wods</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={`/rm-tracker`} tw="mb-28 md:mb-12">
              <div tw="relative overflow-hidden bg-gray-100 rounded-md p-8 shadow-sm h-full">
                <WodamoiIcon tw="absolute -right-10 w-64 h-auto opacity-50" bgColor={"#0369a1"} />
                <div tw="relative w-full h-full">
                  <div tw="w-4/6 md:w-3/6 lg:w-4/6 xl:w-3/6">
                    <span tw="text-2xl text-gray-800 font-bold">RM TRACKER</span>
                    <p tw="text-base text-gray-500 font-medium">Enregistre tes PR</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </PageContent>
      </Page>
    </div>
  );
};

export default Home;
