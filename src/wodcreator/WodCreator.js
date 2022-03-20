/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Filter } from "../shared/QueryHelpers";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { useWodCreatorQuery } from "../APIs";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateIllustration,
  EmptyStateTitle,
} from "../shared/EmptyState";
import { NotFoundIllustration } from "../not-found/NotFoundIllustration";
import { FloatButton, PrimaryButton } from "../shared/Buttons";
import { WodCreatorListItemSkeleton } from "./WodCreatorListItemSkeleton";
import { WodCreatorListItem } from "./WodCreatorListItem";

const WodCreator = () => {
  const { t } = useTranslation();
  const { organization } = useParams();
  const loadingArray = 10;
  const pageSize = 100;
  const location = useLocation();
  const pageParams = location.search.substr(location.search.length - 1);

  const { status, data: wods } = useWodCreatorQuery({
    limit: pageSize,
    skip: Number(pageParams) * pageSize,
  });
  console.log(wods);
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

          {status === "success" && wods.list.length === 0 ? (
            <EmptyState>
              <EmptyStateIllustration as={NotFoundIllustration} />
              <>
                <EmptyStateTitle as="h3">Il n'y a pas de chantier</EmptyStateTitle>
                <EmptyStateDescription>
                  Créer le premier chantier en cliquant sur le bouton ci-dessous.
                </EmptyStateDescription>
                <PrimaryButton as={Link} to="" tw="mt-8">
                  Crée ton premier wod
                </PrimaryButton>
              </>
            </EmptyState>
          ) : (
            <>
              <div tw="w-full bg-white rounded-md shadow-sm mt-6">
                <ul tw="divide-y-2 divide-gray-100">
                  {status === "loading" &&
                    [...Array(loadingArray)].map((e, index) => (
                      <WodCreatorListItemSkeleton index={index} key={index} />
                    ))}

                  {status === "success" && (
                    <div tw="sm:rounded-md">
                      {wods.list.map((wod, index) => {
                        return (
                          <li
                            tw="hover:text-white cursor-pointer hover:bg-gray-50 shadow-sm overflow-hidden"
                            key={wod._id}
                          >
                            <Link to="">
                              <WodCreatorListItem wod={wod} index={index} />
                            </Link>
                          </li>
                        );
                      })}
                    </div>
                  )}
                </ul>
              </div>
              {/* <Pagination data={workSites} pageParams={pageParams} totalOfPages={totalOfPages} /> */}
            </>
          )}
          <FloatButton as={Link} to="" tw="">
            <PlusIcon tw="h-10 w-8 text-gray-800" />
          </FloatButton>
        </PageContent>
      </Page>
    </div>
  );
};

export default WodCreator;
