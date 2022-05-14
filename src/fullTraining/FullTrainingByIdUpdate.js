/** @jsxImportSource @emotion/react */
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import "twin.macro";
import { useFullTrainingByIdQuery, useFullTrainingPatchMutation } from "../APIsFullTraining";
import { Button, PrimaryButton } from "../shared/Buttons";
import { FieldsetLegend, FormGroup, HelperText, Label } from "../shared/Form";
import { Page, PageContent } from "../shared/Page";
import { Panel, PanelContent } from "../shared/Panel";

const FullTrainingByIdUpdate = () => {
  const { fullTrainingId } = useParams();
  const { status, data: fullTrainingById } = useFullTrainingByIdQuery(fullTrainingId);
  const { mutate, isLoading: isSaving } = useFullTrainingPatchMutation(fullTrainingId);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    mutate(
      {
        ...data,
      },
      {
        onSuccess: () => {
          navigate(`/full-training/${fullTrainingId}`);
        },
      }
    );
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: fullTrainingById?.name,
      description: fullTrainingById?.description,
    },
  });

  return (
    <>
      <Helmet title="Crée ton wod" />
      <Page>
        <PageContent tw="h-screen">
          <Link
            to={{
              pathname: `/full-training/${fullTrainingId}`,
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-100"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-100" aria-hidden="true" />
            <span>Retour</span>
          </Link>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Panel>
              <PanelContent>
                <FieldsetLegend>Met à jour ta séance</FieldsetLegend>
                <HelperText>Informations générales la séance de ton choix.</HelperText>
                {status === "success" && (
                  <div tw="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                    <FormGroup>
                      <Label htmlFor="name">Nom</Label>
                      <input
                        tw="flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                        {...register("name")}
                        type="text"
                        id="name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        tw="flex-1 block w-full h-64 text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                        {...register("description")}
                        type="text"
                        id="description"
                      />
                    </FormGroup>
                  </div>
                )}

                <div tw="flex space-x-3 items-center justify-end mt-8">
                  <Button as={Link} to={`/full-training/${fullTrainingId}`} disable={isSaving}>
                    Annuler
                  </Button>
                  <PrimaryButton type="submit" disable={isSaving}>
                    Créer
                  </PrimaryButton>
                </div>
              </PanelContent>
            </Panel>
          </form>
        </PageContent>
      </Page>
    </>
  );
};

export default FullTrainingByIdUpdate;
