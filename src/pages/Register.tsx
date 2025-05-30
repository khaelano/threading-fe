import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import TextField from "../components/TextField";
import BigButton from "../components/BigButton";
import { useAuthStore } from "../states";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    passwordConf: "",
  });
  const { register, authStatus } = useAuthStore(
    useShallow((s) => ({ register: s.register, authStatus: s.authStatus })),
  );

  useEffect(() => {
    if (authStatus === "authenticated") {
      navigate("/");
    }
  }, [authStatus, navigate]);

  const handleSubmit = () => {
    try {
      register({ ...form });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="flex flex-col space-y-8 items-center justify-center w-md border-1 border-gray-300 rounded-3xl p-8">
        <div className="flex flex-col space-y-2 items-center">
          <img src="/threading.svg" />
          <p className="font-display text-gray-500">
            Let's start by creating your account
          </p>
        </div>
        <div className="flex flex-col space-y-4 items-stretch self-stretch">
          <TextField
            name="email"
            placeholder="Enter your email address..."
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            name="name"
            placeholder="Enter your name..."
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            name="password"
            placeholder="Enter your password..."
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            name="passwordConf"
            placeholder="Enter your password confirmation..."
            type="password"
            value={form.passwordConf}
            onChange={handleChange}
          />
          <BigButton onClick={handleSubmit} className="mt-12">
            Register Account
          </BigButton>
        </div>
      </div>
    </div>
  );
}
