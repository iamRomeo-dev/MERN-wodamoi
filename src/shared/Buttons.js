import tw, { styled } from "twin.macro";

const ButtonBase = styled("button")(
  tw`inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md`,
  tw`focus:(outline-none ring-2 ring-offset-2 ring-indigo-500)`,
  tw`disabled:(opacity-50 pointer-events-none)`
);

export const PrimaryButton = styled(ButtonBase)(
  tw`border-transparent shadow-sm text-white bg-indigo-600`,
  tw`hover:(bg-indigo-700)`
);

export const Button = styled(ButtonBase)(
  tw`border-gray-300 shadow-sm text-gray-700 bg-white`,
  tw`hover:(bg-gray-50)`
);

export const FloatButton = styled(ButtonBase)(
  tw`border-transparent shadow-sm text-white bg-white px-3 py-2 fixed bottom-3 right-4 rounded-full font-size[30px]`,
  tw`hover:(bg-indigo-700)`
);
