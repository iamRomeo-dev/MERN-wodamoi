/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import tw from "twin.macro";

export const Panel = styled("section")(tw`shadow-sm bg-gray-800 sm:rounded-md -mx-4 sm:mx-0`);

export const PanelContent = styled("div")(tw`py-5 px-4 sm:p-6`);

export const PanelFooter = styled("footer")(
  tw`px-4 py-3 bg-gray-50 text-right sm:px-6 sm:rounded-b-md`
);
export const PanelHeader = styled("header")(
  tw`bg-white px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center flex-wrap sm:flex-nowrap sm:rounded-t-md`
);
