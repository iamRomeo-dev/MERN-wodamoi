/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Link } from "react-router-dom";
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
import { WodCreatorListItemSkeleton } from "../wodcreator/WodCreatorListItemSkeleton";
import { RmTrackerListItem } from "./RmTrackerListItem";
import { useRmQuery } from "../APIsRmTracker";
import { useAuth0 } from "@auth0/auth0-react";

const RmTrackerList = () => {
  const { user } = useAuth0();
  const loadingArray = 10;
  const { status, data: rms } = useRmQuery();
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
                      {rms.list
                        .filter((rm) => rm?.createdBy.includes(user?.name))
                        .map((rm, index) => {
                          return (
                            <li
                              tw="hover:text-white cursor-pointer hover:bg-gray-50 shadow-sm overflow-hidden"
                              key={rm._id}
                            >
                              <Link to={`/rm-tracker/${rm._id}`}>
                                <RmTrackerListItem rm={rm} index={index} />
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
          <FloatButton as={Link} to="/rm-tracker/creation" tw="">
            <PlusIcon tw="h-12 w-10 text-gray-800" />
          </FloatButton>
        </PageContent>
      </Page>
    </div>
  );
};

export default RmTrackerList;
