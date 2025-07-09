/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { useWodCreatorQuery } from "../APIsWodCreator";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIllustration,
  EmptyStateTitle,
} from "../shared/EmptyState";
import { NotFoundIllustration } from "../not-found/NotFoundIllustration";
import { FloatButton, PrimaryButton } from "../shared/Buttons";
import { WodCreatorListItem } from "./WodCreatorListItem";
import { Spinner } from "../shared/Spinner";
import { Pagination } from "../shared/Pagination";
import { useAuth0 } from "@auth0/auth0-react";
import { Filter } from "../shared/QueryHelper";

const WodCreator = () => {
  const pageSize = 10;
  const { user } = useAuth0();
  const location = useLocation();
  const pageParams = location.search.substr(location.search.length - 1);

  const { status, data: wods } = useWodCreatorQuery({
    limit: pageSize,
    skip: Number(pageParams) * pageSize,
    ...Filter.from({
      $and: [
        {
          createdBy: { $regex: user.email, $options: "i" },
        },
      ],
    }),
  });

  const totalOfPages = status === "success" && Math.ceil(wods.totalCount / pageSize);

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

          {status === "success" && wods?.list.length === 0 ? (
            <EmptyState>
              <EmptyStateIllustration as={NotFoundIllustration} />
              <>
                <EmptyStateTitle as="h3">Il n'y a pas de wod</EmptyStateTitle>
                <EmptyStateDescription>
                  Créer le premier wod en cliquant sur le bouton ci-dessous.
                </EmptyStateDescription>
                <PrimaryButton as={Link} to="/wod-creator/creation" tw="mt-8">
                  Crée ton premier wod
                </PrimaryButton>
              </>
            </EmptyState>
          ) : (
            <>
              <div tw="w-full bg-white rounded-md shadow-sm mt-6">
                <ul tw="divide-y-2 divide-gray-100">
                  {status === "loading" && (
                    <Spinner tw="h-6 w-6 fixed left-1/2 md:left-2/3 top-1/2" />
                  )}

                  {status === "success" && (
                    <div tw="sm:rounded-md">
                      {wods.list.map((wod, index) => {
                        return (
                          <li
                            tw="hover:text-white cursor-pointer hover:bg-gray-50 shadow-sm overflow-hidden"
                            key={wod._id}
                          >
                            <Link to={`/wod-creator/${wod._id}`}>
                              <WodCreatorListItem wod={wod} index={index} />
                            </Link>
                          </li>
                        );
                      })}
                    </div>
                  )}
                </ul>
              </div>
            </>
          )}
          <FloatButton as={Link} to="/wod-creator/creation" tw="">
            <PlusIcon tw="h-12 w-10 text-gray-800" />
          </FloatButton>

          {status === "success" && <Pagination totalOfPages={totalOfPages} />}
        </PageContent>
      </Page>
    </div>
  );
};

export default WodCreator;
