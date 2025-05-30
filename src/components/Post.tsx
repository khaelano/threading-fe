import { ShareIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

type PostProps = {
  postId: string;
  text: string;
  likeCount: number;
  editable?: boolean;
};

function Post({ postId, text, editable = false }: PostProps) {
  return (
    <div className="border-1 border-gray-300 p-4 rounded-2xl w-2xl space-y-4">
      <div className="font-display">{text}</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-4 justify-items-center justify-start">
          <HeartIcon className="w-6 h-6" />
          <ChatBubbleOvalLeftIcon className="w-6 h-6" />
          <ShareIcon className="w-6 h-6" />
        </div>
        {editable && (
          <NavLink
            to={`/modify-thread/${postId}`}
            className="flex flex-row space-x-4 items-center"
          >
            <PencilIcon className="w-4 h-4" />
            <p>Edit thread</p>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Post;
