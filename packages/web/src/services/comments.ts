import {InfiniteData, useInfiniteQuery, useMutation} from "react-query";
import {AxiosError} from "axios";
import {DefaultError, Comment, User} from "../types";
import api from "../setup/api";
import queryClient from "../setup/query";

const COMMENTS_LIMIT = 5;

const fetchComments = ({
  pageParam = null,
  meowID,
}: {
  pageParam: string | null;
  meowID: string;
}) => {
  return pageParam === null
    ? api.get(`meows/${meowID}/comments?limit=${COMMENTS_LIMIT}`)
    : api.get(
        `meows/${meowID}/comments?limit=${COMMENTS_LIMIT}&cursor=${pageParam}`
      );
};

const createComment = ({
  meowID,
  content,
}: {
  meowID: number;
  content: string;
  user: User;
}) => api.post(`meows/${meowID}/comments`, {comment: {content}});

export const useComments = (meowID: string) => {
  return useInfiniteQuery<[Comment], AxiosError<DefaultError>>(
    ["meows", meowID, "comments"],
    ({pageParam}) =>
      fetchComments({pageParam, meowID})
        .then((response) => response.data)
        .catch((error) => error),
    {
      getNextPageParam: (lastPage) => {
        if ((lastPage.length as number) === 0) return false;
        return lastPage[lastPage.length - 1].id;
      },
    }
  );
};

export const useCreateComment = () => {
  return useMutation(createComment, {
    onMutate: ({meowID, content, user}) => {
      const previousComments = queryClient.getQueryData([
        "meows",
        meowID.toString(),
        "comments",
      ]);
      queryClient.setQueryData(
        ["meows", meowID.toString(), "comments"],
        (old) => {
          let cpy = old as InfiniteData<[Comment]>;
          let now = `${new Date(Date.now() - 60 * 60 * 1000).toLocaleString()}`;
          cpy.pages[0].unshift({
            content: content,
            user: user,
            inserted_at: now,
            id:
              (cpy.pages[0].length as number) === 0
                ? 1
                : cpy.pages[0][0].id + 1,
          });
          return cpy;
        }
      );
      return {previousComments};
    },
    onError: ({previousComments}, {meowID}) => {
      queryClient.setQueryData(
        ["meows", meowID.toString(), "comments"],
        previousComments
      );
    },
  });
};
