import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import Button from "../components/Button";
import { useAuthStore } from "../states";

function CreateThread() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const { token, authStatus } = useAuthStore(
    useShallow((s) => ({
      token: s.token,
      authStatus: s.authStatus,
    })),
  );

  const handleSubmit = async () => {
    const reqBody = {
      content: content,
    };

    try {
      const result = await fetch("http://localhost:8080/threads", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reqBody),
      });

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
      <div className="flex flex-col space-y-4 items-end justify-start max-w-2xl w-full h-64 border-1 border-gray-300 rounded-3xl p-4">
        <textarea
          value={content}
          onChange={changeHandler}
          placeholder="Write your thoughts here..."
          className="border-1 border-gray-300 rounded-2xl grow self-stretch p-4"
        ></textarea>
        <Button
          disabled={authStatus !== "authenticated"}
          onClick={handleSubmit}
        >
          Create thread
        </Button>
      </div>
    </div>
  );
}

export default CreateThread;
