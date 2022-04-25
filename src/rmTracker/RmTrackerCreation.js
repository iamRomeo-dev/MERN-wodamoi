/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "twin.macro";
import { Button, PrimaryButton } from "../shared/Buttons";
import { FieldsetLegend, FormGroup, HelperText, Label, RequiredAsterisk } from "../shared/Form";
import { Page, PageContent } from "../shared/Page";
import { PanelContent } from "../shared/Panel";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useRmMutation } from "../APIsRmTracker";
import { useAuth0 } from "@auth0/auth0-react";

export const movments = [
  {
    types: "deadlift",
  },
  {
    types: "push press",
  },
  {
    types: "bench press",
  },
  {
    types: "biceps curl",
  },
];

const RmTrackerCreation = () => {
  const { user } = useAuth0();
  const { mutate, isLoading: isSaving } = useRmMutation();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        createdBy: user?.name,
      },
      {
        onSuccess: () => {
          navigate(`/rm-tracker`);
        },
      }
    );
  };

  const { register, handleSubmit } = useForm();

  return (
    <>
      <Helmet title="Crée ton rm" />
      <Page>
        <PageContent tw="h-screen">
          <Link
            to={{
              pathname: `/rm-tracker`,
            }}
            tw="inline-flex items-center space-x-3 text-sm font-medium text-gray-100"
          >
            <ChevronLeftIcon tw="-ml-2 h-5 w-5 text-gray-100" aria-hidden="true" />
            <span>Retour</span>
          </Link>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <Panel> */}
            <PanelContent>
              <FieldsetLegend>Crée ton rm</FieldsetLegend>
              <HelperText>Informations générales concernant le workout de ton choix.</HelperText>

              <div tw="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                {/* <FormGroup>
                  <Label htmlFor="name">Nom</Label>
                  <input
                    tw="flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                    {...register("name")}
                    type="text"
                    id="name"
                  />
                </FormGroup> */}

                <div tw="grid grid-cols-2 gap-6">
                  <FormGroup tw="w-full">
                    <Label htmlFor="movment">
                      Mouvement <RequiredAsterisk tw="text-red-500" />
                    </Label>
                    <div tw="mt-1 sm:mt-0 sm:col-span-2">
                      <select
                        {...register("movment")}
                        id="movment"
                        name="movment"
                        // defaultValue="AMRAP"
                        tw="max-w-lg focus:ring-primary-500 focus:border-primary-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md pr-8"
                      >
                        {movments.map((option, index) => (
                          <option key={index} value={option.types}>
                            {option.types}
                          </option>
                        ))}
                      </select>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="weight">Poids</Label>
                    <div tw="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        {...register("weight")}
                        tw="flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                        type="number"
                        id="weight"
                        min="1"
                      ></input>
                    </div>
                  </FormGroup>
                </div>
              </div>
              <div tw="flex space-x-3 items-center justify-end mt-8">
                <Button as={Link} to={`/rm-creator`} disable={isSaving}>
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

export default RmTrackerCreation;
