import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_HOST;

type RegisterBody = {
  email: string;
  name: string;
  password: string;
  passwordConf: string;
};

type LoginBody = {
  email: string;
  password: string;
};

type AuthState = {
  authStatus: "unknown" | "pending" | "authenticated" | "unauthenticated";
  token: string | null;
  userId: string | null;
  login: (loginBody: LoginBody) => void;
  register: (registerBody: RegisterBody) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  authStatus: "unknown",
  token: null,
  userId: null,
  login: async ({ email, password }) => {
    set(() => ({ authStatus: "pending" }));

    const reqBody = {
      email: email,
      password: password,
    };

    const result = await fetch(`http://${API_URL}/user/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (!result.ok) {
      set(() => ({ authStatus: "unauthenticated" }));
      return;
    }
    
    const resBody = await result.json();
    const tokenPayload = jwtDecode(resBody.data);
    sessionStorage.setItem("token bearer", resBody.data);

    set(() => ({
      token: resBody.data,
      userId: tokenPayload.sub!,
      authStatus: "authenticated",
    }));
  },
  register: async ({ email, name, password, passwordConf }) => {
    set(() => ({ authStatus: "pending" }));

    const reqBody = {
      email: email,
      name: name,
      password: password,
      passwordConf: passwordConf,
    };

    const result = await fetch(`http://${API_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (!result.ok) {
      set(() => ({ authStatus: "unauthenticated" }));
      return;
    }

    const resBody = await result.json();
    const tokenPayload = jwtDecode(resBody.data);

    set(() => ({
      token: resBody.data,
      userId: tokenPayload.sub!,
      authStatus: "authenticated",
    }));
  },
  logout: () => set(() => ({ token: null, authStatus: "unauthenticated" })),
}));

export { useAuthStore };
