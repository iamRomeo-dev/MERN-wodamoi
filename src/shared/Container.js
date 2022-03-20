/** @jsxImportSource @emotion/react */
import "twin.macro";

export const Container = ({ as: Component = "div", ...props }) => {
  return <Component tw="max-w-5xl mx-auto px-4 sm:px-6" {...props} />;
};
