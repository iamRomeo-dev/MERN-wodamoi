/** @jsxImportSource @emotion/react */
import { SkipNavContent } from "@reach/skip-nav";
import "twin.macro";
import { Container } from "./Container";

export const Page = (props) => {
  return (
    <main
      tw="h-screen flex-1 relative overflow-y-auto focus:(outline-none) bg-gray-800"
      tabIndex={0}
      {...props}
    />
  );
};

export const PageHeader = ({ title, actions }) => {
  return (
    <Container as="header" tw="mt-6">
      <div tw="md:flex md:items-center md:justify-between">
        <SkipNavContent />
        <div tw="flex-1 min-w-0">{title}</div>
        {actions && <div tw="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4 space-x-3">{actions}</div>}
      </div>
    </Container>
  );
};

export const PageTitle = ({ as: Component = "h1", ...props }) => {
  return <Component tw="text-3xl leading-9 font-extrabold text-gray-900" {...props} />;
};

export const PageContent = (props) => {
  return <Container tw="mt-5" {...props} />;
};

export const PageSkeleton = () => {
  return (
    <Page>
      <PageHeader
        title={<PageTitle as="div" tw="h-8 my-1 bg-gray-200 w-1/3 rounded-md animate-pulse" />}
      />
    </Page>
  );
};
