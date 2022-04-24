import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "./shared/useApi";
import qs from "qs";

export const useWodCreatorQuery = (searchParams = {}) => {
  const api = useApi();
  return useQuery([`v1/test`, searchParams], async () => {
    const { limit = 10, skip = 0, sort = "-createdAt", ...query } = searchParams;

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

export const useWodCreatedByIdQuery = (uuid) => {
  const api = useApi();
  return useQuery({
    queryKey: `v1/test/${uuid}`,
    queryFn: async () => api.get(`v1/test/${uuid}`).json(),
  });
};

export const useWodCreatorPatchMutation = (uuid) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json = {}) => {
      return api
        .patch(`v1/test/${uuid}`, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(`v1/test/${uuid}`);
    },
  });
};

export const useDeleteWodCreated = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uuid) => {
      await api.delete(`v1/test/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("v1/test");
    },
  });
};
