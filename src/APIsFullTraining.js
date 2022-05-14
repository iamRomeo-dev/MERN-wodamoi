import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "./shared/useApi";
import qs from "qs";

export const useFullTrainingQuery = (searchParams = {}) => {
  const api = useApi();
  return useQuery([`v1/fullTraining`, searchParams], async () => {
    const { limit = 10, skip = 0, sort = "-createdAt", ...query } = searchParams;
    const response = await api.get(`v1/fullTraining`, {
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

export const useFullTrainingMutation = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json = {}) => {
      return api
        .post("v1/fullTraining", {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("v1/fullTraining");
    },
  });
};

export const useFullTrainingByIdQuery = (uuid) => {
  const api = useApi();
  return useQuery({
    queryKey: `v1/fullTraining/${uuid}`,
    queryFn: async () => api.get(`v1/fullTraining/${uuid}`).json(),
  });
};

export const useFullTrainingPatchMutation = (uuid) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json = {}) => {
      return api
        .patch(`v1/fullTraining/${uuid}`, {
          json,
        })
        .json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(`v1/fullTraining/${uuid}`);
    },
  });
};

export const useDeleteFullTraining = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (uuid) => {
      await api.delete(`v1/fullTraining/${uuid}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("v1/fullTraining");
    },
  });
};
