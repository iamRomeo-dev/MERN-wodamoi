/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import "twin.macro";
import tw from "twin.macro";

export const RequiredAsterisk = (props) => {
  return (
    <span tw="text-red-500 font-medium" {...props}>
      *
    </span>
  );
};

export const Label = ({ children, ...props }) => {
  return (
    <label tw="block text-sm font-medium text-white whitespace-nowrap truncate" {...props}>
      {children}
    </label>
  );
};

export const ErrorMessage = styled("p")(tw`flex text-sm font-medium pt-1 text-red-500`);

export const FormGroup = ({ children, ...props }) => {
  return (
    <div tw="space-y-1" {...props}>
      {children}
    </div>
  );
};

/**
 * Legend component that can be used within a `fieldset`.
 * @type {React.FC<React.HTMLAttributes<HTMLLegendElement>>}
 * @example
 * <fieldset>
 *   <FieldsetLegend>The fieldset legend</FieldsetLegend>
 * </fieldset>
 */
export const FieldsetLegend = (props) => {
  return <legend tw="text-lg leading-6 font-medium text-white" {...props} />;
};

/**
 * Helper text that can be used with a `FieldsetLegend`.
 * @type {React.FC<React.HTMLAttributes<HTMLParagraphElement>>}
 * @example
 * <fieldset>
 *   <FieldsetLegend>The fieldset legend</FieldsetLegend>
 *   <HelperText>Some more description</HelperText>
 * </fieldset>
 */
export const HelperText = (props) => {
  return <p tw="mt-1 max-w-2xl text-sm text-gray-50" {...props} />;
};
