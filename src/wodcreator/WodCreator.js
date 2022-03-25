/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Link } from "react-router-dom";
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
  const loadingArray = 10;
  const { status, data: wods } = useWodCreatorQuery();
  return (
    <div>
      <Helmet title="Wod creator" />
      <Page tw="relative">
        <PageContent>
          <a href="tel:+900300400">Phone: 900 300 400</a>
          <a href="http://maps.google.com/?q=1200 Pennsylvania Ave SE, Washington, District of Columbia, 20003">
            adress
          </a>
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
        </PageContent>
      </Page>
    </div>
  );
};

export default WodCreator;
