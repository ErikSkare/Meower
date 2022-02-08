import {useQuery} from "react-query";
import {AxiosError, AxiosResponse} from "axios";
import {DefaultError, User} from "../types";
import api from "../setup/api";

const fetchMe = () => api.get("me");

export const useMe = () => {
  return useQuery<AxiosResponse<User>, AxiosError<DefaultError>>(
    ["users", "me"],
    fetchMe,
    {staleTime: Infinity}
  );
};
