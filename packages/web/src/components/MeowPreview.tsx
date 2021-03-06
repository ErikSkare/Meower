import React from "react";
import {Link} from "react-router-dom";
import TimeAgo from "react-timeago";
import LikeButton from "./LikeButton";
import {ReactComponent as Comment} from "./icons/comment.svg";
import hungarianStrings from "react-timeago/lib/language-strings/hu";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const hungarianFormatter = buildFormatter(hungarianStrings);

type MeowPreviewProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  meowID: number;
  avatarUrl: string;
  creatorName: string;
  meowedAt: string;
  content: string;
  imageUrl?: string;
  hasLiked: boolean;
  likeCount: number;
  onLikeToggle: Function;
};

const MeowPreview = React.forwardRef<HTMLDivElement, MeowPreviewProps>(
  (
    {
      meowID,
      avatarUrl,
      creatorName,
      meowedAt,
      content,
      imageUrl = "",
      hasLiked,
      likeCount,
      onLikeToggle,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`w-full max-w-lg flex flex-row gap-4 p-4 bg-white border border-slate-200 hover:border-slate-400 ${className}`}
        {...props}
      >
        <div>
          <img
            src={avatarUrl}
            alt={creatorName}
            className="w-12 h-auto aspect-square object-cover border-4 border-slate-200 rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex flex-row gap-2">
            <span className="font-bold">{creatorName}</span>
            <TimeAgo
              date={meowedAt}
              formatter={hungarianFormatter}
              className="text-slate-400"
            />
          </div>
          <div className="mt-1">{content}</div>
          {imageUrl !== "" && (
            <img
              src={imageUrl}
              alt="meow content"
              style={{aspectRatio: "4 / 3"}}
              className="w-full h-auto object-cover mt-4 border border-slate-200 rounded-lg"
            />
          )}
          <div className="flex flex-row gap-6 mt-4">
            <LikeButton
              hasLiked={hasLiked}
              likeCount={likeCount}
              onLikeToggle={onLikeToggle}
            />
            <Link to={`/meows/${meowID}`}>
              <Comment className="aspect-square w-auto h-6 fill-slate-400 hover:fill-slate-500 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

export default MeowPreview;
