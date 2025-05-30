import { useState } from "react";
import Button from "../components/Button";
import { useLoaderData, useNavigate, type Params } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "../states";

export async function modifyThreadLoader({ params }: { params: Params }) {
  const result = await fetch(
    `http://localhost:8080/threads/${params.threadId}`,
  );
  const json = await result.json();

  return { response: json };
}

function ModifyThread() {
  const { response } = useLoaderData();
  const navigate = useNavigate();

  const [content, setContent] = useState(response.data.content);
  const { token, authStatus } = useAuthStore(
    useShallow((s) => ({
      token: s.token,
      authStatus: s.authStatus,
    })),
  );

  const deletePost = async () => {
    try {
      const result = await fetch(
        `http://localhost:8080/threads/${response.data.id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (result.ok) {
        return navigate(-1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    const reqBody = {
      content: content,
    };

    try {
      const result = await fetch(
        `http://localhost:8080/threads/${response.data.id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reqBody),
        },
      );

      if (result.ok) {
        return navigate(-1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="flex flex-col space-y-4 items-stretch justify-start max-w-2xl w-full h-64 border-1 border-gray-300 rounded-3xl p-4">
        <textarea
          value={content}
          onChange={changeHandler}
          placeholder="Write your thoughts here..."
          className="border-1 border-gray-300 rounded-2xl grow self-stretch p-4"
        ></textarea>
        <div className="flex flex-row justify-between">
          <Button
            disabled={authStatus !== "authenticated"}
            onClick={deletePost}
          >
            Delete Thread
          </Button>
          <Button
            disabled={authStatus !== "authenticated"}
            onClick={handleSubmit}
          >
            Change thread
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModifyThread;
