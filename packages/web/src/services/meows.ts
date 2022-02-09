import {useInfiniteQuery, useMutation, InfiniteData} from "react-query";
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

const toggleLike = (id: number) => api.post(`meows/${id}/likes/toggle`);

const createMeow = (formData: FormData) =>
  api.post("meows", formData, {
    headers: {"Content-Type": "multipart/form-data"},
  });

export const useMeows = () => {
  return useInfiniteQuery<AxiosResponse<[Meow]>, AxiosError<DefaultError>>(
    "meows",
    fetchMeows,
    {
      getNextPageParam: (lastPage) => {
        if ((lastPage.data.length as number) === 0) return false;
        const lastID = lastPage.data[lastPage.data.length - 1].id ?? 1;
        return lastID !== 1 ? lastID : false;
      },
    }
  );
};

export const useToggleLike = () => {
  return useMutation(toggleLike, {
    onMutate: (id: number) => {
      queryClient.cancelQueries("meows");
      const previousMeows = queryClient.getQueryData("meows");
      queryClient.setQueryData("meows", (old) => {
        let cpy = old as InfiniteData<AxiosResponse<[Meow]>>;
        cpy.pages.forEach((page) =>
          page.data.forEach((meow) => {
            if (meow.id === id) {
              meow.like_count += meow.has_liked ? -1 : 1;
              meow.has_liked = !meow.has_liked;
            }
          })
        );
        return cpy;
      });
      return {previousMeows};
    },
    onError: (error, id, context) => {
      queryClient.setQueryData("meows", context!.previousMeows);
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
