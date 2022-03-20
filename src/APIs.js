import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "./shared/useApi";
import qs from "qs";

export const useWodCreatorQuery = (searchParams = {}) => {
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

export const useWodCreatorMutation = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json = {}) => {
      return api
        .post("v1/test", {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("v1/test");
    },
  });
};
