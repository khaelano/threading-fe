import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProp = {
  children: ReactNode;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function BigButton({
  children,
  onClick = () => {},
  className,
  ...rest
}: ButtonProp) {
  return (
    <button
      className={
        className +
        " flex flex-row items-center justify-center space-x-2 bg-black hover:bg-gray-800 active:bg-gray-600 rounded-full text-white font-display px-6 py-4"
      }
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default BigButton;
