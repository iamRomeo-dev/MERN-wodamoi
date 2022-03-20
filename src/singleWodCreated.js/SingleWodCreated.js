/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";

import { Link, useParams } from "react-router-dom";
import { useWodCreatedByIdQuery } from "../APIs";
import { ChevronLeftIcon } from "@heroicons/react/solid";

export const SingleWodCreated = () => {
  const { wodId } = useParams();

  const { status, data: dataWorkSiteById } = useWodCreatedByIdQuery(wodId);

  console.log("totto", dataWorkSiteById);

  return (
    <div>
      <Helmet title={dataWorkSiteById.name} />
      <Page tw="relative">
        <PageContent>
          <Link
            to={{
              pathname: `/wod-creator`,
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-100"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-100" aria-hidden="true" />
            <span>Retour</span>
          </Link>

          {status === "success" && (
            <div tw="text-white">
              <h1>{dataWorkSiteById.name}</h1>
              <p>
                {dataWorkSiteById.description.split("\n").map((str) => (
                  <p>{str}</p>
                ))}
              </p>
            </div>
          )}
        </PageContent>
      </Page>
    </div>
  );
};
