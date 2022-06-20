/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/solid";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIllustration,
  EmptyStateTitle,
} from "../shared/EmptyState";
import { NotFoundIllustration } from "../not-found/NotFoundIllustration";
import { FloatButton, PrimaryButton } from "../shared/Buttons";
import { RmTrackerListItem } from "./RmTrackerListItem";
import { useRmQuery } from "../APIsRmTracker";
import { useAuth0 } from "@auth0/auth0-react";
import { Filter } from "../shared/QueryHelper";
import { Spinner } from "../shared/Spinner";
import { Pagination } from "../shared/Pagination";

const RmTrackerList = () => {
  const { user } = useAuth0();
  const location = useLocation();
  const pageSize = 10;
  const pageParams = location.search.substr(location.search.length - 1);

  const { status, data: rms } = useRmQuery({
    limit: pageSize,
    skip: Number(pageParams) * pageSize,
    ...Filter.from({
      $and: [
        {
          createdBy: Filter.regex(user.name),
        },
      ],
    }),
  });
  const totalOfPages = status === "success" && Math.ceil(rms.totalCount / pageSize);

  // Sort the array in order to keep only unique objects with the same movment value
  const key = "movment";
  const rmsUniqueMovment = [
    ...new Map(
      rms?.list
        .map((item) => item)
        .reverse()
        .map((item) => [item[key], item])
    ).values(),
  ];

  return (
    <div>
      <Helmet title="Wod creator" />
      <Page tw="relative">
        <PageContent>
          <Link
            to={{
              pathname: `/`,
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-100"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-100" aria-hidden="true" />
            <span>Retour</span>
          </Link>
          {status === "success" && rms?.list.length === 0 ? (
            <EmptyState>
              <EmptyStateIllustration as={NotFoundIllustration} />
              <>
                <EmptyStateTitle as="h3">Il n'y a pas de wod</EmptyStateTitle>
                <EmptyStateDescription>
                  Créer le premier RM en cliquant sur le bouton ci-dessous.
                </EmptyStateDescription>
                <PrimaryButton as={Link} to="/rm-tracker/creation" tw="mt-8">
                  Crée ton premier RM
                </PrimaryButton>
              </>
            </EmptyState>
          ) : (
            <div tw="w-full bg-white rounded-md shadow-sm mt-6">
              <ul tw="divide-y-2 divide-gray-100">
                {status === "loading" && (
                  <Spinner tw="h-10 w-10 fixed left-1/2 md:left-2/3 top-1/2" />
                )}
                {status === "success" && (
                  <div tw="sm:rounded-md">
                    {rmsUniqueMovment
                      .map((rm, index) => {
                        return (
                          <li
                            tw="hover:text-white cursor-pointer hover:bg-gray-50 shadow-sm overflow-hidden"
                            key={rm._id}
                          >
                            <Link to={`/rm-tracker/${rm.movment.toLowerCase()}`}>
                              <RmTrackerListItem rm={rm} index={index} />
                            </Link>
                          </li>
                        );
                      })
                      .reverse()}
                  </div>
                )}
              </ul>
            </div>
          )}

          <FloatButton as={Link} to={`/rm-tracker/creation/new`}>
            <PlusIcon tw="h-12 w-10 text-gray-800" />
          </FloatButton>

          <Pagination totalOfPages={totalOfPages} />
        </PageContent>
      </Page>
    </div>
  );
};

export default RmTrackerList;
