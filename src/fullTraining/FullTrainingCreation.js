/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "twin.macro";
import { Button, PrimaryButton } from "../shared/Buttons";
import { FieldsetLegend, FormGroup, HelperText, Label } from "../shared/Form";
import { Page, PageContent } from "../shared/Page";
import { PanelContent } from "../shared/Panel";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useFullTrainingMutation } from "../APIsFullTraining";
import { useAuth0 } from "@auth0/auth0-react";

const FullTrainingCreation = () => {
  const { user } = useAuth0();
  const { mutate, isLoading: isSaving } = useFullTrainingMutation();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        createdBy: user?.name,
      },
      {
        onSuccess: () => {
          navigate(`/full-training`);
        },
      }
    );
  };

  const { register, handleSubmit } = useForm();

  return (
    <>
      <Helmet title="Crée ta séance" />
      <Page>
        <PageContent tw="h-screen">
          <Link
            to={{
              pathname: `/full-training`,
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-100"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-100" aria-hidden="true" />
            <span>Retour</span>
          </Link>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Panel> */}
            <PanelContent>
              <FieldsetLegend>Crée ta séance complète</FieldsetLegend>
              <HelperText>Informations générales concernant la séance de ton choix.</HelperText>

              <div tw="grid grid-cols-1 gap-6 mt-6">
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
                    tw="flex-1 block w-full text-sm z-0 h-32 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                    {...register("description")}
                    type="text"
                    id="description"
                  />
                </FormGroup>
              </div>
              <div tw="flex space-x-3 items-center justify-end mt-8">
                <Button as={Link} to={`/full-training`} disable={isSaving}>
                  Annuler
                </Button>
                <PrimaryButton type="submit" disable={isSaving}>
                  Créer
                </PrimaryButton>
              </div>
            </PanelContent>
            {/* </Panel> */}
          </form>
        </PageContent>
      </Page>
    </>
  );
};

export default FullTrainingCreation;
