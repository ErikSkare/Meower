import {
  useInfiniteQuery,
  useMutation,
  InfiniteData,
  useQuery,
} from "react-query";
import {AxiosError, AxiosResponse} from "axios";
import {Meow, DefaultError} from "../types";
import queryClient from "../setup/query";
import api from "../setup/api";

const MEOWS_LIMIT = 3;

const fetchMeows = ({pageParam = null}) => {
  return pageParam === null
    ? api.get(`meows?limit=${MEOWS_LIMIT}`)
    : api.get(`meows?limit=${MEOWS_LIMIT}&cursor=${pageParam}`);
};

const fetchMeow = (meowID: string) => api.get(`meows/${meowID}`);

const toggleLike = (id: number) => api.post(`meows/${id}/likes/toggle`);

const createMeow = (formData: FormData) =>
  api.post("meows", formData, {
    headers: {"Content-Type": "multipart/form-data"},
  });

export const useMeows = () => {
  return useInfiniteQuery<[Meow], AxiosError<DefaultError>>(
    "meows",
    ({pageParam}) => fetchMeows({pageParam}).then((response) => response.data),
    {
      getNextPageParam: (lastPage) => {
        if ((lastPage.length as number) === 0) return false;
        const lastID = lastPage[lastPage.length - 1].id ?? 1;
        return lastID !== 1 ? lastID : false;
      },
    }
  );
};

export const useMeow = (meowID: string) => {
  return useQuery<Meow, AxiosResponse<DefaultError>>(["meows", meowID], () =>
    fetchMeow(meowID).then((response) => response.data)
  );
};

export const useToggleLike = () => {
  return useMutation(toggleLike, {
    onMutate: (id: number) => {
      queryClient.cancelQueries("meows");
      queryClient.cancelQueries(["meows", id.toString()]);
      const previousMeows = queryClient.getQueryData("meows");
      if (previousMeows)
        queryClient.setQueryData("meows", (old) => {
          let cpy = old as InfiniteData<[Meow]>;
          cpy.pages.forEach((group) =>
            group.forEach((meow) => {
              if (meow.id === id) {
                meow.like_count += meow.has_liked ? -1 : 1;
                meow.has_liked = !meow.has_liked;
              }
            })
          );
          return cpy;
        });
      const previousMeow = queryClient.getQueryData(["meows", id.toString()]);

      if (previousMeow)
        queryClient.setQueryData(["meows", id.toString()], (old) => {
          let cpy = old as Meow;
          return {
            ...cpy,
            like_count: cpy.like_count + (cpy.has_liked ? -1 : 1),
            has_liked: !cpy.has_liked,
          };
        });
      return {previousMeows, previousMeow};
    },
    onError: (error, id, context) => {
      queryClient.setQueryData("meows", context!.previousMeows);
      queryClient.setQueryData(["meows", id], context!.previousMeow);
    },
  });
};

export const useCreateMeow = () => {
  return useMutation(createMeow, {
    onSuccess: () => {
      queryClient.invalidateQueries("meows");
    },
  });
};
