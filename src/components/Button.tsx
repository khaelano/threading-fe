import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProp = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, ...rest }: ButtonProp) {
  return (
    <button
      {...rest}
      className="flex flex-row items-center space-x-2 bg-black hover:bg-gray-800 active:bg-gray-600 rounded-full text-white px-4 py-2"
    >
      {children}
    </button>
  );
}

export default Button;
