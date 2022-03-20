/** @jsxImportSource @emotion/react */
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "twin.macro";
import { useWodCreatorMutation } from "../APIs";
import { Button, PrimaryButton } from "../shared/Buttons";
import { FieldsetLegend, FormGroup, HelperText, Label, RequiredAsterisk } from "../shared/Form";
import { Page, PageContent } from "../shared/Page";
import { Panel, PanelContent } from "../shared/Panel";

const typeForWods = [
  {
    type: "METCON",
  },
  {
    type: "AMRAP",
  },
  {
    type: "FOR TIME",
  },
  {
    type: "EMOM",
  },
];

const WodCreatorCreation = () => {
  const [typeForWod, setTypeForWod] = useState();
  const [timeForWod, setTimeForWod] = useState();

  const { mutate, isLoading: isSaving } = useWodCreatorMutation();
  const navigate = useNavigate();
  console.log(typeForWod);
  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        type: typeForWod,
        time: timeForWod,
      },
      {
        onSuccess: () => {
          navigate(`/wod-creator`);
        },
      }
    );
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
      MovementOne: "",
      MovementTwo: "",
      MovementThree: "",
    },
  });

  return (
    <>
      <Helmet title="Crée ton wod" />
      <Page>
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
          <h1 tw="text-xl font-bold text-white sm:text-2xl mt-10 mb-5">Crée ton wod</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Panel>
              <PanelContent>
                <FieldsetLegend>Informations générales du chantier</FieldsetLegend>
                <HelperText>
                  Informations générales du chantier permettant de l'identifier.
                </HelperText>

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

                  <div tw="grid grid-cols-2 gap-6">
                    <FormGroup tw="w-full">
                      <Label htmlFor="typee">
                        Type <RequiredAsterisk tw="text-red-500" />
                      </Label>
                      <div tw="mt-1 sm:mt-0 sm:col-span-2">
                        <select
                          onChange={(e) => {
                            setTypeForWod(e.target.value);
                          }}
                          id="typee"
                          name="typee"
                          tw="focus:ring-primary-500 focus:border-primary-500 shadow-sm sm:text-sm border-gray-300 rounded-md w-full"
                        >
                          {typeForWods.map((option, index) => (
                            <option key={index} value={option._id}>
                              {option.type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="time">Temps</Label>
                      <div tw="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          tw="flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                          type="number"
                          id="time"
                          onChange={(e) => {
                            setTimeForWod(e.target.value);
                          }}
                          min="1"
                        ></input>
                      </div>
                    </FormGroup>
                  </div>

                  <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      tw="flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                      {...register("description")}
                      type="text"
                      id="description"
                    />
                  </FormGroup>
                </div>
                <div tw="flex space-x-3 items-center justify-end mt-8">
                  <Button as={Link} to={`/wod-creator`} disable={isSaving}>
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

export default WodCreatorCreation;
