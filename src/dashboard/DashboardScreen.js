/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import "twin.macro";
import { Page, PageContent, PageHeader, PageTitle } from "../shared/Page";
import { Card } from "../shared/Card";
import { useWorkersQuery } from "../shared/useApi";
const DashboardScreen = () => {
  const { status, data } = useWorkersQuery();
  console.log("status, data", status, data);
  const { t } = useTranslation();
  return (
    <>
      <Helmet title={t("Dashboard.title")} />
      <Page>
        <PageHeader title={<PageTitle>{t("Dashboard.title")}</PageTitle>} />
        <PageContent>
          <Card>
            <div tw="border-4 border-dashed border-gray-200 rounded-lg h-96" />
          </Card>
        </PageContent>
      </Page>
    </>
  );
};

export default DashboardScreen;
