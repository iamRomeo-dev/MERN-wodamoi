/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Link } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet title={t("Dashboard.title")} />
      <Page tw="relative">
        <PageContent>
          <div tw="grid grid-cols-1 lg:grid-cols-3 gap-y-4 md:gap-x-2 w-full lg:w-2/3 min-h-screen">
            <Link to="">
              <div tw="bg-gray-100 rounded-md p-8 shadow-sm h-full">
                <div tw="relative w-full h-full">
                  <div tw="w-4/6 md:w-3/6 lg:w-4/6 xl:w-3/6">
                    <span tw="text-2xl text-gray-800 font-bold">SEANCE</span>
                    <p tw="text-base text-gray-500 font-medium">Crée ta propre séance</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={`/wod-creator`}>
              <div tw="bg-gray-100 rounded-md p-8 shadow-sm h-full">
                <div tw="relative w-full h-full">
                  <div tw="w-4/6 md:w-3/6 lg:w-4/6 xl:w-3/6">
                    <span tw="text-2xl text-gray-800 font-bold">WOD CREATOR</span>
                    <p tw="text-base text-gray-500 font-medium">Crée tes propre wods</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={`/rm-tracker`} tw="mb-28">
              <div tw="bg-gray-100 rounded-md p-8 shadow-sm h-full">
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
