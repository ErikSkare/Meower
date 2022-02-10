import {useQuery, useMutation} from "react-query";
import {AxiosError} from "axios";
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
    onSuccess: (response) => {
      queryClient.setQueryData(["users", "me"], response.data);
      queryClient.invalidateQueries("meows");
    },
  });
};
