/** @jsxImportSource @emotion/react */
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import "twin.macro";
import { useWodCreatorMutation } from "../APIs";
import { Button, PrimaryButton } from "../shared/Buttons";
import {
  ErrorMessage,
  FieldsetLegend,
  FormGroup,
  HelperText,
  Label,
  RequiredAsterisk,
} from "../shared/Form";
import { Page, PageContent } from "../shared/Page";
import { Panel, PanelContent } from "../shared/Panel";

const WodCreatorCreation = () => {
  const { t } = useTranslation();
  const { organization } = useParams();
  const { mutate, isLoading: isSaving } = useWodCreatorMutation();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    mutate(
      {
        ...data,
      },
      {
        onSuccess: (dataSuccess) => {
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
          <h1 tw="text-xl font-bold text-white sm:text-2xl mt-10 mb-5">"Crée ton wod"</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Panel>
              <PanelContent>
                <FieldsetLegend>Informations générales du chantier</FieldsetLegend>
                <HelperText>
                  Informations générales du chantier permettant de l'identifier.
                </HelperText>

                <div tw="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                  <FormGroup>
                    <Label htmlFor="name">Type</Label>
                    <input
                      tw="flex-1 block w-full text-sm z-0 focus:z-10 border-gray-300 rounded-md focus:(ring-indigo-500 border-indigo-500) disabled:(bg-gray-50 text-gray-500)"
                      {...register("name")}
                      type="text"
                      id="name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="description">description</Label>
                    <input
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
