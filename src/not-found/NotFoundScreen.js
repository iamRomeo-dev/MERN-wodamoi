/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "twin.macro";
import {
  EmptyState,
  EmptyStateButton,
  EmptyStateDescription,
  EmptyStateIllustration,
  EmptyStateTitle,
} from "../shared/EmptyState";
import { Page } from "../shared/Page";
import { NotFoundIllustration } from "./NotFoundIllustration";

const NotFoundScreen = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet title={t("NotFound.title")} />
      <Page>
        <EmptyState>
          <EmptyStateIllustration as={NotFoundIllustration} />
          <EmptyStateTitle as="h3">{t("NotFound.title")}</EmptyStateTitle>
          <EmptyStateDescription>{t("NotFound.description")}</EmptyStateDescription>
          <EmptyStateButton as={Link} to="/">
            {t("NotFound.goBackToDashboard")}
          </EmptyStateButton>
        </EmptyState>
      </Page>
    </>
  );
};

export default NotFoundScreen;
