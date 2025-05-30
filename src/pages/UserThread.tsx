import { useLoaderData, useNavigate, type Params } from "react-router-dom";
import Post from "../components/Post";
import TopBar from "../components/TopBar";
import { useAuthStore } from "../states";

export async function userThreadLoader({ params }: { params: Params }) {
  const result = await fetch(
    `http://localhost:8080/threads?author=${params.userId}`,
  );
  const json = await result.json();
  return { response: json };
}

function UserThread() {
  const { response } = useLoaderData();
  const authStatus = useAuthStore((s) => s.authStatus);

  const posts = response.data.map((post) => (
    <Post
      key={post.id}
      postId={post.id}
      text={post.content}
      likeCount={0}
      editable={authStatus === "authenticated"}
    />
  ));

  return (
    <div className="flex flex-col items-center">
      <TopBar />
      <div className="flex flex-col space-y-4 max-w-2xl mt-24 mb-4">
        <h1 className="font-display font-bold text-2xl">User Threads</h1>
        {posts}
      </div>
    </div>
  );
}

export default UserThread;
