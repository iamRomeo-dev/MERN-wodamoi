/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/solid";
import { FloatButton } from "../shared/Buttons";
import { RmTrackerListItem } from "./RmTrackerListItem";
import { useRmQuery } from "../APIsRmTracker";
import { useAuth0 } from "@auth0/auth0-react";
import { Filter } from "../shared/QueryHelper";
import RmTrackerChart from "./RmTrackerChart";
import { Spinner } from "../shared/Spinner";
import { Pagination } from "../shared/Pagination";

const RmTrackerByMovment = () => {
  const { movment } = useParams();
  const { user } = useAuth0();

  const pageSize = 4;
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
  const totalOfPages = status === "success" && Math.ceil(rm.totalCount / pageSize);

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
          {status === "success" && (
            <h2 tw="flex justify-center w-full text-xl font-extrabold tracking-tight text-white">
              {rm?.list[0]?.movment.toUpperCase()}
            </h2>
          )}
          <div tw="w-full bg-white rounded-md shadow-sm mt-6">
            <ul tw="divide-y-2 divide-gray-100">
              {status === "loading" && (
                <Spinner tw="h-10 w-10 fixed left-1/2 md:left-2/3 top-1/2" />
              )}

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
          {status === "success" && (
            <FloatButton as={Link} to={`/rm-tracker/creation/${movment}`}>
              <PlusIcon tw="h-12 w-10 text-gray-800" />
            </FloatButton>
          )}

          <Pagination totalOfPages={totalOfPages} />
        </PageContent>
      </Page>
    </div>
  );
};

export default RmTrackerByMovment;
