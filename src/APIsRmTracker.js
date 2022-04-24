import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "./shared/useApi";
import qs from "qs";

export const useRmQuery = (searchParams = {}) => {
  const api = useApi();
  return useQuery([`v1/rmTracker`, searchParams], async () => {
    const { limit = 10, skip = 0, sort = "-createdAt", ...query } = searchParams;

    const response = await api.get(`v1/rmTracker`, {
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

export const useRmMutation = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json = {}) => {
      return api
        .post("v1/rmTracker", {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("v1/rmTracker");
    },
  });
};

export const useRmByIdQuery = (uuid) => {
  const api = useApi();
  return useQuery({
    queryKey: `v1/rmTracker/${uuid}`,
    queryFn: async () => api.get(`v1/rmTracker/${uuid}`).json(),
  });
};

export const useRmPatchMutation = (uuid) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json = {}) => {
      return api
        .patch(`v1/rmTracker/${uuid}`, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(`v1/rmTracker/${uuid}`);
    },
  });
};

export const useDeleteRm = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uuid) => {
      await api.delete(`v1/rmTracker/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("v1/rmTracker");
    },
  });
};
