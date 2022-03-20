import { useAuth0 } from "@auth0/auth0-react";
import ky from "ky";
import { useMemo } from "react";

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useMemo(() => {
    return ky.extend({
      timeout: false,
      prefixUrl: process.env.REACT_APP_API_URL,
      hooks: {
        beforeRequest: [
          async (request) => {
            const accessToken = await getAccessTokenSilently();
            request.headers.set("Authorization", `Bearer ${accessToken}`);
          },
        ],
      },
    });
  }, [getAccessTokenSilently]);
};
