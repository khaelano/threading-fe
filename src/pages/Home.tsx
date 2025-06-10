// import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Post from "../components/Post";
import TopBar from "../components/TopBar";

const API_URL = import.meta.env.VITE_API_HOST;

export async function homeLoader() {
  const result = await fetch(`http://${API_URL}/threads`);
  const json = await result.json();
  return { response: json };
}

export default function Home() {
  const { response } = useLoaderData();
  const postsData = response.data;

  const posts = postsData.map((post: { id: string; content: string }) => (
    <Post key={post.id} postId={post.id} text={post.content} likeCount={0} />
  ));

  return (
    <div className="flex flex-col items-center">
      <TopBar />
      <div className="flex flex-col space-y-4 max-w-2xl mt-24 mb-4">
        {posts}
      </div>
    </div>
  );
}
