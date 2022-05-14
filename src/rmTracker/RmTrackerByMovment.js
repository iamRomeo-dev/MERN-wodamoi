/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { FloatButton } from "../shared/Buttons";
import { WodCreatorListItemSkeleton } from "../wodcreator/WodCreatorListItemSkeleton";
import { RmTrackerListItem } from "./RmTrackerListItem";
import { useRmQuery } from "../APIsRmTracker";
import { useAuth0 } from "@auth0/auth0-react";
import { Filter } from "../shared/QueryHelper";
import RmTrackerChart from "./RmTrackerChart";

const RmTrackerByMovment = () => {
  const { movment } = useParams();
  const { user } = useAuth0();
  const loadingArray = 10;

  const pageSize = 20;
  const location = useLocation();
  const pageParams = location.search.substr(location.search.length - 1);

  const { status, data: rm } = useRmQuery({
    limit: pageSize,
    skip: Number(pageParams) * pageSize,
    ...Filter.from({
      $and: [
        {
          movment: Filter.regex(movment),
        },
        {
          createdBy: Filter.regex(user.name),
        },
      ],
    }),
  });
  return (
    <div>
      <Helmet title="Wod creator" />
      <Page tw="relative">
        <PageContent>
          <Link
            to={{
              pathname: `/rm-tracker`,
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-100"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-100" aria-hidden="true" />
            <span>Retour</span>
          </Link>
          <RmTrackerChart />
          <div tw="w-full bg-white rounded-md shadow-sm mt-6">
            <ul tw="divide-y-2 divide-gray-100">
              {status === "loading" &&
                [...Array(loadingArray)].map((e, index) => (
                  <WodCreatorListItemSkeleton index={index} key={index} />
                ))}

              {status === "success" && (
                <div tw="sm:rounded-md">
                  {rm.list.map((rm, index) => {
                    return (
                      <li
                        tw="hover:text-white hover:bg-gray-50 shadow-sm overflow-hidden"
                        key={rm._id}
                      >
                        <RmTrackerListItem rm={rm} index={index} />
                      </li>
                    );
                  })}
                </div>
              )}
            </ul>
          </div>
          <FloatButton as={Link} to="/rm-tracker/creation" tw="">
            <PlusIcon tw="h-12 w-10 text-gray-800" />
          </FloatButton>
        </PageContent>
      </Page>
    </div>
  );
};

export default RmTrackerByMovment;
