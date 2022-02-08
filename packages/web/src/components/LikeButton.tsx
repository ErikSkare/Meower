import {ReactComponent as Meow} from "./icons/meow.svg";

type LikeButtonProps = {
  hasLiked: boolean;
  likeCount: number;
  onLikeToggle: Function;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  hasLiked,
  likeCount,
  onLikeToggle,
}) => {
  return (
    <div
      className={`flex flex-row gap-2 items-center cursor-pointer ${
        hasLiked ? "fill-sky-400 text-sky-400" : "fill-slate-400 text-slate-400"
      }`}
      onClick={() => onLikeToggle()}
    >
      <Meow className="aspect-square w-auto h-6" />
      <span className="text-sm font-medium">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
