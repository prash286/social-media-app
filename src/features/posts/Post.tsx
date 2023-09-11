import { Card, IconButton, Modal } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsIcon from "@mui/icons-material/Sms";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useLikePost from "../likes/useLikePost";
import useUnlikePost from "../likes/useUnlikePost";
import getUserDetails from "../../utils/localStorageData";
import { useState } from "react";
import CommentBox from "../comments/CommentBox";

export default function Post({
  post,
}: {
  post: {
    id: number;
    description: string;
    imageUrl: string;
    avatarUrl: string;
    username: string;
    likesCount: number;
    commentsCount: number;
    isLike: boolean;
  };
}) {
  const {
    id: postId,
    description,
    imageUrl,
    avatarUrl,
    username,
    likesCount,
    commentsCount,
    isLike,
  } = post;
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();
  const { userId } = getUserDetails();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="grid gap-2 px-2 py-2 mb-3">
        <section className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt="logo"
            className="w-12 aspect-[1] rounded-full border border-solid border-indigo-500"
          />
          <span className="text-md font-semibold capitalize">{username}</span>
        </section>
        <section className="ml-2.5">
          <span>{description}</span>
        </section>
        {imageUrl && (
          <section className="flex justify-center items-center">
            <div className="w-[90%] h-[250px]">
              <img
                src={imageUrl}
                alt="logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </section>
        )}
        <section className="flex gap-3">
          <div className="flex items-center">
            {isLike ? (
              <IconButton
                aria-label="like"
                size="small"
                onClick={() => unlikePost({ userId, postId, likesCount })}
              >
                <FavoriteIcon fontSize="small" className="text-red-600" />
              </IconButton>
            ) : (
              <IconButton
                aria-label="like"
                size="small"
                onClick={() => likePost({ postId, likesCount })}
              >
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
            )}
            <span>{likesCount} Likes</span>
          </div>
          <div className="flex items-center">
            <IconButton
              aria-label="comment"
              size="small"
              onClick={() => setIsOpen(true)}
            >
              <SmsIcon fontSize="small" />
            </IconButton>
            <span>{commentsCount} Comments</span>
          </div>
        </section>
      </Card>
      {isOpen && (
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <CommentBox postId={postId} commentsCount={commentsCount} />
        </Modal>
      )}
    </>
  );
}
