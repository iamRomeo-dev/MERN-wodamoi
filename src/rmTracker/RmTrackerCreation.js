/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "twin.macro";
import { Button, PrimaryButton } from "../shared/Buttons";
import { FieldsetLegend, FormGroup, HelperText, Label, RequiredAsterisk } from "../shared/Form";
import { Page, PageContent } from "../shared/Page";
import { PanelContent } from "../shared/Panel";
import { ChevronLeftIcon, FireIcon, PlusIcon } from "@heroicons/react/solid";
import { useRmMutation, useRmQuery } from "../APIsRmTracker";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import tw from "twin.macro";

const RmTrackerCreation = () => {
  const { user } = useAuth0();
  const [isNew, setIsNew] = useState(false);
  const { mutate, isLoading: isSaving } = useRmMutation();
  const { rmParam } = useParams();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        movment: data.movment?.toLowerCase(),
        createdBy: user?.name,
      },
      {
        onSuccess: () => {
          rmParam === "new" ? navigate(`/rm-tracker`) : navigate(`/rm-tracker/${data.movment}`);
        },
      }
    );
  };

  const { register, handleSubmit } = useForm();

  const pageSize = 20;
  const location = useLocation();
  const pageParams = location.search.substr(location.search.length - 1);
  const { data: rms } = useRmQuery({
    limit: pageSize,
    skip: Number(pageParams) * pageSize,
  });

  let movments = [];
  for (var i = 0; i < rms?.list.length; i++) {
    movments.push(rms?.list[i].movment);
  }
  const setMovments = [...new Set(movments)];

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
            <PanelContent>
              <FieldsetLegend>Crée ton rm</FieldsetLegend>
              <HelperText>Informations générales concernant le workout de ton choix.</HelperText>
              <div tw="flex items-center justify-center gap-2 mt-2">
                {isNew === true && <p tw="text-pink-200">WOD</p>}
                <div tw="relative">
                  <FireIcon
                    tw="h-10 w-auto text-white"
                    css={isNew && tw`text-pink-300`}
                    onClick={() => setIsNew(!isNew)}
                  />
                  {isNew === false && (
                    <PlusIcon tw="absolute top-0 right-1 h-2 w-auto text-white" />
                  )}
                </div>
                {isNew === true && <p tw="text-pink-200">MOI</p>}
              </div>
              <div tw="grid grid-cols-1 gap-6 mt-6">
                <div tw="grid grid-cols-1 gap-6">
                  <FormGroup tw="w-full">
                    <Label htmlFor="movment">
                      Mouvement <RequiredAsterisk tw="text-red-500" />
                    </Label>
                    <div tw="mt-1 sm:mt-0 sm:col-span-2">
                      {isNew === false ? (
                        rmParam === "new" ? (
                          <select
                            {...register("movment", { required: true })}
                            id="movment"
                            name="movment"
                            tw="w-full focus:ring-primary-500 focus:border-primary-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md pr-8"
                          >
                            <option value="">-- Sélectionner un mouvement --</option>
                            {setMovments.map((option, index) => (
                              <option key={index} value={option}>
                                {option.toUpperCase()}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            {...register("movment")}
                            id="movment"
                            name="movment"
                            tw="w-full focus:ring-primary-500 focus:border-primary-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md pr-8"
                          >
                            <option value="">-- Sélectionner un mouvement --</option>
                            {setMovments.map((option, index) => (
                              <option key={index} value={option}>
                                {option.toUpperCase()}
                              </option>
                            ))}
                          </select>
                        )
                      ) : (
                        <input
                          tw="flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                          {...register("movment")}
                          type="text"
                          id="movment"
                          placeholder={rmParam}
                        />
                      )}
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
                        step=".01"
                      ></input>
                    </div>
                  </FormGroup>
                </div>
              </div>
              <div tw="flex space-x-3 items-center justify-end mt-8">
                <Button as={Link} to={`/rm-creator`} disabled={isSaving}>
                  Annuler
                </Button>
                <PrimaryButton type="submit" disabled={isSaving}>
                  Créer
                </PrimaryButton>
              </div>
            </PanelContent>
          </form>
        </PageContent>
      </Page>
    </>
  );
};

export default RmTrackerCreation;
