import { Auth0Provider } from "@auth0/auth0-react";
import { Global } from "@emotion/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import tw, { GlobalStyles } from "twin.macro";
import i18n from "./i18n";
import { AppRoutes } from "./Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENTID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Global styles={{ body: tw`antialiased font-sans` }} />
        <I18nextProvider i18n={i18n}>
          <HelmetProvider>
            <Helmet titleTemplate="%s | React App" />
            <AppRoutes />
          </HelmetProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
