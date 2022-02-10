import React from "react";
import {User} from "../types";
import TimeAgo from "react-timeago";
import hungarianStrings from "react-timeago/lib/language-strings/hu";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const hungarianFormatter = buildFormatter(hungarianStrings);

type CommentProps = {
  content: string;
  inserted_at: string;
  user: User;
};

const Comment = React.forwardRef<HTMLDivElement, CommentProps>(
  ({content, inserted_at, user}, ref) => {
    return (
      <div ref={ref} className="w-full max-w-md flex flex-row gap-2">
        <div className="mt-2">
          <img
            src={user.avatar_url}
            className="aspect-square w-8 h-auto rounded-full"
            alt={user.username}
          />
        </div>
        <div className="flex-1 flex-col py-2 px-4 bg-slate-200 rounded-lg">
          <div className="flex flex-row justify-between">
            <span className="font-bold">{user.username}</span>
            <TimeAgo
              date={inserted_at}
              className="text-sm text-slate-500"
              formatter={hungarianFormatter}
            />
          </div>
          <div>{content}</div>
        </div>
      </div>
    );
  }
);

export default Comment;
