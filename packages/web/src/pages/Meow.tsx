import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useInView} from "react-intersection-observer";
import {useComments, useCreateComment} from "../services/comments";
import {useMeow, useToggleLike} from "../services/meows";
import {useMe} from "../services/users";
import DefaultLayout from "./layouts/DefaultLayout";
import Page5xx from "./Page5xx";
import Loader from "../components/Loader";
import MeowPreview from "../components/MeowPreview";
import Comment from "../components/Comment";
import TextInput from "../components/TextInput";

const Meow = () => {
  const {id} = useParams();
  const [currentContent, setCurrentContent] = useState("");

  const {data: me, isLoading: isLoadingMe, isError: isErrorMe} = useMe();

  const {
    data: comments,
    isLoading: isLoadingComments,
    isFetchingNextPage: isFetchingMoreComments,
    hasNextPage: hasMoreComments,
    isError: isLoadingCommentsError,
    fetchNextPage: fetchMoreComments,
  } = useComments(id!);

  const {
    data: meow,
    isLoading: isLoadingMeow,
    isError: isLoadingMeowError,
  } = useMeow(id!);

  const {mutate: toggleLike} = useToggleLike();

  const {mutate: createComment} = useCreateComment();

  const {ref: lastRef, inView: lastInView} = useInView();

  const handleCommentCreate = (ev) => {
    ev.preventDefault();
    if (currentContent === "") return;
    createComment({meowID: meow!.id, content: currentContent, user: me!});
    setCurrentContent("");
  };

  useEffect(() => {
    if (hasMoreComments && lastInView) fetchMoreComments();
  }, [hasMoreComments, lastInView, fetchMoreComments]);

  if (isLoadingMe)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (isLoadingMeow)
    return (
      <DefaultLayout>
        <Loader className="mt-10" />
      </DefaultLayout>
    );

  if (isLoadingCommentsError || isLoadingMeowError || isErrorMe)
    return <Page5xx />;

  return (
    <DefaultLayout>
      <div className="w-full max-w-lg flex flex-col items-center mb-10">
        <MeowPreview
          key={meow!.id}
          meowID={meow!.id}
          avatarUrl={meow!.creator.avatar_url}
          creatorName={meow!.creator.username}
          meowedAt={meow!.inserted_at}
          content={meow!.content}
          imageUrl={meow!.image_url}
          hasLiked={meow!.has_liked}
          likeCount={meow!.like_count}
          onLikeToggle={() => toggleLike(meow!.id)}
        />
        <div className="w-full flex flex-col items-center gap-6 bg-white px-4 py-6 border border-slate-200 border-t-0">
          <form
            className="w-full max-w-md flex flex-row gap-4"
            onSubmit={handleCommentCreate}
          >
            <TextInput
              id="content"
              label="Szöveg"
              value={currentContent}
              setValue={setCurrentContent}
            />
          </form>
          {isLoadingComments ? (
            <Loader />
          ) : (comments!.pages[0].length as number) === 0 ? (
            <div className="font-bold">Nincsenek kommentek!</div>
          ) : (
            <>
              {comments!.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.map((comment) => (
                    <Comment
                      ref={
                        comment.id === group[group.length - 1].id
                          ? lastRef
                          : null
                      }
                      key={comment.id}
                      user={comment.user}
                      inserted_at={comment.inserted_at}
                      content={comment.content}
                    />
                  ))}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Meow;
