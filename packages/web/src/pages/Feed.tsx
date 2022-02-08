import React, {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {useMeows, useToggleLike} from "../services/meows";
import Page5xx from "./Page5xx";
import DefaultLayout from "./layouts/DefaultLayout";
import Loader from "../components/Loader";
import MeowPreview from "../components/MeowPreview";

const Feed = () => {
  const {
    data: meows,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useMeows();

  const {mutate: toggleLike} = useToggleLike();

  const {ref: lastRef, inView: lastInView} = useInView();

  useEffect(() => {
    if (hasNextPage && lastInView) fetchNextPage();
  }, [hasNextPage, lastInView, fetchNextPage]);

  if (isLoading)
    return (
      <DefaultLayout>
        <Loader className="mt-10" />
      </DefaultLayout>
    );

  if (isError) return <Page5xx />;

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center gap-10 pb-10">
        {meows!.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((meow) => (
              <MeowPreview
                ref={
                  meow.id === group.data[group.data.length - 1].id
                    ? lastRef
                    : null
                }
                key={meow.id}
                avatarUrl={meow.creator.avatar_url}
                creatorName={meow.creator.username}
                meowedAt={meow.inserted_at}
                content={meow.content}
                imageUrl={meow.image_url}
                hasLiked={meow.has_liked}
                likeCount={meow.like_count}
                onLikeToggle={() => toggleLike(meow.id)}
              />
            ))}
          </React.Fragment>
        ))}
        {isFetchingNextPage && <Loader className="mt-10" />}
      </div>
    </DefaultLayout>
  );
};

export default Feed;
