import tw, { styled } from "twin.macro";
import { PrimaryButton } from "./Buttons";

export const EmptyState = styled("section")(
  tw`mx-auto flex flex-col items-center mt-16 sm:mt-24 md:mt-32 px-4 sm:px-6 pb-16`
);

export const EmptyStateIllustration = styled("svg")(tw`h-auto w-full max-w-sm`);

export const EmptyStateTitle = styled("h2")(
  tw`text-xl leading-6 font-medium text-gray-900 text-center mt-16`
);

export const EmptyStateDescription = styled("p")(
  tw`max-w-lg text-sm text-gray-500 text-center mt-2`
);

export const EmptyStateButton = styled(PrimaryButton)(tw`mt-8`);
