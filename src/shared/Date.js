/** @jsxImportSource @emotion/react */

export const StartDate = ({ start, ...props }) => {
  return (
    <p tw="max-w-2xl text-sm text-indigo-500" {...props}>
      {start.toString().slice(8, 10)}/{start.toString().slice(5, 7)}/{start.toString().slice(0, 4)}
    </p>
  );
};
