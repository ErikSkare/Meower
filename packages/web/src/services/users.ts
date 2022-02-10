import {useQuery, useMutation} from "react-query";
import {AxiosError, AxiosResponse} from "axios";
import queryClient from "../setup/query";
import {DefaultError, User} from "../types";
import api from "../setup/api";

const fetchMe = () => api.get("me");

const updateMe = (formData: FormData) =>
  api.put("me", formData, {headers: {"Content-Type": "multipart/form-data"}});

export const useMe = () => {
  return useQuery<User, AxiosError<DefaultError>>(
    ["users", "me"],
    () => fetchMe().then((response) => response.data),
    {staleTime: Infinity}
  );
};

export const useUpdateMe = () => {
  return useMutation(updateMe, {
    onSuccess: (data) => {
      queryClient.setQueryData(["users", "me"], data);
      queryClient.invalidateQueries("meows");
    },
  });
};
