/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import "twin.macro";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon, RefreshIcon, TrashIcon } from "@heroicons/react/solid";
import { Page, PageContent } from "../shared/Page";
import { useDeleteFullTraining, useFullTrainingByIdQuery } from "../APIsFullTraining";

const FullTrainingById = () => {
  const { fullTrainingId } = useParams();
  const navigate = useNavigate();

  const { status, data: fullTrainingById } = useFullTrainingByIdQuery(fullTrainingId);
  const { mutateAsync: deleteFullTraining } = useDeleteFullTraining();
  console.log("fullTrainingByIdeee", fullTrainingById);
  const onRemove = (e) => {
    e.preventDefault();
    deleteFullTraining(fullTrainingId);
    navigate(`/full-training`);
  };
  return (
    <div>
      <Helmet title={status === "success" ? fullTrainingById?.name : "Séance sélectionné"} />
      <Page tw="relative">
        <PageContent>
          <Link
            to={{
              pathname: `/full-training`,
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-100"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-100" aria-hidden="true" />
            <span>Retour</span>
          </Link>

          {status === "success" && (
            <div tw="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 mt-6">
              <div tw="flex-1 flex flex-col p-8">
                <h3 tw="mt-6 text-gray-900 text-sm font-medium">
                  {fullTrainingById?.name && fullTrainingById.name}
                </h3>
                <dl tw="mt-1 flex-grow flex flex-col justify-between">
                  <dt tw="sr-only">Title</dt>

                  <dt tw="sr-only">Role</dt>
                  <dd tw="mt-3">
                    <span tw="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      {fullTrainingById.description &&
                        fullTrainingById.description.split("\n").map((str) => <p>{str}</p>)}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div tw="-mt-px flex divide-x divide-gray-200">
                  <div tw="w-0 flex-1 flex">
                    <button
                      onClick={onRemove}
                      tw="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                    >
                      <TrashIcon tw="w-5 h-5 text-gray-800" />
                      <span tw="ml-3">Supprimer</span>
                    </button>
                  </div>
                  <div tw="-ml-px w-0 flex-1 flex">
                    <Link
                      to={`/full-training/${fullTrainingId}/update`}
                      tw="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                    >
                      <RefreshIcon tw="w-5 h-5 text-gray-800" />
                      <span tw="ml-3">Modifier</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </PageContent>
      </Page>
    </div>
  );
};

export default FullTrainingById;
