/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const colors = {
  gray: tw`bg-gray-100 text-gray-800 svg:text-gray-400`,
  red: tw`bg-red-100 text-red-800 svg:text-red-400`,
  yellow: tw`bg-yellow-100 text-yellow-800 svg:text-yellow-400`,
  green: tw`bg-green-100 text-green-800 svg:text-green-400`,
  indigo: tw`bg-indigo-100 text-indigo-800 svg:text-indigo-400`,
  pink: tw`bg-pink-100 text-pink-800 svg:text-pink-400`,
};

/** @typedef {{ color: keyof colors } & React.HTMLAttributes<HTMLSpanElement} BadgeProps */
/** @type {React.FC<BadgeProps>} */
export const Badge = ({ color = "indigo", ...props }) => {
  return (
    <span
      tw="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium flex-shrink-0 whitespace-nowrap"
      css={colors[color]}
      {...props}
    />
  );
};

/** @type {React.FC<React.SVGAttributes<SVGElement>} */
export const BadgeDot = (props) => {
  return (
    <svg tw="mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8" {...props}>
      <circle cx="4" cy="4" r="3" />
    </svg>
  );
};
