import { useAuth0 } from "@auth0/auth0-react";
import ky from "ky";
import { useMemo } from "react";
import { useQuery } from "react-query";
import qs from "qs";

export const useWorkersQuery = (searchParams = {}) => {
  const api = useApi();
  return useQuery([`v1/test`, searchParams], async () => {
    const { limit = 0, skip = 0, sort = "-createdAt", ...query } = searchParams;

    const response = await api.get(`v1/test`, {
      searchParams: qs.stringify({
        limit,
        skip,
        sort,
        ...query,
      }),
    });
    const totalCount = Number(response.headers.get("X-Total-Count"));
    let list = await response.json();
    return {
      totalCount,
      list,
    };
  });
};

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
