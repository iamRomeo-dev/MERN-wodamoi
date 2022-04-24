import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "./shared/useApi";
import qs from "qs";

export const useWodCreatorQuery = (searchParams = {}) => {
  const api = useApi();
  return useQuery([`v1/wodCreator`, searchParams], async () => {
    const { limit = 10, skip = 0, sort = "-createdAt", ...query } = searchParams;

    const response = await api.get(`v1/wodCreator`, {
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
        .post("v1/wodCreator", {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("v1/wodCreator");
    },
  });
};

export const useWodCreatedByIdQuery = (uuid) => {
  const api = useApi();
  return useQuery({
    queryKey: `v1/wodCreator/${uuid}`,
    queryFn: async () => api.get(`v1/wodCreator/${uuid}`).json(),
  });
};

export const useWodCreatorPatchMutation = (uuid) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json = {}) => {
      return api
        .patch(`v1/wodCreator/${uuid}`, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(`v1/wodCreator/${uuid}`);
    },
  });
};

export const useDeleteWodCreated = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uuid) => {
      await api.delete(`v1/wodCreator/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("v1/wodCreator");
    },
  });
};
