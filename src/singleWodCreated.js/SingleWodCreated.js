/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { Page, PageContent } from "../shared/Page";
import "twin.macro";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteWodCreated, useWodCreatedByIdQuery } from "../APIs";
import { ChevronLeftIcon, PlusIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/solid";
import { FloatButton, FloatButtonLeft } from "../shared/Buttons";

export const SingleWodCreated = () => {
  const { wodId } = useParams();
  const navigate = useNavigate();
  const { status, data: dataWorkSiteById } = useWodCreatedByIdQuery(wodId);
  const { mutateAsync: deleteWod } = useDeleteWodCreated();

  const onRemove = (e) => {
    e.preventDefault();
    deleteWod(wodId);
    navigate(`/wod-creator`);
  };
  return (
    <div>
      <Helmet title={status === "success" ? dataWorkSiteById?.name : "Wod sélectionné"} />
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
              <h1>{dataWorkSiteById?.name && dataWorkSiteById.name}</h1>
              <p>
                {dataWorkSiteById.description &&
                  dataWorkSiteById.description.split("\n").map((str) => <p>{str}</p>)}
              </p>
            </div>
          )}
        </PageContent>
        <FloatButton as={Link} to={`/wod-creator/${wodId}/update`} tw="">
          <PlusIcon tw="h-12 w-10 text-gray-800" />
        </FloatButton>
        <FloatButtonLeft onClick={onRemove}>
          <TrashIcon tw="h-12 w-10 text-gray-800" />
        </FloatButtonLeft>
      </Page>
    </div>
  );
};
